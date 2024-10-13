import React, { useContext } from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../assets/dropdown_icon.png';
import Item from '../components/Item/Item'

const ShopCategory =(props) => {

    const {all_product} = useContext(ShopContext);

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
                {all_product.map((item,i)=>{
                    if (props.category === item.category) {
                        return <Item key={item._id} _id={item._id} title={item.title} img={item.image} price={item.price} />
                    }
                    else{
                        return null;
                    }
                })}
            </div>
            <div className="shopcategory-loadmore">
                Explore more
            </div>
        </div>
    )
}

export default ShopCategory