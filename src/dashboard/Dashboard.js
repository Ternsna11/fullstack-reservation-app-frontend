import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "./Reservations";
import Tables from "./Tables";
import { today, next, previous, formatDate } from "../utils/date-time";
import { useLocation } from "react-router";
function Dashboard() {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [date, setDate] = useState(query.get("date") || today());
  useEffect(loadDashboard, [date]);
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables);
    return () => abortController.abort();
  }
  function onFinish(table_id, reservation_id) {
    finishTable(table_id, reservation_id).then(loadDashboard);
  }
  return (
    <main>
      <div className="Dashboard-Dates text-center">
        <h1>Dashboard</h1>
        <h1 className="m-3">{formatDate(date)}</h1>
        <button
          onClick={() => setDate(previous(date))}
          className="btn btn-sm btn-light"
        >
          Previous Day
        </button>
        <button
          className="mx-3 btn btn-sm btn-light"
          onClick={() => setDate(today())}
        >
          Today
        </button>
        <button
          onClick={() => setDate(next(date))}
          className="btn btn-sm btn-light"
        >
          Next Day
        </button>
        <br />
        <label htmlFor="reservation_date" className="form-label m-3">
          <input
            type="date"
            pattern="\\d{4}-\\d{2}-\\d{2}"
            name="reservation_date"
            onChange={handleDateChange}
            value={date}
          />
        </label>
      </div>
      <div className="mb-3 text-center">
        <h4 className="mb-0 text-primary">RESERVATIONS</h4>
      </div>
      <ErrorAlert error={reservationsError} />
      <div>
        <Reservations reservations={reservations} />
      </div>
      <div className="mb-3 text-center">
        <h4 className="mb-0">TABLES</h4>
      </div>
      <div>
        <Tables onFinish={onFinish} tables={tables} />
      </div>
    </main>
  );
}
export default Dashboard;
