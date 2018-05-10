import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients)
        .map((key) => {
            return <li key={key}><span style={{ textTransform: 'capitalize' }}>
                {key} : {props.ingredients[key]}</span></li>
        });

    return (
        <Aux>
            <h2>Order Summary</h2>
            <h3>Tasty burger with the following ingredients:</h3>
            <ul>
                {ingredients}
            </ul>
            <p>Total price: {props.price.toFixed(2)}</p>
        </Aux>
    )
};

export default orderSummary;