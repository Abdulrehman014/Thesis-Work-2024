import pkg from 'tweetnacl';  // Correct way to import CommonJS module
import base64url from 'base64url';  // Base64URL encoding for JWT
import bs58 from 'bs58';  // For decoding Base58-encoded keys
import { createVerifiableCredentialJwt } from 'did-jwt-vc';
import { Ed25519VerificationKey2018 } from '@digitalbazaar/ed25519-verification-key-2018';
import { storeVC } from './wallet.js';  // Import storeVC function from wallet.js

const { sign } = pkg;  // Destructure 'sign' from the default import

// Function to generate DID Document from key pair
function keyToDidDoc(keyPair) {
  return {
    '@context': 'https://w3id.org/did/v1',
    id: `did:key:${keyPair.fingerprint()}`,
    publicKey: [{
      id: `did:key:${keyPair.fingerprint()}#${keyPair.fingerprint()}`,
      type: 'Ed25519VerificationKey2018',
      controller: `did:key:${keyPair.fingerprint()}`,
      publicKeyBase58: keyPair.publicKeyBase58,
    }],
    authentication: [{
      id: `did:key:${keyPair.fingerprint()}#${keyPair.fingerprint()}`,
      type: 'Ed25519VerificationKey2018',
      controller: `did:key:${keyPair.fingerprint()}`,
      publicKeyBase58: keyPair.publicKeyBase58,
    }]
  };
}

// Manually sign the JWT using the Ed25519 private key
function signJwtHeaderPayload(header, payload, privateKeyBase58) {
  // Decode the Base58 private key to Uint8Array
  const privateKey = bs58.decode(privateKeyBase58);

  const encodedHeader = base64url.encode(JSON.stringify(header));
  const encodedPayload = base64url.encode(JSON.stringify(payload));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const signingBytes = new TextEncoder().encode(signingInput);

  const signed = sign.detached(signingBytes, privateKey);
  const encodedSignature = base64url.encode(Buffer.from(signed));

  return `${signingInput}.${encodedSignature}`;
}

async function generateDID() {
  // Generate a key pair
  const keyPair = await Ed25519VerificationKey2018.generate();

  // Create the DID document
  const didDocument = keyToDidDoc(keyPair);

  console.log('Generated DID:', didDocument.id);
  console.log('Key Pair:', keyPair);

  return { did: didDocument.id, keyPair };
}

export async function createVC() {
  const { did, keyPair } = await generateDID();  // 'did' is the issuer DID

  // Verifiable Credential payload
  const vcPayload = {
    sub: 'did:example:123',  // Subject DID
    iss: did,                // Add the issuer DID (this is the DID of the issuer)
    nbf: Math.floor(Date.now() / 1000),  // Current time
    vc: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiableCredential', 'AlumniCredential'],
      credentialSubject: {
        id: 'did:example:123',
        alumniOf: {
          id: 'did:example:456',
          name: 'University of Padova',
          degree: 'Masters in Computer Engineering',
          PassingYear: '2024',
          FinalGrades: "90.0/110",
          WeightedAverage: "26.66/30"

        }
      }
    }
  };

  try {
    // Define JWT header
    const header = {
      alg: 'EdDSA',
      typ: 'JWT'
    };

    // Manually sign the JWT
    const jwt = signJwtHeaderPayload(header, vcPayload, keyPair.privateKeyBase58);

    // Log the generated VC
    console.log('Generated Verifiable Credential (JWT):', jwt);

    // Store the VC in the wallet using the storeVC function
    storeVC(jwt);  // Save the VC in the wallet

    return jwt;
  } catch (error) {
    console.error('Error creating Verifiable Credential:', error);
  }
}

createVC();  // Run the function to generate and store the VC
