import { createPXEClient, PXE } from "@aztec/aztec.js";

class PXEService {
  private static pxeServiceIntance: PXEService;
  #pxeclient!: PXE;
  constructor() {
    if (PXEService.pxeServiceIntance) {
      return PXEService.pxeServiceIntance;
    }
    this.#pxeclient = createPXEClient(import.meta.env.VITE_PXE_URL);
    PXEService.pxeServiceIntance = this;
  }

  getPXEClient() {
    return this.#pxeclient;
  }
}

export default new PXEService();
