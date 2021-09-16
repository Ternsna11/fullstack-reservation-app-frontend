import React, { useState } from "react";
import { listReservations } from "../utils/api";
import Reservations from "../dashboard/Reservations";

function Search() {
  const [reservations, setReservations] = useState([]);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showResults, setShowResults] = useState(false);

  function changeHandler({ target: { value } }) {
    setMobileNumber(value);
  }

  function submitHandler(event) {
    event.preventDefault();
    event.stopPropagation();
    search();
  }

  function search() {
    setShowResults(false);
    listReservations({ mobile_number: mobileNumber })
      .then(setReservations)
      .then(() => setShowResults(true));
  }

  return (
    <>
      <h2 className="text-center pb-2">SEARCH RESERVATIONS</h2>
      <div className="d-flex flex-column align-items-center">
        <form onSubmit={submitHandler} className="mt-3 w-20 text-center">
          <div className="form-group">
            <label htmlFor="mobile_number">Mobile Number:</label>
            <div className="input-group">
              <input
                type="text"
                id="mobile_number"
                name="mobile_number"
                className="form-control"
                value={mobileNumber}
                onChange={changeHandler}
              />
              <div className="input-group-append">
                <button type="submit" className="btn-primary">
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {showResults && <Reservations reservations={reservations} className=" d-flex justify-content-center flex-wrap mb-5" />}
    </>
  );
}

export default Search;

