import React, { useEffect, useState } from 'react';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';

import './shop.css'

const Shop = () => {
    const [products,setProduct] = useState([]);
    const [cart,setCart] = useState([]);
    const [DisplayProducts, setDisplayProducts] = useState([]);
    useEffect(()=>{
        fetch('./products.json')
        .then(res=>res.json())
        .then(data=>{
            setProduct(data)
            setDisplayProducts(data)
        })
    },[])
    useEffect(()=>{
       if (products.length) {
        const savedCart = getStoredCart();
        let storedCart = [];
        for(const key in savedCart){
            const addedProduct = products.find(product => product.key === key);
            if (addedProduct) {
                const quantity = savedCart[key];
                addedProduct.quantity = quantity;
                storedCart.push(addedProduct);
            }
        }
        setCart(storedCart);
       }
    },[products])
    const handleAddToCart = product => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    }
    const handleSearch = (event) =>{
        const searchText = event.target.value;
        const matchedProduct = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));
        setDisplayProducts(matchedProduct);
    }
    return (
        <>
            <div className="search-container">
                <input className="search-field" onChange={handleSearch} type="text" placeholder="Search product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    <h2>Electronic Product</h2>
                    {
                        DisplayProducts.map(product => <Product 
                            key={product.key} 
                            product={product}
                            handleAddToCart={handleAddToCart}
                            ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart} hero={true}></Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;