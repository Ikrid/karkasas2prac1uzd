import RecipeList from "./RecipeList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div>
            <h2>Receptų sąrašas</h2>
            <button onClick={() => { logout(); navigate("/login"); }}>Atsijungti</button>
            <RecipeList />
        </div>
    );
};

export default Dashboard;
