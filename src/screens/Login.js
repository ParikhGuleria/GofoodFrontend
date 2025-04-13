import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://gofoodbackend-hbqu.onrender.com/api/loginuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password, })
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        else {
            localStorage.setItem("userEmail",credentials.email)
            localStorage.setItem('token', json.authToken);
            console.log(localStorage.getItem("userEmail"));
            navigate("/");
        }
    }

    const onChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    }

    return (
        <div>
            <div className="container mt-4 w-50 d-flex justify-content-start flex-column">
            <div className="pb-4 fs-2 fw-bold">Log In:</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/signup" className="m-3 btn btn-danger">New User</Link>
                </form>
            </div>
        </div>
    )
}
