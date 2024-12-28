 

import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import '../styles/login.css';
import { PiEyeSlashThin } from "react-icons/pi";
import { LiaEyeSolid } from "react-icons/lia";

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();


        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created successfully!");
            navigate("/");  
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <h1>Signup</h1>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSignup} className="login-form">
                    <div className="input-group">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="login-input"
                        />
                    </div>
                    <div className="input-group">
                        <input
                            type={showPassword ? "text" : "password"} value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="login-input"
                        />
                        <span
                            className="toggle-password-icon"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <PiEyeSlashThin /> : <LiaEyeSolid />} {/* Using emoji as the icon */}
                        </span>
                    </div>

                    <button type="submit" className="login-button">Signup</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
