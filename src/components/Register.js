import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        // Tikrinam el. pašto formatą
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Neteisingas el. pašto formatas");
            return;
        }

        try {
            // Tikrinam ar toks vartotojas jau egzistuoja
            const checkResponse = await fetch(`http://localhost:3001/users?email=${email}`);
            const existingUsers = await checkResponse.json();

            if (existingUsers.length > 0) {
                throw new Error("Toks vartotojas jau egzistuoja");
            }

            // Jei ne – registruojam
            const response = await fetch("http://localhost:3001/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) throw new Error("Registracija nepavyko");

            navigate("/login");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Registracija</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleRegister}>
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
                <button type="submit">Registruotis</button>
            </form>
        </div>
    );
};

export default Register;
