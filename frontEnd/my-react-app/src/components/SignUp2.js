import React, { useState } from "react";
import "../CSS/SignUp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


import axios from "axios";
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; 


const SignUp=()=>{
    const navigate = useNavigate();
    const [ formData, setFormData ] = useState({
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        confirm_password: '',
    });
    const [ errors, setErrors ] = useState({});
    const [ errorFromServer, setErrorFromServer ] = useState('');
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    }

    const validate = () => {
        const { first_name, last_name, phone_number, email, password, confirm_password } = formData;
        const newErrors = {};

        if (!first_name) newErrors.first_name = '* This field is required';
        if (!last_name) newErrors.last_name = '* This field is required';

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone_number)) newErrors.phone_number = '* Invalid phone number';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) newErrors.email = '* Invalid email address';

        if (password.length < 6) newErrors.password = '* Password must be at least 6 characters long';
        if (password !== confirm_password) newErrors.confirm_password = '* Passwords do not match';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

   const  handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post('/SignUp', formData);
                console.log(response.data)
                navigate('/Restaurant-navigation');
            } catch (err) {
                console.error(err.response.data);
                setErrorFromServer(err.response.data);
            }
        }
    }
      return (
        <div className="divForm">
            {errorFromServer && <div className='error'>{errorFromServer}</div>}
            <form onSubmit={handleSubmit} noValidate>

               <div id="fName">

            {errorFromServer && <div className='error'>{errorFromServer}</div>}
                    <label htmlFor="first_name">First Name:</label>
                     <input
                        id="first_name"
                        type="text"
                        placeholder="Enter first name"
                        name = "first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                />
                {errors.first_name && <div className="error">{errors.first_name}</div>}
            </div>
                
            <div id="lName">
                <label htmlFor="">Last Name:</label>
                    <input
                    id="last_name"
                    type="text"
                    placeholder="Enter last name"
                    name = "last_name"
                    value={formData.last_name}
                    onChange={handleChange}
            />
                {errors.last_name && <div className="error">{errors.last_name}</div>}
                </div>
                <div id="phone_number">
                    <label htmlFor="">Phone number:</label>
                     <input
                        id="phone_number"
                        type="tel"
                        placeholder="ex: 0912345678"
                        name = "phone_number"
                        value={formData.phone_number}
                        onChange={handleChange}
                />
                {errors.phone_number && <div className="error">{errors.phone_number}</div>}
                </div>
                <div id="ent-email">
                    <label htmlFor="">Your Email:</label>
                     <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        name = "email"
                        value={formData.email}
                        onChange={handleChange}
                />
                {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div id="ent-password">
                    <label htmlFor="">Password:</label>
                     <input
                        id="password"
                        type="text"
                        placeholder="Enter password"
                        name = "password"
                        value={formData.password}
                        onChange={handleChange}
                />
                {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div id="ent-confirm_password">
                    <label htmlFor="">Confirm:</label>
                     <input
                        id="password"
                        type="text"
                        placeholder="Confirm password"
                        name = "confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                />
                {errors.confirm_password && <div className="error">{errors.confirm_password}</div>}
                </div>
                <div className="submitDiv">
                    <button className="submit-button">Submit</button>
                    
                </div>
            </form>
            
        </div>
      );
};
export default SignUp;