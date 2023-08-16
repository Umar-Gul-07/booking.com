import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const customerModel = mongoose.model('customer', customerSchema);
export default customerModel;