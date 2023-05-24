import React from "react";
import Book from "../Books/Book";
import "../books/books.css";

export default function Books({ books }) {
  return (
    <div className="books">
      {books.map((b) => (
        <Book book={b} />
      ))}
    </div>
  );
}
