const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    is_done: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    is_deleted: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
    list: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "List",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
