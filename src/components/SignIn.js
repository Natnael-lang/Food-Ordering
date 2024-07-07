import {useState} from "react";
import "../CSS/SignIn.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true; 


const SignIn=()=>{
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [ password, setPassword ] = useState('');
    const [ errors, setErrors ] = useState({});
    const [ errorFromServer, setErrorFromServer ] = useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
        setErrors({ ...errors, [email]: '' });
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
        setErrors({ ...errors, [password]: '' });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const newErrors = {};

        if (!email) newErrors.email = '* Email is required';
        if (!password) newErrors.password = '* Password is required';

        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await axios.post( '/SignIn', { email: email, password: password });
                console.log(response.data)
                if (response.data == 'ok')  navigate('/Restaurant-navigation');
            } catch (err) {
                console.error(err);
                setErrorFromServer('Email or password is incorrect');
            }

        }
    };
    return (
        <div className="div-form">
            <form onSubmit={handleSubmit}>
                <div>
                    <button className="back-btn"><FontAwesomeIcon icon={faArrowLeft} /></button>
                </div>
            {errorFromServer && <div className='error'>{errorFromServer}</div>}
                <div id="ent-email">
                    <label htmlFor="email">Email:</label>
                    <input id="email" type="email" placeholder="Email" name="email" value={email} onChange={handleChangeEmail}/>
                    {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div id="ent-password"> 
                    <label for="password">Password:</label>
                    <input type="password" id="password" placeholder="Enter Password" name="passsword" value={password} onChange={handleChangePassword}/>
                    {errors.password && <div className="error">{errors.password}</div>}
                </div>
                <div className="loginDiv">
                    <button className="login-button">Login</button>
                    
                </div>
                <div className="div-forgot">
                    <button className="forgot-btn">Forgot password?</button>
                </div>
            </form>
        </div>
    );
};
export default SignIn;