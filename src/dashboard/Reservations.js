import { React } from "react";
import { Link } from "react-router-dom";
import { cancelReservation } from "../utils/api";
function Reservations({ reservations = [] }) {
  async function cancelHandler(reservationId) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      const abortController = new AbortController();
      try {
        await cancelReservation(reservationId);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
      return () => abortController.abort();
    }
  }
  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (
        <div
          className="form-group row card m-3 p-2 align-items-center bg-light d-flex"
          style={{ width: "18rem" }}
          key={reservation.reservation_id}
        >
          <div>Reservation ID: {reservation.reservation_id}</div>
          <div>
            {reservation.first_name}, {reservation.last_name}
          </div>
          <div>Phone#: {reservation.mobile_number}</div>
          <div>{reservation.reservation_date}</div>
          <div>{reservation.reservation_time}</div>
          <div>{reservation.people}</div>
          <div data-reservation-id-status={reservation.reservation_id}>
            {reservation.status}
          </div>
          {reservation.status === "booked" ? (
            <div>
              <Link
                className="btn btn-info m-1"
                to={`/reservations/${reservation.reservation_id}/seat`}
              >
                Seat
              </Link>
              <Link
                className="btn btn-success m-1"
                to={`/reservations/${reservation.reservation_id}/edit`}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger m-1"
                data-reservation-id-cancel={reservation.reservation_id}
                onClick={() => cancelHandler(reservation.reservation_id)}
              >
                Cancel
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
      );
    })
  ) : (
    <div>No reservations found</div>
  );
  return (
    <div className="table d-flex justify-content-center flex-wrap mb-5">
      {rows}
    </div>
  );
}
export default Reservations;
