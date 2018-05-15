import React, { Component } from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHanlder/withErrorHanlder';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('orders.json')
            .then(res => {
                const fetchedOrders = [];
                Object.keys(res.data).forEach((key) => {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                });

                this.setState({ loading: false, orders: fetchedOrders });

            })
            .catch(err => this.setState({ loading: false }));
    }

    render() {
        const orders = this.state.orders.map((o) => {
            return <Order key={o.id} ingredients={o.ingredients} price={o.price} />
        });

        return (<div>{orders}</div>);
    }
}

export default withErrorHandler(Orders, axios);