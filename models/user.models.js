import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },

        email: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
        },

        mobileNumber: {
            type: String,
            required: true,
        },

        isAuthenticated: {
            type: Boolean,
            default: false
        },

        role: {
            type: String,
            enum: ['admin', 'user', 'guest'],
            default: 'user'
        },

        location: {
            type: String,
            required: false,
            default: " "
        }
    }, 
    {timestamps: true}
);

export const Users = mongoose.models.users || mongoose.model("users", userSchema)