import React, { useContext, useState } from "react";
import star_icon from '../../assets/star_icon.png';
import star_icon_dull from '../../assets/star_dull_icon.png';
import ShopCategory from "../../Pages/ShopCategory";
import { ShopContext } from "../../Context/ShopContext";
import './ProductDisplay.css';

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart} = useContext(ShopContext)

    const [selectedSize, setSelectedSize] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setShowError(false);
    };
    

    const handleAddToCart = (productId) => {
        if (selectedSize) {
            addToCart(productId, () => {
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 1500);
            });
        } else {
            setShowError(true);
        }
    };

    return (
        <div className="productdisplay">
            <div className="productsiplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                    <img src={product.photos[0]} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.photos[0]} alt="imagen" />
                </div>
            </div>
            <div className="productsiplay-right">
                <h1>{product.description}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon_dull} alt="" />
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-new">${product.price}</div>
                </div>
                <div className="productsiplay-right-description">
                    {product.description}
                </div>
                <div className="productsiplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productsiplay-right-sizes">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <div
                                key={size}
                                onClick={() => handleSizeSelect(size)}
                                className={selectedSize === size ? 'selected' : ''}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                {showError && <p className="error-message">Please select a size</p>}
                {showPopup && (
                    <div className="popup">
                        <p>Product added to cart</p>
                        <span className="checkmark">✔</span>
                    </div>
                )}
                <p className="productsiplay-right-category"><span>Category: </span> Women, T-shirt, Crop Top </p>
                <p className="productsiplay-right-category"><span>Tags: </span> Modern, Latest</p>

            </div>
        </div>
    )
}

export default ProductDisplay

