import React, { useContext } from 'react'
import './Popular.css';
import Item from '../Item/Item';
import { useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import ProductService from '../../services/ProductService';

const Popular = () => {

    const {products} = useContext(ShopContext);

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {products.filter((element) => element.category == 'WOMEN').slice(0,4).map((post) => {
                    return <Item key={post.id} id={post.id} description={post.description} photos={post.photos[0]} price={post.price} />
                })}
            </div>
            <h1>POPULAR IN MEN</h1>
            <hr/>

            <div className="popular-item">
                {products.filter((element) => element.category == 'MEN').slice(0,4).map((post) => {
                    return <Item key={post.id} id={post.id} description={post.description} photos={post.photos[0]} price={post.price} />
                })}
            </div>
        </div>
    )
}

export default Popular;