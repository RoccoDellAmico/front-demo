import React, { useState } from "react"

const DiscountPanel = () => {
    const [discounts, setDiscounts] = useState([])
    const [newDiscount, setNewDiscount] = useState({
        code : '',
        description : '',
        percentage : 0,
        fixedAmount : 0,
        startDate : new Date().toISOString().split("T")[0],
        endDate : new Date().toISOString().split("T")[0]
    });
    const [editingDiscount, setEditingDiscount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const updateDiscount = (e) => {
        e.preventDefault()
        if(!validateDates(editingDiscount.startDate, editingDiscount.endDate)){
            setErrorMessage('The end date must be later than the start date.')
            return;
        }
        if(editingDiscount){
            setDiscounts(discounts.map((d) => (d.id === editingDiscount.id ? editingDiscount : d)))
            setEditingDiscount(null)
            setErrorMessage('')
        }
    }

    const addDiscount = (e) => {
        e.preventDefault()
        if(!validateDates(newDiscount.startDate, newDiscount.endDate)){
            setErrorMessage('The end date must be later than the start date.')
            return;
        }
        setDiscounts([...discounts, {...newDiscount, id : Date.now()}])
        setNewDiscount({
            code : '',
            description : '',
            percentage : 0,
            fixedAmount : 0,
            startDate : new Date().toISOString().split("T")[0],
            endDate : new Date().toISOString().split("T")[0]
        })
        setErrorMessage('')
    }

    const validateDates = (startDate, endDate) => {
        return endDate > startDate
    }

    const startEditing = (discount) => {
        setEditingDiscount(discount)
    }

    const deleteDiscount = (discountCode) => {
        setDiscounts(discounts.filter((discount) => discount.code !== discountCode))
    }

    return(
        <>
            <div className="discount-panel">
                <h1>Admin discount panel</h1>
                <h2>{editingDiscount ? "Edit discount" : "Create discount"}</h2>
                <form onSubmit={editingDiscount ? updateDiscount : addDiscount}>
                    <div>
                        <label>Discount Code</label>
                        <input type="text" placeholder="discount code"
                        value={editingDiscount ? editingDiscount.code : newDiscount.code}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, code : e.target.value})
                            : setNewDiscount({...newDiscount, code : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>Description</label>
                        <input type="text" placeholder="description"
                        value={editingDiscount ? editingDiscount.description : newDiscount.description}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, description : e.target.value})
                            : setNewDiscount({...newDiscount, description : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>Percentage (Add the discounted value. E.g. 30% discount you have to enter 30)</label>
                        <input type="number" min='0' max='100'
                        value={editingDiscount ? editingDiscount.percentage : newDiscount.percentage}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, percentage : e.target.value})
                            : setNewDiscount({...newDiscount, percentage : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>Fixed amount discounted</label>
                        <input type="number" min='0' step='1'
                        value={editingDiscount ? editingDiscount.fixedAmount : newDiscount.fixedAmount}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, fixedAmount : e.target.value})
                            : setNewDiscount({...newDiscount, fixedAmount : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>Start date</label>
                        <input type="date" 
                        value={editingDiscount ? editingDiscount.startDate : newDiscount.startDate}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, startDate : e.target.value})
                            : setNewDiscount({...newDiscount, startDate : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>End date</label>
                        <input type="date" 
                        value={editingDiscount ? editingDiscount.endDate : newDiscount.endDate}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, endDate : e.target.value})
                            : setNewDiscount({...newDiscount, endDate : e.target.value})
                        }
                        required/>
                    </div>
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <button type="submit">{editingDiscount ? "Update discount" : "Create discount"}</button>
                </form>
                <div className="discount-list">
                    <h2>Discount List</h2>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Description</th>
                            <th>Percentage</th>
                            <th>Fixed Amount</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {discounts.map((discount) => (
                            <tr>
                                <td>{discount.code}</td>
                                <td>{discount.description}</td>
                                <td>{discount.percentage}</td>
                                <td>{discount.fixedAmount}</td>
                                <td>{discount.startDate}</td>
                                <td>{discount.endDate}</td>
                                <td>
                                    <button onClick={() => startEditing(discount)}>Edit</button>
                                    <button onClick={() => deleteDiscount(discount.code)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </div>
            </div>
        </>
    )
}

export default DiscountPanel