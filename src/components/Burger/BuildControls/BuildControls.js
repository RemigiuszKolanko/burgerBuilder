import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];

const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current price: <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl
                    key={ctrl.type}
                    label={ctrl.label}
                    disabled={props.disabled[ctrl.type]}
                    addClick={() => props.ingredientAdded(ctrl.type)}
                    deleteClick={() => props.ingredientDeleted(ctrl.type)}/>
            })}
            <button
                disabled={!props.purchesable}
                className={classes.OrderButton}
                onClick={props.ordered}>ORDER NOW</button>
        </div>
    );
}

export default buildControls;