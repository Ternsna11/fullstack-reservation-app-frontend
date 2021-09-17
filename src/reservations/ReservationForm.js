import { React, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  createReservation,
  readReservation,
  updateReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
function ReservationForm() {
  const history = useHistory();
  const params = useParams();
  const resId = params.reservation_id;
  const initialState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [reservation, setReservation] = useState(initialState);
  const [formError, setFormError] = useState(null);
  function changeHandler({ target: { name, value } }) {
    if (name === "people") {
      value = Number(value);
    }
    setReservation((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  useEffect(() => {
    async function loadReservation() {
      const abortController = new AbortController();
      setFormError(null);
      try {
        if (resId) {
          const originalReservation = await readReservation(
            resId,
            abortController.signal
          );
          setReservation(originalReservation);
        }
      } catch (error) {
        setFormError(error);
      }
      return () => abortController.abort();
    }
    loadReservation();
  }, [resId]);
  async function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    setFormError(null);
    try {
      if (resId) {
        await updateReservation(reservation);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      } else {
        await createReservation(reservation);
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      }
    } catch (error) {
      setFormError(error);
    }
  }
  return (
    <main>
      <ErrorAlert error={formError} />
      <form onSubmit={submitHandler}>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">First name:</label>
          <div className="col-sm-10">
            <input
              name="first_name"
              value={reservation.first_name}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Last name:</label>
          <div className="col-sm-10">
            <input
              name="last_name"
              value={reservation.last_name}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Mobile Number:</label>
          <div className="col-sm-10">
            <input
              name="mobile_number"
              type="tel"
              value={reservation.mobile_number}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Reservation Date:</label>
          <div className="col-sm-10">
            <input
              name="reservation_date"
              type="date"
              value={reservation.reservation_date}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Time:</label>
          <div className="col-sm-10">
            <input
              name="reservation_time"
              type="time"
              value={reservation.reservation_time}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="form-group row">
          <label className="col-sm-2 col-form-label">Number of people:</label>
          <div className="col-sm-10">
            <input
              name="people"
              type="number"
              min={1}
              value={reservation.people}
              onChange={changeHandler}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
        <button type="button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </form>
    </main>
  );
}
export default ReservationForm;
