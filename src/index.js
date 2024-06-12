const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/equipos", async (req, res) => {
  const {
    nombreEquipo,
    institucion,
    departamento,
    municipio,
    direccion,
    telefono,
  } = req.body;
  try {
    const result = await prisma.equipos.create({
      data: {
        nombreEquipo,
        institucion,
        departamento,
        municipio,
        direccion,
        telefono,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong :(",
      error: error.message,
    });
  }
});

//mostrar todos los registros
app.get("/equipos", async (req, res) => {
  try {
    const teams = await prisma.equipos.findMany();
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong :(",
      error: error.message,
    });
  }
});
const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000
⭐️ See sample requests: http://pris.ly/e/js/rest-express#3-using-the-rest-api`)
);
