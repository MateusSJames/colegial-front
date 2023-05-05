interface ISettingsScript {
    getStatusList<T>(param: T): Promise<T>;
    getInactiveStatusList<T>(param: T): Promise<T>;
    setActiveStatus<T>(param: T, id: T): Promise<T>;
    setStatusPosition<T>(base: T, body: Object): Promise<T>;
    postStatus<T>(base: T, body: Object): Promise<T>;
    deleteStatus<T>(base: T, id: T): Promise<T>;
}