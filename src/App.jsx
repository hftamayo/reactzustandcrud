import React from "react";
import "./App.css";
import Layout from "./components/shared/Layout";
import { Routes, Route } from "react-router-dom";
import AllCakes from "./pages/AllCakes";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<AllCakes />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
