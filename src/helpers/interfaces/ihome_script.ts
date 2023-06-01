interface IHomeScript {
    getStudents<T>(): Promise<T>
    getStudentByGrade<T>(code: T): Promise<T>
    getStudentByCode<T>(code: T): Promise<T>
    createStudent<T>(order:Object): Promise<T>
    saveGradesStudent<T>(order:Object): Promise<T>
}