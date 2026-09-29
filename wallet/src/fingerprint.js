// One interface for checking the fingerprint result sent by the wallet UI.
// The sandbox has no biometric hardware, so the mock accepts a simulated
// sensor result. A real verifier (for example a WebAuthn platform
// authenticator with user verification) can replace it later.
//
// interface FingerprintVerifier {
//   verify(authentication): Promise<boolean>
// }

export class MockFingerprintVerifier {
  async verify(authentication) {
    return authentication?.method === 'fingerprint' && authentication?.result === 'match';
  }
}
