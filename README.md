# Verifiable Credentials (PoC)

## Introduction
This project demonstrates a practical implementation of Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs). The project focuses on:
- Generating DIDs.
- Creating Verifiable Credentials (VCs).
- Storing credentials in a file-based wallet.
- Creating Verifiable Presentations (VPs) and verifying them.

The goal is to provide a decentralized, cryptographically secure, and self-sovereign identity solution that can issue, store, and verify credentials without relying on centralized authorities.

## Project Structure
The project is structured as follows:

- **didGenerator.js**: Handles the creation of DIDs and key pairs.
- **vcGenerator.js**: Generates Verifiable Credentials using the DID as the issuer.
- **createVP.js**: Packages issued VCs into Verifiable Presentations.
- **verifyVC.js**: Verifies the created Verifiable Credentials.
- **verifyVP.js**: Verifies the Verifiable Presentations.
- **sendVP.js**: Handles the sending of Verifiable Presentations.
- **vpRequestGenerator.js**: Generates requests for Verifiable Presentations.
- **vpDelivery.js**: Manages the delivery of Verifiable Presentations to the verifier.
- **wallet.js**: Manages the storage of Verifiable Credentials in a file-based wallet.
- **wallet.json**: Stores the credentials in a JSON file.
- **package.json**: Defines the project dependencies.

## Key Components
### 1. Decentralized Identifiers (DIDs)
DIDs are globally unique identifiers that are decentralized and self-sovereign. The `did:key` method is used in this project to generate a cryptographic DID.

### 2. Verifiable Credentials (VCs)
VCs are digital statements made by an issuer about a subject. In this project, the issuer (identified by a DID) generates a signed Verifiable Credential.

### 3. Verifiable Presentations (VPs)
VPs allow the credential holder to share their VCs with others while proving ownership of the credentials.

## Technologies and Libraries Used
- **Cryptography**: 
  - Algorithm: `Ed25519` for generating key pairs.
  - Library: `tweetnacl` for cryptographic operations.
  
- **DID Generation**: 
  - Libraries: `did-method-key`, `ed25519-verification-key-2018` for DID creation.
  
- **VC and VP Creation**: 
  - Library: `did-jwt-vc` for creating and signing VCs and VPs in JWT format.
  
- **DID Resolution**: 
  - Library: `did-resolver` for resolving DIDs and fetching public key metadata.

## Installation and Setup
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/Abdulrehman014/Thesis-Work-2024.git
2. Navigate into the project directory:
   ```bash
    cd Thesis-Work-2024
4. Install the necessary dependencies:
   ```bash
    npm install
6. To generate a DID and Verifiable Credential, run:
   ```bash
    node didGenerator.js
    node vcGenerator.js
  
# Usage
1. Generating a DID: Run didGenerator.js to create a Decentralized Identifier (DID).
2. Creating a Verifiable Credential (VC): Use vcGenerator.js to issue a Verifiable Credential tied to the DID.
3. Creating and Verifying VPs: Use createVP.js to create Verifiable Presentations and verifyVP.js to verify them.

# Conclusion
This project demonstrates how to generate, store, and verify decentralized credentials using cryptographically secure methods. You can check the full project in the repository.
