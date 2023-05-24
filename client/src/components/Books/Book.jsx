import React, { useState } from "react";
import "./book.css";
import UpdateBook from "../updateBook/UpdateBook";

export default function Book({ book }) {
  const [isModal, setIsModal] = useState(false);

  const userToken = localStorage.getItem("userToken");
  const adminToken = localStorage.getItem("adminToken");

  const handleRequest = async () => {
    const bookTitle = book.title;
    console.log(book._id, book.title);

    try {
      const response = await fetch("http://localhost:5000/request/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: userToken,
        },
        body: JSON.stringify({
          bookTitle,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Your book has been requested");
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteRequest = async () => {
    console.log(book._id, book.title);
    try {
      const response = fetch(`http://localhost:5000/book/delete/${book._id}`, {
        method: "DELETE",
        headers: {
          authorization: adminToken,
        },
      });
      alert(`Book ${book.title} has been deleted`);
      window.location.replace("/addBooks");
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateRequest = () => {
    setIsModal(true);
    console.log(book._id);
  };
  return (
    <>
      {isModal ? (
        <UpdateBook book={book} />
      ) : (
        <div className="book">
          <img
            className="bookImg"
            src="https://cdn.pixabay.com/photo/2018/04/24/17/51/fairy-3347588_960_720.png"
            alt=""
          />

          <div className="bookInfo">
            <span className="bookTitle">{book.title}</span>
            <div className="bookCats">
              <span className="bookCat">{book.author}</span>
            </div>

            <hr />
            <span className="bookDate">
              {new Date(book.date).toDateString()}
            </span>
          </div>
          <p className="bookDesc" style={{ whiteSpace: "pre-wrap" }}>
            {book.desc}
          </p>
          {userToken ? (
            <button className="btn-hover color-1" onClick={handleRequest}>
              Request Book
            </button>
          ) : (
            <div>
              <button
                className="btn-hover color-2"
                onClick={handleDeleteRequest}
              >
                Delete Book
              </button>
              <button
                className="btn-hover color-3"
                onClick={handleUpdateRequest}
              >
                Update Book
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
