import stripeModule from "stripe";
import { userModel } from "../models/userModel.js";
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    const { email, id } = jwt.decode(token);
    const items= await userModel.consultarCarrito(id);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.nombre,
            images: [item.imagen],
          },
          unit_amount: item.precio,
        },
        quantity: item.cantidad,
      })),
      mode: "payment",
      success_url: `https://edi-market-fr.vercel.app/compra-exitosa`,
      cancel_url: `https://edi-market-fr.vercel.app/carro`,
    });
    res.status(200).json({
      sessionId: session.id,
      sessionUrl: session.url,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const stripeController = {
  createCheckoutSession}