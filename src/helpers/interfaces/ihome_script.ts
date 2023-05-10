interface IHomeScript {
    getOrdersPendings<T>(param: T, name:T): Promise<T>
    getClientByOrder<T>(param: T, order:T): Promise<T>
    getProductsByOrder<T>(param: T, order: T): Promise<T>
    updateStatusOrder<T>(param: T, order: Object): Promise<T>
    updateProductByOrder<T>(param: T, order: Object): Promise<T>
}