import CreateElement from  './src/index';
const scanner = document.querySelector('qr-scanner');
customElements.whenDefined('qr-scanner')
  .then(() => scanner.scannerStart());
scanner.addEventListener('qrscan',e => {
  console.log('qrscan', e);scanner.close()
}, false)
scanner.addEventListener('close', e => {
  console.log(e);document.body.remove(scanner)
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
  functionScanner = new CreateElement(fn);
}

show.onclick = () => {
  functionScanner.show()
}

hidden.onclick = () => {
  functionScanner.hidden();
}