import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BOT_TOKEN = "AQUI_PONES_TU_TOKEN_REAL";
const CHAT_ID = "@KotNudExp";

app.post("/relay", async (req, res) => {
  try {
    const { foto, mensaje, boton } = req.body;

    const payload = {
      chat_id: CHAT_ID,
      photo: foto,
      caption: mensaje,
      reply_markup: {
        inline_keyboard: [[
          { text: "⬇ DESCARGAR AHORA", url: boton }
        ]]
      }
    };

    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await tg.json();
    res.json(data);
  } catch (err) {
    res.json({ error: err.message });
  }
});

app.get("/", (req, res) => {
  res.send("✅ Telegram Relay Active");
});

app.listen(3000, () => {
  console.log("Relay activo");
});
