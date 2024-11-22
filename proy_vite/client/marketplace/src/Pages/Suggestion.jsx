import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSuggestion } from "../redux/SuggestionSlice";
import { useNavigate } from "react-router-dom";

const Suggestion = () => {
    const { id, token } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.suggestion);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [description, setDescription] = useState("");
    const [photoLink, setPhotoLink] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createSuggestion({ description, photo: photoLink, userId: id, token }));
        navigate('/');
    };

    return (
        <div>
            <h1>Suggest a Kit</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">Kit Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="photoLink">Photo Link (optional):</label>
                    <input
                        type="url"
                        id="photoLink"
                        value={photoLink}
                        onChange={(e) => setPhotoLink(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Suggestion;