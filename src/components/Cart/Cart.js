import './cart.css'

import React from 'react';

const Cart = (props) => {
    const {cart} = props;
    /*
    const totalReducer = (previous,currentProduct) => previous + currentProduct.price;
    const total = cart.reduce(totalReducer,0)
    */
    let totalQuantitty = 0;
    let total = 0;
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        total = total + (product.price * product.quantity);
        totalQuantitty =totalQuantitty + product.quantity;
    }
    const shipping = total > 0 ? 15 : 0;
    const tax = (total + shipping) * 0.10;
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items Order: {totalQuantitty}</p>
            <p>Total Price: {total} </p>
            <p>Shipping: {shipping}</p>
            <p>Tax: {tax}</p>
            <p>Grand Total: {grandTotal}</p>
        </div>
    );
};

export default Cart;