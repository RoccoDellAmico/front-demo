import React, { useContext , useState , useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import ProductService from '../services/ProductService';

const Product =() => {

    const {products} = useContext(ShopContext);

    const { productId } = useParams();
    const product = products.find((e) => e.id === Number(productId));

    if(!product){
        return  <p>Loading product...</p>; 
    }

    return (
        <div>
            <Breadcrums product={product} />
            <ProductDisplay product={product} />
            <DescriptionBox/>
            <RelatedProducts product={product} />
        </div>
    )
} 

export default Product