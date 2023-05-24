import React, { useState, useEffect } from "react";
import "../search/search.css";
import Books from "../Books/Book";
import Default from "../default/Default";

function Search() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");
  var token;
  if (adminToken) {
    token = adminToken;
  } else {
    token = userToken;
  }

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const response = await fetch("https://libra-sys.onrender.com/home/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();

          setBooks(data);
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    loadBooks();
  }, []);

  return (
    <>
      {token ? (
        <div className="searchApp">
          <input
            type="text"
            placeholder="Search..."
            className="search"
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="searchShow">
            {query.length > 0 &&
              books
                .filter((book) =>
                  book.title.toLowerCase().includes(query.toLowerCase())
                )
                .map((book) => <Books book={book} />)}
          </div>
        </div>
      ) : (
        <Default />
      )}
    </>
  );
}

export default Search;
