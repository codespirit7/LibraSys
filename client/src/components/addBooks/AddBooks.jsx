import { useState } from "react";
import "./addBooks.css";
import Default from "../default/Default";

export default function AdminRegister() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/addBooks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({
          title,
          author,
          date,
          desc,
        }),
      });

      if (response.ok) {
        window.location.replace("/home");
      } else {
        alert("You are not authorized to Add Books. Only admins are allowed.");

        console.log("Error", response.statusText);
      }
    } catch (err) {
      console.log("Error:", err);
    }
  };
  const token = localStorage.getItem("adminToken");

  return (
    <>
      {token ? (
        <div className="addBooks">
          <div className="borderBox">
            <span className="addBooksTitle">ADD BOOKS</span>
            <form onSubmit={handleSubmit} className="addBooksForm">
              <label className="lbl">Book Title</label>
              <input
                type="text"
                className="addBooksInput"
                placeholder="Enter Book title"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="lbl">Author Name</label>
              <input
                type="text"
                className="addBooksInput"
                placeholder="Enter Author name"
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label className="lbl">Publication Date</label>
              <input
                type="text"
                className="addBooksInput"
                placeholder="yyyy-mm-dd"
                onChange={(e) => setDate(e.target.value)}
              />
              <label className="lbl">Description</label>
              <textarea
                type="text"
                className="addBooksInput no-drag"
                rows={10}
                placeholder="Describe the book.."
                onChange={(e) => setDesc(e.target.value)}
              />
              <button className="addBooksButton" type="submit">
                Add Book
              </button>
            </form>
          </div>
        </div>
      ) : (
        <Default />
      )}
    </>
  );
}
