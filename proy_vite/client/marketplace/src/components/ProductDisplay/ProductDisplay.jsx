import React, { useContext, useState } from "react";
import star_icon from '../../assets/star_icon.png';
import star_icon_dull from '../../assets/star_dull_icon.png';
import ShopCategory from "../../Pages/ShopCategory";
import { ShopContext } from "../../Context/ShopContext";
import './ProductDisplay.css';
import { useNavigate } from "react-router-dom";

const ProductDisplay = (props) => {
    const {product} = props;
    const {addToCart, logueado} = useContext(ShopContext)

    const [selectedSize, setSelectedSize] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showError, setShowError] = useState(false);
    const [mainImage, setMainImage] = useState(product.photos[0]);
    const navigate = useNavigate();

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
        setShowError(false);
    };
    

    const handleAddToCart = (productId) => {
        if(!logueado){
            navigate('/logIn')
            return;
        }
        if (selectedSize) {
            const rta = addToCart(productId, selectedSize, 1)
            if (rta){
                setShowPopup(true);
                setTimeout(() => {
                    setShowPopup(false);
                }, 1500);
            }
            else{
                alert("No hay stock suficiente para la cantidad solicitada.");
            }
        } else {
            setShowError(true);
        }
    };

    const handleImageClick = (photo) => {
        setMainImage(photo);
    };

    return (
        <div className="productdisplay">
            <div className="productsiplay-left">
                <div className="productdisplay-img-list">
                    {product.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            onClick={() => handleImageClick(photo)}
                            className="productdisplay-thumbnail"
                        />
                    ))}
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={mainImage} alt="imagen principal" />
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
                        {['XS','S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
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
                {/*<p className="productsiplay-right-category"><span>Category: </span> Women, T-shirt, Crop Top </p>*/}
                {/*<p className="productsiplay-right-category"><span>Tags: </span> Modern, Latest</p>*/}

            </div>
        </div>
    )
}

export default ProductDisplay