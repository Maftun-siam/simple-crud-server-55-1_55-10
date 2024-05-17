import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const loadedUser = useLoaderData();
    const handleUpdate = event => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        console.log(name, email);
        const updatedUser = { name, email };

        fetch(`http://localhost:5000/users/${loadedUser._id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.modifiedCount > 0){
                    alert("User information changed");
                }
            })
    }
    return (
        <div>
            <h3>update information of {loadedUser.name}</h3>
            <form action="" onSubmit={handleUpdate} >
                <input type="text" name="name" defaultValue={loadedUser?.name} placeholder='Input Your Name' />
                <br />
                <input type="email" name="email" defaultValue={loadedUser?.email} placeholder='Input Your Email' />
                <br />
                <input type="submit" name="submit" value="Add User" />
                <br />
            </form>
        </div>
    );
};

export default Update;