import { useState, useEffect } from "react";

export const useFilter = (dataList, callback, storageKey = "filterQuery") => {
  const initialQuery = localStorage.getItem(storageKey) || "";
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    localStorage.setItem(storageKey, query);
  }, [query, storageKey]);

  const filteredData = dataList.filter((data) =>
    callback(data).toLowerCase().includes(query)
  );

  return [filteredData, setQuery, query];
};
