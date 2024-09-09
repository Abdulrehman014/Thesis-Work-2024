
import {storeVC} from './wallet.js';
import {createVC} from './vcGenerator.js';

async function createVPRequest() {
  const vcJwt = await createVC();
  storeVC(vcJwt);

  const vpRequest = {
    '@context': ['https://www.w3.org/2018/credentials/v1'],
    type: ['VerifiablePresentationRequest'],
    query: {
      type: 'QueryByExample',
      credentialQuery: [
        {
          reason: 'Please provide a VC proving you are an alumni.',
          example: {
            '@context': ['https://www.w3.org/2018/credentials/v1'],
            type: 'AlumniCredential'
          }
        }
      ]
    }
  };

  console.log('Generated VP Request:', JSON.stringify(vpRequest, null, 2));
}

createVPRequest();
