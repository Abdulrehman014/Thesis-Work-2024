import { verifyCredential } from 'did-jwt-vc';
import { getResolver as keyResolver } from 'key-did-resolver';
import { Resolver } from 'did-resolver';
import fs from 'fs';
import path from 'path';

// Define the path for the wallet file
const walletPath = path.join(path.resolve(), 'wallet.json');

// Load the VC from the wallet.json file
function loadVC() {
  if (fs.existsSync(walletPath)) {
    const wallet = JSON.parse(fs.readFileSync(walletPath));
    return wallet.credentials[0];  // Load the first VC in the wallet for verification
  } else {
    console.error('No wallet found at:', walletPath);
    return null;
  }
}

// Function to verify the Verifiable Credential
async function verifyVC() {
  const vcJwt = loadVC();  // Load the Verifiable Credential (JWT) from wallet.json

  if (!vcJwt) {
    console.error('No VC found to verify.');
    return;
  }

  // Resolver to resolve the DID for verification
  const resolver = new Resolver({
    ...keyResolver()  // Use the key DID resolver to resolve DID:key
  });

  try {
    // Verify the Verifiable Credential (JWT)
    const verifiedVC = await verifyCredential(vcJwt, resolver);

    console.log('VC verification successful:', verifiedVC);
  } catch (error) {
    console.error('VC verification failed:', error);
  }
}

verifyVC();
