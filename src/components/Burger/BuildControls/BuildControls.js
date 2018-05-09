import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const ingreditents = [
    { key: 'Salad', label: 'salad' },
    { key: 'Meat', label: 'meat' },
    { key: 'Cheese', label: 'cheese' },
    { key: 'Bacon', label: 'bacon' }
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>

        {ingreditents.map((ingr) => {
            return <BuildControl
                key={ingr.label}
                label={ingr.label}
                added={() => props.addIngredient(ingr.label)}
                removed={() => props.removeIngredient(ingr.label)}
                disabled={props.disabled[ingr.label]} />
        })}
    </div>
);

export default buildControls;