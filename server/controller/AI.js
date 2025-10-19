import dotenv from "dotenv";
dotenv.config();

export const AI_API = async (req, res) => {
  const { message } = req.body;
  const HF_TOKEN = process.env.HF_TOKEN 
console.log(HF_TOKEN)
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const ress = await fetch("https://router.huggingface.co/v1/chat/completions", {
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ 
    messages: [
        {
            role: "user",
            content: message,
        },
    ],
    model: "openai/gpt-oss-120b:cerebras",
}),
    });

    const data = await ress.json();
    const reply =
      data?.choices?.[0]?.message?.content ||
      data?.choices?.[0]?.text ||
      "No response";

    return res.json({ reply });
  } catch (err) {
    console.error("AI API Error:", err);
    return res.status(500).json({ error: err.message });
  }
};
