import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../redux/ProductSlice';
import FilterRedux from '../components/Filter/FilterRedux';
import Filter from '../components/Filter/Filter';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div>
            <FilterRedux />
            {/*<Filter />*/}
            {/*<Popular/>*/}
        </div>
    );
};

export default Home;