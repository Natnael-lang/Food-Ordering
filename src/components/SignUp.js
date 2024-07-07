import React from "react";
import "../CSS/SignUp.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const SignUp=()=>{
      return (
        <div className="divForm">
            <form>
                <div>
                    <button className="back-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
                </div>
                <div id="fName">
                    <label htmlFor="firstName">First Name:</label>
                    <input id="firstName" type="text" placeholder="Enter first name"/>
                </div>
                <div id="lName">
                    <label htmlFor="lastName">Last Name:</label>
                    <input id="lastName" type="text" placeholder="  Enter last name"/>
                </div>
                <div id="ent-email">
                    <label htmlFor="email">Your Email:</label>
                    <input id="email" type="email" placeholder="enter your email"/>
                </div>
                <div id="ent-password">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder="enter password"/>
                </div>
                <div id="ent-confirmPassword">
                    <label htmlFor="confirmPassword">Confirm:</label>
                    <input type="Password" id="confirmPassword" placeholder="Confirm password"/>
                </div>
                <div className="submitDiv">
                    <button className="submit-button">Submit</button>
                </div>
            </form>
        </div>
      );
};
export default SignUp;
