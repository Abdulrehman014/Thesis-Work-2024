import { verifyPresentation } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver as keyResolver } from 'key-did-resolver';

// Function to verify the Verifiable Presentation
async function verifyVP(vpJwt) {
  // Prepare a resolver to resolve DIDs
  const resolver = new Resolver({
    ...keyResolver()  // Use the key DID resolver to resolve DID:key
  });

  try {
    // Verify the Verifiable Presentation (JWT)
    const verifiedVP = await verifyPresentation(vpJwt, resolver);

    console.log('VP verification successful:', verifiedVP);
  } catch (error) {
    console.error('VP verification failed:', error);
  }
}

// Replace this with the VP JWT you just generated
const vpJwt = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWGhoYlhCc1pUb3hNak1pTENKcGMzTWlPaUprYVdRNmEyVjVPbm8yVFd0MWVqUnpha0Y0Vm5reldIazNXVUZRV0RabFdIZDRUVlpxVlhoRk4zcERSbXRCVG1ONmJrVjVZM2g0TXlJc0ltNWlaaUk2TVRjeU5UZ3dNRGN4TUN3aWRtTWlPbnNpUUdOdmJuUmxlSFFpT2xzaWFIUjBjSE02THk5M2QzY3Vkek11YjNKbkx6SXdNVGd2WTNKbFpHVnVkR2xoYkhNdmRqRWlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lrRnNkVzF1YVVOeVpXUmxiblJwWVd3aVhTd2lZM0psWkdWdWRHbGhiRk4xWW1wbFkzUWlPbnNpYVdRaU9pSmthV1E2WlhoaGJYQnNaVG94TWpNaUxDSmhiSFZ0Ym1sUFppSTZleUpwWkNJNkltUnBaRHBsZUdGdGNHeGxPalExTmlJc0ltNWhiV1VpT2lKRmVHRnRjR3hsSUZWdWFYWmxjbk5wZEhraWZYMTlmUS5uNlZlVG9ET29uWWxjSHpQV0FoTVdJVV9PWTFfbDJCSzA4REJrSGJuVGtDTHQ3NnJsZkJ5SE5LUlVTRHBwNWd0cDFZVGk0MmlPS3BSZlQwczRWdXFDdyJdfSwiaXNzIjoiZGlkOmtleTp6Nk1rclRyZHRpMnlMRHJBNW16NEVVdDNXazNya2NuczJwUVBlZVdRdUxzeHZ3djQifQ.6rZ8iwjVryXIniUqhPtLM_gFYi7AZMStE7Ge0Q0VgCVqRtppeAotDzrWpQ-Kzr5qwbTekR3hM6SYjyIkuoV_DA';

// Verify the Verifiable Presentation
verifyVP(vpJwt);
