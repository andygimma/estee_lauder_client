import { useQuery } from "@tanstack/react-query";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function Map() {
  const { isPending, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        "http://localhost:4000/api/world_heritage_sites/map"
      );
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  type Marker = {
    id: number;
    unique_number: number;
    latitude: number;
    longitude: number;
  };
  return (
    <MapContainer className="h-[80vh] m-20" center={[0, 0]} zoom={2}>
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

export default Map;
