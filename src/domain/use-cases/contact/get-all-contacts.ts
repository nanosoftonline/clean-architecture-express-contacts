// domain/use-cases/contact/-get-all-contacts.ts
import { ContactResponseModel } from "../../models/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { GetAllContactsUseCase } from "../../interfaces/use-cases/get-all-contacts-use-case";

export class GetAllContacts implements GetAllContactsUseCase {
    contactRepository: ContactRepository
    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository
    }

    async execute(): Promise<ContactResponseModel[]> {
        const result = await this.contactRepository.getContacts()
        return result
    }
}