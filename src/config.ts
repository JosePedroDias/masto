import * as dotenv from 'dotenv';
dotenv.config();
    
export function getBaseUrl() {
    return process.env.BASE_URL;
}

export function getAccessToken() {
    return process.env.ACCESS_TOKEN;
}
