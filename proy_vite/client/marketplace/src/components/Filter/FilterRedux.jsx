import { useState, useEffect } from 'react';
import './Filter.css';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter, clearFilters } from '../../redux/ProductSlice';
import { Link } from 'react-router-dom';

const FilterRedux = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.product.products);
    const filteredProducts = useSelector(state => state.product.filteredProducts);
    const [priceRange, setPriceRange] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(setFilter({ searchTerm: "", priceRange: 0 }));
    }, [dispatch]);

    const handleClearFilters = () => {
        setPriceRange(0);
        setSearchTerm("");
        dispatch(clearFilters());
    };

    const handleApplyFilters = () => {
        dispatch(setFilter({ searchTerm, priceRange }));
        setSearchTerm("");
    };

    console.log('Products:', products);
    console.log('Filtered Products:', filteredProducts);

    return (
        <div className="filter-container">
            <div className="filters">
                <div>
                    <h3>Look for a kit</h3>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                        placeholder="Club or country" 
                    />
                </div>
                <div>
                    <h3>Price</h3>
                    <input 
                        type="range" 
                        min="0" 
                        max="300000" 
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)} 
                    />
                    <span>${priceRange}</span>
                </div>
                <button onClick={handleApplyFilters}>Search</button>
                <button onClick={handleClearFilters}>Clear</button>
            </div>
            <div className="filtered-products">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-item">
                        <Link to={`/product/${product.id}`}>
                            <img 
                                src={product.photos[0]} 
                                alt={product.description} 
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                            />
                        </Link>
                        <p>{product.description}</p>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FilterRedux;