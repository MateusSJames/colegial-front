interface ICadastroScript {
    getTableValues<T>(param: T, name:T, page: string, field?: string, value?: string): Promise<T>
}