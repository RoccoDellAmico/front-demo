import React, { useEffect } from 'react';
import './UserPanel.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/UserSlice';

const UserPanel = () => {
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.auth);
    const { users, error, loading } = useSelector(state => state.user);

    useEffect( () => {
        dispatch(getUsers({ token }))
    },[dispatch])

    if (loading) {
        return <p>Loading users...</p>; 
    }

    if (error) {
        return <p>{error}</p>; 
    }


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


