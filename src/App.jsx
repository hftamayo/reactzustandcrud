import React from "react";
import "./App.css";
import Layout from "./components/shared/Layout";
import { Routes, Route } from "react-router-dom";
import AllCakes from "./pages/AllCakes";
import AddCake from "./pages/AddCake";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/view-cake" element={<AllCakes />}></Route>
        <Route path="/add-cake" element={<AddCake />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
