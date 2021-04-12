import { BrowserQRCodeReader }  from '@zxing/browser';
import { ScannerElementInerface, qrScanEvent } from '../types/index'
const body: HTMLElement = document.body;
class scannerElement extends HTMLElement implements ScannerElementInerface{
  closeBtn: HTMLElement;
  mediaStream: MediaStream;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
      .outer{
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000;
        ${this.style.cssText}
      }
      @keyframes scanner{
        0%{
          top: 30%;
        }
        100%{
          top: 70%;
        }
      }
      .line{
        position: absolute;
        width: 80%;
        height: 10px;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        box-shadow: 0 5px 5px 8px rgba(31, 255, 98, 0.753);
        clip-path: ellipse( 40% 10px at 50% 0px);
        animation: scanner 2s ease-in-out infinite alternate;
      }      
      .video{
        width: 100%;
        height: 100%;
      }
      .close{
        position: absolute;
        width: 20px;
        height: 20px;
        left: 5%;
        top: 5%;
        padding: 0;
        border: none;
        border-radius: 50%;
      }
      .close div{
        position: absolute;
        left: 50%;
        top: 50%;
        width: 70%;
        height: 2px;
        background-color: #000000;
      }
      .close div:first-child{
        transform: translate(-50%, -50%) rotateZ(45deg);
      }
      .close div:last-child{
        transform: translate(-50%, -50%) rotateZ(-45deg);
      }
      </style>
      <div class="outer">
        <video width="100%" height="100%"></video>
        <button class="close">
          <div></div>
          <div></div> 
        </button>
        <div class="line"></div>
        <slot></slot>
      </div>
      `;
    const closeBtn = this.shadowRoot.querySelector('.close') as HTMLElement;
    this.closeBtn = closeBtn;
    closeBtn.onclick = (e) => void this.stop(e);
    
  }
  disconnectedCallback() {
    this.closeBtn.onclick = null;
  }
  scannerStart(): void {
    const scanEvent = document.createEvent('CustomEvent');
    const mediaDevices: MediaDevices = navigator.mediaDevices;
    const onError = (err):void => {
      scanEvent.initCustomEvent('qrscan', true, true, {error:err});
      dispatchEvent(scanEvent);
    }
    if (mediaDevices) {
      /* user: font camera, environment back camera */
      mediaDevices.getUserMedia({video: { facingMode: 'environment'}})
      .then((mediaStream) => {
        this.mediaStream = mediaStream;
        const video = this.shadowRoot.querySelector('video');
        const decoder = new BrowserQRCodeReader();
        
        const callback = (e) => {
          if(e) {
            scanEvent.initCustomEvent('qrscan', true, true, e);
            this.dispatchEvent(scanEvent);
          }
        }
        decoder.decodeFromStream(mediaStream, video, callback)
        .catch(onError);
      })
      .catch(onError)
    } else {
      /* setTimeout: maybe addEventListener is not run */
      setTimeout(() => {
        scanEvent.initCustomEvent('qrscan', true, true, {error: {message: 'no mediaDevices, only work on https'}});
        this.dispatchEvent(scanEvent);
      }, 0);
    } 
  }
  stop (e?: qrScanEvent):void {
    const scanEvent = document.createEvent('CustomEvent');
    this.mediaStream && this.mediaStream.getTracks()[0].stop();
    scanEvent.initCustomEvent('stop', true, true, e);
    this.dispatchEvent(scanEvent);
  }
}
customElements.define("qr-scanner", scannerElement);