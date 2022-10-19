/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\r\n\r\nfunction nonNegative(x) {\r\n    return x >= 0 ? x : -x\r\n}\r\n\r\n\r\nclass Playground {\r\n    constructor(obs = new Observer()) {\r\n        const canvas = document.getElementById(\"root\").querySelector(\"canvas\")\r\n        const self = this\r\n        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__.Scene()\r\n        this.observer = obs\r\n        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__.WebGLRenderer({\r\n            // antialias: true,\r\n            canvas,\r\n            // alpha: true\r\n        })\r\n\r\n        this.renderer.setSize(window.innerWidth, window.innerHeight)\r\n\r\n        this.render = () => {\r\n            requestAnimationFrame(self.render)\r\n\r\n            if(self.observer.keysMap[0])\r\n                self.observer.camera.position.set(\r\n                    self.observer.camera.position.x - Math.sin(self.observer.camera.rotation.y) / 100,\r\n                    0,\r\n                    self.observer.camera.position.z - Math.cos(self.observer.camera.rotation.y) / 100,\r\n                ) \r\n            if(self.observer.keysMap[1])\r\n                self.observer.camera.rotation.y += .01\r\n            if(self.observer.keysMap[2])\r\n                self.observer.camera.rotation.y -= .01\r\n\r\n            self.renderer.render(self.scene, self.observer.camera)\r\n        }\r\n\r\n        window.addEventListener(\"keydown\", (e) => {\r\n            e.preventDefault()\r\n            switch(e.key) {\r\n                case \"w\":\r\n                    self.observer.keysMap[0] = true\r\n                    break\r\n                case \"a\":\r\n                    self.observer.keysMap[1] = true\r\n                    break\r\n                case \"d\":\r\n                    self.observer.keysMap[2] = true\r\n                    break\r\n            }\r\n        })\r\n        window.addEventListener(\"keyup\", (e) => {\r\n            e.preventDefault()\r\n            switch(e.key) {\r\n                case \"w\":\r\n                    self.observer.keysMap[0] = false\r\n                    break\r\n                case \"a\":\r\n                    self.observer.keysMap[1] = false\r\n                    break\r\n                case \"d\":\r\n                    self.observer.keysMap[2] = false\r\n                    break\r\n            }\r\n        })\r\n        \r\n\r\n        window.addEventListener(\"resize\", () => {\r\n            self.renderer.setPixelRatio(window.innerWidth / window.innerHeight)\r\n            self.renderer.setSize(window.innerWidth, window.innerHeight)\r\n        })\r\n    }\r\n}\r\n\r\nclass Observer {\r\n    constructor(fov = 75) {\r\n        const self = this\r\n        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 0.1, 1000)\r\n\r\n        this.keysMap = [false, false, false]\r\n\r\n        window.addEventListener(\"resize\", () => {\r\n            self.camera.aspect = window.innerWidth / window.innerHeight\r\n            self.camera.updateProjectionMatrix()\r\n        })\r\n    }\r\n}\r\n\r\nclass Entity {\r\n    constructor(position, mesh, rotationY = 0) {\r\n        this.position = position\r\n        this.mesh = mesh\r\n\r\n        this.mesh.position.set(this.position.x, this.position.y, this.position.z)\r\n        this.mesh.rotation.y = rotationY\r\n    }\r\n}\r\n\r\nconst playground = new Playground()\r\n\r\nconst entity = new Entity(\r\n    new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(0, -1, 0),\r\n    new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(\r\n        new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(32, .5, 32),\r\n        new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\r\n            color: 0x6666da\r\n        })\r\n    )\r\n)\r\n\r\nplayground.scene.add(entity.mesh)\r\n\r\n\r\nfor(let i = 1; i <= 4; i++) {\r\n    playground.scene.add((new Entity(    \r\n        new three__WEBPACK_IMPORTED_MODULE_0__.Vector3(32 * nonNegative(i - 2), 0, 32 * nonNegative(i - 2)),\r\n        new three__WEBPACK_IMPORTED_MODULE_0__.Mesh(\r\n            new three__WEBPACK_IMPORTED_MODULE_0__.BoxGeometry(32, 3, 3),\r\n            new three__WEBPACK_IMPORTED_MODULE_0__.MeshBasicMaterial({\r\n                color: 0xdeeeee\r\n            })\r\n        ),\r\n        nonNegative(i - 2) * Math.PI / 2\r\n    )).mesh)\r\n}\r\n\r\n\r\n\r\nplayground.render()\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/app.js");
/******/ 	
/******/ })()
;