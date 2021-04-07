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
      .inner{
        position: absolute;
        width: 50vw;
        height: 50vw;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #FFF;
      }
      .video{
        width: 100%;
        height: 100%;
      }
      </style>
      <div class="outer">
        <div class="inner">
          <video class="video"></video>
        </div>
      </div>
      `;
  }
}

export default scannerElement

