import express from 'express'
import { Request, Response } from 'express'
import { CreateContactUseCase } from '../../domain/interfaces/use-cases/create-contact-use-case'
import { GetAllContactsUseCase } from '../../domain/interfaces/use-cases/get-all-contacts-use-case'


export default function ContactsRouter(
    getAllContactsUseCase: GetAllContactsUseCase,
    createContactUseCase: CreateContactUseCase
) {
    const router = express.Router()

    router.get('/', async (req: Request, res: Response) => {
        try {
            const contacts = await getAllContactsUseCase.execute()
            res.send(contacts)
        } catch (err) {
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.post('/', async (req: Request, res: Response) => {
        try {
            await createContactUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router
}