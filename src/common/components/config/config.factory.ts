import {Config} from './config';
import * as fs from 'fs';

export const CONFIG = 'ConfigToken';

export const configFactory = {
    provide: CONFIG,
    useFactory: async (): Promise<Config> => {
        const env = process.env.NODE_ENV || 'development';
        const config = fs.readFileSync(`./config/${env.toLowerCase()}.json`);
        return JSON.parse(config.toString()) as Config;
    }
};
