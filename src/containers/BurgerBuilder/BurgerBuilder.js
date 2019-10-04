import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasing: false,
        loading: false,
        error: false
    }

    addIngredientHandler = (type) => {

        let ingredients = {...this.state.ingredients};
        ingredients[type]++;

        let totalPrice = this.state.totalPrice;
        totalPrice += INGREDIENT_PRICES[type];

        this.setState({
            ingredients: {...ingredients},
            totalPrice: totalPrice
        });     
    }

    removeIngredientHandler = (type) => {

        let ingredients = {...this.state.ingredients};

        if(ingredients[type] > 0) { 
            ingredients[type]--;
            let totalPrice = this.state.totalPrice;
            totalPrice -= INGREDIENT_PRICES[type];
            this.setState({
                ingredients: ingredients,
                totalPrice: totalPrice
            });
        }
    }

    updatePurchaseState() {
        const sum = Object.values(this.state.ingredients).reduce((sum, el) => sum + el);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {

        this.setState({
            loading: true
        });
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Remik',
                address: {
                    street: 'TestStreet',
                    zipCode: '50-538',
                    country: 'Poland'
                },
            email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };
        
        axios.post('/orders.json', order)
            .then(() => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch(() => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
    }

    componentDidMount () {
        axios.get('https://react-my-burger-cd0d3.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(() => {
                this.setState({
                    error: true
                })
            });
    }

    render () {
        
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (var key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let orderSummary = null;

        if (this.state.ingredients) {
            burger =
                <Auxiliary>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientDeleted={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchesable={this.updatePurchaseState()}
                        ordered={this.purchaseHandler} />);
                </Auxiliary>;
            orderSummary =
                <OrderSummary
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    totalPrice={this.state.totalPrice}/>;
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Auxiliary>
                <Modal
                    showModal={this.state.purchasing}
                    loading={this.state.loading}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        );
    };
}

export default withErrorHandler(BurgerBuilder, axios);