import server from './server'
import ContactRouter from './presentation/routers/contact-router'
import { GetAllContacts } from './domain/use-cases/contact/get-all-contacts'
import { ContactRepositoryImpl } from './domain/repositories/contact-repository'
import { CreateContact } from './domain/use-cases/contact/create-contact'
import { MongoClient } from 'mongodb'
import { NoSQLDatabaseWrapper } from './data/interfaces/data-sources/nosql-database-wrapper'
import { MongoDBContactDataSource } from './data/data-sources/mongodb/mongodb-contact-data-source'


(async () => {
    const client: MongoClient = new MongoClient("mongodb://localhost:27017/contacts")
    await client.connect()
    const db = client.db("CONTACTS_DB");

    const contactDatabase: NoSQLDatabaseWrapper = {
        find: (query) => db.collection("contacts").find(query).toArray(),
        insertOne: (doc) => db.collection("contacts").insertOne(doc),
        deleteOne: (id: String) => db.collection("contacts").deleteOne({ _id: id }),
        updateOne: (id: String, data: object) => db.collection("contacts").updateOne({ _id: id }, data)
    }

    const contactMiddleWare = ContactRouter(
        new GetAllContacts(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))),
        new CreateContact(new ContactRepositoryImpl(new MongoDBContactDataSource(contactDatabase))),
    )

    server.use("/contact", contactMiddleWare)
    server.listen(4000, () => console.log("Running on http://localhost:4000"))

})()
