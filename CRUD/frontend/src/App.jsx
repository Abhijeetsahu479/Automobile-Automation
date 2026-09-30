 import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Customers from "./pages/Customers";
import RunningCampaigns from "./pages/RunningCampaigns";
import VideoDemos from "./pages/VideoDemos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/running-campaigns" element={<RunningCampaigns />} />
        <Route path="/video-demos" element={<VideoDemos />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;