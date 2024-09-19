import fs from 'fs';
import path from 'path';
import { verifyCredential } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver as keyResolver } from 'key-did-resolver';

const walletPath = path.join(path.resolve(), 'wallet.json');

async function deliverVP() {
  if (!fs.existsSync(walletPath)) {
    console.error('No wallet found. Please generate and store a VC first.');
    return;
  }

  const wallet = JSON.parse(fs.readFileSync(walletPath));

  if (wallet.credentials.length === 0) {
    console.error('No credentials found in wallet.');
    return;
  }

  const vcJwt = wallet.credentials[0];
  console.log('Delivering VP for VC:', vcJwt);

  // Manually create the resolver with the DID method for did:key
  const resolver = new Resolver({
    ...keyResolver(),  // Ensure correct resolver for 'did:key'
  });

  // Log the resolver to inspect it
  console.log('Resolver:', resolver);

  try {
    // Verify the Verifiable Credential (JWT) using the resolver
    const verifiedVC = await verifyCredential(vcJwt, { resolver });
    console.log('Verified VP:', verifiedVC);
  } catch (error) {
    console.error('Error verifying VP:', error);
  }
}

deliverVP();
