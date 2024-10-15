import React from "react";
import {Link} from 'react-router-dom'

const CheckOut = () => {
    return (
        <div>
            <h1>CheckOut</h1>
            <Link to='/payment'> <button>Proceed to payment</button> </Link>
        </div>
    )
}

export default CheckOut