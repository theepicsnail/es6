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
	
	var _Cell = __webpack_require__(3);
	
	var _Board = __webpack_require__(1);
	
	var _Board2 = _interopRequireDefault(_Board);
	
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
	
	canvas.width = 500;
	canvas.height = 500;
	var ctx = canvas.getContext("2d");
	
	var board = new _Board2.default(document.getElementById("canvas"));
	board.grid.set(0, 4, new _Cell.Cell("#0000FF"));
	
	function simulate(dt) {
	  return true;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _Array2D = __webpack_require__(2);
	
	var _Array2D2 = _interopRequireDefault(_Array2D);
	
	var _Cell = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// 500  = full width
	// 11 gaps + 10 cells.
	var gap_size = 10; // px
	// 500 - 11 * gap = 390 px
	// 390 / 10 cells = 39 per cell
	var cell_size = 39;
	
	var borderColor = {
	  "normal": "#CCC",
	  "hover": "#88F",
	  "selected": "#000"
	};
	
	function forwardMouseEvents(canvas, target) {
	  canvas.onmousedown = target.onmousedown.bind(target);
	  canvas.onmousemove = target.onmousemove.bind(target);
	}
	
	function equalPoints(p1, p2) {
	  return p1.x == p2.x && p1.y == p2.y;
	}
	
	var Board = function () {
	  function Board(canvas) {
	    _classCallCheck(this, Board);
	
	    // Setup canvas
	    this.canvas = canvas;
	    this.ctx = canvas.getContext("2d");
	
	    forwardMouseEvents(canvas, this);
	
	    // Setup grid
	    this.grid = new _Array2D2.default(10, 10).fill(function () {
	      return _Cell.EMPTY_CELL;
	    });
	
	    // Extras
	    this.hover = { x: -1, y: -1 };
	    this.selected = { x: -1, y: -1 };
	
	    this.draw();
	  }
	
	  _createClass(Board, [{
	    key: "draw",
	    value: function draw() {
	      var _this = this;
	
	      var ctx = this.ctx;
	      var step = gap_size + cell_size;
	      ctx.lineWidth = 2;
	
	      // Clear the board
	      ctx.fillStyle = "#fff";
	      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	      // Fill it back in
	      this.grid.map(function (cell, x, y) {
	        ctx.fillStyle = cell.color;
	        var pt = { x: x, y: y };
	        if (equalPoints(_this.selected, pt)) ctx.strokeStyle = borderColor["selected"];else if (equalPoints(_this.hover, pt)) ctx.strokeStyle = borderColor["hover"];else ctx.strokeStyle = borderColor["normal"];
	
	        // grid coord -> screen coord
	        x = x * step + gap_size;
	        y = y * step + gap_size;
	        ctx.fillRect(x, y, cell_size, cell_size);
	        ctx.strokeRect(x, y, cell_size, cell_size);
	      });
	    }
	  }, {
	    key: "getPos",
	    value: function getPos(evt) {
	      var bounds = canvas.getBoundingClientRect();
	      return {
	        x: evt.clientX - bounds.left,
	        y: evt.clientY - bounds.top
	      };
	    }
	  }, {
	    key: "getGridPos",
	    value: function getGridPos(evt) {
	      var pos = this.getPos(evt);
	      var size = cell_size + gap_size;
	      if (pos.x % size <= gap_size) return { x: -1, y: -1 };
	      if (pos.y % size <= gap_size) return { x: -1, y: -1 };
	      return {
	        x: pos.x / size | 0,
	        y: pos.y / size | 0 };
	    }
	  }, {
	    key: "onmousemove",
	    value: function onmousemove(evt) {
	      this.hover = this.getGridPos(evt);
	      this.draw();
	
	      //var pos = this.getPos(evt);
	      //this.ctx.strokeRect(pos.x-10, pos.y-10, 20,20);
	    }
	  }, {
	    key: "onmousedown",
	    value: function onmousedown(evt) {
	      var old = this.selected;
	      this.selected = this.getGridPos(evt);
	
	      if (equalPoints(this.selected, old)) {
	        // "unselect"
	        this.selected.x = -1;
	      }
	
	      this.draw();
	    }
	  }]);
	
	  return Board;
	}();
	
	exports.default = Board;
	;

/***/ },
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
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Cell = exports.Cell = function Cell(color) {
	  _classCallCheck(this, Cell);
	
	  this.color = color;
	  this.code = "";
	};
	
	var EMPTY_CELL = exports.EMPTY_CELL = new Cell("#FFFFFF");

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map