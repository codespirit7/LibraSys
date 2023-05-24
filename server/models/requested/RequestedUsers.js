const mongoose = require("mongoose");

const RequestedUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("RequestedUser", RequestedUserSchema);
