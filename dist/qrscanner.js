class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n      <style>\n      .outer{\n        position: fixed;\n        width: 100vw;\n        height: 100vh;\n        background-color: #000;\n      }\n      @keyframes scanner{\n        0%{\n          top: 30%;\n        }\n        100%{\n          top: 70%;\n        }\n      }\n      .inner{\n        position: absolute;\n        width: 80vw;\n        height: 10px;\n        left: 50%;\n        top: 30%;\n        transform: translate(-50%, -50%);\n        box-shadow: 0 5px 5px 8px rgba(31, 255, 98, 0.753);\n        clip-path: ellipse( 40vw 10px at 50% 0px);\n        animation: scanner 2s ease-in-out infinite alternate;\n      }      \n      .video{\n        width: 100%;\n        height: 100%;\n      }\n      </style>\n      <div class="outer">\n        <video width="100%" height="100%"></video>\n        <div class="inner">\n        </div>\n      </div>\n      ',navigator.mediaDevices.getUserMedia({video:!0}).then((e=>{const n=this.shadowRoot.querySelector("video");n.srcObject=e,n.onloadedmetadata=()=>{n.play()};const t=document.createElement("canvas"),o=t.getContext("2d");setTimeout((()=>{o.drawImage(n,0,0,375,650);const e=t.toDataURL("image/png"),a=document.createElement("img");a.src=e,document.body.appendChild(a),this.shadowRoot.innerHTML=""}),2e3)})).catch(console.warn)}}customElements.define("qr-scanner",e);const n=document.createElement("scanner-element");document.body.appendChild(n);var t={createElement:n};export default t;
