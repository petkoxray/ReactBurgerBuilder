import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ingredients: {
                salad: 1,
                bacon: 1,
                meat: 2,
                cheese: 2
            }
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <h2>BurgerManager</h2>
            </Aux>
        );
    }
}

export default BurgerBuilder;