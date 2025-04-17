import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const userData = { username, email, password };

        try {
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                console.log('Login Failed: ', data.message);
            } else {
                console.log('Login success: ', data.message);
                navigate("/login")
            }
        } catch (error) {
            setError('Something went wrong !\nTry again later !')
            console.error('Error registering user: ', error);
        }
    };

    return (
        <div>
            <h1 className="title">Register</h1>
            <form onSubmit={handleRegister}>
                <div className="inputField">
                    <input
                        type="text"
                        value={username}
                        placeholder='Username'
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="inputField">
                    <input
                        type="email"
                        value={email}
                        placeholder='E-mail'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="inputField">
                    <input
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className = "error-message">{error}</p>}
                <button className="submitButton" type="submit">
                    Register
                </button>
            </form>
        </div>
    );
}
