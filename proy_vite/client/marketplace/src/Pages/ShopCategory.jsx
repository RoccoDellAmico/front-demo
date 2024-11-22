import React, { useContext , useState , useEffect } from 'react'
import './CSS/ShopCategory.css'
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../components/Item/Item'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice';
import SuggestionButton from '../components/SuggestionButton/SuggestionButton';


const ShopCategory =(props) => {

    const dispatch = useDispatch();
    const { products } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch]);


    return (
        <div className='shop-category'>
            <img className='shopcategory-banner' src={props.banner} alt="" />
            <div className="shopcategory-indexSort">
                <p>
                    <span>Showing 1-12</span> out of 36 products
                </p>
                <div className="shopcategory-sort">
                    Sort by <img src={dropdown_icon} alt="" />
                </div>
            </div>
            <div className="shopcategory-products">
                {products.map((item,i)=>{
                    if (props.category === item.category) {
                        return <Item key={item.id} id={item.id} description={item.description} photos={item.photos[0]} price={item.price} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div>
                <SuggestionButton/>
            </div>
            <div className="shopcategory-loadmore">
                Explore more
            </div>
        </div>
    )
}

export default ShopCategory