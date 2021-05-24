import axios from 'axios';
import { baseUrl, config, withLogs } from '../core';

const authUrl = `http://${baseUrl}/auth/login`;

export interface AuthProps {
    token: string;
}

export const login: (email?: string, parola?: string,tip?:string) => Promise<AuthProps> = (email, parola,tip) => {

    return withLogs(axios.post(authUrl, { email, parola,tip }, config), 'login');
}


