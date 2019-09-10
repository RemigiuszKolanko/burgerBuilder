import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

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
        purchasable: false
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

        this.updatePurchaseState(ingredients);
        
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

        this.updatePurchaseState(ingredients);
    }

    updatePurchaseState(ingredients) {

        const sum = Object.values(ingredients).reduce((sum, el) => sum + el);

        this.setState({
            purchasable: sum > 0
        });
    }

    render () {
        
        const disabledInfo = {
            ...this.state.ingredients
        }

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; 
        }

        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientDeleted={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchesable={this.state.purchasable}/>
            </Auxiliary>
        );
    };
}

export default BurgerBuilder;