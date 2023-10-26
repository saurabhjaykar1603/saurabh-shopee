import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: { type: String, default: "_" },

  email: { type: String, required: true },

  mobile: { type: Number, default: 0 },

  password: { type: String },

  address: { type: String },

  gender: { type: String, default: "prefer not to say" },
});

const User = model("User", userSchema);

export default User;
