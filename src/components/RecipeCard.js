import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const RecipeCard = ({ recipe }) => {
    const { user } = useAuth();
    const [favoriteEntry, setFavoriteEntry] = useState(null);

    // Tikrinam ar yra jau pridėtas mėgstamas
    useEffect(() => {
        fetch(`http://localhost:3001/favorites?userId=${user.id}&recipeId=${recipe.id}`)
            .then(res => res.json())
            .then(data => setFavoriteEntry(data[0] || null));
    }, [recipe.id, user.id]);

    const toggleFavorite = async () => {
        if (favoriteEntry) {
            // Ištrinti įrašą pagal ID
            await fetch(`http://localhost:3001/favorites/${favoriteEntry.id}`, {
                method: "DELETE"
            });
            setFavoriteEntry(null);
        } else {
            // Prieš įrašant, dar kartą patikrinam ar jau nėra
            const res = await fetch(`http://localhost:3001/favorites?userId=${user.id}&recipeId=${recipe.id}`);
            const existing = await res.json();

            if (existing.length === 0) {
                const response = await fetch("http://localhost:3001/favorites", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        name: recipe.name,
                        userId: user.id,
                        recipeId: recipe.id,
                        cuisine: recipe.cuisine,
                        image: recipe.image
                    })
                });

                const newFavorite = await response.json();
                setFavoriteEntry(newFavorite);
            }
        }
    };

    return (
        <div style={{ border: "1px solid gray", padding: "10px", marginBottom: "10px" }}>
            <h3>{recipe.name}</h3>
            <p>Kilmė: {recipe.cuisine}</p>
            <Link to={`/recipe/${recipe.id}`}>Skaityti plačiau</Link>
            <button onClick={toggleFavorite} style={{ marginLeft: "10px" }}>
                {favoriteEntry ? "💔 Pašalinti" : "❤️ Į mėgstamus"}
            </button>
        </div>
    );
};

export default RecipeCard;
