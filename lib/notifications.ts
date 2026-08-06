import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const EMAILS = {
  orders: "orders@aarvyanaturals.in",
  support: "support@aarvyanaturals.in",
};

type OrderEmailItem = {
  name: string;
  variant: string;
  quantity: number;
  price: number;
};

export type OrderEmailData = {
  customerName: string;
  customerEmail: string;
  customerMobile?: string;
  customerAddress?: string;
  orderId: string;
  paymentId?: string;
  total: number;
  items: OrderEmailItem[];
};

export async function sendOrderConfirmationEmail(
  data: OrderEmailData
) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;">
          ${item.name} (${item.variant}) × ${item.quantity}
        </td>
        <td style="padding:8px 0;text-align:right;">
          ₹${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  return resend.emails.send({
    from: `Aarvya Naturals <${EMAILS.orders}>`,
    to: data.customerEmail,
    subject: "🌿 Your Aarvya Naturals Order is Confirmed",
    html: `
      <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;padding:30px;">

        <h1 style="color:#166534;margin-bottom:0;">
          🌿 Aarvya Naturals
        </h1>

        <p style="font-size:18px;">
          Hi <strong>${data.customerName}</strong>,
        </p>

        <p>
          Thank you for shopping with Aarvya Naturals.
          Your order has been successfully confirmed.
        </p>

        <div style="margin:25px 0;padding:18px;border:1px solid #d1d5db;border-radius:10px;">
          <strong>Order ID</strong><br/>
          ${data.orderId}
        </div>

        <table width="100%" cellspacing="0" cellpadding="0">
          ${itemsHtml}
        </table>

        <hr style="margin:25px 0;" />

        <h3>Total Paid : ₹${data.total}</h3>

        <p>
          We'll notify you again once your order has been dispatched.
        </p>

        <p>
          Thank you for choosing Aarvya Naturals ❤️
        </p>

      </div>
    `,
  });
}

export async function sendAdminOrderNotification(
  data: OrderEmailData
) {
  const itemsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;">
          ${item.name} (${item.variant}) × ${item.quantity}
        </td>
        <td style="padding:8px 0;text-align:right;">
          ₹${item.price}
        </td>
      </tr>
    `
    )
    .join("");

  console.log("Customer email received:", JSON.stringify(data.customerEmail));

return resend.emails.send({
    from: `Aarvya Naturals <${EMAILS.orders}>`,
    to: "aarvya12@gmail.com",

    subject:
      data.total >= 5000
        ? `🔥 High Value Order Received - ₹${data.total}`
        : `🛒 New Order Received`,

    html: `
      <div style="font-family:Arial,sans-serif;max-width:700px;margin:auto;padding:30px;">

        <h1 style="color:#166534;">
          🛒 New Order Received
        </h1>

        <p>
          A customer has placed a new order on
          <strong>Aarvya Naturals</strong>.
        </p>

        <hr/>

        <p><strong>Order ID</strong><br/>
        ${data.orderId}</p>

        <p><strong>Customer</strong><br/>
        ${data.customerName}</p>

        ${
          data.customerMobile
            ? `<p><strong>Mobile</strong><br/>${data.customerMobile}</p>`
            : ""
        }

        <p><strong>Email</strong><br/>
        ${data.customerEmail}</p>

        ${
          data.customerAddress
            ? `<p><strong>Delivery Address</strong><br/>${data.customerAddress}</p>`
            : ""
        }

        ${
          data.paymentId
            ? `<p><strong>Payment ID</strong><br/>${data.paymentId}</p>`
            : ""
        }

        <hr/>

        <table width="100%" cellspacing="0" cellpadding="0">
          ${itemsHtml}
        </table>

        <hr/>

        <h2 style="color:#166534;">
          Grand Total : ₹${data.total}
        </h2>

        <p>
          Please process this order from the Admin Panel.
        </p>

      </div>
    `,
  });
}