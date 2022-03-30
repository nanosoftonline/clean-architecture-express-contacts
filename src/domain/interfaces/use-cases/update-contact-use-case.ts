import { ContactRequestModel } from "../../models/contact";

export interface UpdateContactUseCase {
    execute(id: String, data: ContactRequestModel): void;
}