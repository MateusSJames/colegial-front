interface ISettingsScript {
    getStatusList<T>(param: T): Promise<T>;
}