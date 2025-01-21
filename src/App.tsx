import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Card />
    </QueryClientProvider>
  );
}

function Card() {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:4000/api/world_heritage_sites/map"
      );
      return await response.json();
    },
  });

  console.log({ isPending, error, data, isFetching });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex flex-col justify-center align-middle w-full text-center">
      <div className="w-full">Card</div>
      <div className="w-full">
        <Map />
      </div>
    </main>
  );
}

function Map() {
  return (
    <MapContainer className="h-[100vh]" center={[51.505, -0.09]} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default App;
