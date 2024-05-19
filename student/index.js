const express = require("express");

const app = express();
const port = 3001;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
    try {
        const students = await prisma.student.findMany()
        res.send(students);
    } catch (error) {
        console.log(error.message)
    } finally {
        await prisma.$disconnect();
    }
})

app.listen(port, () => {
    console.log(`Student service listening on port ${port}`);
})