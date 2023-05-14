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

        console.log(customersById)

        if (customersById.rows.id) return res.sendStatus(404);

        res.send(customersById.rows[0])

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function insertCustomers(req, res) {

    const { name, phone, cpf, birthday } = req.body
    try {
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday)
        VALUES($1, $2, $3, $4);`, [name, phone, cpf, birthday]);
        res.sendStatus(201)

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function updateCustomers(req, res) {

    const {id} = req.params

    const { name, phone, cpf, birthday } = req.body

    try {
        await db.query(`UPDATE customers SET 
        name = $1
        phone = $2
        cpf = $3
        birthday = $4
        WHERE id = $5;` ,[name, phone, cpf, birthday, id])

        res.sendStatus(200)

    } catch (err) {
        res.sendStatus(500)
    }
}
