import CreateQRScanner from  './src/index';
const scanner = document.querySelector('qr-scanner');
customElements.whenDefined('qr-scanner')
  .then(() => scanner.scannerStart());
scanner.addEventListener('qrscan',e => {
  const str = e.detail.text ? 'text is :' + e.detail.text : 'error:' + e.detail.error.message;
  alert(str);
}, false)
scanner.addEventListener('close', e => {
  document.body.remove(scanner)
}, false)
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
startBtn.onclick = () => {
  scanner.scannerStart();
}
stopBtn.onclick = () => {
  scanner.stop();
}


const fn = function (e) {
  if (e.text){
    alert('text:' + e.text)
  } else {
    alert('error:' + e.error.message)
  }
}
const create = document.querySelector('#f-create'),
      show = document.querySelector('#f-show'),
      hidden = document.querySelector('#f-hidden');
let functionScanner;
create.onclick = () => {
  functionScanner = new CreateQRScanner(fn);
}

show.onclick = () => {
  functionScanner.show()
}

hidden.onclick = () => {
  functionScanner.hidden();
}