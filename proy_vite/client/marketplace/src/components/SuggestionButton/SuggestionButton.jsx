import React from "react"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
        <>
            <p>Didn't find the product you were looking for?</p>
            <button onClick={ handleClick }>Share your suggestion with us!</button>
        </>
    )

}

export default SuggestionButton