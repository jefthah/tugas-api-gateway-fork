const express = require("express");

const app = express();
const port = 3002;

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
    try {
        const subjects = await prisma.subject.findMany()
        res.send(subjects);
    } catch (error) {
        console.log(error.message)
    } finally {
        await prisma.$disconnect();
    }
})

app.listen(port, () => {
    console.log(`Subject service listening on port ${port}`);
})