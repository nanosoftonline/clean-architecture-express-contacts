//test/domain/repositories/contact-repository.test.ts
import { ContactDataSource } from "../../../src/data/interfaces/data-sources/contact-data-source";
import { ContactRepository } from "../../../src/domain/interfaces/repositories/contact-repository";
import { ContactRequestModel, ContactResponseModel } from "../../../src/domain/models/contact";
import { ContactRepositoryImpl } from "../../../src/domain/repositories/contact-repository";

class MockContactDataSource implements ContactDataSource {
    deleteOne(id: String): void {
        throw new Error("Method not implemented.");
    }
    updateOne(id: String, data: ContactRequestModel): void {
        throw new Error("Method not implemented.");
    }
    getOne(id: String): Promise<ContactResponseModel> {
        throw new Error("Method not implemented.");
    }
    create(contact: ContactRequestModel): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<ContactResponseModel[]> {
        throw new Error("Method not implemented.");
    }
}

describe("Contact Repository", () => {
    let mockContactDataSource: ContactDataSource;
    let contactRepository: ContactRepository

    beforeEach(() => {
        jest.clearAllMocks();
        mockContactDataSource = new MockContactDataSource()
        contactRepository = new ContactRepositoryImpl(mockContactDataSource)
    })

    describe("getAllContacts", () => {
        test("should return data", async () => {
            const expectedData = [{ id: "1", name: "Paul" }]
            jest.spyOn(mockContactDataSource, "getAll").mockImplementation(() => Promise.resolve(expectedData))
            const result = await contactRepository.getContacts();
            expect(result).toBe(expectedData)
        });
    })

    describe("createContact", () => {
        test("should make create ds call", async () => {
            jest.spyOn(mockContactDataSource, "create").mockImplementation(() => Promise.resolve())
            await contactRepository.createContact({ name: "Smith" });
            expect(mockContactDataSource.create).toHaveBeenCalledWith({ name: "Smith" })
        });
    })


    describe("deleteContact", () => {
        test("should make deleteOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "deleteOne").mockImplementation(() => Promise.resolve())
            const result = await contactRepository.deleteContact("123");
            expect(mockContactDataSource.deleteOne).toHaveBeenCalledWith("123")
        });
    })

    describe("updateContact", () => {
        test("should make updateOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "updateOne").mockImplementation(() => Promise.resolve())
            await contactRepository.updateContact("123", { name: "John" });
            expect(mockContactDataSource.updateOne).toHaveBeenCalledWith("123", { name: "John" })
        });
    })

    describe("getContact", () => {
        test("should make getOne ds call", async () => {
            jest.spyOn(mockContactDataSource, "getOne").mockImplementation(() => Promise.resolve({ id: "123", name: "Paul" }))
            const result = await contactRepository.getContact("123");
            expect(mockContactDataSource.getOne).toHaveBeenCalledWith("123")
            expect(result).toStrictEqual({ id: "123", name: "Paul" })
        });
    })

})