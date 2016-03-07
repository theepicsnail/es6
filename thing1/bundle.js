/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _Array2D = __webpack_require__(2);
	
	var _Array2D2 = _interopRequireDefault(_Array2D);
	
	var _Cell = __webpack_require__(3);
	
	var _Cell2 = _interopRequireDefault(_Cell);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// Setup animation. Calls simulate(delta_ms) -> bool(true = end, false/undefined = continue)
	var lastTime = 0;
	var running = true;
	function frame() {
	  var time = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	
	  if (!running) return;
	  requestAnimationFrame(frame);
	
	  var dt = time - lastTime;
	  if (dt > 100) {
	    lastTime = time;
	    return;
	  }
	  running = !simulate(dt / 1000.0);
	}
	setTimeout(frame, 0);
	
	var canvas = document.getElementById("canvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	
	var ctx = canvas.getContext("2d");
	ctx.fillStyle = "black";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// Size of a cell
	// Either 10px each or enought to build a 50x50 grid
	var size = 10;
	/*Math.min(
	    Math.max(10, canvas.width / 50),
	    Math.max(10, canvas.height / 50)) | 0;*/
	
	var rows = canvas.height / size | 0;
	var cols = canvas.width / size | 0;
	
	var grid = new _Array2D2.default(rows, cols).fill(function (row, col) {
	  return new _Cell2.default();
	});
	
	grid.map(function (cell, row, col) {
	  ctx.fillStyle = cell.getFillStyle();
	  ctx.fillRect(col * size, row * size, size, size);
	});
	
	var time = 0;
	var i = 0;
	var cos90 = [1, 0, -1, 0, 1];
	function simulate(dt) {
	  time += dt;
	  var num = 1000;
	  while (0 < --num) {
	    var c = Math.random() * grid.cols | 0;
	    var r = Math.random() * grid.rows | 0;
	    var a = Math.random() * 4 | 0;
	    var cell = grid.get(r, c);
	    var other = grid.get(r + cos90[a], c + cos90[a + 1]);
	
	    cell.merge(other);
	    ctx.fillStyle = cell.getFillStyle();
	    ctx.fillRect(c * size, r * size, size, size);
	  }
	}

/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Array2D = function () {
	  function Array2D(rows, cols) {
	    _classCallCheck(this, Array2D);
	
	    this.rows = rows;
	    this.cols = cols;
	    this.length = rows * cols;
	    this.data = new Array(this.length);
	  }
	
	  _createClass(Array2D, [{
	    key: "fill",
	    value: function fill(func) {
	      for (var i = 0; i < this.length; i++) {
	        this.data[i] = func(i / this.cols | 0, i % this.cols);
	      }return this;
	    }
	  }, {
	    key: "map",
	    value: function map(func) {
	      for (var i = 0; i < this.length; i++) {
	        func(this.data[i], i / this.cols | 0, i % this.cols);
	      }return this;
	    }
	  }, {
	    key: "get",
	    value: function get(row, col) {
	      if (row < 0) row += this.rows;
	      if (row >= this.rows) row -= this.rows;
	      if (col < 0) col += this.cols;
	      if (col >= this.cols) col -= this.cols;
	      return this.data[row * this.cols + col];
	    }
	  }, {
	    key: "set",
	    value: function set(row, col, val) {
	      this.data[row * this.cols + col] = val;
	      return this;
	    }
	  }]);
	
	  return Array2D;
	}();
	
	exports.default = Array2D;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var history = {};
	
	var Cell = function () {
	  function Cell() {
	    _classCallCheck(this, Cell);
	
	    this.color = Math.random() * 360 | 0;
	  }
	
	  _createClass(Cell, [{
	    key: "merge",
	    value: function merge(other) {
	      var key = this.color + ":" + other.color;
	      var res = history[key];
	      if (res !== undefined) {
	        this.color = res;
	        return;
	      }
	
	      var diff = other.color - this.color;
	      if (diff > 180) diff -= 360;
	      if (diff < -180) diff += 360;
	      //if(diff > 5)
	      //  return;
	
	      var alpha = .5;
	      var a1 = this.color * Math.PI / 180 + .05;
	      var a2 = other.color * Math.PI / 180;
	
	      var x = Math.cos(a1) * alpha + Math.cos(a2) * (1 - alpha);
	      var y = Math.sin(a1) * alpha + Math.sin(a2) * (1 - alpha);
	      var res = Math.atan2(y, x) * 180 / Math.PI | 0;
	      if (res < 0) res += 360;
	      this.color = res;
	
	      history[key] = this.color;
	    }
	  }, {
	    key: "getFillStyle",
	    value: function getFillStyle() {
	      return "hsl(" + this.color + ",90%,45%)";
	    }
	  }]);
	
	  return Cell;
	}();
	
	var c = new Cell();
	var d = new Cell();
	for (var c1 = 0; c1 < 360; c1++) {
	  for (var c2 = 0; c2 < 360; c2++) {
	    c.color = c1;
	    d.color = c2;
	    c.merge(d);
	  }
	}
	
	exports.default = Cell;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map