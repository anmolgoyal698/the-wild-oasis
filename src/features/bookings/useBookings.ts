import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export const useBookings = () => {

  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");
  const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRaw.split("-");
  const sortBy = { field, direction };

  const filter = (!filterValue || filterValue === "all") ? null : {
    field: "status",
    operation: "eq",
    value: filterValue,
  };

  const page = +(searchParams.get("page") || 1);

  const {
    data: {data: bookings, count} = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });
  return { bookings, count, isPending, error };
};
