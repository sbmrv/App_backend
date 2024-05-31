const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
  {
    todo: {
      required: true,
      type: String,
    },
    user_id: {
      ref: "Driver",
      type: Schema.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
