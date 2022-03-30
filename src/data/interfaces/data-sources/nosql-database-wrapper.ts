//data/interfaces/data-source/database.ts
export interface NoSQLDatabaseWrapper {
    find(query: object): Promise<any[]>
    insertOne(doc: any): void
    deleteOne(id: String): void
    updateOne(id: String, data: object): void

}