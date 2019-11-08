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
 * Last Updated: November 4, 2019
 * Description: A constant array to hold values for easy access and 
 * interchangability of important commonly used values in the game
 * that can change often in development.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
var CST = {
  SCENES: {
    FIRSTLEVEL: "FIRSTLEVEL",
    LOAD: "LOAD",
    MENU: "MENU",
    PAUSE: "PAUSE",
    SHOP: "SHOP"
  },
  IMAGE: {
    ENCODEDLIVING: "encodedliving.png",
    LOADGAME: "loadgame.png",
    STARTNEWGAME: "startnewgame.png",
    TITLE: "title_bg.jpg",
    PAUSED: "paused.png",
    RESUME: "resume.png",
    CMD: "cmd.png",
    SHOP: "shop.png",
    FIDDY: "fiddy.png",
    EXIT: "exit.png"
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
    ITEM: "itemsall.png",
    NPCS: "npcs.png",
    NERD1: "nerd1.png",
    NERD2: "nerd2.png",
    JASON: "jason.png",
    NPC_LOT: "npc_lot.png"
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
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.NPCS) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 80,
            frameWidth: 44
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.NERD1 || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.NERD2 || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.JASON || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.NPC_LOT) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 64,
            frameWidth: 48
          });
        } else {
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
      var title = this.add.image(this.game.renderer.width / 2, 0, _CST.CST.IMAGE.TITLE);
      title.setY(title.height / 2);
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
},{"../CST":"src/CST.js"}],"src/Sprite.js":[function(require,module,exports) {
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
 * Last Updated: November 8, 2019
 * Description: Class used to create and hold the value of a Sprite object
*/
var Sprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Sprite, _Phaser$Physics$Arcad);

  function Sprite(scene, x, y, texture, down, up, left, right, name) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sprite).call(this, scene, x, y, texture, down));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));
    scene.physics.world.enableBody(_assertThisInitialized(_this));
    _this.down = down;
    _this.up = up;
    _this.left = left;
    _this.right = right;
    _this.startX = x;
    _this.startY = y;
    _this.name = name;
    return _this;
  }

  return Sprite;
}(Phaser.Physics.Arcade.Sprite);

exports.Sprite = Sprite;
},{}],"src/EnemySprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnemySprite = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* File Name: EnemySprite.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
var EnemySprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(EnemySprite, _Phaser$Physics$Arcad);

  function EnemySprite(scene, x, y, texture, frame, name, hp) {
    var _this;

    _classCallCheck(this, EnemySprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnemySprite).call(this, scene, x, y, texture, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setScale(2);

    scene.physics.world.enableBody(_assertThisInitialized(_this));

    _this.setImmovable(true);

    _this.hp = hp;
    _this.name = name;
    _this.startX = x;
    _this.startY = y;
    _this.collideName = '';
    return _this;
  }

  _createClass(EnemySprite, [{
    key: "enemyCollide",
    value: function enemyCollide(player, enemy) {
      //Check if it's enemy thats set
      if (enemy.name == "nerd1up") {
        enemy.setVelocityY(-90);
        enemy.name = "nerd1down";
      } else if (enemy.name == "nerd1down") {
        enemy.setVelocityY(90);
        enemy.name = "nerd1up";
      } else if (enemy.name == "nerd1right") {
        enemy.setVelocityX(90);
        enemy.name = "nerd1left";
      } else if (enemy.name == "nerd1left") {
        enemy.setVelocityX(-90);
        enemy.name = "nerd1right";
      } //Check if it's player thats set


      if (player.name == "nerd1up") {
        player.setVelocityY(-90);
        player.name = "nerd1down";
      } else if (player.name == "nerd1down") {
        player.setVelocityY(90);
        player.name = "nerd1up";
      } else if (player.name == "nerd1right") {
        player.setVelocityX(90);
        player.name = "nerd1left";
      } else if (player.name == "nerd1left") {
        player.setVelocityX(-90);
        player.name = "nerd1right";
      } //Check if it's enemy thats set


      if (enemy.name == "nerd2up") {
        enemy.setVelocityY(-90);
        enemy.name = "nerd2down";
      } else if (enemy.name == "nerd2down") {
        enemy.setVelocityY(90);
        enemy.name = "nerd2up";
      } else if (enemy.name == "nerd2right") {
        enemy.setVelocityX(90);
        enemy.name = "nerd2left";
      } else if (enemy.name == "nerd2left") {
        enemy.setVelocityX(-90);
        enemy.name = "nerd2right";
      } //Check if it's player thats set


      if (player.name == "nerd2up") {
        player.setVelocityY(-90);
        player.name = "nerd2down";
      } else if (player.name == "nerd2down") {
        player.setVelocityY(90);
        player.name = "nerd2up";
      } else if (player.name == "nerd2right") {
        player.setVelocityX(90);
        player.name = "nerd2left";
      } else if (player.name == "nerd2left") {
        player.setVelocityX(-90);
        player.name = "nerd2right";
      }
    }
  }]);

  return EnemySprite;
}(Phaser.Physics.Arcade.Sprite);

exports.EnemySprite = EnemySprite;
},{}],"src/CharacterSprite.js":[function(require,module,exports) {
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
 * Last Updated: November 4, 2019
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

    scene.physics.world.enableBody(_assertThisInitialized(_this)); //this.setImmovable(true);

    _this.hp = 10;
    _this.money = 0;
    _this.npcPrev = '';
    _this.score = 0;
    return _this;
  }

  _createClass(CharacterSprite, [{
    key: "collectItem",
    value: function collectItem(player, item) {
      item.setVisible(false);
      item.destroy(item.body);
      player.money++;
      player.scene.cmd1Text.text = player.scene.cmd1Text.text + "Player Money: " + player.money + "\n";
    }
  }, {
    key: "npcSpeak",
    value: function npcSpeak(player, npc) {
      npc.setVelocityX(0);
      npc.setVelocityY(0); //Make sure that you can't just keep talking to someone 

      if (npc.name == player.npcPrev) {
        return;
      }

      player.npcPrev = npc.name;
      player.scene.cmd2Text.text = player.scene.cmd2Text.text + npc.name + "\n";
    }
  }]);

  return CharacterSprite;
}(Phaser.Physics.Arcade.Sprite);

exports.CharacterSprite = CharacterSprite;
},{}],"src/LevelManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelManager = void 0;

var _CST = require("./CST");

var _Sprite = require("./Sprite");

var _EnemySprite = require("./EnemySprite");

var _CharacterSprite = require("./CharacterSprite");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var LevelManager =
/*#__PURE__*/
function () {
  function LevelManager(scene, map) {
    _classCallCheck(this, LevelManager);

    this.scene = scene;
    this.map = map;
    this.setPlayer();
    this.setObjects();
    this.setCMDS();
    this.setCameras();
    this.setInputs();
  }

  _createClass(LevelManager, [{
    key: "updateEnemies",
    value: function updateEnemies() {
      //Scan through all the NPCs to update them
      for (var i = 0; i < this.scene.npcCont.count('visible', true); i++) {
        var anim = "nothing";

        switch (this.scene.npcCont.list[i].name) {
          case "Nicole":
            //Have her follow the player around                                      
            if (this.scene.player.y - 100 > this.scene.npcCont.list[i].y) {
              //player below
              this.scene.npcCont.list[i].setVelocityY(256);
              anim = "nicoledown";
            } else if (this.scene.player.y + 100 < this.scene.npcCont.list[i].y) {
              //player above
              this.scene.npcCont.list[i].setVelocityY(-256);
              anim = "nicoleup";
            } else {
              this.scene.npcCont.list[i].setVelocityY(0);
            }

            if (this.scene.player.x - 100 > this.scene.npcCont.list[i].x) {
              //player in front
              this.scene.npcCont.list[i].setVelocityX(256);
              anim = "nicoleright";
            } else if (this.scene.player.x + 100 < this.scene.npcCont.list[i].x) {
              //player behind
              this.scene.npcCont.list[i].setVelocityX(-256);
              anim = "nicoleleft";
            } else {
              this.scene.npcCont.list[i].setVelocityX(0);
            }

            if (anim != "nothing") {
              this.scene.npcCont.list[i].play(anim, true);
            }

            break;

          case "Claire1":
          case "Claire2":
          case "Kyle":
          case "Brad":
          case "Prof":
          case "Stevie":
            //Now check if they've been pushed from their origin
            if (this.scene.npcCont.list[i].startY - 50 > this.scene.npcCont.list[i].y) {
              //npc below
              this.scene.npcCont.list[i].setVelocityY(128);
              anim = "down";
            } else if (this.scene.npcCont.list[i].startY + 50 < this.scene.npcCont.list[i].y) {
              //npc above
              this.scene.npcCont.list[i].setVelocityY(-128);
              anim = "up";
            } else {
              this.scene.npcCont.list[i].setVelocityY(0);
            }

            if (this.scene.npcCont.list[i].startX - 50 > this.scene.npcCont.list[i].x) {
              //npc in front
              this.scene.npcCont.list[i].setVelocityX(128);
              anim = "right";
            } else if (this.scene.npcCont.list[i].startX + 50 < this.scene.npcCont.list[i].x) {
              //npc behind
              this.scene.npcCont.list[i].setVelocityX(-128);
              anim = "left";
            } else {
              this.scene.npcCont.list[i].setVelocityX(0);
            }

            if (anim != "nothing") {
              this.scene.npcCont.list[i].play(this.scene.npcCont.list[i].name + anim, true);
            } else {
              //have npc look at player general direction unless behind
              if (this.scene.player.y > this.scene.npcCont.list[i].y + 50) {
                //face down
                this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].down);
              } else if (this.scene.player.y < this.scene.npcCont.list[i].y - 50) {
                //face up
                this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].up);
              } else if (this.scene.player.x > this.scene.npcCont.list[i].x) {
                //face right to player
                this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].right);
              } else if (this.scene.player.x < this.scene.npcCont.list[i].x) {
                //face left to player
                this.scene.npcCont.list[i].setFrame(this.scene.npcCont.list[i].left);
              }
            }

            break;
        }
      } //Scan through all the enemy objects to update them


      for (var _i = 0; _i < this.scene.enemyCont.count('visible', true); _i++) {
        var _anim = "nothing";

        switch (this.scene.enemyCont.list[_i].name) {
          case "nerd1down":
            this.scene.enemyCont.list[_i].play("nerd1down", true);

            this.scene.enemyCont.list[_i].setVelocityY(90);

            break;

          case "nerd1up":
            this.scene.enemyCont.list[_i].play("nerd1up", true);

            this.scene.enemyCont.list[_i].setVelocityY(-90);

            break;

          case "nerd1left":
            this.scene.enemyCont.list[_i].play("nerd1left", true);

            this.scene.enemyCont.list[_i].setVelocityX(-90);

            break;

          case "nerd1right":
            this.scene.enemyCont.list[_i].play("nerd1right", true);

            this.scene.enemyCont.list[_i].setVelocityX(90);

            break;

          case "nerd2down":
            this.scene.enemyCont.list[_i].play("nerd2down", true);

            this.scene.enemyCont.list[_i].setVelocityY(90);

            break;

          case "nerd2up":
            this.scene.enemyCont.list[_i].play("nerd2up", true);

            this.scene.enemyCont.list[_i].setVelocityY(-90);

            break;

          case "nerd2left":
            this.scene.enemyCont.list[_i].play("nerd2left", true);

            this.scene.enemyCont.list[_i].setVelocityX(-90);

            break;

          case "nerd2right":
            this.scene.enemyCont.list[_i].play("nerd2right", true);

            this.scene.enemyCont.list[_i].setVelocityX(90);

            break;

          case "jason":
            //Now check if they've been pushed from their origin
            if (this.scene.enemyCont.list[_i].startY - 50 > this.scene.enemyCont.list[_i].y) {
              //npc below
              this.scene.enemyCont.list[_i].setVelocityY(128);

              _anim = "down";
            } else if (this.scene.enemyCont.list[_i].startY + 50 < this.scene.enemyCont.list[_i].y) {
              //npc above
              this.scene.enemyCont.list[_i].setVelocityY(-128);

              _anim = "up";
            } else {
              this.scene.enemyCont.list[_i].setVelocityY(0);
            }

            if (this.scene.enemyCont.list[_i].startX - 50 > this.scene.enemyCont.list[_i].x) {
              //npc in front
              this.scene.enemyCont.list[_i].setVelocityX(128);

              _anim = "right";
            } else if (this.scene.enemyCont.list[_i].startX + 50 < this.scene.enemyCont.list[_i].x) {
              //npc behind
              this.scene.enemyCont.list[_i].setVelocityX(-128);

              _anim = "left";
            } else {
              this.scene.enemyCont.list[_i].setVelocityX(0);
            }

            if (_anim != "nothing") {
              this.scene.enemyCont.list[_i].play("jason" + _anim, true);
            } else {
              //have npc look at player general direction unless behind
              if (this.scene.player.y > this.scene.enemyCont.list[_i].y + 50) {
                //face down
                this.scene.enemyCont.list[_i].setFrame(4);
              } else if (this.scene.player.y < this.scene.enemyCont.list[_i].y - 50) {
                //face up
                this.scene.enemyCont.list[_i].setFrame(40);
              } else if (this.scene.player.x > this.scene.enemyCont.list[_i].x) {
                //face right to player
                this.scene.enemyCont.list[_i].setFrame(28);
              } else if (this.scene.player.x < this.scene.enemyCont.list[_i].x) {
                //face left to player
                this.scene.enemyCont.list[_i].setFrame(16);
              }
            }

            break;
        }
      }
    }
  }, {
    key: "setPlayer",
    value: function setPlayer() {
      //add game sprites              
      this.scene.player = new _CharacterSprite.CharacterSprite(this.scene, 400, 3400, _CST.CST.SPRITE.PLAYER, 130);
      this.scene.player.setCollideWorldBounds(true); //align the player hitbox and set its size

      this.scene.player.setSize(32, 48);
      this.scene.player.setOffset(16, 12); //the whip sprite takes any

      this.scene.whip = new _CharacterSprite.CharacterSprite(this.scene, 400, 3600, _CST.CST.SPRITE.WHIP, 0);
      this.scene.whip.setVisible(false);
      this.scene.whip.setScale(3);
      this.scene.playerCont = this.scene.add.container(0, 0, [this.scene.player, this.scene.whip]).setDepth(1); //initialize player and whip to face down at start

      this.scene.player.isFacing = "down";
      this.scene.player.setPosition(this.scene.player.x, this.scene.player.y);
      this.scene.whip.setPosition(this.scene.player.x, this.scene.player.y + 70);
    }
  }, {
    key: "setCMDS",
    value: function setCMDS() {
      //create info cmd prompts on sides
      this.scene.cmd1 = this.scene.add.image(-1000, -1000, _CST.CST.IMAGE.CMD).setDepth(1);
      this.scene.cmd1.displayHeight = this.scene.game.renderer.height;
      this.scene.cmd2 = this.scene.add.image(-1000, 1000, _CST.CST.IMAGE.CMD).setDepth(1);
      this.scene.cmd2.displayHeight = this.scene.game.renderer.height; //now make their text fields

      this.scene.cmd1Text = this.scene.add.text(this.scene.cmd1.x - this.scene.cmd1.width / 2, this.scene.cmd1.y - this.scene.cmd1.height / 2, 'C:/Users/Player/Stats>\n', {
        fontFamily: '"Roboto Condensed"'
      }).setDepth(2);
      this.scene.cmd1Text.setColor("green");
      this.scene.cmd2Text = this.scene.add.text(this.scene.cmd2.x - this.scene.cmd2.width / 2, this.scene.cmd2.y - this.scene.cmd2.height / 2, 'C:/Users/Player/Conversations>\n', {
        fontFamily: '"Roboto Condensed"'
      }).setDepth(2);
      this.scene.cmd2Text.setColor("green"); //Create a counter for the lines entered so we can keep track of when they run out

      this.scene.cmd1Lines = 1;
      this.scene.cmd2Lines = 1;
    }
  }, {
    key: "setInputs",
    value: function setInputs() {
      var _this = this;

      //set up keyboard controls
      this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D"); //Set listener for p to pause game

      this.scene.input.keyboard.on('keyup-P', function () {
        _this.scene.scene.launch(_CST.CST.SCENES.PAUSE);

        _this.scene.scene.pause();
      });
      this.scene.input.keyboard.on('keyup-Y', function () {
        _this.scene.scene.launch(_CST.CST.SCENES.SHOP);

        _this.scene.scene.pause();
      }); //Adjust zoom out

      this.scene.input.keyboard.on('keyup-U', function () {
        _this.scene.cameras.main.setZoom(0.5);
      }); //Adjust zoom in

      this.scene.input.keyboard.on('keyup-I', function () {
        _this.scene.cameras.main.setZoom(1);
      }); //attack with whip input

      this.scene.input.keyboard.on("keydown-F", function () {
        switch (_this.scene.player.isFacing) {
          case "left":
            _this.scene.playerCont.list[0].play("playerwhipleft");

            _this.scene.playerCont.list[1].play("whip_left");

            break;

          case "right":
            _this.scene.playerCont.list[0].play("playerwhipright");

            _this.scene.playerCont.list[1].play("whip_right");

            break;

          case "up":
            _this.scene.playerCont.list[0].play("playerwhipup");

            _this.scene.playerCont.list[1].play("whip_up");

            break;

          case "down":
            _this.scene.playerCont.list[0].play("playerwhipdown");

            _this.scene.playerCont.list[1].play("whip_down");

            break;
        }
      });
    }
  }, {
    key: "setCameras",
    value: function setCameras() {
      //have camera follow player around
      this.scene.cameras.add(0, 0, this.scene.cmd1.displayWidth, this.scene.game.renderer.height, false, "cmd1");
      var cam1 = this.scene.cameras.getCamera("cmd1");
      cam1.centerOn(-1000, -1000); //have camera follow player around

      this.scene.cameras.add(this.scene.game.renderer.width - this.scene.cmd2.displayWidth - 50, 0, this.scene.cmd2.displayWidth, this.scene.game.renderer.height, false, "cmd2");
      var cam2 = this.scene.cameras.getCamera("cmd2");
      cam2.centerOn(-1000, 1000);
      this.scene.cameras.main.startFollow(this.scene.player);
      this.scene.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    }
  }, {
    key: "setObjects",
    value: function setObjects() {
      //Make item physcis group
      this.itemSet = this.scene.physics.add.group(); //Make items from map

      this.createItems(459, 0, "dvd");
      this.createItems(460, 1, "examsheet");
      this.createItems(461, 2, "money");
      this.createItems(462, 3, "energy"); //add the collider for all the items

      this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this); //make group for npcs physics

      this.scene.npcSet = this.scene.physics.add.group(); //make npcs from map
      //add the collider for all the npcs

      this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);
      this.scene.npcCont = this.scene.add.container();
      this.createNPCS(470, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 8, 44, 20, 32, "Nicole");
      this.createNPCS(512, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
      this.createNPCS(473, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
      this.createNPCS(515, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof"); //make enemies group and container to handle them with*/

      this.scene.enemySet = this.scene.physics.add.group();
      this.scene.enemyCont = this.scene.add.container(); //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
      //Make different enemies

      this.createEnemies(560, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1down", 5, 2);
      this.createEnemies(564, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1up", 5, 2);
      this.createEnemies(568, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1right", 5, 2);
      this.createEnemies(572, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1left", 5, 2);
      this.createEnemies(576, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2down", 5, 2);
      this.createEnemies(579, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2up", 5, 2);
      this.createEnemies(582, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2right", 5, 2);
      this.createEnemies(585, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2left", 5, 2);
      this.createEnemies(467, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 5, "jason", 5, 1.5);
      this.scene.physics.add.collider(this.scene.enemySet, this.scene.topLayer);
    }
  }, {
    key: "createItems",
    value: function createItems(key, frame, name) {
      var _this2 = this;

      this.map.createFromObjects("items", key, {
        key: _CST.CST.SPRITE.ITEM,
        frame: frame
      }).map(function (sprite) {
        //enable body for the items to interact with player collision
        sprite.name = name;

        _this2.itemSet.add(sprite);

        sprite.setSize(32, 32);
        sprite.body.setOffset(0, 0);
      });
    }
  }, {
    key: "createNPCS",
    value: function createNPCS(key, cst1, frame, cst2, down, up, left, right, name) {
      var _this3 = this;

      this.map.createFromObjects("npcs", key, {
        key: cst1,
        frame: frame
      }).map(function (sprite) {
        sprite = new _Sprite.Sprite(_this3.scene, sprite.x, sprite.y, cst2, down, up, left, right, name);
        sprite.body.setSize(22, 44);
        sprite.setScale(1.5);
        sprite.body.setOffset(16, 16);

        _this3.scene.npcSet.add(sprite);

        _this3.scene.npcCont.add(sprite); //This triggers when enemy hits player


        _this3.scene.physics.add.collider(_this3.scene.player, sprite, sprite.enemyCollide, null, _this3);
      });
    }
  }, {
    key: "createEnemies",
    value: function createEnemies(key, cst1, frame, cst2, st, name, hp, size) {
      var _this4 = this;

      this.map.createFromObjects("enemies", key, {
        key: cst1,
        frame: frame
      }).map(function (sprite) {
        sprite = new _EnemySprite.EnemySprite(_this4.scene, sprite.x, sprite.y, cst2, st, name, hp);
        sprite.body.setSize(22, 44);
        sprite.setScale(size);
        sprite.body.setOffset(16, 16);

        _this4.scene.enemySet.add(sprite);

        _this4.scene.enemyCont.add(sprite);

        sprite.setCollideWorldBounds(true); //This triggers when enemy hits player

        _this4.scene.physics.add.collider(_this4.scene.player, sprite, sprite.enemyCollide, null, _this4); //This triggers when they hit an npc


        _this4.scene.physics.add.collider(_this4.scene.npcSet, sprite, sprite.enemyCollide, null, _this4);
      });
    }
  }]);

  return LevelManager;
}();

exports.LevelManager = LevelManager;
},{"./CST":"src/CST.js","./Sprite":"src/Sprite.js","./EnemySprite":"src/EnemySprite.js","./CharacterSprite":"src/CharacterSprite.js"}],"src/AnimationManager.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimationManager = void 0;

var _CST = require("./CST");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AnimationManager =
/*#__PURE__*/
function () {
  function AnimationManager(scene) {
    _classCallCheck(this, AnimationManager);

    this.scene = scene;
  }

  _createClass(AnimationManager, [{
    key: "setAnimations",
    value: function setAnimations() {
      //Nerd variant 1 animations
      this.createAnimation("nerd1left", 15, _CST.CST.SPRITE.NERD1, 5, 7, false);
      this.createAnimation("nerd1right", 15, _CST.CST.SPRITE.NERD1, 9, 11, false);
      this.createAnimation("nerd1down", 15, _CST.CST.SPRITE.NERD1, 1, 3, false);
      this.createAnimation("nerd1up", 15, _CST.CST.SPRITE.NERD1, 13, 15, false); //Nerd variant 2 animations

      this.createAnimation("nerd2left", 15, _CST.CST.SPRITE.NERD2, 5, 7, false);
      this.createAnimation("nerd2right", 15, _CST.CST.SPRITE.NERD2, 9, 11, false);
      this.createAnimation("nerd2down", 15, _CST.CST.SPRITE.NERD2, 1, 3, false);
      this.createAnimation("nerd2up", 15, _CST.CST.SPRITE.NERD2, 13, 15, false); //Jason enemy animations

      this.createAnimation("jasonleft", 10, _CST.CST.SPRITE.NPC_LOT, 15, 17, false);
      this.createAnimation("jasonright", 10, _CST.CST.SPRITE.NPC_LOT, 27, 29, false);
      this.createAnimation("jasondown", 10, _CST.CST.SPRITE.NPC_LOT, 3, 5, false);
      this.createAnimation("jasonup", 10, _CST.CST.SPRITE.NPC_LOT, 39, 41, false); //Nicole npc walking sprites

      this.createAnimation("nicoledown", 10, _CST.CST.SPRITE.NPC_LOT, 6, 8, false);
      this.createAnimation("nicoleleft", 10, _CST.CST.SPRITE.NPC_LOT, 18, 20, false);
      this.createAnimation("nicoleright", 10, _CST.CST.SPRITE.NPC_LOT, 30, 32, false);
      this.createAnimation("nicoleup", 10, _CST.CST.SPRITE.NPC_LOT, 42, 44, false); //Claire1 npc walking sprites

      this.createAnimation("Claire1down", 10, _CST.CST.SPRITE.NPC_LOT, 48, 50, false);
      this.createAnimation("Claire1left", 10, _CST.CST.SPRITE.NPC_LOT, 60, 62, false);
      this.createAnimation("Claire1right", 10, _CST.CST.SPRITE.NPC_LOT, 72, 74, false);
      this.createAnimation("Claire1up", 10, _CST.CST.SPRITE.NPC_LOT, 84, 86, false); //Claire2 npc walking sprites

      this.createAnimation("Claire2down", 10, _CST.CST.SPRITE.NPC_LOT, 9, 11, false);
      this.createAnimation("Claire2left", 10, _CST.CST.SPRITE.NPC_LOT, 21, 23, false);
      this.createAnimation("Claire2right", 10, _CST.CST.SPRITE.NPC_LOT, 33, 35, false);
      this.createAnimation("Claire2up", 10, _CST.CST.SPRITE.NPC_LOT, 45, 47, false); //Prof npc walking sprites

      this.createAnimation("Profdown", 10, _CST.CST.SPRITE.NPC_LOT, 51, 53, false);
      this.createAnimation("Profleft", 10, _CST.CST.SPRITE.NPC_LOT, 63, 65, false);
      this.createAnimation("Profright", 10, _CST.CST.SPRITE.NPC_LOT, 75, 77, false);
      this.createAnimation("Profup", 10, _CST.CST.SPRITE.NPC_LOT, 85, 87, false); //My poorly made whip sprites       

      this.createAnimation("whip_left", 15, _CST.CST.SPRITE.WHIPL, 0, 4, true);
      this.createAnimation("whip_up", 15, _CST.CST.SPRITE.WHIPU, 0, 4, true);
      this.createAnimation("whip_right", 15, _CST.CST.SPRITE.WHIPR, 0, 4, true);
      this.createAnimation("whip_down", 15, _CST.CST.SPRITE.WHIPD, 0, 4, true); //Player whip animation

      this.createAnimation("playerwhipleft", 15, _CST.CST.SPRITE.PLAYER, 169, 174, false);
      this.createAnimation("playerwhipup", 15, _CST.CST.SPRITE.PLAYER, 156, 161, false);
      this.createAnimation("playerwhipright", 15, _CST.CST.SPRITE.PLAYER, 195, 200, false);
      this.createAnimation("playerwhipdown", 15, _CST.CST.SPRITE.PLAYER, 182, 187, false); //Player directional movements

      this.createAnimation("left", 10, _CST.CST.SPRITE.PLAYER, 117, 125, false);
      this.createAnimation("right", 10, _CST.CST.SPRITE.PLAYER, 143, 151, false);
      this.createAnimation("up", 10, _CST.CST.SPRITE.PLAYER, 104, 112, false);
      this.createAnimation("down", 10, _CST.CST.SPRITE.PLAYER, 130, 138, false);
    }
  }, {
    key: "createAnimation",
    value: function createAnimation(k, fr, cst, st, fin, hide) {
      if (hide == true) {
        this.scene.anims.create({
          key: k,
          frameRate: fr,
          frames: this.scene.anims.generateFrameNumbers(cst, {
            start: st,
            end: fin
          }),
          showOnStart: true,
          hideOnComplete: true
        });
      } else {
        this.scene.anims.create({
          key: k,
          frameRate: fr,
          frames: this.scene.anims.generateFrameNumbers(cst, {
            start: st,
            end: fin
          })
        });
      }
    }
  }]);

  return AnimationManager;
}();

exports.AnimationManager = AnimationManager;
},{"./CST":"src/CST.js"}],"src/scenes/FirstLevel.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FirstLevel = void 0;

var _CST = require("../CST");

var _LevelManager = require("../LevelManager");

var _AnimationManager = require("../AnimationManager");

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
      //start up the theme for level, commenting out now cause its annoying 

      /*this.sound.play(CST.AUDIO.THEME1, {
      	loop: true
            })*/
      //Set up tiled map
      var mappy = this.add.tilemap("FirstLevel");
      var terrain1 = mappy.addTilesetImage("ground1");
      var terrain2 = mappy.addTilesetImage("ground2");
      var terrain3 = mappy.addTilesetImage("ground3"); //layers

      mappy.createStaticLayer("bottom_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(-1);
      this.topLayer = mappy.createStaticLayer("top_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(2); //Create the level using this scene and the map made above

      this.lm = new _LevelManager.LevelManager(this, mappy); //map collisions

      this.physics.add.collider(this.player, this.topLayer);
      this.topLayer.setCollisionByProperty({
        collides: true
      });
    }
  }, {
    key: "update",
    value: function update() {
      //Play enemy animations and move them as needed
      this.lm.updateEnemies(); //Set player movement on keypress

      if (this.keyboard.D.isDown === true) {
        this.player.setVelocityX(256);
      }

      if (this.keyboard.W.isDown === true) {
        this.player.setVelocityY(-256);
      }

      if (this.keyboard.S.isDown === true) {
        this.player.setVelocityY(256);
      }

      if (this.keyboard.A.isDown === true) {
        this.player.setVelocityX(-256);
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
      }
    }
  }, {
    key: "preload",
    value: function preload() {
      //Load all the levels animations through the animation manager
      this.am = new _AnimationManager.AnimationManager(this);
      this.am.setAnimations(); //load map assets

      this.load.image("ground1", "./assets/image/ground1.png");
      this.load.image("ground2", "./assets/image/ground2.png");
      this.load.image("ground3", "./assets/image/ground3.png");
      this.load.tilemapTiledJSON("FirstLevel", "./assets/maps/FirstLevel.json");
    }
  }]);

  return FirstLevel;
}(Phaser.Scene);

exports.FirstLevel = FirstLevel;
},{"../CST":"src/CST.js","../LevelManager":"src/LevelManager.js","../AnimationManager":"src/AnimationManager.js"}],"src/scenes/PauseScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PauseScene = void 0;

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

var PauseScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(PauseScene, _Phaser$Scene);

  function PauseScene() {
    _classCallCheck(this, PauseScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(PauseScene).call(this, {
      key: _CST.CST.SCENES.PAUSE
    }));
  }

  _createClass(PauseScene, [{
    key: "create",
    value: function create() {
      var _this = this;

      //add in assets
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, _CST.CST.IMAGE.PAUSED).setDepth(1);
      var title = this.add.image(this.game.renderer.width / 2, 0, _CST.CST.IMAGE.TITLE);
      title.setY(title.height / 2);
      var resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, _CST.CST.IMAGE.RESUME).setDepth(1);
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
      }); //create sounds for menu and pause!

      /*this.sound.play(CST.AUDIO.TITLE, {
      	loop: true
            })*/
      //make p resume game as well

      this.input.keyboard.on('keyup-P', function () {
        _this.sound.pauseAll();

        _this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.stop();
      }); //make buttons interactive

      resume.setInteractive();
      resume.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = resume.x - resume.width / 2 - 50;
        hoverSprite.y = resume.y;
      });
      resume.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      resume.on("pointerup", function () {
        _this.sound.pauseAll();

        _this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.stop();
      });
    }
  }, {
    key: "preload",
    value: function preload() {}
  }]);

  return PauseScene;
}(Phaser.Scene);

exports.PauseScene = PauseScene;
},{"../CST":"src/CST.js"}],"src/scenes/ShopScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopScene = void 0;

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

var ShopScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(ShopScene, _Phaser$Scene);

  function ShopScene() {
    _classCallCheck(this, ShopScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(ShopScene).call(this, {
      key: _CST.CST.SCENES.SHOP
    }));
  }

  _createClass(ShopScene, [{
    key: "create",
    value: function create() {
      var _this = this;

      //add in assets
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.10, _CST.CST.IMAGE.FIDDY).setDepth(1);
      var title = this.add.image(this.game.renderer.width / 2, 0, _CST.CST.IMAGE.SHOP);
      title.setY(title.height / 2);
      var resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.9, _CST.CST.IMAGE.EXIT).setDepth(1);
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
      }); //create sounds for menu and pause!

      /*this.sound.play(CST.AUDIO.TITLE, {
      	loop: true
            })*/
      //make p resume game as well

      this.input.keyboard.on('keyup-Y', function () {
        _this.sound.pauseAll();

        _this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.stop();
      }); //make buttons interactive

      resume.setInteractive();
      resume.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = resume.x - resume.width / 2 - 50;
        hoverSprite.y = resume.y;
      });
      resume.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      resume.on("pointerup", function () {
        _this.sound.pauseAll();

        _this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.stop();
      });
    }
  }, {
    key: "preload",
    value: function preload() {}
  }]);

  return ShopScene;
}(Phaser.Scene);

exports.ShopScene = ShopScene;
},{"../CST":"src/CST.js"}],"src/GameActivity.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _FirstLevel = require("./scenes/FirstLevel");

var _PauseScene = require("./scenes/PauseScene");

var _ShopScene = require("./scenes/ShopScene");

/* File Name: GameActivity.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: JavaScript file used to manage the phaser 3 game
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/

/** @type {import("../typings/phaser")}*/
var game = new Phaser.Game({
  width: 1600,
  height: 675,
  parent: 'my-canvas',
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _FirstLevel.FirstLevel, _PauseScene.PauseScene, _ShopScene.ShopScene],
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
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/FirstLevel":"src/scenes/FirstLevel.js","./scenes/PauseScene":"src/scenes/PauseScene.js","./scenes/ShopScene":"src/scenes/ShopScene.js"}],"../../../../../Users/Mathew/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56600" + '/');

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