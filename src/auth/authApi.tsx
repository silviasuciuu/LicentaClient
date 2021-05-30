import axios from 'axios';
import {baseUrl, config, withLogs} from '../core';

const authUrl = `http://${baseUrl}/auth/login`;

export interface AuthProps {
    id: string;
}

export const loginFct: (email?: string, parola?: string, tip?: string) => Promise<AuthProps> = async (email, parola, tip) => {
    const res = await axios.post(authUrl, {email, parola, tip});
    return withLogs(axios.post(authUrl, {email, parola, tip}, config), 'login');
}

export const loginGetId: (email?: string, parola?: string, tip?: string) => Promise<AuthProps> = async (email, parola, tip) => {
    const res = await axios.post(authUrl, {email, parola, tip});
    return res.data.body
}


