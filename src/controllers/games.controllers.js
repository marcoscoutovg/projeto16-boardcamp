import { db } from "../database/database.connection.js";

export async function getGames(req, res) {
    try {
        const listGames = await db.query(`SELECT * FROM games;`)
        res.send(listGames.rows)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function postGames(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body

    if (!name || stockTotal < 1 || pricePerDay < 1) return res.sendStatus(400);

    // status 409 caso já tenha name

    try {
        await db.query(`INSERT INTO games 
        (name, image, "stockTotal", "pricePerDay") 
        VALUES ($1, $2, $3, $4)`,[name, image, stockTotal, pricePerDay]);
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }
}