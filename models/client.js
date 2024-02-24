import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("Client", clientSchema);
export default Client;
