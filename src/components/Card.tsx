import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

function removeTags(str: string) {
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}

function Card() {
  let params = useParams();
  console.log({ params: params.id });
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["repoData"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/api/world_heritage_sites/${params.id}`
      );
      return await response.json();
    },
  });

  console.log({ isPending, error, data, isFetching });
  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="flex flex-col justify-center align-middle w-full text-center">
      <h1 className="text-3xl">{data.data.name_en}</h1>
      <p className="mt-8 px-48">{removeTags(data.data.short_description_en)}</p>
      <div className="flex">
        <MapContainer
          className="h-[40vh] w-[20vw] m-20"
          center={[data.data.latitude, data.data.longitude]}
          zoom={10}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup chunkedLoading>
            <Marker
              key={data.data.unique_number}
              position={[data.data.latitude, data.data.longitude]}
            >
              <Popup>
                <h2>{data.data.name_en}</h2>
              </Popup>
            </Marker>
          </MarkerClusterGroup>
        </MapContainer>
        <div className="mt-20">
          <h2 className="text-2xl">Reviews</h2>
          {data.data.reviews.map((review: any) => (
            <>
              <p>Rating: {review.rating}</p>
              <p>{review.content}</p>
            </>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Card;
