//data/interfaces/data-source/database.ts
export interface SQLDatabaseWrapper {
    query(queryString: String, queryConfig?: any[]): Promise<{ rows: any[] }>


}