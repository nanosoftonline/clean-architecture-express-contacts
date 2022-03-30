import { PGContactDataSource } from '../../../../src/data/data-sources/postgresql/pg-contact-data-source'
import { SQLDatabaseWrapper } from '../../../../src/data/interfaces/data-sources/sql-database-wrapper';

describe("PG DataSource", () => {

    let mockDatabase: SQLDatabaseWrapper

    beforeAll(async () => {
        mockDatabase = {
            query: jest.fn()
        }
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test("getAll", async () => {
        const ds = new PGContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ name: "Smith", id: "123" }] }))
        const result = await ds.getAll();
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_contact")
        expect(result).toStrictEqual([{ name: "Smith", id: "123" }])
    })


    test("create", async () => {
        const ds = new PGContactDataSource(mockDatabase);
        await ds.create({ name: "Smith", });
        expect(mockDatabase.query).toHaveBeenCalledWith("insert into tb_contact (name) values ($1)", ["Smith"])
    })

    test("deleteOne", async () => {
        const ds = new PGContactDataSource(mockDatabase);
        await ds.deleteOne("1");
        expect(mockDatabase.query).toHaveBeenCalledWith("delete tb_contact where id = $1", ["1"])
    })

    test("updateOne", async () => {
        const ds = new PGContactDataSource(mockDatabase);
        await ds.updateOne("1", { name: "Ramon" });
        expect(mockDatabase.query).toHaveBeenCalledWith("update tb_contact set name = $1 where id = $2", ["Ramon", "1"])
    })

    test("getOne", async () => {
        const ds = new PGContactDataSource(mockDatabase);
        jest.spyOn(mockDatabase, "query").mockImplementation(() => Promise.resolve({ rows: [{ id: "123", name: "Smith", }] }))
        const result = await ds.getOne("123");
        expect(result).toStrictEqual({ name: "Smith", id: "123" })
        expect(mockDatabase.query).toHaveBeenCalledWith("select * from tb_contact where id = $1 limit 1", ["123"])
    })

})