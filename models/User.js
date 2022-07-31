import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new mongoose.Schema({
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

userSchema.pre("save", async function(next){
    const user = this;
    if(!user.isModified("password")) return next();
    try{
        const salt = await bcryptjs.genSalt(16);
        user.password = await bcryptjs.hash(user.password, salt);
        next();
    } catch (error) {
        console.log(error);
        throw new Error('Error al hashear password');
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password);
};

export const User = mongoose.model("User", userSchema);