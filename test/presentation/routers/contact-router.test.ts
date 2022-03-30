import request from "supertest";
import { CreateContactUseCase } from "../../../src/domain/interfaces/use-cases/create-contact-use-case";
import { GetAllContactsUseCase } from "../../../src/domain/interfaces/use-cases/get-all-contacts-use-case";
import { ContactRequestModel, ContactResponseModel } from "../../../src/domain/models/contact";
import ContactRouter from '../../../src/presentation/routers/contact-router'
import server from '../../../src/server'

class MockGetAllContactsUseCase implements GetAllContactsUseCase {
    execute(): Promise<ContactResponseModel[]> {
        throw new Error("Method not implemented.");
    }
}

class MockCreateContactUseCase implements CreateContactUseCase {
    execute(contact: ContactRequestModel): void {
        throw new Error("Method not implemented.");
    }
}

describe("Contact Router", () => {
    let mockCreateContactUseCase: CreateContactUseCase;
    let mockGetAllContactsUseCase: GetAllContactsUseCase;

    beforeAll(() => {
        mockGetAllContactsUseCase = new MockGetAllContactsUseCase()
        mockCreateContactUseCase = new MockCreateContactUseCase()
        server.use("/contact", ContactRouter(mockGetAllContactsUseCase, mockCreateContactUseCase))
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    describe("GET /contact", () => {

        test("should return 200 with data", async () => {
            const ExpectedData = [{ id: "1", name: "Smith" }];
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.resolve(ExpectedData))

            const response = await request(server).get("/contact")

            expect(response.status).toBe(200)
            expect(mockGetAllContactsUseCase.execute).toBeCalledTimes(1)
            expect(response.body).toStrictEqual(ExpectedData)

        });

        test("GET /contact returns 500 on use case error", async () => {
            jest.spyOn(mockGetAllContactsUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).get("/contact")
            expect(response.status).toBe(500)
            expect(response.body).toStrictEqual({ message: "Error fetching data" })
        });
    })

    describe("POST /contact", () => {

        test("POST /contact", async () => {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.resolve(true))
            const response = await request(server).post("/contact").send(InputData)
            expect(response.status).toBe(201)
        });

        test("POST /contact returns 500 on use case error", async () => {
            const InputData = { id: "1", surname: "Smith", firstName: "John", email: "john@gmail.com" }
            jest.spyOn(mockCreateContactUseCase, "execute").mockImplementation(() => Promise.reject(Error()))
            const response = await request(server).post("/contact").send(InputData)
            expect(response.status).toBe(500)
        });
    })

})