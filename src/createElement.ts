import  './scannerElement';
import { ScannerElementInerface, ScannerInerface , callback} from '../types/index'



class Scanner implements ScannerInerface {
  scanner: ScannerElementInerface;
  callback: callback;
  handler: (e: any) => any;
  constructor(callback: callback) {
    this.callback = callback;
    const scanner = document.createElement("qr-scanner") as ScannerElementInerface;
    this.scanner = scanner;
    document.body.appendChild(scanner);
    const handler = this.qrscanHandler();
    this.handler = this.handler;
    scanner.addEventListener('qrscan', handler, false);
    const onClose = () => {
      this.scanner.style.display = 'none';
    }
    scanner.addEventListener('stop', onClose, false);
    this.start();
  }
  qrscanHandler() {
    const callback = this.callback;
    return (e) => {
      callback(e.detail)
    }
  }
  start() {
    customElements.whenDefined('qr-scanner')
      .then(():void => void this.scanner.scannerStart());
  }
  show() {
    this.start();
    this.scanner.style.display = 'block';
    this.scanner.addEventListener('qrscan', this.handler, false);
  }
  hidden() {
    this.scanner.stop();
    this.scanner.style.display = 'none';
  }
  stop() {
    this.scanner.stop();
    this.scanner.removeEventListener('qrscan', this.handler);
    document.body.removeChild(this.scanner);
  }
}


export default Scanner