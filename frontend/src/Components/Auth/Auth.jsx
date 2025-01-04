import { useContext, useEffect, useState } from "react";
import { login, register } from "../../api/auth-api";
import { userFields } from "./constants";
import './Auth.css'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from "../state"
import { toast } from 'react-toastify';

function Auth() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const navigate = useNavigate();
    const { user, setuser } = useContext(Context)

    const [isRegistered, setIsRegistered] = useState(true);

    useEffect(() => {
        if (user.user_token !== null) navigate('/')
        else toast("Please Enter your Login Details")
    }, []);

    function onFormChange(e) {
        if (e.target.name === userFields.name)
            setName(e.target.value);
        else if (e.target.name === userFields.email)
            setEmail(e.target.value);
        else if (e.target.name === userFields.userId)
            setUserId(e.target.value);
        else if (e.target.name === userFields.password)
            setPassword(e.target.value);
    }

    function onRegister(e) {
        e.preventDefault();
        setMessage("");

        const registerDetails = { name, email, userId, password };
        register(registerDetails)
            .then(res => {
                setIsError(false);
                console.log(res);
                setMessage(res.data.message);
                setIsRegistered(true);
            })
            .catch(err => {
                setIsError(true);
                console.log(err);
                setMessage(err.response.data.message);
            })
    }


    function onLogin(e) {
        e.preventDefault();
        setMessage("");

        const loginDetails = { userId, password };
        login(loginDetails)
            .then(res => {
                setIsError(false);
                setMessage(res.data.message);
                setuser({
                    user_token: res.data.jwtToken,
                    user_name: res.data.name,
                    user_id: res.data._id
                })
                console.log(res.data)
                navigate("/")
            })
            .catch(err => {
                setIsError(true);
                console.log(err);
                setMessage(err.response.data.message);
            })
    }

    function clearState() {
        setName("");
        setEmail("");
        setUserId("");
        setPassword("");
        setMessage("");
        setIsError(false);
    }

    function toggle() {
        clearState();
        setIsRegistered(!isRegistered);
    }


    return (
        <div>
            {(isRegistered) ?
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div style={{ width: "30rem" }} className="card p-3 rounded-3 shadow text-center">
                        <h4 className="text-info mb-3 kanit-regular">SIGN IN</h4>
                        <form onSubmit={onLogin} className="kanit-light">
                            <div className="input-group mb-2">
                                <input required onChange={onFormChange} className="form-control" type="text" name="userId" placeholder="User ID" value={userId} />
                            </div>
                            <div className="input-group mb-3">
                                <input required onChange={onFormChange} className="form-control" type="password" name="password" placeholder="Password" value={password} />
                            </div>
                            <p className="text-info" style={{ cursor: "pointer" }} onClick={toggle}>Don't have an account ? Register</p>
                            <div>
                                <input required className="btn btn-outline-info pt-1 pb-1 mb-2" type="submit" value="Submit" />
                            </div>
                        </form>
                        <div style={isError ? { color: "#dc3545" } : { color: "#28a745" }} className="kanit-light">{message}</div>
                    </div>
                </div> :
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div style={{ width: "30rem" }} className="card p-3 rounded-3 shadow text-center">
                        <h4 className="mb-3 kanit-regular text-info">SIGN UP</h4>
                        <form onSubmit={onRegister} className="kanit-light">
                            <div className="input-group mb-2">
                                <input required onChange={onFormChange} className="form-control" type="text" name="name" placeholder="Name" value={name} />
                            </div>
                            <div className="input-group mb-2">
                                <input required onChange={onFormChange} className="form-control" type="email" name="email" placeholder="Email" value={email} />
                            </div>
                            <div className="input-group mb-2">
                                <input required onChange={onFormChange} className="form-control" type="text" name="userId" placeholder="User ID" value={userId} />
                            </div>
                            <div className="input-group mb-2">
                                <input required onChange={onFormChange} className="form-control" type="password" name="password" placeholder="Password" value={password} />
                            </div>
                            <p className="text-info" style={{ cursor: "pointer" }} onClick={toggle}>Already have an account ? Login</p>
                            <div>
                                <input className="btn btn-outline-info pt-1 pb-1 mb-2" type="submit" value="Submit" />
                            </div>
                        </form>
                        <div style={isError ? { color: "#dc3545" } : { color: "#28a745" }} className="kanit-light">{message}</div>
                    </div>
                </div>
            }
        </div>
    );
}

export default Auth;