export class ScannerElementInerface extends HTMLElement{
  constructor();
  scannerStart(): void;
  stop(e?: Event):void;
}
type callback = (e: any) => any;

interface OptionsInterface {
  style: string;
}
export  class ScannerInerface {
  scanner: ScannerElementInerface;
  callback: callback;
  constructor(callback: callback, options: OptionsInterface);
  start(): void;
  hidden(): void;
  stop(): void;
}