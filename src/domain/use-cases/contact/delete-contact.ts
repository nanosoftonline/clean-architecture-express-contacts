import { ContactRepository } from "../../interfaces/repositories/contact-repository";
import { DeleteContactUseCase } from "../../interfaces/use-cases/delete-contact-use-case";


export class DeleteContact implements DeleteContactUseCase {
    contactRepository: ContactRepository
    constructor(contactRepository: ContactRepository) {
        this.contactRepository = contactRepository
    }

    async execute(id: String) {
        await this.contactRepository.deleteContact(id)

    }
}