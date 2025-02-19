export async function GET(req) {
    const API_URL_TOKEN = "https://sandbox-partners-api.airalo.com/v2/token";
    const API_URL_INSTRUCTIONS = "https://sandbox-partners-api.airalo.com/v2/sims";
    const CLIENT_ID = process.env.AIRALO_CLIENT_ID;
    const CLIENT_SECRET = process.env.AIRALO_CLIENT_SECRET;
  
    const { searchParams } = new URL(req.url);
    const iccid = searchParams.get("iccid");
  
    if (!iccid) {
      return new Response(JSON.stringify({ error: "ICCID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
  
    const formData = new URLSearchParams();
    formData.append("client_id", CLIENT_ID);
    formData.append("client_secret", CLIENT_SECRET);
    formData.append("grant_type", "client_credentials");
  
    try {
     // Fetch Access Token 
      const tokenResponse = await fetch(API_URL_TOKEN, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
  
      const tokenData = await tokenResponse.json();
      const accessToken = tokenData?.data?.access_token;
  
      if (!accessToken) {
        throw new Error("Failed to retrieve access token.");
      }
  
      console.log("🔵 Backend: Retrieved Access Token:", accessToken);
  
      // Fetch Installation Instructions
      const instructionsResponse = await fetch(`${API_URL_INSTRUCTIONS}/${iccid}/instructions`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
          "Accept-Language": "en",
        },
      });
  
      const instructionsData = await instructionsResponse.json();
  
      console.log("🟢 Backend: Retrieved Installation Instructions:", instructionsData);
  
      return new Response(JSON.stringify(instructionsData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("🔴 Backend Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
  