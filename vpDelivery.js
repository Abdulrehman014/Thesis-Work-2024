
import fs from 'fs';
import path from 'path';
import {verifyCredential} from 'did-jwt-vc';

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

  // Normally, you'd verify the credential with a trusted resolver
  const verifiedVC = await verifyCredential(vcJwt, {
    resolver: () => {
      console.log('Mock resolver called');
    }
  });

  console.log('Verified VP:', verifiedVC);
}

deliverVP();
