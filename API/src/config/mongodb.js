import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.ENV === 'dev' ? 'mongodb://127.0.0.1:27017/my-notes' : 'mongo- production'

export const configMongo = {
    baseUrl: BASE_URL
}