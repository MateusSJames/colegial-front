interface IHomeScript {
    getOrdersPendings<T>(param: T, name:T): Promise<T>
}