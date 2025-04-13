import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

export default function Navbar() {
  const[cartView,setCartView]=useState(false);

  let data=useCart();
  console.log(data.length);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div>
       <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">GoFood</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item ">
              <Link className="nav-link active fs-5" to="/myorder">Home</Link>
            </li>
          </ul>
          {(!localStorage.getItem("token")) ? <div className="d-flex">
            <Link className="btn bg-white text-success mx-1" to="/login">LogIn</Link>
            <Link className="btn bg-white text-success mx-1" to="/signup">SignUp</Link>
          </div>
            : <div>
              <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}> 
                MyCart {" "}<span className="badge bg-secondary">{data.length}</span>
              </div>
              {cartView?<Modal onClose={()=>{setCartView(false)}}><Cart /> </Modal>:null}
              <div className="btn bg-white text-danger mx-1" onClick={handleLogout}> LogOut </div>
            </div>}
        </div>
      </nav>
    </div>
  )
}
