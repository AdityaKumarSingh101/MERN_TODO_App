import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import HomePage from "./components/HomePage/HomePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
