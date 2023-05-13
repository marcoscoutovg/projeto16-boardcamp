import { Router } from "express"
import { finalizeRentals, getRentals, insertRentals } from "../controllers/rentals.controllers.js"

const rentalsRouter = Router()

rentalsRouter.get("/rentals", getRentals)

rentalsRouter.post("/rentals", insertRentals)

rentalsRouter.post("/rentals/:id/return", finalizeRentals)

export default rentalsRouter;