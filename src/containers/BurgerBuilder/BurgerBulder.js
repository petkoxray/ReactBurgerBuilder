import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENTS_PRICES = {
    salad: 2,
    meat: 3,
    bacon: 2.5,
    cheese: 1.5
};

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredients: {
                salad: 1,
                bacon: 2,
                meat: 1,
                cheese: 1
            },
            totalPrice: 4
        }
    }

    addIngredientHandler = (type) => {
        const oldQty = this.state.ingredients[type];
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldQty + 1;
        const newPrice = this.state.totalPrice + INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    removeIngredientHandler = (type) => {
        const oldQty = this.state.ingredients[type];
        console.log(oldQty);
        if (oldQty === 0)
            return;

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldQty - 1;
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    render() {
        let disabledIngredients = {};
        for (const key in this.state.ingredients) {
            disabledIngredients[key] = this.state.ingredients[key] <= 0;
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    addIngredient={this.addIngredientHandler}
                    removeIngredient={this.removeIngredientHandler}
                    disabled={disabledIngredients}
                    price={this.state.totalPrice}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;