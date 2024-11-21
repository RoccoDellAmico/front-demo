import React, { useEffect, useState } from "react"
//import DiscountService from "../../services/DiscountService";
import { useSelector, useDispatch } from "react-redux";
import { getDiscounts, createDiscount, deleteDiscount, updateDiscount } from "../../redux/DiscountSlice";

const DiscountPanel = () => {

    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { discounts , error } = useSelector(state => state.discount);

    const [newDiscount, setNewDiscount] = useState({
        code : '',
        description : '',
        percentage : 0,
        fixedAmount : 0,
        startDate : new Date().toISOString(),
        endDate : new Date().toISOString()
    });

    const [editingDiscount, setEditingDiscount] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        dispatch(getDiscounts({ token }));
    }, [dispatch, token]);

    const handleUpdateDiscount = async (e) => {
        e.preventDefault()
        if(!validateDates(editingDiscount.startDate, editingDiscount.endDate)){
            setErrorMessage('The end date must be later than the start date.')
            return;
        }
        if(editingDiscount){
            try {
                await dispatch(updateDiscount({
                    id: editingDiscount.id,
                    code: editingDiscount.code,
                    description: editingDiscount.description,
                    percentage: editingDiscount.percentage,
                    fixedAmount: editingDiscount.fixedAmount,
                    startDate: formatToLocalDateTime(editingDiscount.startDate.split('T')[0]),
                    endDate: formatToLocalDateTime(editingDiscount.endDate.split('T')[0]),
                    token
                })).unwrap();
                setEditingDiscount(null);
                setErrorMessage('');
            } catch (error) {
                console.error('error updating discount ' + error)
            }
        }
    }

    /*const handleAddDiscount = async (e) => {
        e.preventDefault()
        if(!validateDates(newDiscount.startDate, newDiscount.endDate)){
            setErrorMessage('The end date must be later than the start date.')
            return;
        }
        try {
            await dispatch(createDiscount({
                code: newDiscount.code,
                description: newDiscount.description,
                percentage: newDiscount.percentage,
                fixedAmount: newDiscount.fixedAmount,
                startDate: newDiscount.startDate,
                endDate: newDiscount.endDate,
                token
            })).unwrap();
            
            setNewDiscount({
                code : '',
                description : '',
                percentage : 0,
                fixedAmount : 0,
                startDate : new Date().toISOString().split("T")[0],
                endDate : new Date().toISOString().split("T")[0]
            })
            setErrorMessage('')
        } catch (error) {
            console.error('error creating discount ' + error)
        }
    }*/


    const handleAddDiscount = async (e) => {
        e.preventDefault()
        if(!validateDates(newDiscount.startDate, newDiscount.endDate)){
            setErrorMessage('The end date must be later than the start date.')
            return;
        }
        dispatch(createDiscount({
            code: newDiscount.code,
            description: newDiscount.description,
            percentage: newDiscount.percentage,
            fixedAmount: newDiscount.fixedAmount,
            startDate: formatToLocalDateTime(newDiscount.startDate),
            endDate: formatToLocalDateTime(newDiscount.endDate),
            token,
         }));
         setNewDiscount({
            code : '',
            description : '',
            percentage : 0,
            fixedAmount : 0,
            startDate : new Date().toISOString(),
            endDate : new Date().toISOString()
        })
        setErrorMessage('')
    }

    const validateDates = (startDate, endDate) => {
        return endDate > startDate
    }

    const startEditing = (discount) => {
        setEditingDiscount(discount)
    }

    const handleDeleteDiscount = async (discountId) => {
        try {
            dispatch(deleteDiscount({ id: discountId, token}))
        } catch(error) {
            console.error('error deleting discount ' + error)
        }
    };

    /*const formatDateToLocalDateTime = (dateString) => {
        const date = new Date(dateString)
        return date.toISOString().split('.')[0]
    }*/

    const formatToLocalDateTime = (date) => {
        console.log(date)
        return date + 'T00:00:00'
    }

    return(
        <>
            <div className="discount-panel">
                <h1>Admin discount panel</h1>
                <h2>{editingDiscount ? "Edit discount" : "Create discount"}</h2>
                <form onSubmit={editingDiscount ? handleUpdateDiscount : handleAddDiscount}>
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
                        <label>Percentage (Add the percentage to charge. E.g. for 30% discount enter 0,7)</label>
                        <input type="number" min='0' max='1' step='0.01'
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
                        value={editingDiscount ? editingDiscount.startDate.split('T')[0] : newDiscount.startDate.split('T')[0]}
                        onChange={(e) => editingDiscount ?
                            setEditingDiscount({...editingDiscount, startDate : e.target.value})
                            : setNewDiscount({...newDiscount, startDate : e.target.value})
                        }
                        required/>
                    </div>
                    <div>
                        <label>End date</label>
                        <input type="date" 
                        value={editingDiscount ? editingDiscount.endDate.split('T')[0] : newDiscount.endDate.split('T')[0]}
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
                    <table>
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
                            <tr key={discount.code}>
                                <td>{discount.code + discount.id} </td>
                                <td>{discount.description}</td>
                                <td>{discount.percentage}</td>
                                <td>{discount.fixedAmount}</td>
                                <td>{discount.startDate}</td>
                                <td>{discount.endDate}</td>
                                <td>
                                    <button onClick={() => startEditing(discount)}>Edit</button>
                                    <button onClick={() => handleDeleteDiscount(discount.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DiscountPanel