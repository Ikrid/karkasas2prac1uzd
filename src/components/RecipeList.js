import { useState, useEffect } from "react";
import RecipeCard from "./RecipeCard";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetch("https://dummyjson.com/recipes")
            .then(res => res.json())
            .then(data => setRecipes(data.recipes));
    }, []);

    const start = (page - 1) * itemsPerPage;
    const currentRecipes = recipes.slice(start, start + itemsPerPage);

    return (
        <div>
            {currentRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
            <div>
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Atgal</button>
                <button onClick={() => setPage(page + 1)} disabled={start + itemsPerPage >= recipes.length}>Kitas</button>
            </div>
        </div>
    );
};

export default RecipeList;
