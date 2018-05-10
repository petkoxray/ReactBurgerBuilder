    import React, { Component } from 'react';
    import Aux from '../../hoc/Aux';
    import Burger from '../../components/Burger/Burger';
    import BuildControls from '../../components/Burger/BuildControls/BuildControls';
    import Modal from '../../components/UI/Modal/Modal';
    import OrderSummary from '../../components/Burger/OderSummary/OrderSummary';

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
                    salad: 0,
                    bacon: 0,
                    meat: 0,
                    cheese: 0
                },
                totalPrice: 4,
                purchasable: false,
                purchasing: false
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

        render() {
            let disabledIngredients = {};
            for (const key in this.state.ingredients) {
                disabledIngredients[key] = this.state.ingredients[key] <= 0;
            }

            return (
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler   }>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                        />
                    </Modal>
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
    }

    export default BurgerBuilder;