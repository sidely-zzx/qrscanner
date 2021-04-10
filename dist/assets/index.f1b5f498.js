import{B as e}from"./vendor.ffdbab8f.js";!function(e=".",n="__import__"){try{self[n]=new Function("u","return import(u)")}catch(t){const s=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[n]=e=>new Promise(((t,r)=>{const c=new URL(e,s);if(self[n].moduleMap[c])return t(self[n].moduleMap[c]);const i=new Blob([`import * as m from '${c}';`,`${n}.moduleMap['${c}']=m;`],{type:"text/javascript"}),a=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(i),onerror(){r(new Error(`Failed to import: ${e}`)),o(a)},onload(){t(self[n].moduleMap[c]),o(a)}});document.head.appendChild(a)})),self[n].moduleMap={}}}("/assets/");class n extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`\n      <style>\n      .outer{\n        position: fixed;\n        left: 0;\n        top: 0;\n        width: 100vw;\n        height: 100vh;\n        background-color: #000;\n        ${this.style.cssText}\n      }\n      @keyframes scanner{\n        0%{\n          top: 30%;\n        }\n        100%{\n          top: 70%;\n        }\n      }\n      .line{\n        position: absolute;\n        width: 80%;\n        height: 10px;\n        left: 50%;\n        top: 30%;\n        transform: translate(-50%, -50%);\n        box-shadow: 0 5px 5px 8px rgba(31, 255, 98, 0.753);\n        clip-path: ellipse( 40% 10px at 50% 0px);\n        animation: scanner 2s ease-in-out infinite alternate;\n      }      \n      .video{\n        width: 100%;\n        height: 100%;\n      }\n      .close{\n        position: absolute;\n        width: 20px;\n        height: 20px;\n        left: 5%;\n        top: 5%;\n        padding: 0;\n        border: none;\n        border-radius: 50%;\n      }\n      .close div{\n        position: absolute;\n        left: 50%;\n        top: 50%;\n        width: 70%;\n        height: 2px;\n        background-color: #000000;\n      }\n      .close div:first-child{\n        transform: translate(-50%, -50%) rotateZ(45deg);\n      }\n      .close div:last-child{\n        transform: translate(-50%, -50%) rotateZ(-45deg);\n      }\n      </style>\n      <div class="outer">\n        <video width="100%" height="100%"></video>\n        <button class="close">\n          <div></div>\n          <div></div> \n        </button>\n        <div class="line"></div>\n        <slot></slot>\n      </div>\n      `;const e=this.shadowRoot.querySelector(".close");this.closeBtn=e,e.onclick=e=>{this.stop(e)}}disconnectedCallback(){this.closeBtn.onclick=null}scannerStart(){const n=document.createEvent("CustomEvent"),t=navigator.mediaDevices,s=e=>{n.initCustomEvent("qrscan",!0,!0,{error:e}),dispatchEvent(n)};t?t.getUserMedia({video:{facingMode:"environment"}}).then((t=>{this.mediaStream=t;const o=this.shadowRoot.querySelector("video");(new e).decodeFromStream(t,o,(e=>{e&&(n.initCustomEvent("qrscan",!0,!0,e),this.dispatchEvent(n))})).catch(s)})).catch(s):setTimeout((()=>{n.initCustomEvent("qrscan",!0,!0,{error:{message:"no mediaDevices, only work on https"}}),this.dispatchEvent(n)}),0)}stop(e){const n=document.createEvent("CustomEvent");this.mediaStream&&this.mediaStream.getTracks()[0].stop(),n.initCustomEvent("stop",!0,!0,e),this.dispatchEvent(n)}}customElements.define("qr-scanner",n);class t{constructor(e){this.callback=e;const n=document.createElement("qr-scanner");this.scanner=n,document.body.appendChild(n);const t=this.qrscanHandler();this.handler=this.handler,n.addEventListener("qrscan",t,!1);n.addEventListener("stop",(()=>{this.scanner.style.display="none"}),!1),this.start()}qrscanHandler(){const e=this.callback;return n=>{e(n.detail)}}start(){customElements.whenDefined("qr-scanner").then((()=>{this.scanner.scannerStart()}))}show(){this.start(),this.scanner.style.display="block",this.scanner.addEventListener("qrscan",this.handler,!1)}hidden(){this.scanner.stop(),this.scanner.style.display="none"}stop(){this.scanner.stop(),this.scanner.removeEventListener("qrscan",this.handler),document.body.removeChild(this.scanner)}}const s=document.querySelector("qr-scanner");customElements.whenDefined("qr-scanner").then((()=>s.scannerStart())),s.addEventListener("qrscan",(e=>{console.log("qrscan",e),s.close()}),!1),s.addEventListener("close",(e=>{console.log(e),document.body.remove(s)}),!1);const o=document.querySelector("#start"),r=document.querySelector("#stop");o.onclick=()=>{s.scannerStart()},r.onclick=()=>{s.stop()};const c=function(e){e.text?alert("text:"+e.text):alert("error:"+e.error.message)},i=document.querySelector("#f-create"),a=document.querySelector("#f-show"),d=document.querySelector("#f-hidden");let l;i.onclick=()=>{l=new t(c)},a.onclick=()=>{l.show()},d.onclick=()=>{l.hidden()};