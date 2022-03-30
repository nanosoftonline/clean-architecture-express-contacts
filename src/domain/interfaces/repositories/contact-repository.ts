// domain/interfaces/repositories/contact-repository.ts
import { ContactRequestModel, ContactResponseModel } from "../../models/contact";

export interface ContactRepository {
    createContact(contact: ContactRequestModel): void;
    deleteContact(id: String): void;
    updateContact(id: String, data: ContactRequestModel): void;
    getContacts(): Promise<ContactResponseModel[]>;
    getContact(id: String): Promise<ContactResponseModel | null>;
}