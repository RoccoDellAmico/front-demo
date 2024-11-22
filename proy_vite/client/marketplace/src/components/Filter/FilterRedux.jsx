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
    const [league, setLeague] = useState("");
    const [typeOfProduct, setTypeOfProduct] = useState("");
    const [size, setSize] = useState("");

    useEffect(() => {
        dispatch(setFilter({ searchTerm: "", priceRange: 0, league: "", typeOfProduct: "", size: "" }));
    }, [dispatch]);

    const handleClearFilters = () => {
        setPriceRange(0);
        setSearchTerm("");
        setLeague("");
        setTypeOfProduct("");
        setSize("");
        dispatch(clearFilters());
    };

    const handleApplyFilters = () => {
        dispatch(setFilter({ searchTerm, priceRange, league, typeOfProduct, size }));
        setPriceRange(0);
        setSearchTerm("");
        setLeague("");
        setTypeOfProduct("");
        setSize("");
    };

    const handleTypeOfProductClick = (type) => {
        setTypeOfProduct(type);
    };

    const handleSizeClick = (selectedSize) => {
        setSize(selectedSize);
    };

    console.log('Products:', products);
    console.log('Filtered Products:', filteredProducts);

    return (
        <div className="filter-container">
            <div className="filters">
            <h2>Look for a kit</h2>
                <div>
                    <h3>Club or country</h3>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)} 
                    />
                </div>
                <div>
                    <h3>Price</h3>
                    <input 
                        className="no-spinner" 
                        type="number" 
                        min="0" 
                        max="300000" 
                        placeholder='Max Price'
                        value={priceRange} 
                        onChange={(e) => setPriceRange(e.target.value)} 
                    />
                    {/*<span>${priceRange}</span>*/}
                </div>
                <div>
                    <h3>League</h3>
                    <input type="text" 
                    value={league}
                    onChange={(e) => setLeague(e.target.value)}/>
                </div>
                <div>
                    <h3>Type of Product</h3>
                    {['HOME', 'AWAY', 'THIRD', 'GOALKEEPER'].map(typeOption => (
                        <button key={typeOption} onClick={() => handleTypeOfProductClick(typeOption)}>{typeOption}</button>
                    ))}
                </div>
                <div>
                    <h3>Size</h3>
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(sizeOption => (
                        <button key={sizeOption} onClick={() => handleSizeClick(sizeOption)}>{sizeOption}</button>
                    ))}
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