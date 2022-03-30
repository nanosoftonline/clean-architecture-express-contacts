import { ContactRequestModel, ContactResponseModel } from "../../../domain/models/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/database";

export class MongoDBContactDataSource implements ContactDataSource {

    private database: DatabaseWrapper
    constructor(database: DatabaseWrapper) {
        this.database = database
    }
    async deleteOne(id: String) {
        await this.database.deleteOne(id)
    }
    async updateOne(id: String, data: ContactRequestModel) {
        await this.database.updateOne(id, data)
    }
    async getOne(id: String): Promise<ContactResponseModel> {
        const result = await this.database.find({ _id: id })
        return result.map(item => ({
            id: item._id.toString(),
            name: item.name
        }))[0]
    }

    async create(contact: ContactRequestModel) {
        await this.database.insertOne(contact)
    }

    async getAll(): Promise<ContactResponseModel[]> {
        const result = await this.database.find({})
        return result.map(item => ({
            id: item._id.toString(),
            name: item.name
        }));
    }

}