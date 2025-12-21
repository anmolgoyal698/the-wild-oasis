import { useParams } from "react-router-dom"
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";


export const useBooking = () => {
    const {id} = useParams();

    const {data: booking, error, isPending} = useQuery({
        queryFn: () => getBooking(id),
        queryKey: ['booking', id],
    });

    return {booking, error, isPending};
}