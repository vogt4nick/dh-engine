import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "../components/Layout";
import Credits from "./Credits";
import DualityDiceRoller from "./DualityDiceRoller";
import Home from "./Home";

export default function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/DualityDiceRoller" element={<DualityDiceRoller />} />
          <Route path="/credits" element={<Credits />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}
