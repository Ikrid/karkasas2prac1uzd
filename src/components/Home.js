import { Link } from "react-router-dom";

const Home = () => (
    <div>
        <h1>Pagrindinis puslapis</h1>
        <Link to="/login">Prisijungti</Link> | <Link to="/register">Registruotis</Link>
    </div>
);

export default Home;
