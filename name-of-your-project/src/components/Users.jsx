import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Users = () => {

    const users = useLoaderData();

    const handleDeleteUser = id => {
        console.log(id);
        fetch(`http://localhost:5000/users/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('User Deleted')
                }
            })
    }
    return (
        <div>
            <h2>{users.length}</h2>
            <div>
                {
                    users.map(user => <p key={user._id}>
                        {user.name} : {user.email}
                        <button onClick={() => handleDeleteUser(user._id)}>X</button> </p>)
                }
            </div>
        </div>
    );
};

export default Users;