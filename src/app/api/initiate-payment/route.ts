import { generateSignature } from '@/lib/ipay88';  // Import your signature function

export async function handlePaymentResponse(response: any) {
    const { MerchantCode, RefNo, Amount, Currency, Signature } = response;
    
    const merchantKey = process.env.NEXT_PUBLIC_IPAY88_MERCHANT_KEY as string;

    // Check if a signature exists in the response
    if (!Signature) {
        console.log('No signature found in the response.');
        return;
    }

    // Recompute the signature on the server side
    const recomputedSignature = generateSignature({ MerchantCode, RefNo, Amount, Currency }, merchantKey);
    
    // Compare the recomputed signature with the one returned from the response
    if (recomputedSignature === Signature) {
        console.log('Signatures match, the request is valid.');
        // Process the successful transaction
    } else {
        console.log('Signature not match.');
        // Handle the error: possible fraudulent request
    }
}
