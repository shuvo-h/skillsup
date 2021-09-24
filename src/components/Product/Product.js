import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './product.css'
import Rating from 'react-rating';

const Product = (props) => {
    const {name, img, price, stock, seller, star} = props.product;
    const cartIcon = <FontAwesomeIcon icon={faShoppingCart} />
    return (
        <div className='product'>
            <div>
                <img src={img} alt="" />
            </div>
            <div>
                <h2 className='product-name'>{name}</h2>
                <p>by: <small>{seller}</small></p>
                <p>Price: <strong>${price}</strong></p>
                <Rating 
                    initialRating={star}
                    emptySymbol="far fa-star" 
                    fullSymbol="fas fa-star"
                    readonly
                ></Rating>
                <p>Only {stock} left in stock - order soon</p>
                <button className="btn-regular" onClick={()=> props.handleAddToCart(props.product)}>{cartIcon} add to cart</button>
            </div>
        </div>
    );
};

export default Product;