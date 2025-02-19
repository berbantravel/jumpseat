"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface Instructions {
  ios?: Array<{
    installation_via_qr_code: {
      steps: string;
      qr_code_url: string;
    };
    installation_manual: {
      steps: string;
    };
    network_setup: {
      steps: string;
    };
  }>;
  android?: Array<{
    installation_via_qr_code: {
      steps: string;
      qr_code_url: string;
    };
    installation_manual: {
      steps: string;
    };
    network_setup: {
      steps: string;
    };
  }>;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const storedIccid = typeof window !== "undefined" ? localStorage.getItem("iccid") : null;
  const iccid = searchParams.get("iccid") || storedIccid || "No ICCID available.";

  const [instructions, setInstructions] = useState<Instructions | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (iccid === "No ICCID available.") return;

    const fetchInstallationInstructions = async () => {
      try {
        const response = await fetch(`/api/instructions?iccid=${iccid}`);
        const data = await response.json();
        console.log("🟢 Frontend: Installation Instructions Response:", data);

        if (response.ok) {
          setInstructions(data.data.instructions);
        } else {
          setError(data.error || "Failed to fetch installation instructions.");
        }
      } catch (err) {
        console.error("🔴 Fetch Error:", err);
        setError("Something went wrong. Please try again.");
      }
    };

    fetchInstallationInstructions();
  }, [iccid]);

  return (
    <div>
      <h1>Installation Instructions</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {instructions ? <pre>{JSON.stringify(instructions, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
}


  return (
    <div className="container mx-auto max-w-screen-xl p-6">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">✅ eSIM Purchase Successful</h1>

      {error && <p className="text-red-600 text-center mt-4 font-semibold">⚠️ {error}</p>}

      {instructions ? (
        <div className="mt-6 p-6">
          <h3 className="font-bold text-2xl text-gray-900 mb-4">📲 Installation Instructions</h3>

          {instructions.ios && instructions.ios.length > 0 && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h4 className="font-semibold text-lg text-gray-800">📱 iOS Installation</h4>
              <h5 className="font-semibold text-gray-700 mt-2">Installation via QR Code</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.ios[0].installation_via_qr_code.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>
              <img
                src={instructions.ios[0].installation_via_qr_code.qr_code_url}
                className="size-20"
                alt="iOS QR Code"
              />

              <h5 className="font-semibold text-gray-700 mt-4">Installation Manual</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.ios[0].installation_manual.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>

              <h5 className="font-semibold text-gray-700 mt-4">Network Setup</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.ios[0].network_setup.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>
            </div>
          )}

          {instructions.android && instructions.android.length > 0 && (
            <div className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
              <h4 className="font-semibold text-lg text-gray-800">🤖 Android Installation</h4>
              <h5 className="font-semibold text-gray-700 mt-2">Installation via QR Code</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.android[0].installation_via_qr_code.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>
              <img
                src={instructions.android[0].installation_via_qr_code.qr_code_url}
                className="size-20"
                alt="Android QR Code"
              />

              <h5 className="font-semibold text-gray-700 mt-4">Installation Manual</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.android[0].installation_manual.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>

              <h5 className="font-semibold text-gray-700 mt-4">Network Setup</h5>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                {Object.entries(instructions.android[0].network_setup.steps).map(([step, text]) => (
                  <li key={step}>{text}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      ) : (
        !error && <p className="text-center text-gray-700 mt-6">Loading installation instructions...</p>
      )}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-700 mt-6">Loading...</p>}>
      <SuccessContent />
    </Suspense>
  );
}
