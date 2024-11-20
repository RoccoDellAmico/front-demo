import React, { useState , useEffect } from 'react';
import './UserPanel.css';
//import UserService from "../../services/UserService";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/UserSlice";

const UserPanel = () => {

    //const [users, setUsers] = useState([]);
    //const [loading, setLoading] = useState(true); // Add loading state
    //const [error, setError] = useState(null); // Add error state
    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth);
    const { users } = useSelector((state) => state.user)

    useEffect( () => {
        dispatch(getUsers({ token }));
    }, [dispatch, token]);

    /*useEffect( () => {
        UserService.getUsers()
        .then(response => {
            setUsers(response.data || []);
            console.log(response.data);
            setLoading(false);
        }).catch(error => {
            console.log(error);
            setError('Failed to fetch users');
            setLoading(false);
        })
    },[])*/
    /*
    if (loading) {
        return <p>Loading users...</p>; // Display loading message while fetching
    }

    if (error) {
        return <p>{error}</p>; // Display error message if fetching fails
    }*/


    return (
        <div className="userpanel">
            <h1>Users</h1>
            <div className="userpanel-format-main">
                <p>Id</p>
                <p>Email</p>
                <p>FirstName</p>
                <p>LastName</p>
                <p>Role</p>
            </div>
            <br />
            {users.map( (e) => {
                return (
                    <div key={e.id}>
                        <div className="userpanel-format userpanel-format-main">
                            <p>{e.id}</p>
                            <p>{e.email}</p>
                            <p>{e.firstName}</p>
                            <p>{e.lastName}</p>
                            <p>{e.role}</p>
                        </div>
                        <hr />
                    </div>
                )
            } )}
        </div>
    )
}

export default UserPanel;


