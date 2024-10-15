import React, { useContext } from "react";
import './ProductDisplay.css';
import star_icon from '../../assets/star_icon.png';
import star_icon_dull from '../../assets/star_dull_icon.png';
import ShopCategory from "../../Pages/ShopCategory";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {

    const {product} = props;
    const {addToCart} = useContext(ShopContext)
    /*const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = (productId) => {
        addToCart(product._id, () => {
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 3000); // 3 segundos
        });
    };*/

    return (
        <div className="productdisplay">
            <div className="productsiplay-left">
                <div className="productdisplay-img-list">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                </div>
                <div className="productdisplay-img">
                    <img className="productdisplay-main-img" src={product.image} alt="imagen" />
                </div>
            </div>
            <div className="productsiplay-right">
                <h1>{product.title}</h1>
                <div className="productdisplay-right-stars">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon_dull} alt="" />
                    <p>(122)</p>
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
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button onClick={ () => {addToCart(product._id)} } >ADD TO CART</button>
                {/*<button onClick={() => handleAddToCart(productId)}>ADD TO CART</button>
                {showPopup && (
                    <div className="popup">
                        <p>Producto añadido al carrito</p>
                        <span className="checkmark">✔</span>
                    </div>
                )}*/}
                <p className="productsiplay-right-category"><span>Category: </span> Women, T-shirt, Crop Top </p>
                <p className="productsiplay-right-category"><span>Tags: </span> Modern, Latest</p>

            </div>
        </div>
    )
}

export default ProductDisplay

