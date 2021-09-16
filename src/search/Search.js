import React, { useState } from "react";
import {listReservations } from "../utils/api";
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
      .then(() => setShowResults(true))
  }

  return (
    <main>
      <div className= "SearchForm d-flex flex-column flex-wrap align-items-center">
      <h1>SEARCH RESERVATIONS</h1>
      <form onSubmit={submitHandler}>
          <div className="row">
            <div className="form-group .">
              <label htmlFor="mobile_number">Mobile Number:</label>
              <div className="input-group">
                <input type="text" id="mobile_number" name="mobile_number" className="form-control" value={mobileNumber} onChange={changeHandler}/>
                <div className="input-group-append">
                  <button type="submit" className="btn-primary">Search</button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
      {showResults && (
        <Reservations reservations={reservations} />
      )}
    </main>
  );
}

export default Search;
// div classname form-group styling col-md-4 col-sm-12