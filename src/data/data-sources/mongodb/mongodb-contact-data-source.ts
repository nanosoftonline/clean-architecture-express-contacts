import { ContactRequestModel, ContactResponseModel } from "../../../domain/models/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { NoSQLDatabaseWrapper } from "../../interfaces/data-sources/nosql-database-wrapper";

export class MongoDBContactDataSource implements ContactDataSource {

    private db: NoSQLDatabaseWrapper
    constructor(db: NoSQLDatabaseWrapper) {
        this.db = db
    }
    async deleteOne(id: String) {
        await this.db.deleteOne(id)
    }
    async updateOne(id: String, data: ContactRequestModel) {
        await this.db.updateOne(id, data)
    }
    async getOne(id: String): Promise<ContactResponseModel> {
        const result = await this.db.find({ _id: id })
        return result.map(item => ({
            id: item._id.toString(),
            name: item.name
        }))[0]
    }

    async create(contact: ContactRequestModel) {
        await this.db.insertOne(contact)
    }

    async getAll(): Promise<ContactResponseModel[]> {
        const result = await this.db.find({})
        return result.map(item => ({
            id: item._id.toString(),
            name: item.name
        }));
    }

}