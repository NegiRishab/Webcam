import React, { useState } from 'react'
import './index.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const navigate=useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let loginStart = {
            method: "POST",
            url: `http://localhost:3002/auth/login`,
            data: {
                name,
                email
            },
        };
        axios(loginStart)
            .then((response) => {
                console.log(response)
                localStorage.setItem('token',response.data.data.token)
                localStorage.setItem('userId',response.data.data.checkUser._id)
                localStorage.setItem('name',response.data.data.checkUser.name)
                navigate('/mediacapturehub')
            })
            .catch((error) => {
                console.log(error)
            });
    };
    return (
        <div className='hellow'>
            <h2>Login</h2>
            <form>
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Email address</label>
                    <input type="email" value={email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label" >Name</label>
                    <input value={name} type="text" class="form-control" id="exampleInputPassword1" onChange={(e) => setName(e.target.value)} />
                </div>

                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

