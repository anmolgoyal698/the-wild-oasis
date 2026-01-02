import type { Cabin } from "../../cabins/models/Cabin";
import type { Guest } from "../../guests/models/Guest";

export type BookingStatus = "unconfirmed" | "checked-in" | "checked-out";

export interface Booking {
    id: number;
    created_at: string;
    startDate: string;
    endDate: string;
    numNights: number;
    numGuests: number;
    totalPrice: number;
    cabinPrice: number;
    extrasPrice: number;
    hasBreakfast: boolean;
    observations: string;
    isPaid: boolean;
    status: BookingStatus;
    guests: Partial<Guest>;
    cabins: Partial<Cabin>;
}