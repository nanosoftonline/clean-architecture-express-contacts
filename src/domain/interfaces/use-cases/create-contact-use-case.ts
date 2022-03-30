import { ContactRequestModel } from "../../models/contact";

export interface CreateContactUseCase {
    execute(contact: ContactRequestModel): void;
}