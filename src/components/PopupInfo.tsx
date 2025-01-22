import { useQuery } from "@tanstack/react-query";
import { removeTags } from "../utils";

type PopupInfoProps = {
  markerId: number;
};

const PopupInfo = ({ markerId }: PopupInfoProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["siteData"],
    queryFn: async () => {
      const response = await fetch(
        `http://localhost:4000/api/world_heritage_sites/${markerId}`
      );
      return await response.json();
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h2 className="text-2xl">
        <a href={`/world-heritage-site/${data?.data?.id}`}>
          {" "}
          {data?.data?.name_en}
        </a>
      </h2>
      <p>{removeTags(data?.data?.short_description_en)}</p>
    </>
  );
};

export default PopupInfo;
