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
      onFinish(tableIdFinish, reservationIdFinish);
    }
  }

  const rows = tables.length ? (
    tables.map((table) => {
      return (
        <div
          className="form-group row card m-3 p-2 align-items-center bg-light"
          style={{ width: "20rem" }}
          key={table.table_id}
        >
          <div> Table:{table.table_name}</div>
          <div>Capacity:{table.capacity}</div>
          <div
            className=" btn btn-outline-success  mb-2"
            data-table-id-status={table.table_id}
            mb-5
          >
            {table.reservation_id ? "Occupied" : "Free"}
          </div>
          <div>
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
  return (
    <div className="table d-flex justify-content-center flex-wrap">{rows}</div>
  );
}

export default Tables;
