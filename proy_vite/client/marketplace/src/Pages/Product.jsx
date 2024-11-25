import React, {useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrums from '../components/Breadcrums/Breadcrums';
import ProductDisplay from '../components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../components/RelatedProducts/RelatedProducts';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice';

const Product =() => {
    
    const dispatch = useDispatch();
    const { products } = useSelector(state => state.product);
    
    const { productId } = useParams();
    const product = products.find((e) => e.id === Number(productId));

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch])

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