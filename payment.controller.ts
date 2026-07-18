import axios from "axios";
import { Controller, Get } from "@nestjs/common";

@Controller()
export class PaymentController {

  @Get("create-payment")
  async createPayment() {
    const res = await axios.post(
      "https://api.nowpayments.io/v1/payment",
      {
        price_amount: 10,
        price_currency: "USD",
        pay_currency: "USDT",
        ipn_callback_url: "https://YOUR_DOMAIN/payment-callback"
      },
      {
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_KEY
        }
      }
    );

    return { pay_url: res.data.pay_url };
  }
}
