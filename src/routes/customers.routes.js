import { Router } from "express"
import { getCustomers, getCustomersById, insertCustomers, updateCustomers } from "../controllers/customers.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { customerSchema } from "../schemas/customers.schemas.js"

const customersRouter = Router()

customersRouter.get("/customers", getCustomers)

customersRouter.get("/customers/:id", getCustomersById)

customersRouter.post("/customers", validateSchema(customerSchema), insertCustomers)

customersRouter.put("/costumers/:id", validateSchema(customerSchema), updateCustomers)

export default customersRouter;