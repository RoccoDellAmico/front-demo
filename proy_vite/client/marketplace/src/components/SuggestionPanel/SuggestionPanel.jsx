import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSuggestions } from "../../redux/SuggestionSlice";
import './SuggestionPanel.css';

const SuggestionPanel = () => {
    const dispatch = useDispatch();
    const { suggestions, loading, error } = useSelector((state) => state.suggestion);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchSuggestions({ token }));
    }, [dispatch]);

    if (loading) {
        return <p>Loading suggestions...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <>
            {suggestions.length > 0 ? (
                <ul>
                    {suggestions.map((suggestion, index) => (
                        <li key={index}>
                            <p>Description: {suggestion.description}</p>
                            {suggestion.photo && (
                                <img src={suggestion.photo} alt="Suggestion" style={{ maxWidth: "200px" }} />
                            )}
                            <p>User Email: {suggestion.userEmail}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No suggestions found</p>
            )}
        </>
    );
};

export default SuggestionPanel;