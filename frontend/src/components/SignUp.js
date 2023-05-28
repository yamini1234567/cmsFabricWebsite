import React, { useState } from "react";
import "./css-files/Signup.css";
import { Link } from 'react-router-dom';
import axios from 'axios';


function SignUp() {
  const BASE_URL = 'http://localhost:3007'
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (mobile && mobile.length === 10) {
      if (password.length >= 6) {
        if (password === confirmPassword) {
          //verifyemail
          axios({
            method: "post",
            url: `${BASE_URL}/verifydata`,
            data: {
              email: email,
              mobileNumber: mobile,
            },
          }).then(
            (response) => {
              initiateCreateUser();
            },
            (erro) => {
              alert(erro?.response?.data?.mesg);
            }
          );
         
        } else {
          alert("Password did not match");
        }
      } else {
        alert("Password Must be atleast 6 characters");
      }
    } else {
      alert("Invalid Mobile No");
    }
  };
  const initiateCreateUser = () => {
     axios({
       method: 'post',
       url: `${BASE_URL}/createUser`,
       data: {
        name: name,
         mobileNumber: mobile,
         email: email,
         password: password,
       }
     }).then(response=>{
       alert(`User ${name} Created `);
       window.location.replace('/login') 
     });
   };
 

  return (
    <div id="signup-body">
    <div className="signup-container">
    <form onSubmit={handleSubmit} className="form-signup">
        <h2 id="heading">Sign Up</h2>
        <div className="form-groupsignup">
          <input
          className="input-sigup"
            type="text"
            id="name-signup"
            value={name}
            placeholder="Name"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div className="form-groupsignup">
         
          <input
          className="input-sigup"
            type="email"
            id="email-signup"
            value={email}
            placeholder="Email id"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="form-groupsignup">
          <input
          className="input-sigup"
            type="tel"
            id="mobile-signup"
            value={mobile}
            placeholder="Mobile no"
            onChange={(event) => setMobile(event.target.value)}
            required
          />
        </div>
       
        <div className="form-groupsignup">
         
          <input
          className="input-sigup"
            type="password"
            id="password-signup"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div className="form-groupsignup">
          <input
          className="input-sigup"
            type="password"
            id="confirmPassword-signup"
            value={confirmPassword}
            placeholder="Confirm Password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn-signup">
          Sign Up
        </button>
        <p>Already Registred ?  <Link to="/login" id="login-link">Login</Link></p>
      </form>
    </div>
    </div>
  );
}

export default SignUp;
