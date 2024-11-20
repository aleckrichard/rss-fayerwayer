import express from "express"; // Cambia require por import
import fetch from "node-fetch";
import cors from "cors";

const app = express();
// Habilitar CORS
app.use(cors());

app.get("/fetch-xml", async (req, res) => {
    const url = "https://www.fayerwayer.com/arc/outboundfeeds/rss/?outputType=xml";
    try {
        const response = await fetch(url);
        const xml = await response.text();
        res.send(xml);
    } catch (error) {
        res.status(500).send("Error al obtener el XML");
    }
});

app.listen(3000, () => console.log("Servidor corriendo en el puerto 3000"));
