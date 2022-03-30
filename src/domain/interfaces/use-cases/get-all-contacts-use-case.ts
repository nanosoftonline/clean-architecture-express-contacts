import { ContactResponseModel } from "../../models/contact";

export interface GetAllContactsUseCase {
    execute(): Promise<ContactResponseModel[]>;
}