import { useParams } from "react-router-dom"
import { getBooking } from "../../services/apiBookings";
import { useQuery } from "@tanstack/react-query";


export const useBooking = () => {
    const {bookingId} = useParams();

    const {data: booking, error, isPending} = useQuery({
        queryFn: () => getBooking(+bookingId!),
        queryKey: ['booking', bookingId],
    });

    return {booking, error, isPending};
}