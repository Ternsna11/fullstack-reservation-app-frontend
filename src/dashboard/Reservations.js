import React from "react";
import { Link } from "react-router-dom";

function Reservations({ onCancel, reservations = [] }) {
  function cancelHandler({
    target: { dataset: { reservationIdCancel } } = {},
  }) {
    if (
      reservationIdCancel &&
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone."
      )
    ) {
      onCancel(reservationIdCancel);
    }
  }
  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (
        <div
          className="form-group row card m-3 p-2 align-items-center bg-light d-flex "
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
                onClick={cancelHandler}
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
  return <div className="table d-flex justify-content-center">{rows}</div>;
}

export default Reservations;

//carters reservations
{
  /* <div className="card m-3 bg-light" style={{ width: "18rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h4 className="card-title">
              {reservation.first_name} {reservation.last_name}
            </h4>
            <h6>
              <span className="oi oi-people m-2"> </span>
              {reservation.people}
            </h6>
          </div>

          <div className="d-flex justify-content-between">
            <h6>{date}</h6>
            <h6>{time}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6>{phone}</h6>

            <h5 data-reservation-id-status={reservation.reservation_id}>
              {reservation.status}
            </h5>
          </div>

          {reservation.status === "booked" && !type ? (
            <>
              <Link
                to={`/reservations/${reservation.reservation_id}/seat`}
                className="btn btn-info btn-sm"
              >
                Seat
              </Link>
              <button
                data-reservation-id-cancel={reservation.reservation_id}
                className="mx-3 btn btn-danger btn-sm"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <Link
                to={`/reservations/${reservation.reservation_id}/edit`}
                className="btn btn-warning btn-sm"
              >
                Edit
              </Link>
            </>
          ) : null}
        </div>
      </div> */
}
