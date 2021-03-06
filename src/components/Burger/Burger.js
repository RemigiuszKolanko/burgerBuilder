import React from 'react';
import { withRouter }  from 'react-router-dom';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients)
        .map(ingredientKey => {
            return [...Array(props.ingredients[ingredientKey])].map((_, i) => {
                return <BurgerIngredient key={ingredientKey + i} type={ingredientKey} />
            })
        })
        .reduce((prev, curr) => {
            return prev.concat(curr)
        }, []);

    if (!ingredients.length) {
        ingredients = <p>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
                {ingredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default withRouter(burger);