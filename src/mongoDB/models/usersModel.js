import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, "user name is required"],
    unique: true,
    trim: true,
    minlength: [4, "user must be at least 4 characters"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    trim: true,
    minlength: [4, "password must be at least 4 characters"],
  },
}, {
  timestamps: true,
  versionKey: false,
});

// manejo de errores de duplicados
userSchema.post("save", (error, doc, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    next(new Error("Username already exists"));
  } else {
    next(error);
  }
});

export default models.Users || model("Users", userSchema)