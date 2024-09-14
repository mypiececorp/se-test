import axios from 'axios';

const URL = 'https://api.pexels.com/v1/';

export const client = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Ratelimit-Limit': '20000',
    'X-Ratelimit-Remaining': '19684',
    'X-Ratelimit-Reset': '1590529646',
    Authorization: '0KydNPkbA1QleGSUU3ND9D2GIZswnNxD5I5hX8nN4ncaCAq0iPoc0xNG',
  },
});
