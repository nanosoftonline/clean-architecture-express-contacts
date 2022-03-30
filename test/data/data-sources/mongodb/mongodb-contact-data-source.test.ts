import { MongoDBContactDataSource } from '../../../../src/data/data-sources/mongodb/mongodb-contact-data-source'
import { NoSQLDatabaseWrapper } from '../../../../src/data/interfaces/data-sources/nosql-database-wrapper';

describe("MongoDB DataSource", () => {

    let mockDatabase: NoSQLDatabaseWrapper

    beforeAll(async () => {
        mockDatabase = {
            find: jest.fn(),
            insertOne: jest.fn(),
            updateOne: jest.fn(),
            deleteOne: jest.fn(),
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ name: "Smith", _id: "123" }]))
        const result = await ds.getAll();
        expect(mockDatabase.find).toHaveBeenCalledWith({})
        expect(result).toStrictEqual([{ name: "Smith", id: "123" }])
    })


    test("create", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "insertOne").mockImplementation(() => Promise.resolve({ insertedId: "123" }))
        const result = await ds.create({ name: "Smith", });
        expect(mockDatabase.insertOne).toHaveBeenCalledWith({ name: "Smith", })
    })

    test("deleteOne", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        const result = await ds.deleteOne("1");
        expect(mockDatabase.deleteOne).toHaveBeenCalledWith("1")
    })

    test("updateOne", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        const result = await ds.updateOne("1", { name: "Ramon" });
        expect(mockDatabase.updateOne).toHaveBeenCalledWith("1", { name: "Ramon" })
    })

    test("getOne", async () => {
        const ds = new MongoDBContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "find").mockImplementation(() => Promise.resolve([{ _id: "123", name: "Smith", }]))
        const result = await ds.getOne("123");
        expect(result).toStrictEqual({ name: "Smith", id: "123" })
        expect(mockDatabase.find).toHaveBeenCalledWith({ _id: "123" })
    })

})