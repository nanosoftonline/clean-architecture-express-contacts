// domain/use-cases/contact/-get-all-contacts.ts
import { ContactResponseModel } from "../../models/contact";
import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { GetOneContactsUseCase } from "../../interfaces/use-cases/get-one-contact-use-case";

export class GetOneContacts implements GetOneContactsUseCase {
    contactRepository: ContactRepository
    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository
    }

    async execute(id: String): Promise<ContactResponseModel | null> {
        const result = await this.contactRepository.getContact(id)
        return result
    }
}