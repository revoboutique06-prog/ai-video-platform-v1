import { Controller, Post, Body } from "@nestjs/common";

@Controller()
export class CallbackController {

  @Post("payment-callback")
  handleCallback(@Body() body) {

    console.log("Callback Received:", body);

    if (body.payment_status === "finished") {
      // هنا يتم تفعيل الحساب
      console.log("تم الدفع بنجاح — الحساب جاهز للتفعيل");
      
      // مثال: تحديث المستخدم في قاعدة البيانات
      // await prisma.user.update({
      //   where: { id: body.order_id },
      //   data: { isActive: true }
      // });
    }

    return "OK";
  }
}
