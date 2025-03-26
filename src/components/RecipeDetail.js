import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`https://dummyjson.com/recipes/${id}`)
            .then(res => res.json())
            .then(data => setRecipe(data));
    }, [id]);

    if (!recipe) return <p>Kraunama...</p>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <p><strong>Kilmė:</strong> {recipe.cuisine}</p>
            <p><strong>Sudėtis:</strong> {recipe.ingredients.join(", ")}</p>
            <p><strong>Instrukcijos:</strong></p>
            <ul>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeDetail;
