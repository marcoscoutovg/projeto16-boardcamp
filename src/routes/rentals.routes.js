import { Router } from "express"
import { deleteRentals, finalizeRentals, getRentals, insertRentals } from "../controllers/rentals.controllers.js"
import { validateSchema } from "../middlewares/validateSchema.middlewares.js"
import { rentalsSchema } from "../schemas/rentals.schemas.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)

rentalsRouter.post("/rentals", validateSchema(rentalsSchema), insertRentals)

rentalsRouter.post("/rentals/:id/return", finalizeRentals)

rentalsRouter.delete("/rentals/:id", deleteRentals)

export default rentalsRouter;