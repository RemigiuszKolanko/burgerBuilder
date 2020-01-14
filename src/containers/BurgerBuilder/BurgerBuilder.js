import React, { Component } from "react";
import { connect } from 'react-redux';

import axios from "../../axios-orders";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    updatePurchaseState() {
        const sum = Object.values(this.props.ings).reduce(
            (sum, el) => sum + el
        );

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    componentDidMount() {
        
    }

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (var key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let burger = this.state.error ? (
            <p>Ingredients can't be loaded</p>
        ) : (
                <Spinner />
            );
        let orderSummary = null;

        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientDeleted={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchesable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler}
                    />
                </Auxiliary>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }

        return (
            <Auxiliary>
                <Modal
                    showModal={this.state.purchasing}
                    loading={this.state.loading}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: ingName => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: ingName => dispatch(burgerBuilderActions.removeIngredient(ingName))

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
