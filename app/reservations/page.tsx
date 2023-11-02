import EmptyState from "@/components/empty-state";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservation";
import ReservationsClient from "./reservations-client";

const ReservationPage = async () => {

    const currentUser = await getCurrentUser();

  if (!currentUser) {
  return (
    <EmptyState
    title="Unauthorized"
    subtitle="Please, sign in to access this page"
    />
   );
  }

  const reservations = await getReservations({
    authorId: currentUser.id
  });

  if (reservations.length === 0) {
    return (
        <EmptyState
        title="No reservation found"
        subtitle="Looks like you have no bookings on your properties"
        />
    )
  }

  return (
    <ReservationsClient
    reservations={reservations}
    currentUser={currentUser}
    />
  )
};

export default ReservationPage;