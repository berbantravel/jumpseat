import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { RefNo, Status } = req.body; // Example response fields from iPay88

    if (Status === "1") { // Assuming "1" means success
      const iccid = req.cookies.ICCID || "No ICCID available";
      res.redirect(`/success?iccid=${encodeURIComponent(iccid)}`);
    } else {
      res.redirect("/payment-failed");
    }
  } catch (error) {
    console.error("Payment Response Handling Error:", error);
    res.redirect("/payment-failed");
  }
}
