import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice';
import FilterRedux from '../components/Filter/FilterRedux';
import banner_home from '../assets/BANNER-HOME.png';
import Filter from '../components/Filter/Filter';
import './CSS/Home.css';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <img className='banner' src={banner_home} alt="" />
            <FilterRedux />
            {/*<Filter />*/}
            {/*<Popular/>*/}
        </div>
    );
};

export default Home;