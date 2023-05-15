import dayjs from "dayjs";
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
    
        const findGameId = await db.query(`SELECT * FROM games WHERE id = $1;`,[gameId])
        const findCustomerId = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])

        if (findCustomerId.rows.length === 0 || findGameId.rows.length === 0) return res.sendStatus(400)

        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = daysRented * findGameId.rows[0].pricePerDay

        const checkGame = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" is null;`, [gameId])

        if(checkGame.rows.length > findGameId.rows[0].stockTotal) return res.sendStatus(400)

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES($1, $2, $3, $4, null, $5, null);`, [customerId, gameId, rentDate, daysRented, originalPrice])
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

