import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Customers from "./pages/Customers";
import RunningCampaigns from "./pages/RunningCampaigns";
import VideoDemos from "./pages/VideoDemos";
import Documentation from "./pages/Documentation";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>

          <Route
            path="/"
            element={<Customers />}
          />

          <Route
            path="/running-campaigns"
            element={<RunningCampaigns />}
          />

          <Route
            path="/video-demos"
            element={<VideoDemos />}
          />

          <Route
            path="/documentation"
            element={<Documentation />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />

        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;