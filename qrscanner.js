/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var body = document.body;
var scannerElement = /** @class */ (function (_super) {
    __extends(scannerElement, _super);
    function scannerElement() {
        var _this = _super.call(this) || this;
        console.log(_this);
        _this.attachShadow({ mode: "open" });
        _this.shadowRoot.innerHTML = "\n      <style>\n      .outer{\n        position: fixed;\n        width: 100vw;\n        height: 100vh;\n        background-color: #000;\n      }\n      .inner{\n        position: absolute;\n        width: 50vw;\n        height: 50vw;\n        left: 50%;\n        top: 50%;\n        transform: translate(-50%, -50%);\n        background-color: #FFF;\n      }\n      </style>\n      <div class=\"outer\">\n      <div class=\"inner\">123123</div>\n      </div>\n      ";
        return _this;
    }
    return scannerElement;
}(HTMLElement));
customElements.define("scanner-element", scannerElement);
// const scanner = document.createElement('div');
var scanner = document.createElement("scanner-element");
// scanner.setAttribute("is", "scanner-element");
// const scannerShadow: ShadowRoot = console.log(scanner);
console.log(scanner);
body.appendChild(scanner);

export { scanner as scannerElement };
