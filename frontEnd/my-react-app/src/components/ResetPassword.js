import React from "react";
import "../CSS/ResetPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const ResetPassword=()=>{
    return (
        <div className="form-div">
            <form>
                <div>
                    <button className="back-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
                </div>
                <div className="username-div">
                    <label for="username">Username:</label>
                    <input id="username" type="text" placeholder="Enter Username"/>
                </div>
                <div className="password-div">
                    <label for="password">Password:</label>
                     <input id="password" type="password" placeholder="Password"/>
                </div>
                <div className="confirmPassword-div">
                    <label for="confirmPassword">Confirm:</label>
                     <input id="confirmPassword" type="password" placeholder="Confirm Password"/>
                </div>
                <div className="continue-div">
                    <button className="continue-btn">Continue</button>
                </div>
            </form>
        </div>
    );
};
export default ResetPassword;