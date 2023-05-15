import dayjs from "dayjs";
import { db } from "../database/database.connection.js";

export async function getRentals(req, res) {

    //listar com todos os alugueis, contendo customers e o game do aluguel


    try {
        const rentals = await db.query(`SELECT rentals.*, customers.id AS customer_id,
        customers.name AS customer_name,
        games.id AS game_id, games.name AS game_name FROM rentals 
        JOIN customers ON rentals."customerId" = customers.id 
        JOIN games ON rentals."gameId" = games.id;`)
        
        const listRentals = rentals.rows.map((l) => ({
            id: l.id,
            customerId: l.customerId,
            gameId: l.gameId,
            rentDate: l.rentDate,
            daysRented: l.daysRented,
            returnDate: l.returnDate,
            originalPrice: l.originalPrice,
            delayFee: l.delayFee,
            customer: {
                id: l.customer_id,
                name: l.customer_name
            },
            game: {
                id: l.game_id,
                name: l.game_name
            }
        }))

        console.table(listRentals)

        

        res.status(200).send(listRentals)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function insertRentals(req, res) {

    const { customerId, gameId, daysRented } = req.body

    try {

        const findGameId = await db.query(`SELECT * FROM games WHERE id = $1;`, [gameId])
        const findCustomerId = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])

        if (findCustomerId.rows.length === 0 || findGameId.rows.length === 0) return res.sendStatus(400)

        const rentDate = dayjs().format("YYYY-MM-DD")
        const originalPrice = daysRented * findGameId.rows[0].pricePerDay

        const checkGame = await db.query(`SELECT * FROM rentals WHERE "gameId"=$1 AND "returnDate" = null;`, [gameId])

        if (checkGame.rows.length >= findGameId.rows[0].stockTotal) return res.sendStatus(400)

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

        const returnDate = dayjs().format("YYYY-MM-DD");

        const rent = await db.query(`SELECT * FROM rentals WHERE id = $1;`, [id])

        await db.query(`UPDATE rentals SET 
        "returnDate" = $1, 
        WHERE id = $2;`, [returnDate, id])

        if(rent.rows.length === 0) return res.sendStatus(404)

        if (rent.rows[0].returnDate !== null) return res.sendStatus(400)
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}

export async function deleteRentals(req, res) {

    const { id } = req.params

    try {
        const rent = await db.query(`SELECT * FROM rentals WHERE id=$1;`, [id])

        if (rent.rows.length === 0) return res.sendStatus(404)

        if (rent.rows[0].returnDate === null) return res.sendStatus(400)

        await db.query(`DELETE FROM rentals WHERE id = $1;`, [id])
        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500)
    }
}

