import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });

        let navigate = useNavigate()
    
       const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://gofoodbackend-hbqu.onrender.com/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        })

        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
        else{
            navigate("/");
        }

    }
    
    const onChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value })
    }
    return (
        <div className="container mt-4 w-50 d-flex justify-content-start flex-column">
            <div className="pb-4 fs-2 fw-bold">Sign Up:</div>
            <form onSubmit={handleSubmit}>  
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Location</label>
                    <input type="text" className="form-control" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                </div>
                <button type="submit" className="m-3 btn btn-success">Submit</button>
                <Link to="/login" className="m-3 btn btn-danger">Already a user</Link>
            </form>
        </div>
    )
}
