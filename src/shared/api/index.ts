import axios from 'axios';

const URL = 'https://api.jolpi.ca/ergast/f1/';

export const client = axios.create({
  baseURL: URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const LIMIT = 20;

export interface IDriver {
  driverId: string;
  permanentNumber: string;
  code?: string;
  url?: string;
  givenName?: string;
  familyName?: string;
  dateOfBirth?: string;
  nationality?: string;
}
