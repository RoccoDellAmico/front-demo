import React, { useContext } from 'react'
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from '../../Context/ShopContext';


const RelatedProducts = (props) => {

    const {all_product} = useContext(ShopContext);
    const {product} = props;

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr/>
            <div className="relatedproducts-item">
                {all_product.filter((element) => element.category === product.category && element._id !== product._id ).slice(0,4)
                    .map( (item,i) => {
                        return <Item key={i} _id={item._id} title={item.title} img={item.image} price={item.price}  />
                } )}
            </div>
        </div>
    )
}

export default RelatedProducts;