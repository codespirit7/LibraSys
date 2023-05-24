import React, { useEffect, useState } from "react";

import Books from "../components/books/Books";
import "./home.css";
import Default from "../components/default/Default";

function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");
    var token;
    if (adminToken) {
      token = adminToken;
    } else {
      token = userToken;
    }
    const loadBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/home/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setBooks(data);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadBooks();
  }, []);

  const adminToken = localStorage.getItem("adminToken");
  const userToken = localStorage.getItem("userToken");

  return (
    <>
      {adminToken || userToken ? (
        <div className="home">
          <Books books={books} />
        </div>
      ) : (
        <Default />
      )}
    </>
  );
}

export default Home;
