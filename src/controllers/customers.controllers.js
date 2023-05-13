import { db } from "../database/database.connection.js";

export async function getCustomers(req, res) {
    try {
        const listCustomers = await db.query(`SELECT * FROM customers;`);
        res.send(listCustomers.rows)

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function getCustomersById(req, res) {

    const { id } = req.params
    try {
        const customersById = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]);
        res.send(customersById.rows[0])

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function insertCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body
    try {
        const insertCustomers = await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
        VALUES(${name}, ${phone}, ${cpf}, ${birthday})`);
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function updateCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`UPDATE customers SET 
        name = ${name} 
        phone = ${phone}
        cpf = ${cpf}
        birthday = ${birthday} 
        WHERE id = ${id}`)

        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(500)
    }
}
