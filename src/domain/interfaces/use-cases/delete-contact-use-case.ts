import { ContactRequestModel } from "../../models/contact";

export interface DeleteContactUseCase {
    execute(id: String): void;
}