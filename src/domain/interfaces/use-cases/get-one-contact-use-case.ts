import { ContactResponseModel } from "../../models/contact";

export interface GetOneContactsUseCase {
    execute(id: String): Promise<ContactResponseModel | null>;
}