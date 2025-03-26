import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import RecipeDetail from "./components/RecipeDetail";
import Favorites from "./components/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <AuthProvider>
            <Router>
                <nav>
                    <Link to="/dashboard">Pagrindinis</Link> |{" "}y
                    <Link to="/favorites">Mėgstamiausi</Link> |{" "}
                    <Link to="/login">Prisijungti</Link> |{" "}
                    <Link to="/register">Registruotis</Link>
                </nav>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                    <Route path="/recipe/:id" element={
                        <ProtectedRoute>
                            <RecipeDetail />
                        </ProtectedRoute>
                    } />
                    <Route path="/favorites" element={
                        <ProtectedRoute>
                            <Favorites />
                        </ProtectedRoute>
                    } />
                    <Route path="*" element={<Login />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
