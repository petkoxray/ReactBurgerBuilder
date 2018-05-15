import React from 'react';

import classes from './Order.css';

const order = (props) => {
    const ingredients = [];

    Object.keys(props.ingredients).forEach(ingredientName => {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName]
        });
    });

    const ingredientOutput = ingredients.map(ig => 
         <span key={ig.name}>{ig.name} ({ig.amount})</span>
    );

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default order;