import React from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './SuggestionButton.css'

const SuggestionButton = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    const handleClick = () => {
        if (isAuthenticated) {
            navigate("/suggestion");
        }
        else {
            navigate("/logIn");
        }
    }

    return(
        <div className="suggestion-container">
            <p>Didn't find the product you were looking for?</p>
            <button onClick={ handleClick }>Share your suggestion with us!</button>
        </div>
    )

}

export default SuggestionButton