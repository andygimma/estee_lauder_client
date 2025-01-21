import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

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
  const markers = [
    {
      geocode: [48.86, 2.3522],
      popUp: "Pop up 1",
    },
    {
      geocode: [48.85, 2.35],
      popUp: "Pop up 2",
    },
    {
      geocode: [48.855, 2.34],
      popUp: "Pop up 3",
    },
  ];

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

  type Marker = {
    id: number;
    unique_number: number;
    latitude: number;
    longitude: number;
  };
  return (
    <MapContainer className="h-[100vh]" center={[51.505, -0.09]} zoom={3}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup chunkedLoading>
        {data.data.map((marker: Marker) => (
          <Marker
            key={marker.unique_number}
            position={[marker.latitude, marker.longitude]}
          >
            <Popup>
              <h2>{marker.unique_number}</h2>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;
