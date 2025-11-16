import axios from "axios";

export const sendDataToBase44 = async (product) => {
  try {
    const url = `https://app.base44.com/api/apps/${process.env.BASE44_APP_ID}/entities/Product`;

    const response = await axios.post(
      url,
      product,
      {
        headers: {
          "Content-Type": "application/json",
          "api_key": process.env.BASE44_API_KEY
        }
      }
    );

    return response.data;

  } catch (error) {
    console.error("Erro Base44 →", error.response?.data || error.message);
    throw new Error("Falha ao enviar dados para a Base44");
  }
};
