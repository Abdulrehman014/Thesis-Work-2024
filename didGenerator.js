import { Ed25519VerificationKey2018 } from "@digitalbazaar/ed25519-verification-key-2018";

export async function generateDID() {
  const keyPair = await Ed25519VerificationKey2018.generate();
  const did = `did:key:${keyPair.fingerprint()}`;
  return {
    did,
    keyPair,
  };
}

generateDID().then(result => {
  console.log('Generated DID:', result.did);
}).catch(err => {
  console.error('Error generating DID:', err);
});
