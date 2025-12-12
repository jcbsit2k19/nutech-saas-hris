import React, { useEffect, useState, useRef, useMemo } from "react";
import TextInput from "@components/textinputs/textinput"; // Ensuring consistent import
import Typography from "@components/typography/typography";
import TableLoadingSkeleton from "@components/loadings/table-loading-skeleton";
import { FaSearch } from "react-icons/fa";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";
import NoDataFound from "../errors/nodatafound";
import CardLoadingSkeleton from "../loadings/card-loading-skeleton";

export function Table({
  title,
  description,
  children,
  columns,
  data = [], // Default to empty array to prevent crash
  setData,
  loading,
}) {
  // 1. Manage Pagination State Internally
  const [page, setPage] = useState({
    itemsPerPage: 10,
    currentPage: 1,
    pageCount: 1,
  });

  const [search, setSearch] = useState("");

  // 2. Helper: Search Logic
  const searchInArray = (arr, searchText) => {
    if (!searchText) return arr;
    return arr.filter((item) => {
      return Object.values(item).some((value) =>
        String(value).toLowerCase().includes(searchText.toLowerCase())
      );
    });
  };

  // 3. Memoize the Filtered Data (Performance optimization)
  const filteredData = useMemo(() => {
    if (!data) return [];
    return searchInArray(data, search);
  }, [data, search]);

  // 4. Update Page Count when Filtered Data changes
  useEffect(() => {
    const count = Math.ceil(filteredData.length / page.itemsPerPage) || 1;
    setPage((prev) => ({ ...prev, pageCount: count }));

    // Reset to page 1 if search changes results significantly
    if (page.currentPage > count) {
      setPage((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [filteredData.length, page.itemsPerPage]);

  // 5. Calculate Visible Data (Slicing)
  const paginatedData = useMemo(() => {
    const start = (page.currentPage - 1) * page.itemsPerPage;
    const end = start + page.itemsPerPage;
    return filteredData.slice(start, end);
  }, [filteredData, page.currentPage, page.itemsPerPage]);

  // 6. THE FIX: Emit data to parent safely
  // We use a ref to store the stringified version of the last emitted data.
  // We only call setData if the content is actually different.
  const lastEmitRef = useRef("");

  useEffect(() => {
    const currentDataStr = JSON.stringify(paginatedData);

    if (lastEmitRef.current !== currentDataStr) {
      lastEmitRef.current = currentDataStr;
      setData(paginatedData);
    }
  }, [paginatedData, setData]);

  return (
    <div className="border rounded-md shadow-md overflow-x-auto bg-white border-slate-300 dark:bg-slate-800 dark:border-slate-700 transition-colors duration-300">
      <HeaderControls
        title={title}
        description={description}
        search={search}
        setSearch={setSearch}
        loading={loading}
      />
      <div className="w-full hidden sm:block">
        {loading ? (
          <TableLoadingSkeleton
            columnCount={columns?.length}
            rowCount={page?.itemsPerPage}
          />
        ) : (
          <table className="w-full">
            <thead className="bg-slate-300 dark:bg-slate-900 text-sm transition-colors duration-300">
              <tr className="text-left border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300">
                {columns.map((item, index) => (
                  <th key={index} className="py-2 px-4 font-medium">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="border-b border-slate-200 dark:border-slate-700">
              {children}
            </tbody>
          </table>
        )}
      </div>

      {/* Mobile View */}
      <div className="space-y-2 p-2 block sm:hidden">
        {loading ? (
          <CardLoadingSkeleton
            columnCount={columns?.length}
            rowCount={page?.itemsPerPage}
          />
        ) : (
          React.Children.map(children, (child) => {
            if (child.type === TableRow) {
              return (
                <div
                  key={child.key}
                  className="border border-slate-300 dark:border-slate-700 rounded-md p-2 shadow-md overflow-x-auto bg-white dark:bg-slate-800 transition-colors duration-300"
                >
                  {React.Children.map(child.props.children, (td, tdIndex) => {
                    if (td.type === TableData) {
                      return (
                        <div
                          key={tdIndex}
                          className="space-x-2 mb-2 flex items-center"
                        >
                          <strong className="text-xs text-slate-500 dark:text-slate-400">
                            {columns[tdIndex]}
                          </strong>
                          <div className="text-xs text-slate-400 dark:text-slate-300">
                            {td.props.children}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              );
            }
            return null;
          })
        )}
      </div>
      {(React.Children.count(children) === 0 || paginatedData?.length === 0) &&
        !loading && <NoDataFound />}

      {!search && !loading && data?.length > 0 && (
        <FooterControls data={data} page={page} setPage={setPage} />
      )}
      {search && (
        <p className="text-slate-400 p-2 text-sm">
          {filteredData.length} result
          {filteredData.length !== 1 ? "s" : ""} found for search "
          <span className="text-green-500 font-bold">{search}</span>"
        </p>
      )}
    </div>
  );
}

function HeaderControls({ title, description, search, setSearch, loading }) {
  return (
    <div className="sticky left-0 p-4 gap-2 grid grid-cols-1 lg:grid-cols-2 items-center justify-between">
      <div className="">
        <Typography variant={"header"}>{title}</Typography>
        <Typography variant={"subheader"}>{description}</Typography>
      </div>
      {!loading && (
        <TextInput
          id={`${title}-search`}
          name={"search"}
          type={"text"}
          value={search ?? ""}
          icon={FaSearch}
          placeholder={"Search"}
          onChange={(e) => setSearch(e.target.value)}
        />
      )}
    </div>
  );
}

function FooterControls({ data, page, setPage }) {
  return (
    <div className="sticky left-0 p-2 flex justify-end space-x-1 items-center text-xs text-slate-500 dark:text-slate-400">
      {data.length > 10 && (
        <div className="px-1 h-6 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-300 font-medium border dark:border-slate-600 dark:bg-slate-700">
          <select
            id={"pagination-pagecount"}
            name={"paginationPageCount"}
            className="outline-none bg-transparent"
            value={page.itemsPerPage.toString()}
            onChange={(e) => {
              const selectedValue = e.target.value;
              const pageCount =
                selectedValue === "ALL"
                  ? data.length
                  : parseInt(selectedValue, 10);

              setPage({
                ...page,
                itemsPerPage: pageCount,
                pageCount: Math.ceil(data?.length / pageCount),
                currentPage: 1,
              });
            }}
          >
            {["10", "20", "30", "40", "50", "ALL"].map((item, index) => (
              <option
                key={index}
                value={item === "ALL" ? data?.length : item}
                className="dark:bg-slate-800"
              >
                {item}
              </option>
            ))}
          </select>
        </div>
      )}
      {page.pageCount > 1 && (
        <>
          <div
            className="w-6 h-6 hover:text-white hover:bg-slate-500 dark:hover:bg-slate-600 cursor-pointer border dark:border-slate-600 rounded-md shadow-sm text-xl flex items-center justify-center transition-colors"
            onClick={() => {
              if (page.currentPage - 1 > 0)
                setPage({ ...page, currentPage: page.currentPage - 1 });
            }}
          >
            <BiChevronLeft />
          </div>
          <div className="px-2 h-6 flex items-center justify-center rounded-md text-slate-500 dark:text-slate-300 font-medium border dark:border-slate-600 dark:bg-slate-700">
            <select
              id={"pagination-currentpage"}
              name={"paginationCurrentPage"}
              value={page.currentPage}
              onChange={(e) => {
                setPage({ ...page, currentPage: parseInt(e.target.value, 10) });
              }}
              className="outline-none appearance-none text-center bg-transparent"
            >
              {Array.from(
                { length: page.pageCount },
                (_, index) => index + 1
              ).map((item, index) => (
                <option key={index} value={item} className="dark:bg-slate-800">
                  {item}
                </option>
              ))}
            </select>
            <p>/ {page.pageCount}</p>
          </div>
          <div
            className="w-6 h-6 hover:text-white hover:bg-slate-500 dark:hover:bg-slate-600 cursor-pointer border dark:border-slate-600 rounded-md shadow-sm text-xl flex items-center justify-center transition-colors"
            onClick={() => {
              if (page.currentPage + 1 <= page.pageCount) {
                setPage({ ...page, currentPage: page.currentPage + 1 });
              }
            }}
          >
            <BiChevronRight />
          </div>
        </>
      )}
    </div>
  );
}

export function TableData({ children, className }) {
  return (
    <td className={`${className} py-2 px-4 dark:text-slate-300`}>{children}</td>
  );
}

export function TableRow({ children, row }) {
  return (
    <tr
      className={`text-xs text-slate-500 dark:text-slate-400 transition-colors duration-200
        hover:bg-green-100 dark:hover:bg-green-900/30
        ${row % 2 === 0 ? "" : "bg-slate-100 dark:bg-slate-700/50"}`}
    >
      {children}
    </tr>
  );
}
