import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔐 DATOS DE TU BOT
const BOT_TOKEN = "8527435443:AAFCaga7kI8KkQmlrN9U2HFqnrNSV3cLkVU";
const CHAT_ID = "@KotNudExp";

// ✅ RUTA PRINCIPAL (SALUD DEL SERVIDOR)
app.get("/", (req, res) => {
  res.send("✅ Telegram Relay Active");
});

// ✅ EVITAR ERRORES CUANDO ABREN /relay EN EL NAVEGADOR (GET)
app.get("/relay", (req, res) => {
  res.send("⛔ Usa método POST. GET no permitido.");
});

// ✅ RUTA REAL QUE PUBLICA EN TELEGRAM (POST)
app.post("/relay", async (req, res) => {
  try {
    const { foto, mensaje, boton } = req.body;

    // ✅ VALIDACIÓN SIMPLE
    if (!foto || !mensaje || !boton) {
      return res.status(400).json({
        error: "Faltan datos: foto, mensaje o boton"
      });
    }

    // ✅ PAYLOAD PARA TELEGRAM
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

    // ✅ ENVÍO A TELEGRAM
    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await tg.json();

    // ✅ RESPUESTA FINAL
    res.json(data);

  } catch (err) {
    res.status(500).json({
      error: "Error interno en relay",
      detalle: err.message
    });
  }
});

// ✅ PUERTO PARA RENDER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Telegram Relay activo en puerto", PORT);
});
