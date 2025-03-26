import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Favorites = () => {
    const { user } = useAuth();
    const [favorites, setFavorites] = useState([]);

    const fetchFavorites = () => {
        fetch(`http://localhost:3001/favorites?userId=${user.id}`)
            .then(res => res.json())
            .then(data => setFavorites(data));
    };

    useEffect(() => {
        fetchFavorites();
    }, []);

    const removeFavorite = async (id) => {
        await fetch(`http://localhost:3001/favorites/${id}`, {
            method: "DELETE"
        });
        fetchFavorites();
    };

    return (
        <div>
            <h2>Mano mėgstamiausi receptai</h2>
            {favorites.map((r) => (
                <div key={r.id} style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
                    <h4>{r.name}</h4>
                    <p>{r.cuisine}</p>
                    <button onClick={() => removeFavorite(r.id)}>❌ Pašalinti</button>
                </div>
            ))}
        </div>
    );
};

export default Favorites;
