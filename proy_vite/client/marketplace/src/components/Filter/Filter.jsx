import { useState, useContext, useEffect } from 'react';
import './Filter.css';
import { ShopContext } from "../../Context/ShopContext";
import Item from '../Item/Item';

const Filter = (props) => {
    const { products } = useContext(ShopContext);
    const [priceRange, setPriceRange] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProductsState] = useState(products);

    useEffect(() => {
        setFilteredProductsState(products);
    }, [products]);

    const clearFilters = () => {
        setPriceRange(0);
        setSearchTerm("");
        setFilteredProductsState(products);
    };

    const applyFilters = () => {
        if (searchTerm.trim() === "" && priceRange === 0) {
            setFilteredProductsState(products);
            return;
        }

        const filtered = products.filter(product => {
            const matchesDescription = searchTerm.trim() === "" || product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = priceRange === 0 || product.price <= priceRange;
            return matchesDescription && matchesPrice;
        });
        setFilteredProductsState(filtered);
    };

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
                    <input type="range" min="0" max="300000" onChange={(e) => setPriceRange(e.target.value)} />
                    <span>${priceRange}</span>
                </div>
                <button onClick={applyFilters}>Search</button>
                <button onClick={clearFilters}>Clear</button>
            </div>
            <div className="filtered-products">
                {filteredProducts.map(product => (
                    <Item 
                        key={product.id} 
                        id={product.id} 
                        photos={product.photos[0]} 
                        description={product.description} 
                        price={product.price} 
                    />
                ))}
            </div>
        </div>
    );
};

export default Filter;