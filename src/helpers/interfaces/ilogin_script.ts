interface IloginScript {
    sendLogin<T>(credentials: Object): Promise<T>;
}