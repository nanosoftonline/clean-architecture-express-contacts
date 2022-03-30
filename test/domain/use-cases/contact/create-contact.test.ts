//test/domain/use-cases/contact/create-contact.test.ts
import { ContactRepository } from "../../../../src/domain/interfaces/repositories/contact-repository";
import { ContactRequestModel, ContactResponseModel } from "../../../../src/domain/models/contact";
import { CreateContact } from '../../../../src/domain/use-cases/contact/create-contact'

describe("Create Contact Use Case", () => {
    class MockContactRepository implements ContactRepository {
        createContact(contact: ContactRequestModel): void {
            throw new Error("Method not implemented.");
        }
        deleteContact(id: String): void {
            throw new Error("Method not implemented.");
        }
        updateContact(id: String, data: ContactRequestModel): void {
            throw new Error("Method not implemented.");
        }
        getContacts(): Promise<ContactResponseModel[]> {
            throw new Error("Method not implemented.");
        }
        getContact(id: String): Promise<ContactResponseModel> {
            throw new Error("Method not implemented.");
        }

    }

    let mockContactRepository: ContactRepository;

    beforeEach(() => {
        jest.clearAllMocks();
        mockContactRepository = new MockContactRepository()
    })

    test("should return true", async () => {
        const InputData = { id: "1", name: "Smith" }

        jest.spyOn(mockContactRepository, "createContact").mockImplementation(() => Promise.resolve(true))
        const createContactUseCase = new CreateContact(mockContactRepository)
        const result = await createContactUseCase.execute(InputData);
        expect(mockContactRepository.createContact).toBeCalledTimes(1)

    });

})