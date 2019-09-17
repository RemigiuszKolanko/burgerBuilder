import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasing: false
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
        // alert('You continue!');
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Remik',
                address: {
                    street: 'TestStreet',
                    zipCOde: '50-538',
                    country: 'Poland'
                },
            email: 'test@test.com',
            },
            deliveryMethod: 'fastest'
        };

        axios.post('/orders.json', order)
            .then(response => console.log(response))
            .catch(error => console.log(error));
    }

    render () {
        
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (var key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        return (
            <Auxiliary>
                <Modal
                    showModal={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary
                        purchaseCancelled={this.purchaseCancelHandler}
                        purchaseContinued={this.purchaseContinueHandler}
                        ingredients={this.state.ingredients}
                        totalPrice={this.state.totalPrice}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientDeleted={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchesable={this.updatePurchaseState()}
                    ordered={this.purchaseHandler}/>
            </Auxiliary>
        );
    };
}

export default BurgerBuilder;