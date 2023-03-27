import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import DiscoverPage from "./pages/DiscoverPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CheckoutPage from "./pages/CheckoutPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DiscoverPage />}></Route>
          <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
          <Route path="/checkout" element={<CheckoutPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
