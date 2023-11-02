import EmptyState from "@/components/empty-state";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import BookingsClient from "./bookings-client";


const BookingPage = async () => {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return (
            <EmptyState 
            title="Unauthorized"
            subtitle="Please sign in"
            />
        )
    }

    const reservations = await getReservations({
        userId: currentUser.id
    });

    if (reservations.length === 0) {
        return (
            <EmptyState
            title="No bookings found"
            subtitle="Looks like you haven't made any bookings"
            />
        )
    }

    return (
        <BookingsClient
        reservations={reservations}
        currentUser={currentUser}
        />
    )
}

export default BookingPage;