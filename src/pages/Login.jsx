import React, { useState } from 'react';
//import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showToast, setShowToast] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !password) {
            setShowToast(true);
        } else {

            setShowToast(false)
            navigate('/home')
        }
    }


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <form className="mt-5" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email:</label>
                            <input type="email" className="form-control" id="username" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password:</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor: '#87CEFA'}}>Login</button>
                    </form>
                    <div className={`toast position-fixed top-0 end-0 m-3 bg-danger text-white ${showToast ? 'show' : ''}`} role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" >
                        <div className="toast-header">
                            <strong className="me-auto">Errore</strong>
                            <button type="button" className="btn-close" onClick={() => setShowToast(false)}></button>
                        </div>
                        <div className="toast-body">
                            Per favore, inserisci sia username che password.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;