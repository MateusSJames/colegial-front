interface IHomeScript {
    getOrdersPendings<T>(param: T, name:T): Promise<T>
    getClientByOrder<T>(param: T, order:T): Promise<T>
}