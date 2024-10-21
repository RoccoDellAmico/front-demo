import React , { useContext , useState , useEffect } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../../assets/close.svg'
import { Link } from 'react-router-dom'
import ProductService from "../../services/ProductService";

const CartItems = () => {
    const {getTotalCartAmount,all_product,cartItems,removeFromCart} = useContext(ShopContext);

    const [products, setProducts] = useState([]);

    useEffect( () => {
        ProductService.getAllProducts().then(response => {
            setProducts(response.data);
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    },[])

    const handleQuantityChange = (productId, size, newQuantity) => {
        if (newQuantity >= 0) {
            updateProductQuantity(cartId, productId, size, newQuantity);
        }
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {products.map( (e) => {
                if(cartItems[e.id] > 0) {
                    return (
                        <div key={e.id}>
                            <div className="cartitems-format cartitems-format-main">
                                <img src={e.photos[0]} alt="" className="carticon-product-icon" />
                                <p>{e.description}</p>
                                <p>${e.price}</p>
                                {/*<button className="cartitems-quantity"> {cartItems[e.id]} </button>*/}
                                <input type="number" step="1" min='0' defaultValue={cartItems[e.id]} onChange={(e) => handleQuantityChange(e.id, selectedSize, e.target.value)} />
                                <p> ${ e.price * cartItems[e.id] } </p>
                                <img className="cartitems-remove-icon" src={remove_icon} onClick={ () => {removeFromCart(e.id)} } alt="" />
                            </div>
                            <hr />
                        </div>
                    )
                }
                return null;
            } )}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p> ${getTotalCartAmount().toFixed(2)} </p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3> ${getTotalCartAmount().toFixed(2)} </h3>
                        </div>
                    </div>
                    <Link to='/checkout'> <button>PROCEED TO CHECKOUT</button> </Link>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" />
                        <button>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems