import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import Home from "./containers/HomePage";
import Products from "./containers/ProductPage";
import PageNotFound from "./containers/PageNotFound";
import Login from "./containers/LoginPage";
import Register from "./containers/RegisterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Home" element={<Home />} />
        <Route path="/" element={<Login />} />
        <Route path="Register" element={<Register />} />
        <Route path="Product" element={<Products />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
