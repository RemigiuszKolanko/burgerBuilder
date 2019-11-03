import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>We hope it tastes well!</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCanceled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
}

export default CheckoutSummary;