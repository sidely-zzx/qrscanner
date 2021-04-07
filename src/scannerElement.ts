const body: HTMLElement = document.body;

class scannerElement extends HTMLElement {
  constructor() {
    super();
    console.log(this)
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
      </style>
      <div class="outer">
      <div class="inner">123123</div>
      </div>
      `;
  }
}

customElements.define("scanner-element", scannerElement);

// const scanner = document.createElement('div');
const scanner = document.createElement("scanner-element");

// scanner.setAttribute("is", "scanner-element");
// const scannerShadow: ShadowRoot = console.log(scanner);
console.log(scanner)
body.appendChild(scanner);
export default scanner