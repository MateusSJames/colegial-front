interface IloginScript {
    sendLogin(credentials: Object): Promise<{status: number, message: string}>;
}