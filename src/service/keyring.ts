import {
    getSchnorrAccount,
    getSchnorrWallet
  } from "@aztec/accounts/schnorr";
  import {
    AztecAddress,
    Fr,
    Fq,
    type Wallet as AztecWallet
  } from "@aztec/aztec.js";
  import type { AccountWallet, PXE } from "@aztec/aztec.js";
  
  class KeyringService {
    private static keyringServiceIntance: KeyringService;
    constructor() {
      if (KeyringService.keyringServiceIntance) {
        return KeyringService.keyringServiceIntance;
      }
      KeyringService.keyringServiceIntance = this;
    }
  
    async generateAztecAccountSchnorr(
      pxe: PXE
    ): Promise<{ salt: Fr; encKey: Fr; signingKey: Fq; wallet: AztecWallet }> {
      const salt = Fr.random();
      const encKey = Fr.random();
      const signingKey = Fq.random();
      const am = getSchnorrAccount(pxe, encKey, signingKey, salt);
      const wallet = await am.deploy().getWallet();
      console.log(`New account deployed at ${wallet.getAddress()}`);
      return {
        salt,
        encKey,
        signingKey,
        wallet
      };
    }
  
    aztecAccountFromPrivateKey(
      pxe: PXE,
      address: AztecAddress,
      signingKey: Fq
    ): Promise<AccountWallet> {
      return getSchnorrWallet(pxe, address, signingKey);
    }
  }
  
  export default new KeyringService();
  