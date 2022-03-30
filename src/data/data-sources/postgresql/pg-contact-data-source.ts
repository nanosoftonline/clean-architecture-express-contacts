import { Contact } from "../../../domain/models/contact";
import { ContactDataSource } from "../../interfaces/data-sources/contact-data-source";
import { DatabaseWrapper } from "../../interfaces/data-sources/database";

export class PGContactDataSource implements ContactDataSource {
    create(contact: Contact): void {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Contact[]> {
        throw new Error("Method not implemented.");
    }
    deleteOne(id: String): void {
        throw new Error("Method not implemented.");
    }
    updateOne(id: String, data: Contact): void {
        throw new Error("Method not implemented.");
    }
    getOne(id: String): Contact {
        throw new Error("Method not implemented.");
    }




}