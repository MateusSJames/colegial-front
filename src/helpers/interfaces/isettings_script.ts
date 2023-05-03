interface ISettingsScript {
    getStatusList<T>(param: T): Promise<T>;
    setStatusPosition<T>(base: T, body: Object): Promise<T>;
    postStatus<T>(base: T, body: Object): Promise<T>;
}