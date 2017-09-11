/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

const $l = function(selectorReady) {
  if (selectorReady instanceof Function) {
    document.addEventListener("DOMContentLoaded", selectorReady);
  } else if (selectorReady instanceof Array) {
    const DOMElement = document.createElement(selectorReady[0])
    return new DOMNodeCollection([DOMElement])
  } else {
    const DOMArray = Array.from(document.querySelectorAll(selectorReady));
    return new DOMNodeCollection(DOMArray);
  }
};

$l.extend = function(target, ...sources) {
  return Object.assign(target, ...sources);
};

$l.ajax = function(options) {
  const defaults = {
      method: 'GET',
      url: null,
      data: null,
      contentType: 'JSON',
      success(payload) {
        console.log(payload);
      },
      error(error) {
        console.log(error);
      }
  };

  options = $l.extend(defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);
  xhr.setRequestHeader("Content-Type", options.contentType);
  xhr.onload = options.success;
  xhr.onerror = options.error;
  xhr.send(options.data);
};

window.$l = $l;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlElements) {
    this.htmlElements = htmlElements;
  }

  html(newInner) {
    if (newInner || newInner === "") {
      this.htmlElements.forEach(el => {
        el.innerHTML = newInner;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }

    return this;
  }

  empty() {
    this.html("");
    return this;
  }

  append(childElements) {
    this.htmlElements.forEach(parentEl => {
      childElements.htmlElements.forEach(childEl => {
        parentEl.appendChild(childEl);
      });
    });

    return this;
  }

  attr(attribute, value) {
    if (value || value === "") {
      this.htmlElements.forEach(el => {
        el.setAttribute(attribute, value);
      });
    } else {
      return this.htmlElements[0].getAttribute(attribute);
    }

    return this;
  }

  addClass(newClass) {
    let replacement = (this.htmlElements[0].className += ` ${newClass}`).trim();
    this.attr('class', replacement);
    return this;
  }

  removeClass(oldClass) {
    const replacement = this.htmlElements[0].className.replace(oldClass, "").trim();
    this.attr('class', replacement);
    return this;
  }

  toggle(className) {
    this.htmlElements.forEach(element => {
      element.classList.toggle(className);
    });
  }

  children() {
    let final = [];

    this.htmlElements.forEach(el => {
      final = final.concat(el.children);
    });

    return new DOMNodeCollection(final);
  }

  parent() {
    let final = [];

    this.htmlElements.forEach(el => {
      final = final.concat(el.parentElement);
    });

    return new DOMNodeCollection(final);
  }

  find(selector) {
    let final = [];
    this.htmlElements.forEach(el => {
      final = final.concat(Array.from(el.querySelectorAll(selector)));
    });
    return new DOMNodeCollection(final);
  }

  remove() {
    this.htmlElements.forEach(el => {
      el.remove();
    });
  }

  on(eventType, callback) {
    this.htmlElements.forEach(el => {
      el.addEventListener(eventType, callback);
      el.eventCallback = callback;
    });
  }

  off(eventType) {
    this.htmlElements.forEach(el => {
      el.removeEventListener(eventType, el.eventCallback);
    });
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);
