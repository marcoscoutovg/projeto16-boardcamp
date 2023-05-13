import { Router } from "express"
import { getCustomers, getCustomersById, insertCustomers, updateCustomers } from "../controllers/customers.controllers.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)

customersRouter.get("/customers/:id", getCustomersById)

customersRouter.post("/customers", insertCustomers)

customersRouter.put("/costumers/:id", updateCustomers)

export default customersRouter;