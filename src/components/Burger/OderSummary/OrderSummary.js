import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;