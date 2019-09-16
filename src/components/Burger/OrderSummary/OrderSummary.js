import React, {Component} from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './OrderSummary.module.css';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    //This could be functional component not a class component

    render() {

        const ingredientsSummary = Object.keys(this.props.ingredients).map((ingKey) => {
            return <li
                        key={ingKey}
                        className={classes.Item}>
                            <span >{ingKey}</span>: {this.props.ingredients[ingKey]}
                    </li>
        });

        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total price: {(this.props.totalPrice).toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button
                    clicked={this.props.purchaseCancelled}
                    btnType="Danger">CANCEL</Button>
                <Button
                    clicked={this.props.purchaseContinued}
                    btnType="Success">CONTINUE</Button>
            </Auxiliary>
        );
    }
};

export default OrderSummary;