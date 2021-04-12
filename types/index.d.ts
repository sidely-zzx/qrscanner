interface detail {
  text?: string,
  error?: {
    message: string
  }
}
export type qrScanEvent = {
  detail: detail
}
export class ScannerElementInerface extends HTMLElement{
  constructor();
  scannerStart(): void;
  stop(e?: Event):void;
}
export type callback = (e: detail) => any;
export  class ScannerInerface {
  scanner: ScannerElementInerface;
  callback: callback;
  constructor(callback: callback);
  hidden(): void;
  stop(): void;
}
export default ScannerInerface;