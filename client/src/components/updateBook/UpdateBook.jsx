import { useState } from "react";
import "./updateBook.css";

export default function AdminRegister({ book }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [date, setDate] = useState(book.date);
  const [desc, setDesc] = useState(book.desc);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/book/update/${book._id}`,
        {
          method: "PUT",
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
        }
      );

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
        <div className="updateBooks">
          <div className="updateborderBox">
            <span className="updateBooksTitle">UPDATE BOOK</span>
            <form onSubmit={handleSubmit} className="updateBooksForm">
              <label className="lbl">Book Title</label>
              <input
                type="text"
                className="updateBooksInput"
                placeholder={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="lbl">Author Name</label>
              <input
                type="text"
                className="updateBooksInput"
                placeholder={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
              <label className="lbl">Publication Date</label>
              <input
                type="text"
                className="updateBooksInput"
                placeholder={date.substring(0, 10)}
                onChange={(e) => setDate(e.target.value)}
              />
              <label className="lbl">Description</label>
              <textarea
                type="text"
                className="updateBooksInput no-drag"
                rows={10}
                placeholder={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
              <button className="updateBooksButton" type="submit">
                Update Book
              </button>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
