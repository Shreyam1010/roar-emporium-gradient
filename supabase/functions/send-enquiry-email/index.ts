import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface EnquiryEmailRequest {
  userName: string;
  userEmail: string;
  productName: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userName, userEmail, productName, message }: EnquiryEmailRequest = await req.json();

    console.log("Sending enquiry email for:", { userName, userEmail, productName });

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ROAR Exim <onboarding@resend.dev>",
        to: ["admin@roarexim.com"],
        subject: `New Enquiry: ${productName}`,
        html: `
          <h1>New Product Enquiry</h1>
          <div style="margin: 20px 0; padding: 20px; background: #f5f5f5; border-radius: 8px;">
            <p><strong>Product:</strong> ${productName}</p>
            <p><strong>Customer Name:</strong> ${userName}</p>
            <p><strong>Customer Email:</strong> ${userEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">This is an automated message from ROAR Exim enquiry system.</p>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const error = await emailResponse.text();
      throw new Error(`Resend API error: ${error}`);
    }

    const result = await emailResponse.json();
    console.log("Email sent successfully:", result);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-enquiry-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
