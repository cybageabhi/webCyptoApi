export default class CryptoService {
    static async generateKeys() {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: "RSA-OAEP",
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: "SHA-256",
        },
        true,
        ["encrypt", "decrypt"]
      );
  
      const exportedPublicKey = await window.crypto.subtle.exportKey(
        "spki",
        keyPair.publicKey
      );
      const exportedPrivateKey = await window.crypto.subtle.exportKey(
        "pkcs8",
        keyPair.privateKey
      );
  
      return {
        publicKey: CryptoService.arrayBufferToBase64(exportedPublicKey),
        privateKey: CryptoService.arrayBufferToBase64(exportedPrivateKey),
      };
    }
  
    static arrayBufferToBase64(buffer: ArrayBuffer): string {
      return btoa(String.fromCharCode(...new Uint8Array(buffer)));
    }
  }
  