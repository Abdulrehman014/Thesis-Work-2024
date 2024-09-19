# Verifiable Credential (VC) and Verifiable Presentation (VP) PoC

This Proof of Concept (PoC) demonstrates the process of generating Verifiable Credentials (VC), creating Verifiable Presentations (VP), and verifying them using Decentralized Identifiers (DID) in a self-sovereign identity system. The PoC uses `did:key` DIDs and implements core components for VC generation, storage, and presentation.

## Features

- **Generate Verifiable Credential (VC):** Create a credential using DID and sign it with cryptographic keys.
- **Store VC in a Wallet:** The VC is stored in a simple wallet structure (JSON-based for now) for later use.
- **Create Verifiable Presentation (VP):** Package the VC into a VP and sign it with the holder's DID.
- **Send VP to Verifier:** The VP is sent to a mock or local verifier for verification.
- **Verify VP:** The verifier checks the authenticity of the VP and the integrity of the contained VC.

## How It Works

### 1. Generate DID
A DID is generated using the `did:key` method. This involves creating a public/private key pair and deriving the DID from the public key.

### 2. Create Verifiable Credential (VC)
A Verifiable Credential (VC) is generated based on the issuer's DID. The credential contains information about the subject (e.g., identity, affiliation, etc.) and is cryptographically signed using the issuer's private key.

### 3. Store the VC
The generated VC is stored in a basic JSON wallet (`wallet.json`) that acts as a temporary storage for the issued credentials.

### 4. Create Verifiable Presentation (VP)
A Verifiable Presentation (VP) is created by packaging one or more VCs. The holder (presenter) signs the VP with their private key, ensuring that the presentation is valid and trustworthy.

### 5. Send and Verify the VP
The VP is sent to a verifier, which validates the signature and verifies the authenticity of the claims in the VC.

## Usage

### 1. Install Dependencies
Clone the repository and install the required dependencies:


npm install


### 2. Generate a Verifiable Credential (VC)
Run the following command to generate a VC and store it in the wallet.json:
node createVP.js

3. Create a Verifiable Presentation (VP)
Run the following command to generate a VP:
node createVP.js

4. Send the VP to a Verifier
Run the following command to send the VP to a mock verifier:
node sendVP.js

5. Verify the VP
If you're running a local verifier, you can run the following command to verify the VP:
node verifyVP.js
```bash
Folder Structure

|-- vc-poc/
    |-- vcGenerator.js      // Generates Verifiable Credentials
    |-- wallet.json         // Stores VCs temporarily
    |-- createVP.js         // Generates a Verifiable Presentation
    |-- sendVP.js           // Sends the VP to the verifier
    |-- verifyVP.js         // Verifies the VP
    |-- verifierServer.js   // Optional: Local server for verifying VPs


Next Steps
This PoC can be extended by:

Implementing OpenID4VC and OpenID4VP standards for credential issuance and presentation requests.
Integrating with a compliant wallet (e.g., EUDI Wallet, Hyperledger Aries) for credential storage.
Expanding the verifier to handle more complex verification scenarios.
