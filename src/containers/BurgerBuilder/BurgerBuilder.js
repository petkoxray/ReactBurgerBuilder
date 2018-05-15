import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHanlder from '../../hoc/withErrorHanlder/withErrorHanlder';
import axios from '../../axios-orders';

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
            ingredients: null,
            totalPrice: 4,
            purchasable: false,
            purchasing: false,
            loading: false
        }
    }

    componentDidMount() {
        axios.get('ingredients.json')
            .then((res) => {
                this.setState({
                    ingredients: res.data
                });
            });
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

        this.updatePurchasableState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldQty = this.state.ingredients[type];

        if (oldQty === 0)
            return;

        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = oldQty - 1;
        const newPrice = this.state.totalPrice - INGREDIENTS_PRICES[type];

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });

        this.updatePurchasableState(updatedIngredients);
    }

    updatePurchasableState(ingredients) {
        const sum = Object.keys(ingredients)
            .map((key => {
                return ingredients[key]
            }))
            .reduce((sum, qty) => sum += qty);

        this.setState({
            purchasable: sum > 0
        });
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHanlder = () => {
        this.setState({ loading: true });

        //data should be get from server!!! Just for testing purpose;
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render() {
        let disabledIngredients = {};
        for (const key in this.state.ingredients) {
            disabledIngredients[key] = this.state.ingredients[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.state.ingredients) {
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseContinued={this.purchaseContinueHanlder}
                purchaseCancelled={this.purchaseCancelHandler}
            />;

            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        addIngredient={this.addIngredientHandler}
                        removeIngredient={this.removeIngredientHandler}
                        disabled={disabledIngredients}
                        price={this.state.totalPrice}
                        purchasable={!this.state.purchasable}
                        purchased={this.purchaseHandler}
                    />
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHanlder(BurgerBuilder, axios);