import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import DiscoverPage from "./pages/DiscoverPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<DiscoverPage />}></Route>
          <Route path="/product/:id" element={<ProductDetailsPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
