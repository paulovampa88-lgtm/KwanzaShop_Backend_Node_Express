import express from "express";
import { sendDataToBase44 } from "../services/base44Service.js";

const router = express.Router();

router.post("/upload-product", async (req, res) => {
  try {
    const product = req.body;

    // validação simples
    if (!product.title || !product.price_usd || !product.category) {
      return res.status(400).json({
        error: "Campos obrigatórios: title, price_usd, category"
      });
    }

    const result = await sendDataToBase44(product);

    res.json({
      message: "Produto enviado com sucesso para Base44!",
      result
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;
