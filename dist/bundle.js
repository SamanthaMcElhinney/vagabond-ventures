/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_plane_blue_png__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7);
// Imports




var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_images_plane_blue_png__WEBPACK_IMPORTED_MODULE_3__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  background-color: #026F95;\n  font-family: 'Quicksand', sans-serif;\n}\n\nh1 {\n  font-size: 2.2em;\n}\n\nh2 {\n  font-size: 1.7em;\n}\n\nh3 {\n  font-size: 1.5em;\n}\n\np {\n  font-size: 1.10em;\n  margin: 2px;\n}\n\nbody {\n  position: absolute;\n  left: 0%;\n  bottom: 0%;\n  top: 0%;\n}\n\nmain {\n  height: 100%;\n  width: 70%;\n  margin: 10px;\n  display: flex;\n  flex-direction: column;\n}\n\n-------------------------------HEADER ELEMENTS------------------------------- \n.header-container,\n.logo,\n.header,\n.header-title {\n  display: flex;\n}\n\n.logo {\n  position: fixed;\n  height: auto;\n  max-width: 125%;\n}\n\n.header {\n  flex-direction: row-reverse;\n  align-content: space-between;\n  justify-content: center;\n  width:100%;\n  height:10%;\n}\n\n.header-title {\n  color: #ff9113;\n  font-weight: bold;\n  margin-top: -30px;\n  font-size: 1.3em;\n\n}\n\n.header-stripes {\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.logo-image {\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: -10px;\n}\n\nheader {\n  position: relative;\n  display: flex;\n  background-color: #37261f;\n  height: 20%;\n  width: 100%;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-content: stretch;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n@media (max-width: 768px) {\n  .header-title {\n    font-size: 1em;\n    margin-top: -20px;\n  }\n\n  .logo-image {\n    max-height: 80% !important;\n  }\n}\n\n@media (max-width: 480px) {\n  .header-title {\n    font-size: 0.9em;\n    margin-top: -10px;\n  }\n\n  .logo-image {\n    max-height: 60% !important;\n  }\n}\n\n-------------------------------NAVIGATION ELEMENTS------------------------------- \n.estimated-quote-section {\n  background-color: white;\n}\n\n.nav-section {\n  display: flex;\n}\n\n.nav-greeting {\n  color: #FEE4B4;\n}\n\n.nav-section {\n  height: 100vh;\n  width: 20%;\n  padding: 10px;\n  background-color: #FF6A2C;\n  display: flex;\n  flex-direction: column;\n  margin: 10px;\n}\n\n.trip-form {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  align-content: stretch;\n  justify-content: space-evenly;\n  align-items: stretch;\n}\n\n.estimated-button-container {\n  display: flex;\n  padding-top: 10px;\n  justify-content: space-around;\n}\n\n.navigation-user-card {\n  display: flex;\n  padding-top: 10px;\n  background-color: #D9D9D9;\n  flex-direction: column;\n  padding: 10px;\n  margin-top: 20px;\n}\n\n.estimated-button:hover,\n.submit-button:hover,\n.navigation-user-card:hover {\n  background-color: #80B0A4;\n  transition: 0.7s;\n}\n\n.navigation-user-card:hover {\n  background-color: #80B0A4;\n  transition: 0.7s;\n}\n\n.navigation-user-welcome {\n  margin-top: 10px;\n  font-weight: bolder;\n  color: black;\n}\n\n@media only screen and (max-width: 768px) {\n  .nav-section {\n    width: 100%;\n  }\n  .trip-form {\n    flex-wrap: wrap;\n  }\n}\n\n-------------------------------Main Card Section------------------------------- \n.main-section-container {\n  height: 80%;\n}\n\n.card-holder-img {\n  width: 100%;\n}\n\n.main-section-container,\n.main-title,\n.all-trips,\n.main-container-buttons {\n  display: flex;\n}\n\n.main-button {\n  background-color: #D9D9D9;\n}\n\n.main-button:hover {\n  background-color: #FF6A2C;\n  transition: 0.7s;\n}\n\n.main-container-buttons {\n  padding: 10px;\n  justify-content: center;\n}\n\n.main-button {\n  width: 125px;\n  margin: 10px;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-column-gap: 5%;\n  grid-row-gap: 7%;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 100%;\n  width: 100%;\n  border: 1px solid #37261f;\n  border-radius: 2px;\n  margin-bottom: 5px;\n  padding: 5%;\n  background-color: antiquewhite;\n}\n\nimg {\n  margin-bottom: 11%;\n  height: 150px;\n}\n\n.card-text {\n  background-color: #D9D9D9;\n}\n\n.card-title {\n  display: flex;\n  font-weight: bold;\n  justify-content: center;\n}\n\n@media screen and (max-width: 1200px) {\n  .card-grid {\n    grid-template-columns: repeat(3, 1fr);\n    grid-column-gap: 6%;\n    grid-row-gap: 5%;\n  }\n}\n\n@media screen and (max-width: 1000px) {\n  .card-grid {\n    grid-template-columns: 1fr 1fr;\n    grid-column-gap: 8%;\n    grid-row-gap: 3%;\n  }\n}\n\n@media screen and (max-width: 480px) {\n  .card-grid {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n}\n\n-------------------------------Login Section------------------------------- .login-page-stripes {\n  height: 100%;\n  width: 20%;\n}\n\n.image-stripes {\n  height: 100vh;\n}\n\n.container-login-section {\n  margin-top: 0px;\n  flex-direction: column;\n  flex-wrap: wrap;\n  margin-top: 100px;\n  margin-left: 200px;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-title {\n  color: #FF6A2C;\n  font-family: 'Kool Beans', sans-serif;\n}\n\n.login-container {\n  margin: 30px;\n  color: antiquewhite;\n}\n\n.login-button {\n  background-color: #FF6A2C;\n  width: 100px;\n}\n\n.login-button:hover {\n  background-color: #06265a;\n  color: #FF6A2C;\n}\n\n.login-username-container,\n.login-password, .container-login-section, .login-page-stripes, .login-title {\n  margin-bottom: 30px;\n}\n\n.time-to-travel, .login-error {\n  display: flex;\n}\n\n.login-page {\n  display: flex;\n  justify-content: flex-start;\n  background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n}\n\n@media (max-width: 1000px) {\n  .container-login-section {\n    margin-left: 100px;\n  }\n}\n\n@media (max-width: 768px) {\n  .login-page-stripes {\n    width: 100%;\n    height: 100%;\n  }\n\n  .image-stripes {\n    height: 100vh;\n  }\n\n  .container-login-section {\n    margin-top: 53px;\n    margin-left: 20px;\n  }\n\n  .login-container {\n    margin: 15px;\n  }\n\n  .login-username-container,\n  .login-password {\n    margin-bottom: 15px;\n  }\n}\n\n@media (max-width: 480px) {\n  .login-title {\n    font-size: 20px;\n  }\n\n  .login-username-container,\n  .login-password {\n    margin-bottom: 10px;\n  }\n\n  .login-button {\n    width: 80px;\n  }\n}\n\n.login-error  {\n  margin: 10px;\n}\n.hidden {\n  display: none;\n}", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":"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","sourcesContent":["body {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  padding: 0;\n  margin: 0;\n  background-color: #026F95;\n  font-family: 'Quicksand', sans-serif;\n}\n\nh1 {\n  font-size: 2.2em;\n}\n\nh2 {\n  font-size: 1.7em;\n}\n\nh3 {\n  font-size: 1.5em;\n}\n\np {\n  font-size: 1.10em;\n  margin: 2px;\n}\n\nbody {\n  position: absolute;\n  left: 0%;\n  bottom: 0%;\n  top: 0%;\n}\n\nmain {\n  height: 100%;\n  width: 70%;\n  margin: 10px;\n  display: flex;\n  flex-direction: column;\n}\n\n-------------------------------HEADER ELEMENTS------------------------------- \n.header-container,\n.logo,\n.header,\n.header-title {\n  display: flex;\n}\n\n.logo {\n  position: fixed;\n  height: auto;\n  max-width: 125%;\n}\n\n.header {\n  flex-direction: row-reverse;\n  align-content: space-between;\n  justify-content: center;\n  width:100%;\n  height:10%;\n}\n\n.header-title {\n  color: #ff9113;\n  font-weight: bold;\n  margin-top: -30px;\n  font-size: 1.3em;\n\n}\n\n.header-stripes {\n  flex-wrap: wrap;\n  flex-direction: row;\n}\n\n.logo-image {\n  width: 100%;\n  margin-top: -20px;\n  margin-bottom: -10px;\n}\n\nheader {\n  position: relative;\n  display: flex;\n  background-color: #37261f;\n  height: 20%;\n  width: 100%;\n  flex-wrap: nowrap;\n  flex-direction: row;\n  align-content: stretch;\n  justify-content: center;\n  align-items: flex-start;\n}\n\n@media (max-width: 768px) {\n  .header-title {\n    font-size: 1em;\n    margin-top: -20px;\n  }\n\n  .logo-image {\n    max-height: 80% !important;\n  }\n}\n\n@media (max-width: 480px) {\n  .header-title {\n    font-size: 0.9em;\n    margin-top: -10px;\n  }\n\n  .logo-image {\n    max-height: 60% !important;\n  }\n}\n\n-------------------------------NAVIGATION ELEMENTS------------------------------- \n.estimated-quote-section {\n  background-color: white;\n}\n\n.nav-section {\n  display: flex;\n}\n\n.nav-greeting {\n  color: #FEE4B4;\n}\n\n.nav-section {\n  height: 100vh;\n  width: 20%;\n  padding: 10px;\n  background-color: #FF6A2C;\n  display: flex;\n  flex-direction: column;\n  margin: 10px;\n}\n\n.trip-form {\n  display: flex;\n  flex-direction: column;\n  flex-wrap: wrap;\n  align-content: stretch;\n  justify-content: space-evenly;\n  align-items: stretch;\n}\n\n.estimated-button-container {\n  display: flex;\n  padding-top: 10px;\n  justify-content: space-around;\n}\n\n.navigation-user-card {\n  display: flex;\n  padding-top: 10px;\n  background-color: #D9D9D9;\n  flex-direction: column;\n  padding: 10px;\n  margin-top: 20px;\n}\n\n.estimated-button:hover,\n.submit-button:hover,\n.navigation-user-card:hover {\n  background-color: #80B0A4;\n  transition: 0.7s;\n}\n\n.navigation-user-card:hover {\n  background-color: #80B0A4;\n  transition: 0.7s;\n}\n\n.navigation-user-welcome {\n  margin-top: 10px;\n  font-weight: bolder;\n  color: black;\n}\n\n@media only screen and (max-width: 768px) {\n  .nav-section {\n    width: 100%;\n  }\n  .trip-form {\n    flex-wrap: wrap;\n  }\n}\n\n-------------------------------Main Card Section------------------------------- \n.main-section-container {\n  height: 80%;\n}\n\n.card-holder-img {\n  width: 100%;\n}\n\n.main-section-container,\n.main-title,\n.all-trips,\n.main-container-buttons {\n  display: flex;\n}\n\n.main-button {\n  background-color: #D9D9D9;\n}\n\n.main-button:hover {\n  background-color: #FF6A2C;\n  transition: 0.7s;\n}\n\n.main-container-buttons {\n  padding: 10px;\n  justify-content: center;\n}\n\n.main-button {\n  width: 125px;\n  margin: 10px;\n}\n\n.card-grid {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  grid-column-gap: 5%;\n  grid-row-gap: 7%;\n}\n\n.card {\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  height: 100%;\n  width: 100%;\n  border: 1px solid #37261f;\n  border-radius: 2px;\n  margin-bottom: 5px;\n  padding: 5%;\n  background-color: antiquewhite;\n}\n\nimg {\n  margin-bottom: 11%;\n  height: 150px;\n}\n\n.card-text {\n  background-color: #D9D9D9;\n}\n\n.card-title {\n  display: flex;\n  font-weight: bold;\n  justify-content: center;\n}\n\n@media screen and (max-width: 1200px) {\n  .card-grid {\n    grid-template-columns: repeat(3, 1fr);\n    grid-column-gap: 6%;\n    grid-row-gap: 5%;\n  }\n}\n\n@media screen and (max-width: 1000px) {\n  .card-grid {\n    grid-template-columns: 1fr 1fr;\n    grid-column-gap: 8%;\n    grid-row-gap: 3%;\n  }\n}\n\n@media screen and (max-width: 480px) {\n  .card-grid {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n  }\n}\n\n-------------------------------Login Section------------------------------- .login-page-stripes {\n  height: 100%;\n  width: 20%;\n}\n\n.image-stripes {\n  height: 100vh;\n}\n\n.container-login-section {\n  margin-top: 0px;\n  flex-direction: column;\n  flex-wrap: wrap;\n  margin-top: 100px;\n  margin-left: 200px;\n  justify-content: center;\n  align-items: center;\n}\n\n.login-title {\n  color: #FF6A2C;\n  font-family: 'Kool Beans', sans-serif;\n}\n\n.login-container {\n  margin: 30px;\n  color: antiquewhite;\n}\n\n.login-button {\n  background-color: #FF6A2C;\n  width: 100px;\n}\n\n.login-button:hover {\n  background-color: #06265a;\n  color: #FF6A2C;\n}\n\n.login-username-container,\n.login-password, .container-login-section, .login-page-stripes, .login-title {\n  margin-bottom: 30px;\n}\n\n.time-to-travel, .login-error {\n  display: flex;\n}\n\n.login-page {\n  display: flex;\n  justify-content: flex-start;\n  background-image: url(\"../images/plane-blue.png\");\n}\n\n@media (max-width: 1000px) {\n  .container-login-section {\n    margin-left: 100px;\n  }\n}\n\n@media (max-width: 768px) {\n  .login-page-stripes {\n    width: 100%;\n    height: 100%;\n  }\n\n  .image-stripes {\n    height: 100vh;\n  }\n\n  .container-login-section {\n    margin-top: 53px;\n    margin-left: 20px;\n  }\n\n  .login-container {\n    margin: 15px;\n  }\n\n  .login-username-container,\n  .login-password {\n    margin-bottom: 15px;\n  }\n}\n\n@media (max-width: 480px) {\n  .login-title {\n    font-size: 20px;\n  }\n\n  .login-username-container,\n  .login-password {\n    margin-bottom: 10px;\n  }\n\n  .login-button {\n    width: 80px;\n  }\n}\n\n.login-error  {\n  margin: 10px;\n}\n.hidden {\n  display: none;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((module) => {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/plane-blue.png");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class DestinationRepository {
  constructor(destinationData) {
    this.data = destinationData;
  }

  findMatchingTripToDestination(id) {
    const tripData = this.data.filter((destination) => id === destination.id);
    console.log(tripData);
    return tripData;
  }

  getSingleDestinationById(id) {
    return this.data.find((destination) => destination.id === id);
  }

  findDestinationByName(name) {
    const destination = this.data.find(
      (destination) => destination.destination === name
    );
    if (!destination) {
      return "Sorry no such destination";
    } else {
      return destination;
    }
  }

  calculateTotalTripCost(id, travelers, duration) {
    let destination = this.getSingleDestinationById(id);
    let totalCost =
      destination.estimatedLodgingCostPerDay * duration +
      destination.estimatedFlightCostPerPerson * travelers;
    return Number((totalCost * 1.1).toFixed(2));
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DestinationRepository);

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class TravelerRepository {
  constructor(travelersData) {
    this.data = travelersData;
  }

  getSingleTravelerById(id) {
    return this.data.find((traveler) => traveler.id === id);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelerRepository);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(travelerInfo) {
    this.id = travelerInfo.id;
    this.name = travelerInfo.name;
    this.travelerType = travelerInfo.travelerType;
  }

  returnTravelersFirstName() {
    return this.name.split(" ")[0];
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const dayjs = __webpack_require__(12);

class TripRepo {
  constructor(tripInfo) {
    this.data = tripInfo;
  }

  findAllTripsByTraveler(id) {
    return this.data.filter((data) => data.userID === id);
  }

  returnPastTrips(id, date) {
    return this.findAllTripsByTraveler(id).filter(
      (trip) =>
        trip.status === "approved" &&
        dayjs(trip.date).format("YYYY/MM/DD") <=
          dayjs(date).format("YYYY/MM/DD")
    );
  }

  returnFutureTrips(id, date) {
    const result = this.findAllTripsByTraveler(id).filter(
      (trip) =>
        trip.status === "approved" &&
        dayjs(trip.date).format("YYYY/MM/DD") >=
          dayjs(date).format("YYYY/MM/DD")
    );
    return result;
  }

  returnPendingTrips(id) {
    const result = this.findAllTripsByTraveler(id).filter(
      (trip) => trip.status === "pending"
    );
    return result;
  }

  getTripsByStatus(id, status) {
    let travelerTrips = this.getTripsByUserId(id);
    return travelerTrips.filter((trip) => trip.status === status);
  }

  calculateTotalSpentByTraveler(id, destinations) {
    let trips = this.findAllTripsByTraveler(id);
    let total = trips.reduce((acc, trip) => {
      acc += destinations.calculateTotalTripCost(
        trip.destinationID,
        trip.travelers,
        trip.duration
      );
      return acc;
    }, 0);
    return total;
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TripRepo);


/***/ }),
/* 12 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/logo-main.png");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/rainbow.jpg");

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("images/login-logo.png");

/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAllDestinations: () => (/* binding */ fetchAllDestinations),
/* harmony export */   fetchAllTrips: () => (/* binding */ fetchAllTrips),
/* harmony export */   fetchTravelers: () => (/* binding */ fetchTravelers)
/* harmony export */ });
function fetchTravelers() {
  return fetch("http://localhost:3001/api/v1/travelers")
    .then((response) => response.json())
    .then((data) => data.travelers);
}

function fetchAllTrips() {
  return fetch("http://localhost:3001/api/v1/trips")
    .then((response) => response.json())
    .then((data) => data.trips);
}

function fetchAllDestinations() {
  return fetch("http://localhost:3001/api/v1/destinations")
    .then((response) => response.json())
    .then((data) => data.destinations);
}




/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _classes_Destination_Repo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _classes_Traveler_Repo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _classes_Traveler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _classes_TripRepo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(11);
/* harmony import */ var _images_logo_main_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13);
/* harmony import */ var _images_rainbow_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _images_login_logo_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(15);
/* harmony import */ var _images_plane_blue_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7);
/* harmony import */ var _ApiCalls__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(16);
// Imports


// Classes import





//Images Import





//Third Party Library Imports
const dayjs = __webpack_require__(12);

//Query Selectors:
const pastTripsButton = document.querySelector("#pastTripsButton");
const usersCard = document.querySelector("#cardGrid");
const userWelcomeCard = document.querySelector(".navigation-user-card");
const upcomingTripsButtons = document.querySelector("#upcomingTripsButton");
const pendingTripsButton = document.querySelector("#pendingTripsButton");
const getAQuoteButton = document.querySelector("#estimateButton");
const formStartDate = document.querySelector("#calendarStart");
const formDuration = document.querySelector("#duration-input");
const formNumberTravelers = document.querySelector("#travelersInput");
const formDropdown = document.querySelector("#destinations");
const estimateQuoteSection = document.querySelector("#estimatedQuote");
const errorMessagePost = document.querySelector("#errorMessagePost");
const submitTripButton = document.querySelector("#submitButton");
const username = document.getElementById("username");
const password = document.getElementById("password");
const loginErrorSection = document.getElementById("loginError");
const loginButton = document.getElementById("login-button");
const loginSection = document.querySelector("#loginPage");
const loginForm = document.getElementById("loginForm");
const mainSection = document.querySelector("#mainSection");
const postError = document.getElementById("errorForm")

//Global variables
let allTrips;
let allTravelers;
let allDestinations;
let currentTraveler;
let date = dayjs().format("YYYY/MM/DD");

// import API Calls


window.addEventListener("load", () => {
  getData();
});

const getData = () => {
  Promise.all([(0,_ApiCalls__WEBPACK_IMPORTED_MODULE_9__.fetchTravelers)(), (0,_ApiCalls__WEBPACK_IMPORTED_MODULE_9__.fetchAllTrips)(), (0,_ApiCalls__WEBPACK_IMPORTED_MODULE_9__.fetchAllDestinations)()]).then(
    ([travelerData, tripData, destinationData]) => {
      allTravelers = new _classes_Traveler_Repo__WEBPACK_IMPORTED_MODULE_2__["default"](travelerData);
      allDestinations = new _classes_Destination_Repo__WEBPACK_IMPORTED_MODULE_1__["default"](destinationData);
      allTrips = new _classes_TripRepo__WEBPACK_IMPORTED_MODULE_4__["default"](tripData);
    }
  ).catch(error => {
    console.log(error)
    loginErrorSection.classList.remove("hidden");
    loginErrorSection.innerText =
      "Sorry failed to load. Please come again later! 🖤 ";
  });
};

loginButton.addEventListener("click", (event) => {
  loginUser(event);
  displayUser(currentTraveler, allDestinations, allTrips);
  createDropdownDestinations(allDestinations);
  loginSection.classList.add("hidden");
  mainSection.classList.remove("hidden");
});

//Event Listeners
pastTripsButton.addEventListener("click", () => {
  renderPastTrips(allTrips, currentTraveler, date);
});

upcomingTripsButtons.addEventListener("click", () => {
  renderUpcomingTrips(allTrips, currentTraveler, date);
});

pendingTripsButton.addEventListener("click", () => {
  renderPendingTrips(currentTraveler);
});

getAQuoteButton.addEventListener("click", (event) => {
  displayTripCost(event);
});

//Functions
const loginUser = (event) => {
  event.preventDefault(event);
  const id = +username.value.match(/\d+/g);
  const string = username.value.slice(0, 8);
  if (
    string === "traveler" &&
    Number(id) <= 50 &&
    Number(id) > 0 &&
    password.value === "travel") {
    currentTraveler = new _classes_Traveler__WEBPACK_IMPORTED_MODULE_3__["default"](allTravelers.getSingleTravelerById(Number(id)));
    loginSection.classList.add("hidden");
    mainSection.classList.remove("hidden");
    loginForm.reset();
  } else if (string !== "traveler" && password.value === "travel") {
    loginErrorSection.classList.remove("hidden")
    loginErrorSection.innerText = `Sorry! You have an invalid username.
    Please try again!`;
    loginForm.reset();
  } else if (string === "traveler" && password.value !== "travel") {
    loginErrorSection.classList.remove("hidden");
    loginErrorSection.innerText = `Sorry! You have an incorrect password. 
    Please try again!`;
    loginForm.reset();
  } else if (string === "traveler" || password.value !== "travel") {
    loginErrorSection.classList.remove("hidden");
    loginErrorSection.innerText = `Sorry! You have an incorrect username and password.
    Please try again!`;
    loginForm.reset();
  };
};

const createDropdownDestinations = () => {
  allDestinations.data
    .sort((a, b) => {
      return a.destination.localeCompare(b.destination);
    })
    .forEach((destination) => {
      formDropdown.innerHTML += `
    <option value="${destination.destination}">${destination.destination}</option>
    `;
    });
};

const displayTripCost = (event) => {
  event.preventDefault();
  if (formDuration.value && formNumberTravelers.value && formStartDate.value) {
    const destination = allDestinations.findDestinationByName(formDropdown.value);
    const total =
      destination.estimatedLodgingCostPerDay * formDuration.value +
      destination.estimatedFlightCostPerPerson * formNumberTravelers.value * 1.1;
    const roundedTotal = Number(total).toFixed(2)
    estimateQuoteSection.classList.remove("hidden")
    estimateQuoteSection.innerText = `$${roundedTotal} for this new trip`
  };
};

const createTrip = (object) => {
  fetch("http://localhost:3001/api/v1/trips", {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        "content-Type": "application/json",
      },
    })
    .then(response => {
      if (!response.ok || response.status === 422) {
        throw new Error("This is so embarressing, but there is an error with our server. We are working on it!")
      } else if (!response.ok) {
        throw new Error(error)
      }
      return response.json();
    })
    
  return (0,_ApiCalls__WEBPACK_IMPORTED_MODULE_9__.fetchAllTrips)()
    .then((tripData) => {
      allTrips = new _classes_TripRepo__WEBPACK_IMPORTED_MODULE_4__["default"](tripData);
    })
    .catch((error) => {
      errorMessagePost.classList.remove("hidden")
      errorMessagePost.innerText =
        `This is so embarressing, but there is an error with our server: ${error}. We are working on it!`;
      clearSearchInputs();
    });
};

//create named function

submitTripButton.addEventListener("click", prepareForm)

const prepareForm = (event) => {
   event.preventDefault();
  if (!formDuration.value || !formNumberTravelers.value || !formStartDate.value) {
    postError.classList.remove("hidden")
    postError.innerText = "Please fill out all information before submitting a trip."
  } else {
    postError.classList.add("hidden")
    const destinationId = allDestinations.data.find(
      (destination) => destination.destination === formDropdown.value
    );
    const tripObject = {
      id: Number(allTrips.data.length + 1),
      userID: currentTraveler.id,
      destinationID: Number(destinationId.id),
      travelers: Number(formNumberTravelers.value),
      date: dayjs(formStartDate.value).format("YYYY/MM/DD"),
      duration: Number(formDuration.value),
      status: "pending",
      suggestedActivities: [],
    };
    createTrip(tripObject).then(() => {
      calculateTotalcalculateTotalSpent(
        currentTraveler,
        allDestinations,
        allTrips
      );
      renderPendingTrips(currentTraveler);
      displayPendingTripMessage()
      clearSearchInputs();
    });
  }
}
 

const displayPendingTripMessage = () => {
  userWelcomeCard.innerHTML = `  "Groovy! 🪩 Your trip has been requested and is pending. Get excited! You should hear back from an agent shortly."
      <div class="navigation-user-card"></div>`;
};

const calculateTotalSpent = (currentTraveler, allDestinations, allTrips) => {
  userWelcomeCard.innerHTML = `
        <h2 class="navigation-user-welcome">Good Choice ${currentTraveler.returnTravelersFirstName()}</h2>
       <p class="navigation-stats-invested"> You have invested more to your happiness. This is how much you've spent this year, including the agent fee $${allTrips.calculateTotalSpentByTraveler(
         currentTraveler.id,
         allDestinations
       )} </p>
   `;
};

const displayUser = (
  currentTraveler,
  allDestinations,
  allTrips
) => {
  userWelcomeCard.innerHTML = ` <div class="navigation-user-card">
     <h2 class="navigation-user-welcome">Welcome back ${currentTraveler.returnTravelersFirstName()}!</h2>
     <p>I love that you are a ${currentTraveler.travelerType} ✨</p>
        <p class="navigation-stats-invested">You have invested $ ${allTrips.calculateTotalSpentByTraveler(
          currentTraveler.id,
          allDestinations
        )} in your happiness. ☮ </p>
      </div>`;
};

const clearSearchInputs = () => {
  formDropdown.value = "";
  formDuration.value = "";
  formNumberTravelers.value = "";
  formStartDate.value = "";
};

const renderUpcomingTrips = (allTrips, currentTraveler, date) => {
  let trips = allTrips.returnFutureTrips(currentTraveler.id, date)
  if (trips.length === 0) {
    usersCard.innerText = `
       Sorry ${currentTraveler.name}! You don't have any upcoming trips scheduled
       `;
  } else {
    trips.forEach((trip) => {
      usersCard.innerHTML += `
  <section class="card" id="usersCard">
     <p class="card-title">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID).image
            }" alt="" alt="">
       <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
       <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
       <p class="card-duration"><b>Duration: ${trip.duration}days</b> </p>
       <p class="card-status"><b>Status: ${trip.status}</b></p>
       `;
    });
  };
};

const renderPastTrips = (allTrips, currentTraveler, date) => {
  let trips = allTrips.returnPastTrips(currentTraveler.id, date);
  usersCard.innerHTML = " ";
  trips.forEach((trip) => {
    (
      allDestinations.getSingleDestinationById(trip.destinationID).destination,
      "trip.D.ID"
    );
    usersCard.innerHTML += `
    <section class="card" id="usersCard">
     <p class="card-title">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID)
                .image
            }" alt="" alt="">
      <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
      <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
      <p class="card-duration"><b>Duration: ${trip.duration}</b></p>
      <p class="card-status"><b>Status: ${trip.status}</b></p>
      `;
  });
};

const renderPendingTrips = (currentTraveler) => {
  let trips = allTrips.returnPendingTrips(currentTraveler.id);

  if (!allTrips.returnPendingTrips(currentTraveler.id).length) {
    usersCard.innerText = `
    Sorry ${currentTraveler.name}! You don't have any pending trips scheduled
       `;
  } else {
    usersCard.innerHTML = " ";
    trips.forEach((trip) => {
      usersCard.innerHTML += `
        <section class="card" id="usersCard">
     <p class="card-title" class="bold-text">${
       allDestinations.getSingleDestinationById(trip.destinationID).destination
     }</p>
            <img class="card-holder-img" src="${
              allDestinations.getSingleDestinationById(trip.destinationID).image
            }" alt="" alt="">
       <p class="card-travelers"><b>Travelers: ${trip.travelers}</b></p>
       <p class="card-start-date"><b>Start Date: ${trip.date}</b></p>
       <p class="card-duration"><b>Duration: ${trip.duration} days</b> </p>
       <p class="card-status"><b>Status: ${trip.status}</b></p>
       `;
    });
  };
};
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map