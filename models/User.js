import {Schema, model} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
});


export const User = model("user", userSchema);