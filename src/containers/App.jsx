import React from "react";
import Layout from "../components/UI/Layout";
import { Routes, Route } from "react-router-dom";
import AllCakes from "../components/entities/Cakes/AllCakes";
import AddCake from "../components/entities/Cakes/AddCake";
import EditCake from "../components/entities/Cakes/EditCake";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/view-cake" element={<AllCakes />}></Route>
        <Route path="/add-cake" element={<AddCake />}></Route>
        <Route path="/edit-cake/:id" element={<EditCake />}></Route>
      </Routes>
    </Layout>
  );
}

export default App;
