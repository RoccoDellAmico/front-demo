import React, { useContext , useState , useEffect } from 'react'
import "./RelatedProducts.css";
import Item from "../Item/Item";
import { ShopContext } from '../../Context/ShopContext';
import ProductService from '../../services/ProductService'


const RelatedProducts = (props) => {

    const {products} = useContext(ShopContext);


    const {product} = props;

    return (
        <div className="relatedproducts">
            <h1>Related Products</h1>
            <hr/>
            <div className="relatedproducts-item">
                {products.filter((element) => element.category === product.category && element.id !== product.id ).slice(0,4)
                    .map( (item,i) => {
                        return <Item key={i} id={item.id} description={item.description} photos={item.photos[0]} price={item.price}  />
                } )}
            </div>
        </div>
    )
}

export default RelatedProducts;