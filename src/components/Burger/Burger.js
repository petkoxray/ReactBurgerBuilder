import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';

const burger = (props) => {
    let ingredients = Object.keys(props.ingredients).map((objKey) => {
        return [...Array(props.ingredients[objKey])].map((_, index) => {
            return <BurgerIngredient key={objKey + index} type={objKey} />
        });
    });
    
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {ingredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
};

export default burger;