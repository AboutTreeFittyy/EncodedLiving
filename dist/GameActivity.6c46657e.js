// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;

/* File Name: CST.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: A constant array to hold values for easy access and 
 * interchangability of important commonly used values in the game
 * that can change often in development.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
var CST = {
  SCENES: {
    FIRSTLEVEL: "FIRSTLEVEL",
    LOAD: "LOAD",
    MENU: "MENU"
  },
  IMAGE: {
    ENCODEDLIVING: "encodedliving.png",
    LOADGAME: "loadgame.png",
    STARTNEWGAME: "startnewgame.png",
    TITLE: "title_bg.jpg"
  },
  AUDIO: {
    THEME1: "level_1_theme.mp3",
    TITLE: "title_music.mp3"
  },
  SPRITE: {
    CAT: "cat.png",
    PLAYER: "player.png",
    WHIPL: "whip_left.png",
    WHIPR: "whip_right.png",
    WHIPU: "whip_up.png",
    WHIPD: "whip_down.png",
    ITEM: "itemsall.png"
  }
};
exports.CST = CST;
},{}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var LoadScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoadScene).call(this, {
      key: _CST.CST.SCENES.LOAD
    }));
  }

  _createClass(LoadScene, [{
    key: "create",
    value: function create() {}
  }, {
    key: "loadImages",
    value: function loadImages() {
      this.load.setPath("./assets/image"); //load all images in CST images

      for (var prop in _CST.CST.IMAGE) {
        this.load.image(_CST.CST.IMAGE[prop], _CST.CST.IMAGE[prop]);
      }
    }
  }, {
    key: "loadAudio",
    value: function loadAudio() {
      this.load.setPath("./assets/audio"); //load all audio in CST audio

      for (var prop in _CST.CST.AUDIO) {
        this.load.audio(_CST.CST.AUDIO[prop], _CST.CST.AUDIO[prop]);
      }
    }
  }, {
    key: "loadSprites",
    value: function loadSprites() {
      this.load.setPath("./assets/sprite"); //load all sprites in CST sprites

      for (var prop in _CST.CST.SPRITE) {
        if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.PLAYER) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 64,
            frameWidth: 64
          });
        } else //if (CST.SPRITE[prop] == CST.SPRITE.CAT || CST.SPRITE[prop] == CST.SPRITE.ITEM || CST.SPRITE[prop] == CST.SPRITE.WHIP)
          {
            this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
              frameHeight: 32,
              frameWidth: 32
            });
          }
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

      //load assets
      this.loadImages();
      this.loadAudio();
      this.loadSprites();
      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xffffff
        }
      }); //display loading bar

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
        console.log(percent);
      }); //load menu when complete

      this.load.on("complete", function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
    }
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js"}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MenuScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(MenuScene).call(this, {
      key: _CST.CST.SCENES.MENU
    }));
  }

  _createClass(MenuScene, [{
    key: "create",
    value: function create() {
      var _this = this;

      //add in assets
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, _CST.CST.IMAGE.ENCODEDLIVING).setDepth(1);
      this.add.image(0, 0, _CST.CST.IMAGE.TITLE).setOrigin(0);
      var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, _CST.CST.IMAGE.STARTNEWGAME).setDepth(1);
      var loadButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 100, _CST.CST.IMAGE.LOADGAME).setDepth(1); //create sprites

      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.CAT);
      hoverSprite.setScale(2);
      hoverSprite.setVisible(false); //animate sprites

      this.anims.create({
        key: "walk",
        frameRate: 4,
        repeat: -1,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.CAT, {
          frames: [0, 1, 2, 3]
        })
      }); //create sounds for menu... commented out for the time being as its annoying

      /*this.sound.play(CST.AUDIO.TITLE, {
      	loop: true
      })*/
      //make buttons interactive

      startButton.setInteractive();
      startButton.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = startButton.x - startButton.width / 2 - 50;
        hoverSprite.y = startButton.y;
      });
      startButton.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      startButton.on("pointerup", function () {
        _this.sound.pauseAll();

        _this.scene.start(_CST.CST.SCENES.FIRSTLEVEL);
      });
      loadButton.setInteractive();
      loadButton.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = loadButton.x - loadButton.width / 2 - 50;
        hoverSprite.y = loadButton.y;
      });
      loadButton.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      loadButton.on("pointerup", function () {
        _this.sound.pauseAll();

        _this.scene.start(_CST.CST.SCENES.FIRSTLEVEL);
      });
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/CharacterSprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSprite = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
var CharacterSprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(CharacterSprite, _Phaser$Physics$Arcad);

  function CharacterSprite(scene, x, y, texture, frame) {
    var _this;

    _classCallCheck(this, CharacterSprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CharacterSprite).call(this, scene, x, y, texture, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setScale(2);

    scene.physics.world.enableBody(_assertThisInitialized(_this));

    _this.setImmovable(true);

    _this.hp = 10;
    _this.money = 0;
    return _this;
  }

  _createClass(CharacterSprite, [{
    key: "collectItem",
    value: function collectItem(player, item) {
      item.setVisible(false);
      this.physics.world.remove(item.body);
      this.player.money++;
      alert("Money: " + this.player.money);
    }
  }]);

  return CharacterSprite;
}(Phaser.Physics.Arcade.Sprite);

exports.CharacterSprite = CharacterSprite;
},{}],"src/Sprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: Class used to create and hold the value of a Sprite object
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
var Sprite =
/*#__PURE__*/
function (_Phaser$GameObjects$S) {
  _inherits(Sprite, _Phaser$GameObjects$S);

  function Sprite(scene, x, y, texture, frame) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sprite).call(this, scene, x, y, texture, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));
    return _this;
  }

  return Sprite;
}(Phaser.GameObjects.Sprite);

exports.Sprite = Sprite;
},{}],"src/scenes/FirstLevel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstLevel = void 0;

var _CST = require("../CST");

var _CharacterSprite = require("../CharacterSprite");

var _Sprite = require("../Sprite");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var FirstLevel =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(FirstLevel, _Phaser$Scene);

  function FirstLevel() {
    _classCallCheck(this, FirstLevel);

    return _possibleConstructorReturn(this, _getPrototypeOf(FirstLevel).call(this, {
      key: _CST.CST.SCENES.FIRSTLEVEL
    }));
  }

  _createClass(FirstLevel, [{
    key: "create",
    value: function create() {
      var _this = this;

      //start up the theme for level, commenting out now cause its annoying 

      /*this.sound.play(CST.AUDIO.THEME1, {
      	loop: true
            })*/
      //add game sprites              
      this.player = new _CharacterSprite.CharacterSprite(this, 400, 400, _CST.CST.SPRITE.PLAYER, 130);
      this.player.setCollideWorldBounds(true); //align the player hitbox and set its size

      this.player.setSize(32, 48);
      this.player.setOffset(16, 12); //the whip sprite takes any

      this.whip = new _CharacterSprite.CharacterSprite(this, 400, 400, _CST.CST.SPRITE.WHIP, 3);
      this.whip.setVisible(false);
      this.whip.setScale(3);
      this.playerCont = this.add.container(0, 0, [this.player, this.whip]).setDepth(1); //initialize player and whip to face down at start

      this.player.isFacing = "down";
      this.player.setPosition(this.player.x, this.player.y);
      this.whip.setPosition(this.player.x, this.player.y + 70);
      this.input.keyboard.on("keydown-F", function () {
        switch (_this.player.isFacing) {
          case "left":
            _this.playerCont.list[0].play("playerwhipleft");

            _this.playerCont.list[1].play("whip_left");

            break;

          case "right":
            _this.playerCont.list[0].play("playerwhipright");

            _this.playerCont.list[1].play("whip_right");

            break;

          case "up":
            _this.playerCont.list[0].play("playerwhipup");

            _this.playerCont.list[1].play("whip_up");

            break;

          case "down":
            _this.playerCont.list[0].play("playerwhipdown");

            _this.playerCont.list[1].play("whip_down");

            break;
        }
      }); //set up keyboard controls

      this.keyboard = this.input.keyboard.addKeys("W, A, S, D"); //Set up tiled map

      var mappy = this.add.tilemap("map1");
      var terrain = mappy.addTilesetImage("sheet1");
      var itemset = mappy.addTilesetImage("itemsall"); //layers

      var botLayer = mappy.createStaticLayer("bottom_layer", [terrain], 0, 0).setDepth(-1);
      var topLayer = mappy.createStaticLayer("top_layer", [terrain], 0, 0); //map collisions

      this.physics.add.collider(this.player, topLayer);
      topLayer.setCollisionByProperty({
        collides: true
      }); //get interactive object

      var itemSet = this.physics.add.group();
      var items = mappy.createFromObjects("items", 67, {
        key: _CST.CST.SPRITE.ITEM,
        frame: 2
      }).map(function (sprite) {
        sprite.setScale(2); //enable body and collider for the items to interact with player collision

        itemSet.add(sprite);

        _this.physics.world.enableBody(sprite);
      });
      this.physics.add.collider(this.player, itemSet, this.player.collectItem, null, this); //have camera follow player around

      this.cameras.main.startFollow(this.player);
      this.physics.world.setBounds(0, 0, mappy.widthInPixels, mappy.heightInPixels);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.keyboard.D.isDown === true) {
        this.player.setVelocityX(128);
      }

      if (this.keyboard.W.isDown === true) {
        this.player.setVelocityY(-128);
      }

      if (this.keyboard.S.isDown === true) {
        this.player.setVelocityY(128);
      }

      if (this.keyboard.A.isDown === true) {
        this.player.setVelocityX(-128);
      }

      if (this.keyboard.A.isUp && this.keyboard.D.isUp) {
        //not moving on X axis
        this.player.setVelocityX(0);
      }

      if (this.keyboard.W.isUp && this.keyboard.S.isUp) {
        //not pressing y movement
        this.player.setVelocityY(0);
      } //set animations for player


      if (this.player.body.velocity.x > 0) {
        //moving right
        this.whip.setPosition(this.player.x + 70, this.player.y);
        this.player.play("right", true);
        this.player.isFacing = "right";
      } else if (this.player.body.velocity.x < 0) {
        //moving left
        this.whip.setPosition(this.player.x - 70, this.player.y + 20);
        this.player.play("left", true);
        this.player.isFacing = "left";
      } else if (this.player.body.velocity.y < 0) {
        //moving up
        this.whip.setPosition(this.player.x, this.player.y - 70);
        this.player.play("up", true);
        this.player.isFacing = "up";
      } else if (this.player.body.velocity.y > 0) {
        //moving down
        this.whip.setPosition(this.player.x, this.player.y + 70);
        this.player.play("down", true);
        this.player.isFacing = "down";
      } //check for collision

    }
  }, {
    key: "preload",
    value: function preload() {
      //add in player attack sprites
      this.anims.create({
        key: "playerwhipleft",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 169,
          end: 174
        })
      });
      this.anims.create({
        key: "whip_left",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.WHIPL, {
          start: 0,
          end: 4
        }),
        showOnStart: true,
        hideOnComplete: true
      });
      this.anims.create({
        key: "playerwhipright",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 195,
          end: 200
        })
      });
      this.anims.create({
        key: "whip_right",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.WHIPR, {
          start: 0,
          end: 4
        }),
        showOnStart: true,
        hideOnComplete: true
      });
      this.anims.create({
        key: "playerwhipup",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 156,
          end: 161
        })
      });
      this.anims.create({
        key: "whip_up",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.WHIPU, {
          start: 0,
          end: 4
        }),
        showOnStart: true,
        hideOnComplete: true
      });
      this.anims.create({
        key: "playerwhipdown",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 182,
          end: 187
        })
      });
      this.anims.create({
        key: "whip_down",
        frameRate: 5,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.WHIPD, {
          start: 0,
          end: 4
        }),
        showOnStart: true,
        hideOnComplete: true
      }); //make player movements

      this.anims.create({
        key: "left",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 117,
          end: 125
        })
      });
      this.anims.create({
        key: "right",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 143,
          end: 151
        })
      });
      this.anims.create({
        key: "up",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 104,
          end: 112
        })
      });
      this.anims.create({
        key: "down",
        frameRate: 10,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.PLAYER, {
          start: 130,
          end: 138
        })
      }); //load map assets

      this.load.image("sheet1", "./assets/image/sheet1.png");
      this.load.image("itemsall", "./assets/image/sheet1.png");
      this.load.tilemapTiledJSON("map1", "./assets/maps/map1.json");
    }
  }]);

  return FirstLevel;
}(Phaser.Scene);

exports.FirstLevel = FirstLevel;
},{"../CST":"src/CST.js","../CharacterSprite":"src/CharacterSprite.js","../Sprite":"src/Sprite.js"}],"src/GameActivity.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _FirstLevel = require("./scenes/FirstLevel");

/* File Name: GameActivity.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: JavaScript file used to manage the phaser 3 game
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
// THIS IS JUST HERE FOR QUICK USE MAKING NEW HEADERS FOR LATER FILES

/* File Name: 
 * Author: Mathew Boland
 * Last Updated: 
 * Description: 
 *
*/

/** @type {import("../typings/phaser")}*/
var game = new Phaser.Game({
  width: 1200,
  height: 675,
  parent: 'my-canvas',
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _FirstLevel.FirstLevel],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true
    }
  },
  scale: {
    mode: Phaser.Scale.FIT
  }
});
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/FirstLevel":"src/scenes/FirstLevel.js"}],"../../../../../Users/Mathew/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53100" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../Users/Mathew/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/GameActivity.js"], null)
//# sourceMappingURL=/GameActivity.6c46657e.js.map