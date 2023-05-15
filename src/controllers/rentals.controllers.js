import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {

    //listar com todos os alugueis, contendo customers e o game do aluguel


    try {
        const listRentals = await db.query(`SELECT * FROM rentals;`)
        res.send(listRentals.rows)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function insertRentals(req, res) {

    const { customerId, gameId, daysRented } = req.body

    try {
        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFree")
        VALUES(     );`, [customerId, gameId, daysRented])
        res.sendStatus(201)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function finalizeRentals(req, res) {

    const { id } = req.params
    try {
        await db.query(`INSERT INTO rentals (customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFree)
        VALUES(     );`)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function deleteRentals(req, res) {

    const { id } = req.params
    try {
        await db.query(`DELETE FROM rentals WHERE id = $1`, [id])
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}

