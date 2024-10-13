import React, { useContext } from 'react'
import './Popular.css';
import Item from '../Item/Item';
import { useState, useEffect } from 'react';
import { ShopContext } from '../../Context/ShopContext';

const Popular = () => {

    const {all_product} = useContext(ShopContext);

    return (
        <div className="popular">
            <h1>POPULAR IN WOMEN</h1>
            <hr/>
            <div className="popular-item">
                {all_product.filter((element) => element.category == 'women').slice(0,4).map((post) => {
                    return <Item key={post._id} _id={post._id} title={post.title} img={post.image} price={post.price} />
                })}
            </div>
            <h1>POPULAR IN MEN</h1>
            <hr/>
            <div className="popular-item">
                {all_product.filter((element) => element.category == 'men').slice(0,4).map((post) => {
                    return <Item key={post._id} _id={post._id} title={post.title} img={post.image} price={post.price} />
                })}
            </div>
        </div>
    )
}

export default Popular;