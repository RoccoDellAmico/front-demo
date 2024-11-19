import React , { useContext , useState , useEffect } from "react";
import './CartItems.css';
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from '../../assets/close.svg'
import { Link } from 'react-router-dom'
import update_icon from '../../assets/update.svg'
import arrow_down from '../../assets/arrow_down.svg'
import arrow_up from '../../assets/arrow_up.svg'
import { useDispatch, useSelector } from "react-redux";
import { getCartById , addOneProductToCart , substractOneProduct } from "../../redux/CartSlice";

const CartItems = () => {
    const {addDiscountCode,updateProductQuantity,clearCart,cart,removeFromCart,getTotalCartAmount,setLoading, getCartByID} = useContext(ShopContext);

    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [carts,setCarts] = useState([]);
    const [newQuantity, setNewQuantity] = useState(0);
    const [promo,setPromo] = useState('');
    const dispatch = useDispatch();
    const { cartItems, discountCode} = useSelector((state) => state.cart);
    const { id, token } = useSelector((state) => state.auth); 

    /*useEffect(() => {
        const fetchCart = async () => {
            const carrito = await CartService.getCartById(localStorage.getItem('userId'));
            console.log('BOCA ',carrito.cartProducts);
            setCarts(carrito.cartProducts);
        }
        fetchCart();
    },[cart])*/

    useEffect(() => {
        dispatch(getCartById({id, token})).unwrap();
    }, [dispatch, id, token])
        

    /*useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductService.getAllProducts();
                setProducts(response.data);
                console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        const fetchTotalAmount = async () => {
            const amount = await getTotalCartAmount();
            console.log('TOTAL AMOUNT',amount);
            setTotalAmount(amount);
        };

        fetchProducts();
        fetchTotalAmount();
    }, [getTotalCartAmount]);

    useEffect(() => {
        const fetchCart = async () => {
            const carrito = await CartService.getCartById(localStorage.getItem('userId'));
            console.log('BOCA ',carrito.cartProducts);
            setCarts(carrito.cartProducts);
        }

        const fetchTotalAmount = async () => {
            const amount = await getTotalCartAmount();
            console.log('TOTAL AMOUNT',amount);
            setTotalAmount(amount);
        };

        fetchTotalAmount();
        fetchCart();
    },[])*/

    const handleAddDiscountCode = () => {
        addDiscountCode(promo);
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
                <p>Update</p>
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
                                <img className="arrow_down" src={arrow_down} onClick={() => { dispatch(substractOneProduct({ size: e.size, productId: e.id, token })) }} alt="" />
                                <input className="cantidad" type="number" step="1" min='0' defaultValue={e.quantity} onChange={(e) => setNewQuantity(Number(e.target.value))} />
                                <img className="arrow_up" src={arrow_up} onClick={() => { dispatch(addOneProductToCart({ size: e.size, productId: e.id, token })) }} alt="" />

                            </div>
                            <p> ${ e.product.price * e.quantity } </p>
                            <img className="cartitems-update-icon" src={update_icon} onClick={ () => {updateProductQuantity(e.id, newQuantity)} } alt="" />
                            <img className="cartitems-remove-icon" src={remove_icon} onClick={ () => {removeFromCart(e.id)} } alt="" />
                        </div>
                        <hr />
                    </div>
                )
            })}

            <div className="botones">
                <button onClick={clearCart}>Clear Cart</button>
            </div>

            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>cart Totals</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Subtotal</p>
                            <p> ${totalAmount} </p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Total</h3>
                            <h3> ${totalAmount} </h3>
                        </div>
                    </div>
                    <Link to='/checkout'> <button>PROCEED TO CHECKOUT</button> </Link>
                    {/*<Link to='/payment'> <button>PROCEED TO CHECKOUT</button> </Link>*/}
                </div>
                <div className="cartitems-promocode">
                    <p>If you have a promo code, Enter it here</p>
                    <div className="cartitems-promobox">
                        <input type="text" placeholder="promo code" value={promo} onChange={(e) => setPromo(e.target.value)}/>
                        <button onClick={handleAddDiscountCode} >Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems