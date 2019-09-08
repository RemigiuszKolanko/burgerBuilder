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

    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        let ingredients = {...this.state.ingredients};
        ingredients[type]++;

        let totalPrice = this.state.totalPrice;
        totalPrice += INGREDIENT_PRICES[type];

        this.setState({
            ingredients: {...ingredients},
            totalPrice: totalPrice
        })
        
    }

    removeIngredient = (type) => {

    }

    render () {
        return (
            <Auxiliary>
                <Burger ingredients={this.state.ingredients} />
                <h1>{this.state.totalPrice}</h1>
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </Auxiliary>
        );
    };
}

export default BurgerBuilder;