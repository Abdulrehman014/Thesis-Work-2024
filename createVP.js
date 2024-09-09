import pkg from 'tweetnacl'; // Import the whole module as `pkg`
import { Ed25519VerificationKey2018 } from '@digitalbazaar/ed25519-verification-key-2018';
import { createVerifiablePresentationJwt } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver as keyResolver } from 'key-did-resolver';
import fs from 'fs';
import path from 'path';
import bs58 from 'bs58';  // Import bs58 for decoding base58
import base64url from 'base64url'; // Import base64url for encoding

// Destructure `sign` from `pkg`
const { sign } = pkg;  // Extract the `sign` function from `tweetnacl`

// Define the path for the wallet file
const walletPath = path.join(path.resolve(), 'wallet.json');

// Load the VC from the wallet.json file
function loadVC() {
  if (fs.existsSync(walletPath)) {
    const wallet = JSON.parse(fs.readFileSync(walletPath));
    return wallet.credentials[0];  // Load the first VC in the wallet
  } else {
    console.error('No wallet found at:', walletPath);
    return null;
  }
}

async function createVP() {
  const vcJwt = loadVC();  // Load the Verifiable Credential (JWT) from wallet.json

  if (!vcJwt) {
    console.error('No VC found to present.');
    return;
  }

  // Generate a new key pair for the holder (presenter)
  const keyPair = await Ed25519VerificationKey2018.generate();

  // DID for the holder (the presenter of the VC)
  const holderDid = `did:key:${keyPair.fingerprint()}`;

  // Extract the private key in Uint8Array format using `bs58`
  const privateKey = bs58.decode(keyPair.privateKeyBase58);

  // Prepare a resolver to resolve DIDs
  const resolver = new Resolver({
    ...keyResolver()  // Use the key DID resolver to resolve DID:key
  });

  // Define the Verifiable Presentation payload
  const vpPayload = {
    iss: holderDid,  // Add the issuer DID (holder's DID)
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [vcJwt],  // Include the VC in the presentation
    }
  };

  try {
    // Manually sign the Verifiable Presentation (JWT)
    const vpJwt = await createVerifiablePresentationJwt(vpPayload, {
      holder: holderDid,  // The holder's DID
      signer: (data) => {
        const signature = sign.detached(new TextEncoder().encode(data), privateKey);
        return base64url.encode(Buffer.from(signature)); // Encode the signature using base64url
      },
      alg: 'EdDSA'  // The algorithm used to sign
    });

    // Log the Verifiable Presentation JWT
    console.log('Generated Verifiable Presentation (JWT):', vpJwt);

    return vpJwt;
  } catch (error) {
    console.error('Error creating Verifiable Presentation:', error);
  }
}

createVP();
