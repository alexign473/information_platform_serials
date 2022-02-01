import axios from 'axios';

export const API_URL = `https://api.themoviedb.org/3`;
export const API_KEY = `${process.env.MIX_API_KEY}`;

export default axios.create({
  baseURL: API_URL,
});
