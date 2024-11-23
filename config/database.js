'use strict';
import mongoose from 'mongoose';

export default class DatabaseConfig {
    connection() {
        return new Promise((resolve, reject) => {
            mongoose.set('strictQuery', true);
            mongoose.connect(process.env.MONGO_URI)
                .then(() => {
                    console.log('Database connected successfully.');
                    resolve(true);
                })
                .catch(error => {
                    console.error('Database connection error:', error);
                    reject(error);
                });
        });
    }
}
