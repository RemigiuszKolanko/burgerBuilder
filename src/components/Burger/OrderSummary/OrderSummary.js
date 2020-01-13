import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

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
            <p><strong>Total price: {(props.price).toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button
                clicked={props.purchaseCancelled}
                btnType="Danger">CANCEL</Button>
            <Button
                clicked={props.purchaseContinued}
                btnType="Success">CONTINUE</Button>
        </Auxiliary>
    );
};

export default OrderSummary;