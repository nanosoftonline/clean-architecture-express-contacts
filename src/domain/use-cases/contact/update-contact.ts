import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { UpdateContactUseCase } from "../../interfaces/use-cases/update-contact-use-case";
import { ContactRequestModel } from "../../models/contact";


export class UpdateContact implements UpdateContactUseCase {
    contactRepository: ContactRepository
    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository
    }

    async execute(id: String, data: ContactRequestModel) {
        await this.contactRepository.updateContact(id, data)

    }
}