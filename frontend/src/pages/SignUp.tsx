import React, { useState } from 'react';
import { registration } from '../components/authentication/auth';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail]= useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response= await registration(name,email, password);
            console.log('Registration successful:', response);
            navigate('/login');
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className="row w-50">
                <div className="col-md-10">
                    <main className="form-signin mt-5">
                        <form onSubmit={handleSubmit}>
                            <h1 className="h2 mb-3 fw-normal text-center">Sign Up</h1>
                            <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingName"
                  name="name"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label htmlFor="floatingName">Full Name</label>
              </div>

                            <div className="form-floating mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="floatingInput"
                                    name="email"
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="form-floating mb-3 position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    id="floatingPassword"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <label htmlFor="floatingPassword">Password</label>
                                <span
                                    className="position-absolute end-0 top-50 translate-middle-y me-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={togglePasswordVisibility}
                                >
                                    <i className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`} />
                                </span>
                            </div>

                            <button className="btn btn-primary w-100 py-2" type="submit">
                                Sign Up
                            </button>
                        </form>
                        {error && <p className="text-danger text-center">{error}</p>}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SignUp;