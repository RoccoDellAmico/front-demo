import React, { useContext, useEffect, useState } from "react";
import star_icon from '../../assets/star_icon.png';
import star_icon_dull from '../../assets/star_dull_icon.png';
import ShopCategory from "../../Pages/ShopCategory";
import './ProductDisplay.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../redux/CartSlice";

const ProductDisplay = (props) => {

    const dispatch = useDispatch();
    const { isAuthenticated, token } = useSelector((state) => state.auth);
    const { cartId } = useSelector((state) => state.cart);
    const {product} = props;

    const [selectedSize, setSelectedSize] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [mainImage, setMainImage] = useState(product.photos[0]);
    const navigate = useNavigate();

    useEffect(() => {
        setMainImage(product.photos[0]);
    }, [product]);

    const handleSizeSelect = (size) => {
        setSelectedSize(size);
    };

    const handleAddToCart = async (productId) => {
        if(!isAuthenticated){
            navigate('/logIn')
            return;
        }
        if (selectedSize) {
            try {
                const rta = await dispatch(addProductToCart({ size: selectedSize, productId, quantity: 1, token })).unwrap();
                if (rta) {
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 1500);
                }
            } catch (error) {
                console.error("Error adding product to cart:", error);
            }
        } else {
            setErrorMessage("Please select a size");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 2000);
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
                                style={{ pointerEvents: product.productStock[size] > 0 ? 'auto' : 'none', opacity: product.productStock[size] > 0 ? 1 : 0.3 }}
                            >
                                {size}
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={() => handleAddToCart(product.id)}>ADD TO CART</button>
                {showError && <p className="error-message">{errorMessage}</p>}
                {showPopup && (
                    <div className="popup">
                        <p>Product added to cart</p>
                        <span className="checkmark">✔</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductDisplay