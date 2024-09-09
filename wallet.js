import fs from 'fs';
import path from 'path';

// Define the path for the wallet file
const walletPath = path.join(path.resolve(), 'wallet.json');
console.log("Wallet path:", walletPath);  // Add this to log the path

// Function to store the Verifiable Credential (VC) in the wallet
export function storeVC(vcJwt) {
  try {
    // Load existing wallet or create a new one
    let wallet = { credentials: [] };

    // Check if the wallet file exists
    if (fs.existsSync(walletPath)) {
      wallet = JSON.parse(fs.readFileSync(walletPath));
      console.log("Existing wallet loaded:", wallet);
    }

    // Add the new VC to the wallet
    wallet.credentials.push(vcJwt);

    // Write the updated wallet back to the file
    fs.writeFileSync(walletPath, JSON.stringify(wallet, null, 2));
    console.log('VC stored in wallet:', walletPath);
    console.log('Current wallet contents:', wallet);
  } catch (error) {
    console.error("Error writing to wallet.json:", error);
  }
}
