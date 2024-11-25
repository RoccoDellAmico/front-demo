import React from "react";
import { useState , useEffect } from "react"
import './ProductPanel.css'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAdmin, deleteProduct, createProduct, updateProduct } from "../../redux/ProductSlice"

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'];

const ProductPanel = ()=>{

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { adminProducts } = useSelector((state) => state.product);

    /*const [newProduct, setNewProduct] = useState({
        description: '',
        price: 0,
        productStock: [], // Cambia a un objeto
        club: '',
        league: '',
        photos: [],
        clientCategory: '',
        typeOfProduct: '',
        year: 0
    });*/

    const [newProduct, setNewProduct] = useState({
        description: '',
        price: 0,
        productStock: SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}),
        club: '',
        league: '',
        photos: [],
        clientCategory: '',
        typeOfProduct: '',
        year: 0
    })


    const[editingProduct, setEditingProduct] = useState(null);
    //const[newSize, setNewSize] = useState({size : '', stock : 0});
    const [stockUpdate, setStockUpdate] = useState({ size : SIZES[0], quantity : 0 });
    const[newPhoto, setNewPhoto] = useState('');
    //const [shouldFetchProducts, setShouldFetchProducts] = useState(true);

    // SE QUEDA PERO HAY QUE MODIFICARLO
    /*useEffect (() => {
        if (shouldFetchProducts) {
            dispatch(fetchProductsAdmin({ token }));
            setShouldFetchProducts(false);
        }
    }, [ dispatch, token, shouldFetchProducts ]);*/

    useEffect(() => {
        dispatch(fetchProductsAdmin({ token }));
    }, [dispatch]);

    // SE QUEDA PERO HAY QUE MODIFICARLO
    /*const handleAddProduct = async (e) => {
        e.preventDefault()
        
        let prod = {...newProduct, productStock : convertProductStockArrayToObject(newProduct.productStock)}
        dispatch(createProduct({ newProduct: prod, token }));

        setNewProduct({
            description: '',
            price: 0,
            productStock: [], // Cambia a un objeto
            league: '',
            club: '',
            photos: [],
            clientCategory: '',
            typeOfProduct: '',
            year: 0
        });

        setShouldFetchProducts(true);
    }*/

    const handleAddProduct = async (e) => {
        e.preventDefault()
        dispatch(createProduct({ newProduct, token }));
        resetForm();
    }

    // SE QUEDA PERO HAY QUE MODIFICARLO
    /*const handleUpdateProduct = async (e) => {
        e.preventDefault()

        if (editingProduct) {
            let prod = {...editingProduct, productStock : convertProductStockArrayToObject(editingProduct.productStock)}
            dispatch(updateProduct({ product: prod, token }));
            
            setEditingProduct(null)
            setShouldFetchProducts(true);
        }
    }*/

    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        if (editingProduct) {
            dispatch(updateProduct({ product: editingProduct, token }));
            resetForm();
        }
    }

    // SE QUEDA PERO HAY QUE MODIFICARLO
    const startEditing = (product) => {
        setEditingProduct(product);
    }

    // SE QUEDA PERO HAY QUE MODIFICARLO
    const handleDeleteProduct = async (id) => {
        dispatch(deleteProduct({ id, token }));
    }

    /*
    const addSize = () => {
        if (newSize.size === '') return; // Asegúrate de que haya un tamaño seleccionado
        const sizeKey = newSize.size;
        const sizeValue = newSize.stock;
    
        if (editingProduct) {
            const updatedProductStock = [...editingProduct.productStock];
            const existingSizeIndex = updatedProductStock.findIndex(stock => stock.size === sizeKey);
    
            if (existingSizeIndex >= 0) {
                // Actualiza el stock si el tamaño ya existe
                updatedProductStock[existingSizeIndex].stock = sizeValue;
            } else {
                // Agrega un nuevo par size: stock si no existe
                updatedProductStock.push({ size: sizeKey, stock: sizeValue });
            }
    
            setEditingProduct({ ...editingProduct, productStock: updatedProductStock });
        } else {
            const updatedProductStock = [...newProduct.productStock];
            const existingSizeIndex = updatedProductStock.findIndex(stock => stock.size === sizeKey);
    
            if (existingSizeIndex >= 0) {
                // Actualiza el stock si el tamaño ya existe
                updatedProductStock[existingSizeIndex].stock = sizeValue;
            } else {
                // Agrega un nuevo par size: stock si no existe
                updatedProductStock.push({ size: sizeKey, stock: sizeValue });
            }
    
            setNewProduct({ ...newProduct, productStock: updatedProductStock });
        }
        // Reinicia el campo de nuevo tamaño y stock
        setNewSize({ size: '', stock: 0 });
    };*/

    //SE QUEDA
    const addPhoto = () => {
        console.log("foto added", newPhoto);
        if(editingProduct){
            setEditingProduct({
                ...editingProduct, 
                photos : [...editingProduct.photos, newPhoto]
            })
        } else {
            setNewProduct({
                ...newProduct,
                photos : [...newProduct.photos, newPhoto]
            })
        }
        setNewPhoto('')
    }
    /*
    const removeSize = (sizeToRemove) => {
        if (editingProduct) {
            // Filtra los tamaños para eliminar el que coincide con sizeToRemove
            const updatedStock = editingProduct.productStock.filter((stock) => stock.size !== sizeToRemove);
            setEditingProduct({
                ...editingProduct,
                productStock: updatedStock // Actualiza el productStock sin el tamaño eliminado
            });
        } else {
            // Filtra los tamaños para eliminar el que coincide con sizeToRemove
            const updatedStock = newProduct.productStock.filter((stock) => stock.size !== sizeToRemove);
            setNewProduct({
                ...newProduct,
                productStock: updatedStock // Actualiza el productStock sin el tamaño eliminado
            });
        }
    };*/

    //SE QUEDA
    const removePhoto = (index) => {
        if(editingProduct){
            setEditingProduct({
                ...editingProduct,
                photos : editingProduct.photos.filter((_, i) => i !== index)
            })
        } else {
            setNewProduct({
                ...newProduct,
                photos : newProduct.photos.filter((_, i) => i !== index)
            })
        }
    }

    const ensureSizeDefined = (sizes, size) => {
        if (sizes[size] === undefined) {
            sizes[size] = 0;
        }
    };

    const addStock = () => {
        if(!editingProduct) return;
        const updatedSizes = {...editingProduct.productStock}
        ensureSizeDefined(updatedSizes, stockUpdate.size);
        updatedSizes[stockUpdate.size] += stockUpdate.quantity;
        setEditingProduct({ ...editingProduct, productStock: updatedSizes })
        setStockUpdate({ size : SIZES[0], quantity : 0 });
    }

    const substractStock = () => {
        if(!editingProduct) return;
        const updatedSizes = {...editingProduct.productStock}
        ensureSizeDefined(updatedSizes, stockUpdate.size);
        if(updatedSizes[stockUpdate.size] < stockUpdate.quantity) return;
        updatedSizes[stockUpdate.size] -= stockUpdate.quantity;
        setEditingProduct({ ...editingProduct, productStock: updatedSizes })
        setStockUpdate({ size : SIZES[0], quantity : 0 });
    }

    const resetForm = () => {
        setNewProduct({
            description: '',
            price: 0,
            productStock: SIZES.reduce((acc, size) => ({ ...acc, [size]: 0 }), {}),
            club: '',
            league: '',
            photos: [],
            clientCategory: '',
            typeOfProduct: '',
            year: 0
        });
        setEditingProduct(null);
        setStockUpdate({ size : SIZES[0], quantity : 0 })
    }

    const handleProductStockChange = (size, stock) => {
        setEditingProduct({...editingProduct, 
            productStock : { ...editingProduct.productStock, [size]: parseInt(stock) }})
    }

    /*
    const convertProductStockArrayToObject = (productStockArray) => {
        return productStockArray.reduce((acc, item) => {
            acc[item.size] = item.stock;
            return acc;
        }, {});
    };*/

    return(
        <>
            <div className="product-panel">

                <h1>Football Kits admin panel</h1>
                <h2>{editingProduct ? 'Edit product' : 'Add product'}</h2>
                <form onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}>
                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" 
                            value={editingProduct ? editingProduct.description : newProduct.description}
                            onChange={(e) => editingProduct ? 
                                setEditingProduct({ ...editingProduct, description: e.target.value }) 
                                : setNewProduct({ ...newProduct, description: e.target.value })}        
                        required></textarea>
                    </div>
                    <div className="price">
                        <label htmlFor="price">Price</label>
                        <input type="number" step='0.1' 
                            value={editingProduct ? editingProduct.price : newProduct.price}
                            onChange={(e) => editingProduct ? 
                                setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) }) 
                                : setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}        
                        required/>
                    </div>
                    <div>
                        {/*
                        <div className="size-stock">

                            <label>productStock and Stock</label>
                            <select value={newSize.size} onChange={(e)=>setNewSize({...newSize, size : e.target.value})}>
                                <option value="">Size</option>
                                <option value="XS">XS</option>
                                <option value="S">S</option>
                                <option value="M">M</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                                <option value="XXL">XXL</option>
                                <option value="XXXL">XXXL</option>
                            </select>
                            <input type="number" step="1" placeholder="Stock"  min='0'
                                value={newSize.stock}
                                onChange={(e) => setNewSize({ ...newSize, stock: parseInt(e.target.value) })}
                            />
                            <button type="button" onClick={addSize}>+</button>
                            {(Array.isArray(editingProduct ? editingProduct.productStock : newProduct.productStock) ? 
                                (editingProduct ? editingProduct.productStock : newProduct.productStock) : []).map((size, index) => (
                                    <div key={index} className="size-item">
                                        <span>{size.size}: {size.stock}</span>
                                        <button type="button" onClick={() => removeSize(index)} className="remove-size">x</button>
                                    </div>
                            ))}
                        </div>*/}
                        {editingProduct ? 
                        (
                            <div className="size-stock">
                                {SIZES.map(size => (
                                    <div key={size}>
                                        <label htmlFor="">{size}</label>
                                        <p>{`Stock: ${editingProduct.productStock[size]}`}</p>
                                    </div>
                                ))}
                                <label htmlFor="">Select Size</label>
                                <select 
                                    value={stockUpdate.size}
                                    onChange={(e) => setStockUpdate({ ...stockUpdate, size: e.target.value })}
                                >
                                    {SIZES.map(size => (
                                        <option key={size} value={size}>{size}</option>
                                    ))}
                                </select>
                                <input 
                                    type="number"
                                    value={stockUpdate.quantity}
                                    onChange={(e) => setStockUpdate({ ...stockUpdate, quantity: parseInt(e.target.value) || 0})} 
                                />
                                <button type="button" onClick={addStock}>Add Stock</button>
                                <button type="button" onClick={substractStock}>Substract Stock</button>
                            </div>
                        ) : 
                        
                        (
                            <div className="size-stock">
                                {SIZES.map(size => (
                                    <div key={size}>
                                        <label htmlFor="">{size}</label>
                                        <input 
                                            type="number"
                                            value={newProduct.productStock[size]}
                                            onChange={(e) => handleProductStockChange(size, e.target.value)}
                                            min='0'
                                            step='1'
                                        />
                                    </div>
                                ))}
                            </div>
                        )
                        }

                        <div className="club">
                            <label>Club</label>
                            <input type="text" 
                                value={editingProduct ? editingProduct.club : newProduct.club}
                                onChange={(e) => editingProduct ?
                                    setEditingProduct({...editingProduct, club : e.target.value})
                                    : setNewProduct({...newProduct, club : e.target.value})
                                }
                            required/>
                        </div>
                        <div className="league">
                            <label>League</label>
                            <input type="text" 
                                value={editingProduct ? editingProduct.league : newProduct.league}
                                onChange={(e) => editingProduct ?
                                    setEditingProduct({...editingProduct, league : e.target.value})
                                    : setNewProduct({...newProduct, league : e.target.value})
                                }
                            required/>
                        </div>


                        <div  className="photo">
                            <label>Photos</label>
                            <input type="text" placeholder="Link" 
                            value={newPhoto}
                            onChange={(e) => setNewPhoto(e.target.value)}
                            />
                            <button type="button" onClick={addPhoto}>+</button>
                            {(editingProduct ? editingProduct.photos : newProduct.photos).map((photo, index)=>(
                                <div key={index} className="photo-item">
                                    <img src={photo} alt="photo" style={{ width: '100px', height: '100px' }}/>
                                    <button type="button" onClick={()=>removePhoto(index)}>x</button>
                                </div>
                            ))}
                        </div>

                        <div className="category">
                            <label>Client category</label>
                            <select value={editingProduct ? editingProduct.clientCategory : newProduct.clientCategory}
                            onChange={(e) => editingProduct ?
                                setEditingProduct({...editingProduct, clientCategory : e.target.value})
                                : setNewProduct({...newProduct, clientCategory : e.target.value})
                            }>
                                <option value="">Category</option>
                                <option value="MEN">MEN</option>
                                <option value="WOMEN">WOMEN</option>
                                <option value="KIDS">KIDS</option>
                            </select>
                        </div>
                        <div className="type">
                            <label>Type of product</label>
                            <select value={editingProduct ? editingProduct.typeOfProduct : newProduct.typeOfProduct}
                            onChange={(e) => editingProduct ? 
                                setEditingProduct({...editingProduct, typeOfProduct : e.target.value})
                                : setNewProduct({...newProduct, typeOfProduct : e.target.value})}>
                                <option value="">Type</option>
                                <option value="HOME">HOME</option>
                                <option value="AWAY">AWAY</option>
                                <option value="THIRD">THIRD</option>
                                <option value="GOALKEEPER">GOALKEEPER</option>
                            </select>
                        </div>
                        <div className="year">
                            <label>Year</label>
                            <input type="number" step='1' 
                                value={editingProduct ? editingProduct.year : newProduct.year}
                                onChange={(e) => editingProduct ? 
                                    setEditingProduct({...editingProduct, year : parseInt(e.target.value)})
                                    : setNewProduct({...newProduct, year : parseInt(e.target.value)})
                                }
                            required/>
                        </div>
                    </div>
                    <button type="submit" className= "btn btn-outline-primary btn-sm">{editingProduct ? 'Update product' : 'Add product'}</button>
                    {editingProduct && <button type="button" onClick={resetForm}>Cancel</button>}
                </form>
                <div className="product-list">
                    <h2>Product List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Club</th>
                                <th>League</th>
                                <th>Photos</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Year</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {adminProducts.map((product, index)=>(
                                <>
                                <tr key={index}>
                                    <td>{product.description}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>
                                        {/*product.productStock.map((stock, index)=>(
                                            <div key={index}>
                                                <span>{stock.size}: {stock.stock}</span>
                                            </div>
                                        ))*/}
                                        {SIZES.map(size => (
                                            <div key={size}>
                                                <span>{size}: {product.productStock[size]}</span>
                                            </div>
                                        ))}
                                    </td>
                                    <td>{product.club}</td>
                                    <td>{product.league}</td>
                                    <td>
                                        {product.photos.map((photo, index)=>(
                                            <div key={index}>
                                                <img src={photo} alt="photo" style={{ width: '100px', height: '100px' }}/>
                                            </div>
                                        ))}
                                    </td>
                                    <td>{product.clientCategory}</td>
                                    <td>{product.typeOfProduct}</td>
                                    <td>{product.year}</td>
                                    <td>
                                        <button onClick={() => { startEditing(product); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Edit</button>
                                        <button onClick={()=>handleDeleteProduct(product.id)}>Delete</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="10"><hr /></td>
                                </tr></>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default ProductPanel