import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
const TableHOC = (
  columns,
  data,
  containerClassname,
  heading,
  paginate = false
) => {
  return function HOC() {
    const options = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      pageCount,
      state: { pageIndex },
      gotoPage,
    } = useTable(options, useSortBy, usePagination);

    const a = headerGroups[0];
    const b = a.headers;

    return (
      <div className={containerClassname}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {b.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? "⬇️" : "⬆️"}</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        {paginate && (
          <div className="pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Previous
            </button>
            <span>{`${pageIndex + 1} Page of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
};

export default TableHOC;
