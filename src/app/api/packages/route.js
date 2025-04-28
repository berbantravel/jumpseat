export async function GET(req) {
  const API_URL_TOKEN = "https://sandbox-partners-api.airalo.com/v2/token";
  const API_URL_PACKAGES = "https://sandbox-partners-api.airalo.com/v2/packages";
  const CLIENT_ID = process.env.AIRALO_CLIENT_ID;
  const CLIENT_SECRET = process.env.AIRALO_CLIENT_SECRET;

  const formData = new URLSearchParams();
  formData.append("client_id", CLIENT_ID);
  formData.append("client_secret", CLIENT_SECRET);
  formData.append("grant_type", "client_credentials");

  try {
      // Step 1: Fetch the Access Token
      const tokenResponse = await fetch(API_URL_TOKEN, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formData,
      });

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData?.data?.access_token;

      console.log("🔵 Backend: Retrieved Access Token:", accessToken);

      // Step 2: Fetch all eSIM Packages using the Access Token (loop through all pages)
      let allPackages = [];
      let currentPage = 1;
      let lastPage = 1;
      do {
          const params = new URLSearchParams({ "page": currentPage.toString() });
          const packagesResponse = await fetch(`${API_URL_PACKAGES}?${params.toString()}`, {
              method: "GET",
              headers: {
                  "Accept": "application/json",
                  "Authorization": `Bearer ${accessToken}`,
              },
          });
          const packagesData = await packagesResponse.json();
          allPackages = allPackages.concat(packagesData.data || []);
          lastPage = packagesData.meta?.last_page || 1;
          currentPage++;
      } while (currentPage <= lastPage);

      // === COUNTRY FILTER START ===
      const PARTNER_COUNTRIES = [
          "Vietnam",
          "Thailand",
          "South Korea",
          "Japan",
          "Mongolia",
          "Philippines",
          "Taiwan",
          "Singapore",
          "Indonesia",
          "United Arab Emirates", // for Dubai
          "China",                // for Shanghai, Macau, and mainland China
          "China (Hong Kong)",    // if you want Hong Kong
          "China (Macau)"         // if you want Macau
      ];

      const filteredPackages = allPackages.filter(pkg => {
          const country = pkg.title || "";
          return PARTNER_COUNTRIES.some(
              partner => country.toLowerCase() === partner.toLowerCase()
          );
      });
      // === COUNTRY FILTER END ===

      console.log("🟢 Backend: Filtered Packages Data:", filteredPackages);

      return new Response(JSON.stringify({ data: filteredPackages }), {
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

export async function POST(req) {
  const API_URL_TOKEN = "https://sandbox-partners-api.airalo.com/v2/token";
  const API_URL_ORDER = "https://sandbox-partners-api.airalo.com/v2/orders";
  const API_URL_INSTALLATION = "https://sandbox-partners-api.airalo.com/v2/sims";
  const CLIENT_ID = process.env.AIRALO_CLIENT_ID;
  const CLIENT_SECRET = process.env.AIRALO_CLIENT_SECRET;

  if (!CLIENT_ID || !CLIENT_SECRET) {
      return new Response(JSON.stringify({ 
          success: false, 
          error: "Missing required environment variables" 
      }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
      });
  }

  const formData = new URLSearchParams();
  formData.append("client_id", CLIENT_ID);
  formData.append("client_secret", CLIENT_SECRET);
  formData.append("grant_type", "client_credentials");

  try {
      // Step 1: Fetch the Access Token
      const tokenResponse = await fetch(API_URL_TOKEN, {
          method: "POST",
          headers: { "Accept": "application/json" },
          body: formData,
      });

      if (!tokenResponse.ok) {
          throw new Error(`Failed to get access token: ${tokenResponse.statusText}`);
      }

      const tokenData = await tokenResponse.json();
      const accessToken = tokenData?.data?.access_token;

      if (!accessToken) {
          throw new Error("No access token received from Airalo API");
      }

      console.log("🔵 Backend: Retrieved Access Token");

      // Step 2: Parse the request body to get order details
      const body = await req.json();
      const { quantity, package_id, description } = body;

      if (!package_id) {
          return new Response(JSON.stringify({ error: "Package ID is required" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
          });
      }

      // Step 3: Submit the Order
      const orderData = {
          quantity,
          package_id,
          type: "sim",
          description: description || `1 sim ${package_id}`,
      };

      const orderResponse = await fetch(API_URL_ORDER, {
          method: "POST",
          headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${accessToken}`,
              "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
      });

      const orderResult = await orderResponse.json();
      console.log("🟢 Backend: Order Response:", orderResult);

      if (!orderResponse.ok) {
          return new Response(JSON.stringify(orderResult), {
              status: orderResponse.status,
              headers: { "Content-Type": "application/json" },
          });
      }

      // Step 4: Retrieve eSIM Installation Instructions
      const iccid = orderResult?.data?.sims?.[0]?.iccid;
      if (!iccid) {
          console.error("🔴 No ICCID found in order response.");
          return new Response(JSON.stringify({ error: "ICCID not found in order response" }), {
              status: 500,
              headers: { "Content-Type": "application/json" },
          });
      }

      const installationResponse = await fetch(`${API_URL_INSTALLATION}/${iccid}/instructions`, {
          method: "GET",
          headers: {
              "Accept": "application/json",
              "Authorization": `Bearer ${accessToken}`,
              "Accept-Language": "en",
          },
      });

      const installationData = await installationResponse.json();
      console.log("📘 Backend: Installation Instructions:", installationData);

      // Combine Order Result and Installation Instructions
      const responsePayload = {
          order: orderResult,
          installation: installationData,
      };

      return new Response(JSON.stringify(responsePayload), {
          status: 200,
          headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
      console.error("🔴 Backend Order Error:", error);
      return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
      });
  }
} 