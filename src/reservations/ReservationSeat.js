import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { listTables, readReservation, seatReservation } from "../utils/api";

function ReservationSeat() {
  const history = useHistory();
  const { reservation_id } = useParams();

  const [reservation, setReservation] = useState({});
  const [tables, setTables] = useState([]);
  const [tableId, setTableId] = useState("");

  useEffect(() => {
    listTables().then(setTables);
  }, []);

  useEffect(() => {
    readReservation(reservation_id).then(setReservation);
  }, [reservation_id]);

  function changeHandler({ target: { value } }) {
    setTableId(value);
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    seatReservation(reservation.reservation_id, tableId).then(() =>
      history.push("/dashboard")
    );
  }

  return (
    <main className="">
      <h1>SEAT</h1>
      <form onSubmit={submitHandler}>
        <fieldset>
          <div className="row ">
            <div className="col">
              <select
                id="table_id"
                name="table_id"
                value={tableId}
                required={true}
                onChange={changeHandler}
              >
                <option value="">Table</option>
                {tables.map((table) => (
                  <option key={table.table_id} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            className="btn btn-danger mt-1 mr-2"
            onClick={() => history.goBack()}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-success mt-1">
            Submit
          </button>
        </fieldset>
      </form>
    </main>
  );
}

export default ReservationSeat;
