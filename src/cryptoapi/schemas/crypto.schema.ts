import * as mongoose from 'mongoose';

export const CryptoSchema = new mongoose.Schema({
    name: String,
    amount: Number,
});
