import { useNavigate, useParams } from "react-router-dom";
import { updateBooking } from "../../services/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCheckin = () => {

    const {bookingId} = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {isPending: isCheckingIn, mutate: checkIn} = useMutation({
        mutationFn: () => updateBooking(bookingId, {status: 'checked-in', isPaid: true}),
        onSuccess: (data) => {
            queryClient.invalidateQueries({queryKey: ['booking', bookingId]});
            queryClient.invalidateQueries({queryKey: ['bookings']});
            toast.success(`Booking #${data.id} checked in successfully!`);
            navigate("/");
        },
        onError: () => {
            toast.error('Error checking in guest. Please try again.');
        },
    });
    return {isCheckingIn, checkIn};
}