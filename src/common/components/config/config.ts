export interface Config {
    httpServer: {
        port: number;
    };
    rpcServer: {
        port:number;
    };
    breedService: {
        useMock: boolean
    }
}
