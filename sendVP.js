import axios from 'axios';

// Replace this with your Verifiable Presentation (JWT)
const vpJwt = 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJ2cCI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVQcmVzZW50YXRpb24iXSwidmVyaWZpYWJsZUNyZWRlbnRpYWwiOlsiZXlKaGJHY2lPaUpGWkVSVFFTSXNJblI1Y0NJNklrcFhWQ0o5LmV5SnpkV0lpT2lKa2FXUTZaWGhoYlhCc1pUb3hNak1pTENKcGMzTWlPaUprYVdRNmEyVjVPbm8yVFd0MWVqUnpha0Y0Vm5reldIazNXVUZRV0RabFdIZDRUVlpxVlhoRk4zcERSbXRCVG1ONmJrVjVZM2g0TXlJc0ltNWlaaUk2TVRjeU5UZ3dNRGN4TUN3aWRtTWlPbnNpUUdOdmJuUmxlSFFpT2xzaWFIUjBjSE02THk5M2QzY3Vkek11YjNKbkx6SXdNVGd2WTNKbFpHVnVkR2xoYkhNdmRqRWlYU3dpZEhsd1pTSTZXeUpXWlhKcFptbGhZbXhsUTNKbFpHVnVkR2xoYkNJc0lrRnNkVzF1YVVOeVpXUmxiblJwWVd3aVhTd2lZM0psWkdWdWRHbGhiRk4xWW1wbFkzUWlPbnNpYVdRaU9pSmthV1E2WlhoaGJYQnNaVG94TWpNaUxDSmhiSFZ0Ym1sUFppSTZleUpwWkNJNkltUnBaRHBsZUdGdGNHeGxPalExTmlJc0ltNWhiV1VpT2lKRmVHRnRjR3hsSUZWdWFYWmxjbk5wZEhraWZYMTlmUS5uNlZlVG9ET29uWWxjSHpQV0FoTVdJVV9PWTFfbDJCSzA4REJrSGJuVGtDTHQ3NnJsZkJ5SE5LUlVTRHBwNWd0cDFZVGk0MmlPS3BSZlQwczRWdXFDdyJdfSwiaXNzIjoiZGlkOmtleTp6Nk1rbUxnOEJ5NGlDQjJ0ajd1ZVhZUEFYM1dWd1dncWJhQjF2aEw0UDhVNXA3R1YifQ.9rnTIITnlAwcvPkGHJGjaW0V5G7U5AVH-qJGh7wU6dDZXgC7l3G2dYcmCGCXKjCQJ2ZpXmwdeqC9a6_jM4uiDQ';

// Verifier's API endpoint
const verifierUrl = 'https://httpbin.org/post';    // Mock endpoint for testing

async function sendVP() {
  try {
    const response = await axios.post(verifierUrl, {
      vpJwt: vpJwt
    });
    console.log('VP sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending VP:', error);
  }
}

sendVP();

