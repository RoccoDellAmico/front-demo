import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice';
import Filter from '../components/Filter/Filter';
import banner_home from '../assets/BANNER-HOME.png';
import './CSS/Home.css';
import SuggestionButton from '../components/SuggestionButton/SuggestionButton';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <img className='banner' src={banner_home} alt="" />
            <Filter />
            <SuggestionButton />
        </div>
    );
};

export default Home;