const body: HTMLElement = document.body;

class scannerElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    
    this.shadowRoot!.innerHTML = `
      <style>
      .outer{
        position: fixed;
        width: 100vw;
        height: 100vh;
        background-color: #000;
      }
      @keyframes scanner{
        0%{
          top: 30%;
        }
        100%{
          top: 70%;
        }
      }
      .inner{
        position: absolute;
        width: 80vw;
        height: 10px;
        left: 50%;
        top: 30%;
        transform: translate(-50%, -50%);
        box-shadow: 0 5px 5px 8px rgba(31, 255, 98, 0.753);
        clip-path: ellipse( 40vw 10px at 50% 0px);
        animation: scanner 2s ease-in-out infinite alternate;
      }      
      .video{
        width: 100%;
        height: 100%;
      }
      </style>
      <div class="outer">
        <video width="100%" height="100%"></video>
        <div class="inner">
        </div>
      </div>
      `;
    navigator.mediaDevices.getUserMedia({video: true})
    .then((mediaStream) => {
      const video = this.shadowRoot.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
      }
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      setTimeout(() => {
        context.drawImage(video, 0, 0, 375, 650);
        const src = canvas.toDataURL('image/png');
        const img = document.createElement('img');
        img.src = src;
        document.body.appendChild(img);
        this.shadowRoot.innerHTML = ''
      }, 2000);
    })
    .catch(console.warn)
  }
}

export default scannerElement

