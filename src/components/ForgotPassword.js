import React from "react";
import "../CSS/ForgotPassword.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

const ForgotPassword=()=>{
    return (
        <div className="form-div">
            <form>
                <div>
                    <button className="back-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
                </div>
                <div className="entry-paragraph">
                    <h1>Forgot Password?</h1>
                    <p>please enter your previous email </p>
                    <p></p>
                </div>
                <div className="ent-email">
                    <label for="ent-email">Enter Email:</label>
                    <input id="ent-email" type="email" placeholder="Enter Your Email"/>
                </div>
                <div className="reset-div">
                    <button className="reset-btn">Reset Password</button>
                </div>
            </form>
        </div>
    );
};
export default ForgotPassword;