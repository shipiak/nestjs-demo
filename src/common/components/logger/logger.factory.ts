
/**
 * Just a primitive console logger :)
 */


export const LOGGER = 'LoggerToken';

export const loggerFactory = {
    provide: LOGGER,
    useFactory: async () => {
        return console;
    }
};
