import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router";
import Map from "./components/Map";
import Card from "./components/Card";

import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/world-heritage-site/:id" element={<Card />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
