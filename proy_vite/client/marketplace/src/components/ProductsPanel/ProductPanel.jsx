import React from "react";
import { useState } from "react"

const ProductPanel = ()=>{
    const[products, setProducts] = useState([]);
    const[newProduct, setNewProduct] = useState({
        description : '', 
        price : 0, 
        sizes : [], 
        club : '', 
        league : '', 
        photos : [],
        clientCategory : '', 
        typeOfProduct : '',
        year : 0
    });
    const[editingProduct, setEditingProduct] = useState(null);
    const[newSize, setNewSize] = useState({size : '', stock : 0});
    const[newPhoto, setNewPhoto] = useState('');

    const addProduct = (e) => {
        e.preventDefault()
        setProducts([...products, {...newProduct, id : Date.now()}])
        setNewProduct({
            description : '', 
            price : 0, 
            sizes : [], 
            club : '', 
            league : '', 
            photos : [],
            clientCategory : '', 
            typeOfProduct : '',
            year : 0
        });
    }

    const updateProduct = (e) => {
        e.preventDefault()
        if (editingProduct) {
            setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)))
            setEditingProduct(null)
        }
    }

    const startEditing = (product) => {
        setEditingProduct(product);
    }

    const deleteProduct = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    }

    const addSize = () => {
        if(newSize.size === '')
            return
        if (editingProduct) {
          setEditingProduct({
            ...editingProduct,
            sizes: [...editingProduct.sizes, newSize]
          })
        } else {
          setNewProduct({
            ...newProduct,
            sizes: [...newProduct.sizes, newSize]
          })
        }
        setNewSize({ size: "", stock: 0 })
      }

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
    
      const removeSize = (index) => {
        if (editingProduct) {
          setEditingProduct({
            ...editingProduct,
            sizes: editingProduct.sizes.filter((_, i) => i !== index)
          })
        } else {
          setNewProduct({
            ...newProduct,
            sizes: newProduct.sizes.filter((_, i) => i !== index)
          })
        }
      }

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

    return(
        <>
            <h1>Football Kits admin panel</h1>
            <h2>{editingProduct ? 'Edit product' : 'Add product'}</h2>
            <form onSubmit={editingProduct ? updateProduct : addProduct}>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" 
                        value={editingProduct ? editingProduct.description : newProduct.description}
                        onChange={(e) => editingProduct ? 
                            setEditingProduct({ ...editingProduct, description: e.target.value }) 
                            : setNewProduct({ ...newProduct, description: e.target.value })}        
                    required></textarea>
                </div>
                <div>
                    <label htmlFor="price">Price</label>
                    <input type="number" step='0.1' 
                        value={editingProduct ? editingProduct.price : newProduct.price}
                        onChange={(e) => editingProduct ? 
                            setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) }) 
                            : setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}        
                    required/>
                </div>
                <div>
                    <label>Sizes and Stock</label>
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
                    {(editingProduct ? editingProduct.sizes : newProduct.sizes).map((size, index) => (
                        <div key={index} className="size-item">
                            <span>{size.size}: {size.stock}</span>
                            <button type="button" onClick={() => removeSize(index)} className="remove-size">x</button>
                        </div>
                    ))}
                    <div>
                        <label>Club</label>
                        <input type="text" 
                            value={editingProduct ? editingProduct.club : newProduct.club}
                            onChange={(e) => editingProduct ?
                                setEditingProduct({...editingProduct, club : e.target.value})
                                : setNewProduct({...newProduct, club : e.target.value})
                            }
                        required/>
                    </div>
                    <div>
                        <label>League</label>
                        <input type="text" 
                            value={editingProduct ? editingProduct.league : newProduct.league}
                            onChange={(e) => editingProduct ?
                                setEditingProduct({...editingProduct, league : e.target.value})
                                : setNewProduct({...newProduct, league : e.target.value})
                            }
                        required/>
                    </div>
                    <div>
                        <label>Photos</label>
                        <input type="text" placeholder="Link" 
                        value={newPhoto}
                        onChange={(e) => setNewPhoto(e.target.value)}
                        />
                        <button type="button" onClick={addPhoto}>+</button>
                        {(editingProduct ? editingProduct.photos : newProduct.photos).map((photo, index)=>(
                            <div key={index}>
                                <img src={photo} alt="photo" style={{ width: '100px', height: '100px' }}/>
                                <button type="button" onClick={()=>removePhoto(index)}>x</button>
                            </div>
                        ))}
                    </div>
                    <div>
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
                    <div>
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
                    <div>
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
                <button type="submit">{editingProduct ? 'Update product' : 'Add product'}</button>
            </form>
            <div className="product-list">
                <h2>Product List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Sizes and Stock</th>
                            <th>Club</th>
                            <th>League</th>
                            <th>Photos</th>
                            <th>Client category</th>
                            <th>Type of product</th>
                            <th>Year</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(
                            <tr>
                                <td>{product.description}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>
                                    {product.sizes.map((size, index)=>(
                                        <div key={index}>{size.size} : {size.stock}</div>
                                    ))}
                                </td>
                                <td>{product.club}</td>
                                <td>{product.league}</td>
                                <td>
                                    {product.photos.map((photo, index)=>(
                                        <div key={index}>
                                            <a href={photo} target="_blank">{photo}</a>
                                        </div>
                                    ))}
                                </td>
                                <td>{product.clientCategory}</td>
                                <td>{product.typeOfProduct}</td>
                                <td>{product.year}</td>
                                <td>
                                    <button onClick={()=>startEditing(product)}>Edit</button>
                                    <button onClick={()=>deleteProduct(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductPanel