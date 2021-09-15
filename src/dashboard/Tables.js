import React from "react";

function Tables({ onFinish, tables = [] }) {
  function finishHandler({
    target: { dataset: { tableIdFinish, reservationIdFinish } } = {},
  }) {
    if (
      tableIdFinish &&
      reservationIdFinish &&
      window.confirm(
        "Is this table ready to seat new guests? This cannot be undone."
      )
    ) {
      //finishTable(tableIdFinish, reservationIdFinish);
      onFinish(tableIdFinish, reservationIdFinish);
    }
  }

  const rows = tables.length ? (
    tables.map((table) => {
      return (
        <div className="form-group row card m-3 bg-light" key={table.table_id}>
          <div className="col-sm-1">{table.table_name}</div>
          <div className="col-sm-1">{table.capacity}</div>
          <div
            className="col-sm-1 btn btn-outline-success"
            data-table-id-status={table.table_id}
          >
            {table.reservation_id ? "Occupied" : "Free"}
          </div>
          <div className="col-sm-1">
            {table.reservation_id ? (
              <button
                type="button"
                className="btn btn-outline-warning"
                data-table-id-finish={table.table_id}
                data-reservation-id-finish={table.reservation_id}
                onClick={finishHandler}
              >
                Finish
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      );
    })
  ) : (
    <div>No results</div>
  );
  return <div className="table">{rows}</div>;
}

export default Tables;


/// carters styling
{/* <div className="card m-3 bg-light" style={{ width: "10rem" }}>
        <div className="card-body">
          <h5 className="card-title">Table {table.table_name}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
          <span className="oi oi-people m-2"> </span> {table.capacity}
          </h6>
          {table.reservation_id ? (
            <h6 data-table-id-status={table.table_id}>occupied</h6>
          ) : (
            <h6 data-table-id-status={table.table_id}>free</h6>
          )}
          {table.reservation_id ? (
            <button
              data-table-id-finish={table.table_id}
              onClick={handleFinish}
            >
              Finish
            </button>
          ) : (
            ""
          )}
        </div>
      </div> */}