import scannerElement from './scannerElement';

customElements.define("qr-scanner", scannerElement);

const scanner = document.createElement("scanner-element");


document.body.appendChild(scanner);


export default scanner