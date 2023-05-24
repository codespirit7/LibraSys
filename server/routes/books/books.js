const router = require("express").Router();
const Books = require("../../models/Books/Books");
const listedBooksMiddleware = require("../ListedBooksMiddleware");
const addBooksMiddleware = require("../addBooksMiddleware");
const User = require("../../models/Users/User");
const RequestedUser = require("../../models/requested/RequestedUsers");

router.post("/addBooks/", addBooksMiddleware, async (req, res) => {
  const { title, author, date, desc, available } = req.body;

  try {
    const newBook = new Books({
      title,
      author,
      date,
      desc,
      available,
    });

    const book = await newBook.save();
    res.status(200).json({ message: "Book saved" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/home/", listedBooksMiddleware, async (req, res) => {
  const books = await Books.find();

  if (books.length < 0) {
    return res.status(500).json({ error: "Internal server Error" });
  }
  res.json(books);
});

router.post("/request/", listedBooksMiddleware, async (req, res) => {
  const email = req.userId;
  const title = req.body.bookTitle;
  console.log(title);
  try {
    const requestedUser = new RequestedUser({
      email,
      title,
    });
    const user = await requestedUser.save();
    res.status(200).json({ requestedUser, message: "Request verified" });
  } catch (err) {
    res.status(200).json(err);
  }
});

router.delete("/book/delete/:id", addBooksMiddleware, async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    await book.deleteOne();
    res.status(200).json({ message: "Book has been deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/book/update/:id", addBooksMiddleware, async (req, res) => {
  const objectId = req.params.id;
  const updateData = req.body;

  try {
    const updatedObject = await Books.findOneAndUpdate(
      { _id: objectId },
      updateData,
      { new: true }
    );
    if (!updatedObject) {
      return res.status(404).json({ error: "Object not found" });
    }
    res.json(updatedObject);
  } catch (error) {
    res.status(500).json({ error: "Error updating object" });
  }
});

module.exports = router;
