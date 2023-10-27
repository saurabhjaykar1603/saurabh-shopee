import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, default: "_" },

    email: { type: String, required: true, unique: true },

    mobile: { type: Number, unique: true, required: true },

    password: { type: String },

    address: { type: String },

    gender: { type: String, default: "prefer not to say" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

export default User;
