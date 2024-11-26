import React , { useContext , useState , useEffect } from "react";
import './CartItems.css';
import remove_icon from '../../assets/close.svg'
import arrow_down from '../../assets/arrow_down.svg'
import arrow_up from '../../assets/arrow_up.svg'
import { useDispatch, useSelector } from "react-redux";
import { getCartById, clearCart, removeProductFromCart } from "../../redux/CartSlice";
import { applyDiscountCode , addOneProductToCart , substractOneProduct, getTotal } from "../../redux/CartSlice";
import { useNavigate } from "react-router-dom";
const CartItems = () => {
    
    const [promo, setPromo] = useState('');
    const dispatch = useDispatch();
    const { cartItems, discountCode, total } = useSelector((state) => state.cart);
    const { id, token } = useSelector((state) => state.auth); 
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartById({id, token})).unwrap();
        dispatch(getTotal({token})).unwrap();
    }, [dispatch, discountCode])
    

    const handleProceedToCheckout = (e) => {
        if (cartItems.length === 0) {
            e.preventDefault();
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        } else {
            navigate('/checkout');
        }
    };

    const handleSubstractOneProduct = async (size, id) => {
        await dispatch(substractOneProduct({size, productId: id, token}));
        await dispatch(getTotal({token})).unwrap();
    }

    const handleAddOneProduct = async (size, id) => {
        await dispatch(addOneProductToCart({size, productId: id, token}));
        await dispatch(getTotal({token})).unwrap();
    }

    const handleRemoveFromCart = (id) => {
        dispatch(removeProductFromCart({productId: id, token}));
    }

    const handleClearCart = () => {
        dispatch(clearCart({token}));
    };

    const handleAddDiscountCode = () => {
        dispatch(applyDiscountCode({code: promo, token}));
    };

    return (
        <div className="cartitems">
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Size</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>

            {cartItems.map( (e) => {
                return (
                    <div key={e.id}>
                        <div className="cartitems-format cartitems-format-main">
                            <img src={e.product.photos[0]} alt="" className="carticon-product-icon" />
                            <p>{e.product.description}</p>
                            <p>${e.product.price}</p>
                            <p>{e.size}</p>
                            <div className="quantity">
                                <img className="arrow_down" src={arrow_down} onClick={() => { handleSubstractOneProduct(e.size, e.product.id) }} alt="" />
                                <p>{e.quantity}</p>
                                <img className="arrow_up" src={arrow_up} onClick={() => { handleAddOneProduct(e.size, e.product.id) }} alt="" />

                            </div>
                            <p> ${ e.product.price * e.quantity } </p>
                            <img className="cartitems-remove-icon" src={remove_icon} onClick={ () => {handleRemoveFromCart(e.id)} } alt="" />
                        </div>
                        <hr />
                    </div>
                )
            })}

            <div className="boton">
                <button onClick={handleClearCart}>CLEAR CART</button>
            </div>

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p> ${total} </p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3> ${total} </h3>
                        </div>
                    </div>
                    <div>
                    <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
                </div>
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" value={promo} onChange={(e) => setPromo(e.target.value)}/>
                        <button onClick={handleAddDiscountCode} >Apply discount</button>
                    </div>
                </div>
            {discountCode && (
                console.log('DISCOUNT CODE', discountCode)
            )}
                {showPopup && (
                    <div className="popup">
                        <p>You can't proceed with an empty cart</p>
                        <button onClick={() => setShowPopup(false)}>X</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartItems