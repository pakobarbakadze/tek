import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SK);

const createPayment = async (req, res) => {
  const { amount } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.status(200).json({ clientSecret: payment.client_secret });
  } catch (e) {
    res.status(500).send(e);
  }
};

export { createPayment };
