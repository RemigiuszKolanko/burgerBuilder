import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary';
import classes from './OrderSummary.module.css';

const orderSummary = (props) => {

    const ingredientsSummary = Object.keys(props.ingredients).map((ingKey) => {
        return <li
                    key={ingKey}
                    className={classes.Item}>
                        <span >{ingKey}</span>: {props.ingredients[ingKey]}
                </li>
    });

    return (
        <Auxiliary>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p>Continue to checkout?</p>
        </Auxiliary>
    );
    
};

export default orderSummary;