(()=>{"use strict";var e={756:(e,n,t)=>{t.d(n,{Z:()=>s});var r=t(81),o=t.n(r),i=t(645),a=t.n(i)()(o());a.push([e.id,"* {\r\n  box-sizing: border-box;\r\n  margin: 0;\r\n  padding: 0;\r\n  border: none;\r\n}",""]);const s=a},242:(e,n,t)=>{t.d(n,{Z:()=>S});var r=t(81),o=t.n(r),i=t(645),a=t.n(i),s=t(667),c=t.n(s),u=new URL(t(306),t.b),d=new URL(t(385),t.b),l=new URL(t(785),t.b),m=new URL(t(279),t.b),v=new URL(t(764),t.b),p=new URL(t(686),t.b),f=new URL(t(152),t.b),g=new URL(t(211),t.b),h=a()(o());h.push([e.id,"@import url(https://fonts.googleapis.com/css2?family=Niconne&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);"]);var _=c()(u),b=c()(d),y=c()(l),x=c()(m),w=c()(v),E=c()(p),C=c()(f),k=c()(g);h.push([e.id,"@media (orientation: landscape) {\r\n\r\n  body.start {\r\n    background-image: url("+_+");\r\n    background-size: cover;\r\n    background-position: 100% 50%;\r\n  }\r\n\r\n  .header-container__menu.start {\r\n    top: 15px;\r\n    right: 335px;\r\n  }\r\n\r\n}\r\n\r\n@media (orientation: portrait) {\r\n\r\n  body.start {\r\n    background-image: url("+_+');\r\n    background-size: auto 100%;\r\n    background-position: 100% 100%;\r\n  }\r\n\r\n  .header-container__menu.start {\r\n    top: 50px;\r\n    right: 5px;\r\n  }\r\n\r\n}\r\n\r\nbody.start {\r\n  height: 100vh;\r\n  width: 100vw;\r\n  background-repeat: no-repeat;\r\n}\r\n\r\n.header-container__menu.game {\r\n  top: -100px;\r\n  right: -100px;\r\n}\r\n\r\n.header-container__menu.active.game {\r\n  top: 0;\r\n  right: 0;\r\n}\r\n\r\n.header-container__menu {\r\n  position: absolute;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  width: 400px;\r\n  height: 400px;\r\n  transition: top 0.5s, right 0.5s;\r\n}\r\n\r\n.menu__book-button,\r\n.menu__audio-challenge-button,\r\n.menu__sprint-button,\r\n.menu__statistics-button,\r\n.menu__team-button,\r\n.menu__home-button {\r\n  position: absolute;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  border-radius: 50%;\r\n  width: 70px;\r\n  height: 70px;\r\n  background-color: white;\r\n  cursor: pointer;\r\n  left: 0;\r\n  transform-origin: 200px;\r\n  transition: 0.5s;\r\n  transition-delay: calc(0.1s * var(--i));\r\n  transform: rotate(0deg) translateX(160px);\r\n}\r\n\r\n.header-container__menu.active div {\r\n  transform: rotate(calc(360deg / 6 * var(--i)));\r\n}\r\n\r\n.header-container__menu.active div div {\r\n  transform: rotate(calc(360deg / -6 * var(--i)));\r\n}\r\n\r\n.page-container__naming {\r\n  padding-left: 30px;\r\n  font-size: 60px;\r\n  line-height: 100px;\r\n  font-family: \'Niconne\', cursive;\r\n  color: white;\r\n}\r\n\r\n.header-container__menu .menu__toggle-button::after {\r\n  content: "MENU";\r\n}\r\n\r\n.header-container__menu.active .menu__toggle-button::after {\r\n  content: "";\r\n}\r\n\r\n.header-container__menu.active .menu__toggle-button {\r\n  background-image: url('+b+");\r\n  background-size: 50% 50%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}\r\n\r\n.menu__toggle-button {\r\n  position: relative;\r\n  width: 100px;\r\n  height: 100px;\r\n  color: grey;\r\n  font-size: 27px;\r\n  font-weight: 600;\r\n  line-height: 103px;\r\n  border-radius: 50%;\r\n  text-align: center;\r\n  font-family: 'Roboto', sans-serif;\r\n  background-color: white;\r\n  z-index: 100;\r\n  cursor: pointer;\r\n}\r\n\r\n.menu__home-button div {\r\n  background-image: url("+y+");\r\n}\r\n\r\n.menu__book-button div {\r\n  background-image: url("+x+");\r\n}\r\n\r\n.menu__audio-challenge-button div {\r\n  background-image: url("+w+");\r\n}\r\n\r\n.menu__sprint-button div {\r\n  background-image: url("+E+");\r\n}\r\n\r\n.menu__statistics-button div {\r\n  background-image: url("+C+");\r\n}\r\n\r\n.menu__team-button div {\r\n  background-image: url("+k+");\r\n}\r\n\r\n.menu__book-button div,\r\n.menu__audio-challenge-button div,\r\n.menu__sprint-button div,\r\n.menu__statistics-button div,\r\n.menu__team-button div,\r\n.menu__home-button div {\r\n  border-radius: 50%;\r\n  width: 70px;\r\n  height: 70px;\r\n  background-size: 60% 60%;\r\n  background-repeat: no-repeat;\r\n  background-position: center;\r\n}",""]);const S=h},645:e=>{e.exports=function(e){var n=[];return n.toString=function(){return this.map((function(n){var t="",r=void 0!==n[5];return n[4]&&(t+="@supports (".concat(n[4],") {")),n[2]&&(t+="@media ".concat(n[2]," {")),r&&(t+="@layer".concat(n[5].length>0?" ".concat(n[5]):""," {")),t+=e(n),r&&(t+="}"),n[2]&&(t+="}"),n[4]&&(t+="}"),t})).join("")},n.i=function(e,t,r,o,i){"string"==typeof e&&(e=[[null,e,void 0]]);var a={};if(r)for(var s=0;s<this.length;s++){var c=this[s][0];null!=c&&(a[c]=!0)}for(var u=0;u<e.length;u++){var d=[].concat(e[u]);r&&a[d[0]]||(void 0!==i&&(void 0===d[5]||(d[1]="@layer".concat(d[5].length>0?" ".concat(d[5]):""," {").concat(d[1],"}")),d[5]=i),t&&(d[2]?(d[1]="@media ".concat(d[2]," {").concat(d[1],"}"),d[2]=t):d[2]=t),o&&(d[4]?(d[1]="@supports (".concat(d[4],") {").concat(d[1],"}"),d[4]=o):d[4]="".concat(o)),n.push(d))}},n}},667:e=>{e.exports=function(e,n){return n||(n={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),n.hash&&(e+=n.hash),/["'() \t\n]|(%20)/.test(e)||n.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},46:(e,n,t)=>{t.r(n),t.d(n,{default:()=>h});var r=t(379),o=t.n(r),i=t(795),a=t.n(i),s=t(569),c=t.n(s),u=t(565),d=t.n(u),l=t(216),m=t.n(l),v=t(589),p=t.n(v),f=t(756),g={};g.styleTagTransform=p(),g.setAttributes=d(),g.insert=c().bind(null,"head"),g.domAPI=a(),g.insertStyleElement=m(),o()(f.Z,g);const h=f.Z&&f.Z.locals?f.Z.locals:void 0},259:(e,n,t)=>{t.r(n),t.d(n,{default:()=>h});var r=t(379),o=t.n(r),i=t(795),a=t.n(i),s=t(569),c=t.n(s),u=t(565),d=t.n(u),l=t(216),m=t.n(l),v=t(589),p=t.n(v),f=t(242),g={};g.styleTagTransform=p(),g.setAttributes=d(),g.insert=c().bind(null,"head"),g.domAPI=a(),g.insertStyleElement=m(),o()(f.Z,g);const h=f.Z&&f.Z.locals?f.Z.locals:void 0},379:e=>{var n=[];function t(e){for(var t=-1,r=0;r<n.length;r++)if(n[r].identifier===e){t=r;break}return t}function r(e,r){for(var i={},a=[],s=0;s<e.length;s++){var c=e[s],u=r.base?c[0]+r.base:c[0],d=i[u]||0,l="".concat(u," ").concat(d);i[u]=d+1;var m=t(l),v={css:c[1],media:c[2],sourceMap:c[3],supports:c[4],layer:c[5]};if(-1!==m)n[m].references++,n[m].updater(v);else{var p=o(v,r);r.byIndex=s,n.splice(s,0,{identifier:l,updater:p,references:1})}a.push(l)}return a}function o(e,n){var t=n.domAPI(n);return t.update(e),function(n){if(n){if(n.css===e.css&&n.media===e.media&&n.sourceMap===e.sourceMap&&n.supports===e.supports&&n.layer===e.layer)return;t.update(e=n)}else t.remove()}}e.exports=function(e,o){var i=r(e=e||[],o=o||{});return function(e){e=e||[];for(var a=0;a<i.length;a++){var s=t(i[a]);n[s].references--}for(var c=r(e,o),u=0;u<i.length;u++){var d=t(i[u]);0===n[d].references&&(n[d].updater(),n.splice(d,1))}i=c}}},569:e=>{var n={};e.exports=function(e,t){var r=function(e){if(void 0===n[e]){var t=document.querySelector(e);if(window.HTMLIFrameElement&&t instanceof window.HTMLIFrameElement)try{t=t.contentDocument.head}catch(e){t=null}n[e]=t}return n[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(t)}},216:e=>{e.exports=function(e){var n=document.createElement("style");return e.setAttributes(n,e.attributes),e.insert(n,e.options),n}},565:(e,n,t)=>{e.exports=function(e){var n=t.nc;n&&e.setAttribute("nonce",n)}},795:e=>{e.exports=function(e){var n=e.insertStyleElement(e);return{update:function(t){!function(e,n,t){var r="";t.supports&&(r+="@supports (".concat(t.supports,") {")),t.media&&(r+="@media ".concat(t.media," {"));var o=void 0!==t.layer;o&&(r+="@layer".concat(t.layer.length>0?" ".concat(t.layer):""," {")),r+=t.css,o&&(r+="}"),t.media&&(r+="}"),t.supports&&(r+="}");var i=t.sourceMap;i&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i))))," */")),n.styleTagTransform(r,e,n.options)}(n,e,t)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)}}}},589:e=>{e.exports=function(e,n){if(n.styleSheet)n.styleSheet.cssText=e;else{for(;n.firstChild;)n.removeChild(n.firstChild);n.appendChild(document.createTextNode(e))}}},353:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0}),n.applyStyle=n.setAttributeForElements=n.getRandomHEXColor=n.getRandomElementForStringArray=n.classListContains=n.toggleElement=n.removeClassForElement=n.setElementInactive=n.addClassForElement=n.setElementActive=n.getElementById=n.getListOfElementsByClassName=n.getElementByClassName=n.getBody=void 0,n.getBody=()=>document.querySelector("body"),n.getElementByClassName=e=>document.querySelector(`.${e}`),n.getListOfElementsByClassName=e=>t(void 0,void 0,void 0,(function*(){return document.querySelectorAll(`.${e}`)})),n.getElementById=e=>document.getElementById(e),n.setElementActive=e=>t(void 0,void 0,void 0,(function*(){return e.classList.add("active")})),n.addClassForElement=(e,n)=>t(void 0,void 0,void 0,(function*(){return e.classList.add(n)})),n.setElementInactive=e=>t(void 0,void 0,void 0,(function*(){return e.classList.remove("active")})),n.removeClassForElement=(e,n)=>t(void 0,void 0,void 0,(function*(){return e.classList.remove(n)})),n.toggleElement=e=>t(void 0,void 0,void 0,(function*(){return e.classList.toggle("active")})),n.classListContains=(e,n)=>e.classList.contains(n),n.getRandomElementForStringArray=e=>e[Math.floor(Math.random()*e.length)],n.getRandomHEXColor=()=>{let e="#";for(let n=0;n<3;n++)e+=Math.floor(256*Math.random()).toString(16).padStart(2,"0");return e},n.setAttributeForElements=(e,n,t)=>e.forEach((e=>e.setAttribute(n,t))),n.applyStyle=(e,n,t)=>e.setAttribute(n,t)},466:function(e,n,t){var r=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((r=r.apply(e,n||[])).next())}))},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0});const i=t(353),a=o(t(596)),s=o(t(269)),c=o(t(625));t(259),n.default=class{constructor(){this.started=!1}render(){return r(this,void 0,void 0,(function*(){yield this.renderCoreComponents()}))}renderCoreComponents(){return r(this,void 0,void 0,(function*(){const e=(0,i.getBody)();(0,i.addClassForElement)(e,"start");const n=(0,i.getElementByClassName)("page-container"),t=(0,i.getElementByClassName)("footer-container");n.innerHTML=yield s.default.render(),t.innerHTML=yield c.default.render(),this.started||((0,i.getElementByClassName)("header-container").innerHTML=yield a.default.render(),this.addListeners()),this.started=!0;const r=(0,i.getElementByClassName)("header-container__menu");(0,i.addClassForElement)(r,"start"),(0,i.removeClassForElement)(r,"game"),(0,i.removeClassForElement)(r,"active")}))}addListeners(){const e=(0,i.getElementByClassName)("menu__toggle-button"),n=(0,i.getElementByClassName)("header-container__menu");e.addEventListener("click",(()=>{(0,i.toggleElement)(n)})),(0,i.getElementByClassName)("menu__home-button").addEventListener("click",(()=>{this.render()})),(0,i.getElementByClassName)("menu__audio-challenge-button").addEventListener("click",(()=>{this.resetStartForGames(n)})),(0,i.getElementByClassName)("menu__sprint-button").addEventListener("click",(()=>{this.resetStartForGames(n)}))}resetStartForGames(e){const n=(0,i.getBody)();(0,i.removeClassForElement)(n,"start"),(0,i.removeClassForElement)(e,"start"),(0,i.addClassForElement)(e,"game"),(0,i.removeClassForElement)(e,"active")}}},625:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r={render:()=>t(void 0,void 0,void 0,(function*(){return'\n  <div class="footer-add">\n\n  </div>\n            '}))};n.default=r},269:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r={render:()=>t(void 0,void 0,void 0,(function*(){return'\n    <div class="page-container__naming">RS Lang</div>\n            '}))};n.default=r},596:function(e,n){var t=this&&this.__awaiter||function(e,n,t,r){return new(t||(t=Promise))((function(o,i){function a(e){try{c(r.next(e))}catch(e){i(e)}}function s(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var n;e.done?o(e.value):(n=e.value,n instanceof t?n:new t((function(e){e(n)}))).then(a,s)}c((r=r.apply(e,n||[])).next())}))};Object.defineProperty(n,"__esModule",{value:!0});const r={render:()=>t(void 0,void 0,void 0,(function*(){return'\n    <div class="header-container__menu menu">\n      <button class="menu__toggle-button"></button>\n      <div style="--i:0;" class="menu__home-button" title="Home">\n        <div></div>\n      </div>\n      <div style="--i:1;" class="menu__audio-challenge-button" title="Audio Challenge">\n        <div></div>\n      </div>\n      <div style="--i:2;" class="menu__sprint-button" title="Sprint">\n        <div></div>\n      </div>\n      <div style="--i:3;" class="menu__book-button" title="Study Book">\n        <div></div>\n      </div>\n      <div style="--i:4;" class="menu__statistics-button" title="Statistics">\n        <div></div>\n      </div>\n      <div style="--i:5;" class="menu__team-button" title="Team">\n        <div></div>\n      </div>\n    </div>\n            '}))};n.default=r},294:function(e,n,t){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(n,"__esModule",{value:!0}),t(46),(new(r(t(466)).default)).render()},306:(e,n,t)=>{e.exports=t.p+"src/assets/img/start-image.jpg"},279:(e,n,t)=>{e.exports=t.p+"src/assets/svg/book-solid.svg"},152:(e,n,t)=>{e.exports=t.p+"src/assets/svg/chart-line-solid.svg"},764:(e,n,t)=>{e.exports=t.p+"src/assets/svg/headphones-solid.svg"},785:(e,n,t)=>{e.exports=t.p+"src/assets/svg/house-solid.svg"},686:(e,n,t)=>{e.exports=t.p+"src/assets/svg/person-running-solid.svg"},211:(e,n,t)=>{e.exports=t.p+"src/assets/svg/users-solid.svg"},385:(e,n,t)=>{e.exports=t.p+"src/assets/svg/xmark-solid.svg"}},n={};function t(r){var o=n[r];if(void 0!==o)return o.exports;var i=n[r]={id:r,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.exports}t.m=e,t.n=e=>{var n=e&&e.__esModule?()=>e.default:()=>e;return t.d(n,{a:n}),n},t.d=(e,n)=>{for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})},t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var n=t.g.document;if(!e&&n&&(n.currentScript&&(e=n.currentScript.src),!e)){var r=n.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})(),t.b=document.baseURI||self.location.href,t(294)})();