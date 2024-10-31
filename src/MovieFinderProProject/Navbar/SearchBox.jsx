import { useEffect, useState } from "react";

export default function SearchBox({ query, setQuery }) {
  useEffect(function () {
    let ele=document.querySelector(".search");
    // console.log(ele);
    ele.focus();
  },[query]);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
