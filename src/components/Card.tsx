import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";

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
      <div className="w-full">Card</div>
      <div className="w-full">{/* <Map /> */}</div>
    </main>
  );
}

export default Card;
