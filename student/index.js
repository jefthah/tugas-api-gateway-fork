const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require('cors');

const app = express();
const port = 3001;

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/students", async (req, res) => {
    try {
        const students = await prisma.student.findMany();
        res.send(students);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/students/add", async (req, res) => {
    try {
        const { nim, name, email, telp } = req.body;

        // Temukan ID terbesar yang ada di database
        const lastStudent = await prisma.student.findFirst({
            orderBy: { id: 'desc' }
        });

        // Hitung ID baru dengan menambahkan 1 ke ID terbesar
        const newId = lastStudent ? lastStudent.id + 1 : 1;

        const newStudent = await prisma.student.create({
            data: {
                id: newId,
                nim,
                name,
                email,
                telp
            }
        });
        res.send(newStudent);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nim, name, email, telp } = req.body;
        const updatedStudent = await prisma.student.update({
            where: {
                id: parseInt(id)
            },
            data: {
                nim,
                name,
                email,
                telp
            }
        });
        res.send(updatedStudent);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.student.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.send({ message: "Student deleted" });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Student service listening on port ${port}`);
});
