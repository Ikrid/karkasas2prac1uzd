import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:3001/users?email=${email}&password=${password}`
            );
            const users = await response.json();

            if (users.length === 0) {
                throw new Error("Neteisingas el. paštas arba slaptažodis");
            }

            login(users[0]); // perduodam vartotojo duomenis į kontekstą
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Prisijungimas</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="El. paštas"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Slaptažodis"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Prisijungti</button>
            </form>
        </div>
    );
};

export default Login;
