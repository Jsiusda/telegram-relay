import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const BOT_TOKEN = "8527435443:AAFCaga7kI8KkQmlrN9U2HFqnrNSV3cLkVU";
const CHAT_ID = "@KotNudExp";

// ✅ RUTA PRINCIPAL (TEST)
app.get("/", (req, res) => {
  res.send("✅ Telegram Relay Active");
});

// ✅ ESTA ES LA RUTA QUE USA EL CRON (SIN BODY)
app.post("/relay", async (req, res) => {
  try {
    // 1️⃣ Pedir datos a tu web
    const prepare = await fetch("https://kotnudexp.ct.ws/public/telegram_prepare.php");
    const data = await prepare.json();

    if (!data || !data.foto || !data.mensaje || !data.boton) {
      return res.status(400).json({ error: "No hay contenido para publicar" });
    }

    // 2️⃣ Enviar a Telegram
    const payload = {
      chat_id: CHAT_ID,
      photo: data.foto,
      caption: data.mensaje,
      reply_markup: {
        inline_keyboard: [[
          { text: "⬇ DESCARGAR AHORA", url: data.boton }
        ]]
      }
    };

    const tg = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendPhoto`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const result = await tg.json();
    res.json(result);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("✅ Relay activo en puerto 3000");
});
