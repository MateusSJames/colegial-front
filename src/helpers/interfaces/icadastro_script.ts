interface ICadastroScript {
    getTableValues<T>(param: T, name:T): Promise<T>
}