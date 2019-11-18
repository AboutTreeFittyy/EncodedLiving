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
    SHOP: "SHOP",
    TALK: "TALK",
    LOSE: "LOSE",
    WIN: "WIN"
  },
  IMAGE: {
    ENCODEDLIVING: "encodedliving.png",
    LOADGAME: "loadgame.png",
    STARTNEWGAME: "startnewgame.png",
    TITLE: "title.jpg",
    PAUSED: "paused.png",
    RESUME: "resume.png",
    RESTART: "restart.png",
    CMD: "cmd.png",
    SHOP: "shop.png",
    FIDDY: "fiddy.png",
    EXIT: "exit.png",
    CONTINUE: "continue.png",
    GRADUATED: "graduated.png",
    DROPPED: "droppedout.png",
    MENU: "mainmenu.png",
    ENERGY: "energy.png",
    DVD: "dvd.png",
    EXAM: "examSheet.png"
  },
  AUDIO: {
    THEME1: "level_1_theme.mp3",
    TITLE: "title_music.mp3",
    JSON: "json.mp3",
    CHAD: "chadFlex.mp3",
    VLAD: "vladCry.mp3",
    DEATH: "death.mp3",
    WIN: "win.mp3",
    PLAYERHIT: "playerHit.mp3",
    BALLHIT: "ballHit.mp3",
    WHIPHIT: "whipHit.mp3",
    THROW: "throw.mp3",
    WHIP: "whip.mp3"
  },
  SPRITE: {
    PLAYER: "player.png",
    WHIP: "whip.png",
    BALL: "pingpong.png",
    NPC_LOT: "npc_lot.png",
    CHAD: "chadsprite.png",
    HOTSTUFF: "hotStuff.png",
    VLAD: "vlad.png",
    PATHETIC: "pathetic.png",
    KYLE: "kyle.png",
    BRAD: "brad.png",
    STEVIE: "stevie.png",
    NICOLED: "nicolecreepy.png",
    ITEM: "itemsall.png",
    NPCS: "npcs.png",
    NERD1: "nerd1.png",
    NERD2: "nerd2.png",
    JSON: "json.png",
    FAT: "fat.png",
    NERDGIRL: "nerdgirl.png"
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
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.CHAD || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.VLAD || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.FAT) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 96,
            frameWidth: 64
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.NPCS) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 80,
            frameWidth: 44
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.BALL || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.ITEM || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.WHIP) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 32,
            frameWidth: 32
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.KYLE) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 48,
            frameWidth: 32
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.JSON) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 48,
            frameWidth: 160
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.HOTSTUFF || _CST.CST.SPRITE[prop] == _CST.CST.SPRITE.PATHETIC) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 320,
            frameWidth: 90
          });
        } else if (_CST.CST.SPRITE[prop] == _CST.CST.SPRITE.BRAD) {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 80,
            frameWidth: 48
          });
        } else {
          this.load.spritesheet(_CST.CST.SPRITE[prop], _CST.CST.SPRITE[prop], {
            frameHeight: 64,
            frameWidth: 48
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
      var startButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, _CST.CST.IMAGE.STARTNEWGAME).setDepth(1); //let loadButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 +100, CST.IMAGE.LOADGAME).setDepth(1);
      //create sprites

      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT);
      hoverSprite.setVisible(false); //animate sprites

      this.anims.create({
        key: "walk",
        frameRate: 5,
        repeat: -1,
        yoyo: true,
        frames: this.anims.generateFrameNumbers(_CST.CST.SPRITE.FAT, {
          start: 0,
          end: 11
        })
      }); //create sounds for menu... commented out for the time being as its annoying

      /*this.sound.play(CST.AUDIO.TITLE, {
      	loop: true
      })*/
      //make start button interactive

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
      }); //Make load button interactive (currently no load capability in this version so commented out)

      /*
      loadButton.setInteractive();
      loadButton.on("pointerover", ()=>{
      	hoverSprite.setVisible(true);
      	hoverSprite.play("walk");
      	hoverSprite.x = loadButton.x - loadButton.width / 2 - 50;
      	hoverSprite.y = loadButton.y;
      })
      loadButton.on("pointerout", ()=>{
      	hoverSprite.setVisible(false);
      })
      loadButton.on("pointerup", ()=>{
      	this.sound.pauseAll();
      	this.scene.start(CST.SCENES.FIRSTLEVEL);
      })*/
    }
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

var _CST = require("./CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Sprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(Sprite, _Phaser$Physics$Arcad);

  function Sprite(scene, x, y, texture, down, up, left, right, name) {
    var _this;

    _classCallCheck(this, Sprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Sprite).call(this, scene, x, y, texture, left));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));
    scene.physics.world.enableBody(_assertThisInitialized(_this));
    _this.down = down;
    _this.rep = 1000;
    _this.up = up;
    _this.left = left;
    _this.right = right;
    _this.startX = x;
    _this.startY = y;
    _this.name = name;
    _this.state = 0;
    return _this;
  }

  _createClass(Sprite, [{
    key: "npcSpeak",
    value: function npcSpeak(player, npc) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        player.scene.scene.launch(_CST.CST.SCENES.TALK, {
          player: player,
          npc: npc
        });
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "makeNPCAgro",
    value: function makeNPCAgro(player, npc) {
      //Make Chad destroyable
      this.rep = 10;
      player.scene.physics.add.collider(player.scene.whip, npc, player.scene.whip.whipHitEnemy, null, this);

      if (npc.name == "chad") {
        npc.scene.sound.play(_CST.CST.AUDIO.CHAD, {
          loop: true
        });
      } else if (npc.name == "Vlad") {
        npc.scene.sound.play(_CST.CST.AUDIO.VLAD, {
          loop: true
        });
      }
    } //Callback for Boss timer to attack again

  }, {
    key: "npcAttack",
    value: function npcAttack(player, go) {
      go.state = 5;
    }
  }]);

  return Sprite;
}(Phaser.Physics.Arcade.Sprite);

exports.Sprite = Sprite;
},{"./CST":"src/CST.js"}],"src/EnemySprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EnemySprite = void 0;

var _CST = require("./CST");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EnemySprite =
/*#__PURE__*/
function (_Phaser$Physics$Arcad) {
  _inherits(EnemySprite, _Phaser$Physics$Arcad);

  function EnemySprite(scene, x, y, texture, frame, name, rep, dmg) {
    var _this;

    _classCallCheck(this, EnemySprite);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(EnemySprite).call(this, scene, x, y, texture, frame));
    scene.sys.updateList.add(_assertThisInitialized(_this));
    scene.sys.displayList.add(_assertThisInitialized(_this));

    _this.setScale(2);

    scene.physics.world.enableBody(_assertThisInitialized(_this));

    _this.setImmovable(true);

    _this.dmg = dmg;
    _this.state = 0;
    _this.rep = rep;
    _this.jsons = 5;
    _this.name = name;
    _this.startX = x;
    _this.startY = y;
    return _this;
  }

  _createClass(EnemySprite, [{
    key: "failPlayer",
    value: function failPlayer(player) {
      //Play death sound effect
      player.visible = false;
      player.scene.sound.play(_CST.CST.AUDIO.DEATH, {
        volume: 0.5,
        loop: false
      }); //Enter the game over scene (LoseScene)

      player.scene.scene.pause();
      player.scene.scene.launch(_CST.CST.SCENES.LOSE, player.scene);
    }
  }, {
    key: "projectileHitPlayer",
    value: function projectileHitPlayer(player, projectile) {
      //adjust inventory and player stats on hit from projectile
      player.rep -= projectile.dmg; //Play sound effect

      if (projectile.name == "json") {
        projectile.scene.sound.play(_CST.CST.AUDIO.JSON, {
          loop: false
        });
      }

      player.displayInventory();

      if (player.rep <= 0) {
        projectile.failPlayer(player); //Player loses
      }

      projectile.destroy();
    }
  }, {
    key: "projectileHitWall",
    value: function projectileHitWall(projectile, wall) {
      //timer calls this even if its been deleted so make sure it still exists
      if (projectile.scene != null) {
        projectile.jsons++;
        projectile.destroy();
      }
    }
  }, {
    key: "projectileTimeOut",
    value: function projectileTimeOut(projectile, enemy) {
      //timer calls this even if its been deleted so make sure it still exists
      if (enemy.scene != null) {
        enemy.jsons++;
        projectile.destroy();
      }
    }
  }, {
    key: "enemyCollide",
    value: function enemyCollide(player, enemy) {
      var curName; //Save whichever is in use to a temp variable to test conditions with

      if (player.name != '') {
        curName = player;
      } else {
        curName = enemy; //adjust inventory and player stats on hit from json if not in cooldown state

        if (curName.state == 0) {
          player.rep -= curName.dmg;
          player.displayInventory();

          if (player.rep <= 0) {
            curName.failPlayer(player); //Player loses
          }

          if (curName.dmg > 0) {
            //Play player hit sound effect
            curName.scene.sound.play(_CST.CST.AUDIO.PLAYERHIT, {
              loop: false
            });
          }
        }
      }

      var coolTime = 500; //Standard for nerds

      if (curName.state == 0) {
        //Based on the name from the collision decide what to do
        switch (curName.name) {
          //For nerds just switch their current direction, slice their name so that it keeps the same variation number
          case "nerd1up":
          case "nerd2up":
            curName.setVelocityY(-90);
            curName.name = curName.name.slice(0, 5) + "down";
            break;

          case "nerd1down":
          case "nerd2down":
            curName.setVelocityY(90);
            curName.name = curName.name.slice(0, 5) + "up";
            break;

          case "nerd1right":
          case "nerd2right":
            curName.setVelocityX(90);
            curName.name = curName.name.slice(0, 5) + "left";
            break;

          case "nerd1left":
          case "nerd2left":
            curName.setVelocityX(-90);
            curName.name = curName.name.slice(0, 5) + "right";
            break;

          case "nerdgirl":
            //Spawn in ten nerds from above without hitboxes for the map
            var sprite;

            for (var i = -5; i < 5; i++) {
              sprite = new EnemySprite(curName.scene, curName.x + i * 50, curName.y - 500, _CST.CST.SPRITE.NERD1, 0, "nerd1down", 5, 3);
              sprite.body.setSize(22, 44);
              sprite.setScale(2);
              sprite.body.setOffset(16, 16);
              curName.scene.enemySet.add(sprite);
              curName.scene.enemyCont.add(sprite);
              curName.scene.physics.add.collider(curName.scene.player, sprite, sprite.enemyCollide, null, curName.scene);
            }

            coolTime = 4000; //Have longer cooldown delay for spawning nerds

            break;
        } //Now store the temp variable back into the game object


        if (player.name != '') {
          player.name = curName.name;
        } else {
          enemy.name = curName.name;
        }

        curName.state = 1; //Set a timer to make enemies only be affected by collisions at most once per second

        curName.scene.time.delayedCall(coolTime, curName.coolDown, [this.scene.player, curName], this.scene);
      }
    }
  }, {
    key: "coolDown",
    value: function coolDown(player, enemy) {
      //Set active hitting state
      enemy.state = 0;
    }
  }]);

  return EnemySprite;
}(Phaser.Physics.Arcade.Sprite);

exports.EnemySprite = EnemySprite;
},{"./CST":"src/CST.js"}],"src/CharacterSprite.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterSprite = void 0;

var _CST = require("./CST");

var _Sprite = require("./Sprite");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

    _this.setCollideWorldBounds(true); //PingPong weapon stats


    _this.balls = 3; // Current number of balls available

    _this.maxBalls = 3; //Max player can have
    //Player stats

    _this.rep = 10; //DVDs increase this as player health

    _this.repMax = 10;
    _this.knowledgeNeeded = 1; ////Exam sheets increase this as player level

    _this.knowledgeProgress = 0;
    _this.knowledgeLevel = 0;
    _this.will = 10; //Energy Drinks increase this as the players stamina

    _this.willMax = 10;
    _this.money = 0;
    return _this;
  }

  _createClass(CharacterSprite, [{
    key: "enterShop",
    value: function enterShop(player) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        player.scene.scene.launch(_CST.CST.SCENES.SHOP, player);
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "collectItem",
    value: function collectItem(player, item) {
      player.addItem(player, item.name); //Picked up so destroy it

      item.setVisible(false);
      item.destroy(item.body);
    }
  }, {
    key: "addItem",
    value: function addItem(player, name) {
      //Find out which item was grabbed
      switch (name) {
        case "dvd":
          //Got DVD
          if (player.rep < player.repMax) {
            player.rep++;
          }

          break;

        case "examsheet":
          //Got Exam Sheet
          //Increase xp and then if its full, level up player
          player.knowledgeProgress++;

          if (player.knowledgeProgress == player.knowledgeNeeded) {
            //Level up player
            player.knowledgeLevel++; //Increment stats by 5 times the player level

            player.willMax = player.willMax + player.knowledgeLevel * 5;
            player.repMax = player.repMax + player.knowledgeLevel * 5; //Fill stats to new max at start of new knowledge level

            player.will = player.willMax;
            player.rep = player.repMax; //Reset knowledge progress and double the needed progress to the next level

            player.knowledgeProgress = 0;
            player.knowledgeNeeded = player.knowledgeNeeded * 2;
          }

          break;

        case "money":
          //Got Money
          player.money++;
          break;

        case "energy":
          //Got Energy Drink
          if (player.will < player.willMax) {
            player.will++;
          }

          break;

        case "mask":
          //Unlock all doors except exam
          player.scene.claireRoom.visible = false;
          player.scene.physics.world.removeCollider(player.scene.claireRoomCollider);
          player.scene.chadRoom.visible = false;
          player.scene.physics.world.removeCollider(player.scene.chadRoomCollider);
          player.scene.vladRoom.visible = false;
          player.scene.physics.world.removeCollider(player.scene.vladRoomCollider); //Hide Claire in case they haven't progressed far enough for her to anyway

          var claire1 = player.scene.lm.getNPC("Claire1");
          claire1.x = 0;
          claire1.y = 0;
          claire1.startX = 0;
          claire1.startY = 0;
          claire1.state = 2; //This way they can still fight chad if they want                
          //Have Nicole/NicoleD tell you what it does

          var nicole = player.scene.lm.getNPC("Nicole"); //Have Nicole tell player is shes active/visible

          if (nicole.visible) {
            nicole.state = 10;
            player.scene.keyboard.E.isDown = true;
            nicole.npcSpeak(player, nicole);
          } else {
            //Have NicoleD tell player because Nicole is done
            var nicoled = player.scene.lm.getNPC("NicoleD");
            nicoled.state = 10;
            player.scene.keyboard.E.isDown = true;
            nicoled.npcSpeak(player, nicoled);
          }

      }

      player.displayInventory();
    }
  }, {
    key: "displayInventory",
    value: function displayInventory() {
      var invBuffer = '';
      invBuffer = "C:/Users/Player/Stats/";
      invBuffer += "\n\n    <LEVEL>                   " + this.knowledgeLevel;
      invBuffer += "\n\n    <KNOWLEDGE>      " + this.knowledgeProgress + " / " + this.knowledgeNeeded;
      invBuffer += "\n\n    <WILLPOWER>      " + this.will + " / " + this.willMax;
      invBuffer += "\n\n    <REPUTATION>      " + this.rep + " / " + this.repMax;
      invBuffer += "\n\n    <MONEY>                $" + this.money;
      invBuffer += "\n\n    <PINGPONGS>           " + this.balls + "/" + this.maxBalls;
      this.scene.cmd1Text.text = invBuffer;
    }
  }, {
    key: "dropLoot",
    value: function dropLoot(enemy) {
      var rand = enemy.scene.lm.randomNum(0, 3);
      var name = '';

      if (rand == 0) {
        name = "dvd";
      } else if (rand == 1) {
        name = "examsheet";
      } else if (rand == 2) {
        name = "money";
      } else if (rand == 3) {
        name = "energy";
      }

      var sprite = new _Sprite.Sprite(enemy.scene, enemy.x, enemy.y, _CST.CST.SPRITE.ITEM, 0, 0, rand, 0, name);
      enemy.scene.lm.itemSet.add(sprite);
      sprite.setSize(32, 32);
      sprite.body.setOffset(0, 0);
    }
  }, {
    key: "whipHitEnemy",
    value: function whipHitEnemy(whip, enemy) {
      //check if already got hit this animation
      if (!whip.state) {
        //Play sound effect
        whip.scene.sound.play(_CST.CST.AUDIO.WHIPHIT, {
          loop: false
        }); //adjust enemy stats on hit from whip

        enemy.rep--;

        if (enemy.rep == 0) {
          if (enemy.name == "chad") {
            whip.startNextSemester(whip, enemy);
          } else if (enemy.name == "Vlad") {
            whip.endGame(whip, enemy);
          }

          whip.dropLoot(enemy);
          enemy.destroy();
        }

        whip.setState(1); //indicate a hit already occured
      }
    }
  }, {
    key: "endGame",
    value: function endGame(weapon, enemy) {
      enemy.scene.sound.removeByKey(_CST.CST.AUDIO.VLAD); //Stop vlads sound
      //Start convo with nicoled

      var nicoled = enemy.scene.lm.getNPC("NicoleD");
      nicoled.state = 5;
      enemy.scene.keyboard.E.isDown = true;
      nicoled.npcSpeak(enemy.scene.player, nicoled); //Change claire2 to final playing state to end game convo

      enemy.scene.lm.getNPC("Claire2").state = 5;
    }
  }, {
    key: "winGame",
    value: function winGame(player) {
      //Play death sound effect
      player.visible = false;
      player.scene.sound.play(_CST.CST.AUDIO.WIN, {
        volume: 0.5,
        loop: false
      }); //Enter the game over scene (LoseScene)

      player.scene.scene.pause();
      player.scene.scene.launch(_CST.CST.SCENES.WIN, player.scene);
    }
  }, {
    key: "startNextSemester",
    value: function startNextSemester(weapon, enemy) {
      enemy.scene.sound.removeByKey(_CST.CST.AUDIO.CHAD); //Stop chads sound
      //Start next semester

      var player = weapon.scene.player;
      var nicole = weapon.scene.lm.getNPC("Nicole");
      nicole.state = 4; //TalkScene will set this to 5 when done and trigger more in the update sprites function in levelmanager

      player.scene.keyboard.E.isDown = true;
      nicole.npcSpeak(player, nicole);
      player.scene.scene.pause();
    }
  }, {
    key: "ballHitEnemy",
    value: function ballHitEnemy(ball, enemy) {
      //adjust inventory and enemy stats on hit from ball
      enemy.scene.player.balls++;
      ball.scene.player.displayInventory();
      enemy.rep--; //Play sound effect

      ball.scene.sound.play(_CST.CST.AUDIO.BALLHIT, {
        loop: false
      });

      if (enemy.rep == 0) {
        if (enemy.name == "chad") {
          ball.startNextSemester(ball, enemy);
        } else if (enemy.name == "Vlad") {
          ball.endGame(ball, enemy);
        }

        ball.dropLoot(enemy);
        enemy.destroy();
      }

      ball.destroy();
    }
  }, {
    key: "ballHitWall",
    value: function ballHitWall(ball, wall) {
      //timer calls this even if its been deleted so make sure it still exists
      if (ball.scene != null) {
        ball.scene.player.balls++;
        ball.scene.player.displayInventory();
        ball.destroy();
      }
    }
  }, {
    key: "claireBlocked",
    value: function claireBlocked(player, fat) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        var npc = player.scene.extralarge;
        player.scene.scene.launch(_CST.CST.SCENES.TALK, {
          player: player,
          npc: npc
        });
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "chadBlocked",
    value: function chadBlocked(player, fat) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        var npc = player.scene.skinny;
        player.scene.scene.launch(_CST.CST.SCENES.TALK, {
          player: player,
          npc: npc
        });
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "vladBlocked",
    value: function vladBlocked(player, fat) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        var npc = player.scene.large;
        player.scene.scene.launch(_CST.CST.SCENES.TALK, {
          player: player,
          npc: npc
        });
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "examBlocked",
    value: function examBlocked(player, fat) {
      //If the r button is pressed then begin chat scene
      if (player.scene.keyboard.E.isDown) {
        var npc = player.scene.medium;
        player.scene.scene.launch(_CST.CST.SCENES.TALK, {
          player: player,
          npc: npc
        });
        player.scene.scene.pause(); //Reset buttons so they don't get stuck when resuming

        player.scene.keyboard.E.reset();
        player.scene.keyboard.W.reset();
        player.scene.keyboard.A.reset();
        player.scene.keyboard.S.reset();
        player.scene.keyboard.D.reset();
      }
    }
  }, {
    key: "decrementWill",
    value: function decrementWill(player) {
      //Make sure there is some will to lose before decrementing 
      if (player.will > 0) {
        player.will--;
        player.displayInventory();
      } //recursively call function continuously so its always happening      


      player.scene.time.delayedCall(15000, player.decrementWill, [player], player.scene);
    }
  }]);

  return CharacterSprite;
}(Phaser.Physics.Arcade.Sprite);

exports.CharacterSprite = CharacterSprite;
},{"./CST":"src/CST.js","./Sprite":"src/Sprite.js"}],"src/LevelManager.js":[function(require,module,exports) {
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
  } //returns the npc from the container of the given name


  _createClass(LevelManager, [{
    key: "getNPC",
    value: function getNPC(name) {
      for (var i = 0; i < this.scene.npcCont.list.length; i++) {
        if (this.scene.npcCont.list[i].name == name) {
          return this.scene.npcCont.list[i];
        }
      }

      return null;
    }
  }, {
    key: "spawnProjectile",
    value: function spawnProjectile(x, y, cst, st, name, rep, dmg, size, time, sprite) {
      var projectile = new _EnemySprite.EnemySprite(this.scene, x, y, cst, st, name, rep, dmg).setDepth(5); //Make projectile hit walls and players.

      this.scene.physics.add.collider(this.scene.player, projectile, projectile.projectileHitPlayer, null, this.scene);
      this.scene.physics.add.collider(this.scene.topLayer, projectile, projectile.projectileHitWall, null, this.scene);
      projectile.setScale(size); //Make timer to destroy projectile after certain amount of time.

      this.scene.time.delayedCall(time, projectile.projectileTimeOut, [projectile, sprite], this.scene);
      return projectile;
    }
  }, {
    key: "updateSprites",
    value: function updateSprites() {
      //Scan through all the NPCs to update them
      for (var i = 0; i < this.scene.npcCont.count('visible', true); i++) {
        var go = this.scene.npcCont.list[i];

        switch (go.name) {
          case "Nicole":
            if (go.state == 5) {
              //Start new semester, move sprites to new positions
              //Player back to start
              this.scene.player.x = 1200;
              this.scene.player.y = 4110; //Stevie to vlad room

              var stevie = this.scene.lm.getNPC("Stevie");
              stevie.x = 5800;
              stevie.y = 6820;
              stevie.startX = 5800;
              stevie.startY = 6820;
              stevie.state = 4; //Kyle to chad room

              var kyle = this.scene.lm.getNPC("Kyle");
              kyle.x = 1680;
              kyle.y = 6220;
              kyle.startX = 1680;
              kyle.startY = 6220;
              kyle.state = 4; //Brad in front of player

              var brad = this.scene.lm.getNPC("Brad");
              brad.x = 1350;
              brad.y = 4100;
              brad.startX = 1400;
              brad.startY = 4100; //Delete Claire1 by sending her into oblivion

              var claire1 = this.scene.lm.getNPC("Claire1");
              claire1.x = 0;
              claire1.y = 0;
              claire1.startX = 0;
              claire1.startY = 0; //Make sure claire2 is in state 0 now in case they got the chad mask

              var claire2 = this.scene.lm.getNPC("Claire2");
              claire2.state = 0; //Make NicoleD visible

              var nicoled = this.scene.lm.getNPC("NicoleD");
              nicoled.state = 0; //turn off this flag

              go.state = 6;
              go.setVisible(false);
              go.disableBody(); //Start Brad convo

              brad.state = 2;
              this.scene.keyboard.E.isDown = true;
              brad.npcSpeak(this.scene.player, brad);
              this.scene.scene.pause();
            }

            this.followPlayer(go);
            break;

          case "NicoleD":
            if (go.state != 9) {
              this.followPlayer(go);
            }

            break;

          case "chad":
            if (go.state < 5) {
              //Now check if they've been pushed from their origin and make them face the player
              this.watchPlayer(go, go.down, go.up, go.right, go.left);
            } //Check if chad is currently an enemy and needs to attack the player


            if (go.state == 5) {
              //Timer has reset chad state to 5. Have him attack.
              this.spawnProjectile(go.x, go.y + 100, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
              this.spawnProjectile(go.x, go.y - 100, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
              this.spawnProjectile(go.x, go.y + 100, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
              this.spawnProjectile(go.x, go.y - 100, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
              this.spawnProjectile(go.x, go.y, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(200);
              this.spawnProjectile(go.x, go.y, _CST.CST.SPRITE.HOTSTUFF, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(-200);
              go.play("chadFlex", true); //Set flag to 6 so he doesn't attack again.

              go.state = 6; //Set new timer to make him attack again in 2 seconds.

              this.scene.time.delayedCall(2000, go.npcAttack, [this.scene.player, go], this.scene);
            } else if (go.state == 7) {
              go.makeNPCAgro(this.scene.player, go);
              go.state = 5;
            } else {
              //Keep him in the right area, don't let him be pushed out of bounds
              if (go.startY - 50 > go.y) {
                go.setVelocityY(128);
              } else if (go.startY + 50 < go.y) {
                go.setVelocityY(-128);
              } else {
                go.setVelocityY(0);
              }

              if (go.startX - 50 > go.x) {
                go.setVelocityX(128);
              } else if (go.startX + 50 < go.x) {
                go.setVelocityX(-128);
              } else {
                go.setVelocityX(0);
              }
            }

            break;

          case "Brad":
            //See if i should agro Brad into a jason    
            if (go.state == 3) {
              var sprite = new _EnemySprite.EnemySprite(this.scene, go.x, go.y, _CST.CST.SPRITE.NPC_LOT, 5, "jason", 5, 0);
              sprite.body.setSize(22, 44);
              sprite.setScale(1.5);
              sprite.body.setOffset(16, 16);
              this.scene.enemySet.add(sprite);
              this.scene.enemyCont.add(sprite);
              sprite.setCollideWorldBounds(true); //This triggers when enemy hits player, npc, furnishings or the toplayer/borders of the game

              this.scene.physics.add.collider(this.scene.player, sprite, sprite.enemyCollide, null, this);
              this.scene.physics.add.collider(this.scene.npcSet, sprite, sprite.enemyCollide, null, this);
              this.scene.physics.add.collider(this.scene.furnishing, sprite, sprite.enemyCollide, null, this);
              this.scene.physics.add.collider(this.scene.topLayer, sprite, sprite.enemyCollide, null, this); //Now move brad to Claire1 in oblivion and get rid of this flag so it doesn't spawn more jasons

              go.x = 0;
              go.y = 0;
              go.startX = 0;
              go.startY = 0;
              go.state = 4; //Unblock the chad room

              this.scene.chadRoom.visible = false;
              this.scene.physics.world.removeCollider(this.scene.chadRoomCollider);
              this.scene.examRoomCollider = this.scene.physics.add.collider(this.scene.player, this.scene.examRoom, this.scene.player.examBlocked, null, this.scene);
              this.scene.examRoom.visible = true;
            }

          case "Kyle":
          case "Claire1":
          case "Prof":
          case "Stevie":
            //Now check if they've been pushed from their origin and make them face the player
            this.watchPlayer(go, go.down, go.up, go.right, go.left);
            break;

          case "Claire2":
            //Check for final game conversation state
            if (go.state == 6) {
              this.scene.player.winGame(this.scene.player);
            } //Now check if they've been pushed from their origin and make them face the player


            this.watchPlayer(go, go.down, go.up, go.right, go.left);
            break;

          case "Vlad":
            if (go.state < 5) {
              //Now check if they've been pushed from their origin and make them face the player
              this.watchPlayer(go, go.down, go.up, go.right, go.left);
            } //Check if chad is currently an enemy and needs to attack the player


            if (go.state == 5) {
              //Timer has reset vlad state to 5. Have him attack.
              this.spawnProjectile(go.x, go.y + 100, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
              this.spawnProjectile(go.x, go.y - 100, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(-200);
              this.spawnProjectile(go.x, go.y + 100, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
              this.spawnProjectile(go.x, go.y - 100, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityX(200);
              this.spawnProjectile(go.x, go.y, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(200);
              this.spawnProjectile(go.x, go.y, _CST.CST.SPRITE.PATHETIC, 0, 'flex', 1, 2, 0.35, 4000, go).setVelocityY(-200);
              go.play("VladCry", true); //Set flag to 6 so he doesn't attack again.

              go.state = 6; //Set new timer to make him attack again in 2 seconds.

              this.scene.time.delayedCall(2000, go.npcAttack, [this.scene.player, go], this.scene);
            } else if (go.state == 7) {
              go.makeNPCAgro(this.scene.player, go);
              go.state = 5;
            } else {
              //Keep him in the right area, don't let him be pushed out of bounds
              if (go.startY - 50 > go.y) {
                go.setVelocityY(128);
              } else if (go.startY + 50 < go.y) {
                go.setVelocityY(-128);
              } else {
                go.setVelocityY(0);
              }

              if (go.startX - 50 > go.x) {
                go.setVelocityX(128);
              } else if (go.startX + 50 < go.x) {
                go.setVelocityX(-128);
              } else {
                go.setVelocityX(0);
              }
            }

            break;
        }
      } //Scan through all the enemy objects to update them


      for (var _i = 0; _i < this.scene.enemyCont.count('visible', true); _i++) {
        var _go = this.scene.enemyCont.list[_i];

        switch (_go.name) {
          case "nerd1down":
            _go.play("nerd1down", true);

            _go.setVelocityY(90);

            break;

          case "nerd1up":
            _go.play("nerd1up", true);

            _go.setVelocityY(-90);

            break;

          case "nerd1left":
            _go.play("nerd1left", true);

            _go.setVelocityX(-90);

            break;

          case "nerd1right":
            _go.play("nerd1right", true);

            _go.setVelocityX(90);

            break;

          case "nerd2down":
            _go.play("nerd2down", true);

            _go.setVelocityY(90);

            break;

          case "nerd2up":
            _go.play("nerd2up", true);

            _go.setVelocityY(-90);

            break;

          case "nerd2left":
            _go.play("nerd2left", true);

            _go.setVelocityX(-90);

            break;

          case "nerd2right":
            _go.play("nerd2right", true);

            _go.setVelocityX(90);

            break;

          case "jason":
            //Now check if they've been pushed from their origin
            this.watchPlayer(_go, 4, 40, 28, 16); //get the difference of the player and jason coordinates

            var x = this.scene.player.x - _go.x;
            var y = this.scene.player.y - _go.y; //check if jason can project another json or if he's close enough to

            if (_go.jsons > 0 && Math.abs(x) < 250 && Math.abs(y) < 250) {
              _go.jsons--; //create the new ball sprite to throw, with colliders and a timer to destroy it on contact or no contact

              var randTime = this.randomNum(1000, 3000);
              var json = this.spawnProjectile(_go.x, _go.y, _CST.CST.SPRITE.JSON, 0, 'json', 1, 1, .5, randTime, _go); //get random speeds

              var randX = this.randomNum(1, 256);
              var randY = this.randomNum(1, 256); //Aim for the player general area using their coordinates as reference for scatter shot

              if (x > 0 && y > 0) {
                //to the right & below
                json.setVelocityX(randX);
                json.setVelocityY(randY);
              } else if (x < 0 && y > 0) {
                //to left and below
                json.setVelocityX(-randX);
                json.setVelocityY(randY);
              } else if (x < 0 && y < 0) {
                //to left and above
                json.setVelocityX(-randX);
                json.setVelocityY(-randY);
              } else {
                //to right and above
                json.setVelocityX(randX);
                json.setVelocityY(-randY);
              }
            }

            break;

          case "nerdgirl":
            //Now check if they've been pushed from their origin
            this.watchPlayer(_go, 2, 12, 8, 4);
            break;
        }
      }
    }
  }, {
    key: "randomNum",
    value: function randomNum(min, max) {
      // min and max included 
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }, {
    key: "followPlayer",
    value: function followPlayer(go) {
      var anim = 'nothing'; //Have her follow the player around                                      

      if (this.scene.player.y - 150 > go.y) {
        //player below
        go.setVelocityY(256);
        anim = "down";
      } else if (this.scene.player.y + 150 < go.y) {
        //player above
        go.setVelocityY(-256);
        anim = "up";
      } else {
        go.setVelocityY(0);
      }

      if (this.scene.player.x - 150 > go.x) {
        //player in front
        go.setVelocityX(256);
        anim = "right";
      } else if (this.scene.player.x + 150 < go.x) {
        //player behind
        go.setVelocityX(-256);
        anim = "left";
      } else {
        go.setVelocityX(0);
      }

      if (anim != "nothing") {
        go.play(go.name + anim, true);
      }
    }
  }, {
    key: "watchPlayer",
    value: function watchPlayer(go, down, up, right, left) {
      var anim = "nothing";

      if (go.startY - 50 > go.y) {
        //npc below
        go.setVelocityY(256);
        anim = "down";
      } else if (go.startY + 50 < go.y) {
        //npc above
        go.setVelocityY(-256);
        anim = "up";
      } else {
        go.setVelocityY(0);
      }

      if (go.startX - 50 > go.x) {
        //npc in front
        go.setVelocityX(256);
        anim = "right";
      } else if (go.startX + 50 < go.x) {
        //npc behind
        go.setVelocityX(-256);
        anim = "left";
      } else {
        go.setVelocityX(0);
      }

      if (anim != "nothing") {
        go.play(go.name + anim, true);
      } else {
        //have npc look at player general direction unless behind
        if (this.scene.player.y > go.y + 25) {
          //face down
          go.setFrame(down);
        } else if (this.scene.player.y < go.y - 100) {
          //face up
          go.setFrame(up);
        } else if (this.scene.player.x > go.x) {
          //face right to player
          go.setFrame(right);
        } else if (this.scene.player.x < go.x) {
          //face left to player
          go.setFrame(left);
        }
      }
    }
  }, {
    key: "setPlayer",
    value: function setPlayer() {
      //add game sprites              
      this.scene.player = new _CharacterSprite.CharacterSprite(this.scene, 700, 4100, _CST.CST.SPRITE.PLAYER, 143).setDepth(1); //align the player hitbox and set its size

      this.scene.player.setSize(32, 48);
      this.scene.player.setOffset(16, 12); //the whip sprite takes any

      this.scene.whip = new _CharacterSprite.CharacterSprite(this.scene, 0, 0, _CST.CST.SPRITE.WHIP, 0).setDepth(1);
      this.scene.whip.setVisible(false);
      this.scene.whip.setScale(3); //initialize player and whip to face down at start

      this.scene.player.isFacing = "down";
      this.scene.player.setPosition(this.scene.player.x, this.scene.player.y); //Set timer to decrement willpower by 1 every 15 seconds

      this.scene.time.delayedCall(15000, this.scene.player.decrementWill, [this.scene.player], this.scene);
    }
  }, {
    key: "setCMDS",
    value: function setCMDS() {
      //create info cmd prompts on sides
      this.scene.cmd1 = this.scene.add.image(-1000, -1000, _CST.CST.IMAGE.CMD).setDepth(1);
      this.scene.cmd1.displayHeight = this.scene.game.renderer.height;
      this.scene.cmd2 = this.scene.add.image(-1000, 1000, _CST.CST.IMAGE.CMD).setDepth(1);
      this.scene.cmd2.displayHeight = this.scene.game.renderer.height; //now make their text fields

      this.scene.cmd1Text = this.scene.add.text(this.scene.cmd1.x - this.scene.cmd1.width / 2, this.scene.cmd1.y - this.scene.cmd1.height / 2, '', {
        fontFamily: '"Roboto Condensed"'
      }).setDepth(7);
      this.scene.player.displayInventory();
      this.scene.cmd1Text.setColor("green");
      this.scene.cmd2Text = this.scene.add.text(this.scene.cmd2.x - this.scene.cmd2.width / 2, this.scene.cmd2.y - this.scene.cmd2.height / 2, 'C:/Users/Player/Conversations>\n', {
        fontFamily: '"Roboto Condensed"'
      }).setDepth(7);
      this.scene.cmd2Text.setColor("green"); //Create a counter for the lines entered so we can keep track of when they run out

      this.scene.cmd1Lines = 1;
      this.scene.cmd2Lines = 1;
    }
  }, {
    key: "setInputs",
    value: function setInputs() {
      var _this = this;

      //set up keyboard controls
      this.scene.keyboard = this.scene.input.keyboard.addKeys("W, A, S, D, E"); //Set listener for p to pause game

      this.scene.input.keyboard.on('keyup-P', function () {
        _this.scene.scene.launch(_CST.CST.SCENES.PAUSE);

        _this.scene.scene.pause();
      }); //Adjust zoom out

      this.scene.input.keyboard.on('keyup-U', function () {
        _this.scene.cameras.main.setZoom(0.5);
      }); //Adjust zoom in

      this.scene.input.keyboard.on('keyup-I', function () {
        _this.scene.cameras.main.setZoom(1);
      }); //attack with whip input

      this.scene.input.keyboard.on("keydown-F", function () {
        //indicate that attack animation is playing
        _this.scene.player.setState(1); //stop player from moving if they were


        _this.scene.player.setVelocityY(0);

        _this.scene.player.setVelocityX(0); //Create a one time listener to make player movable again after animation finishes


        _this.scene.whip.once("animationcomplete", _this.toggleAttack); //Play sound effect


        _this.scene.sound.play(_CST.CST.AUDIO.WHIP, {
          loop: false
        });

        switch (_this.scene.player.isFacing) {
          case "left":
            _this.scene.whip.setPosition(_this.scene.player.x - 70, _this.scene.player.y + 20);

            _this.scene.player.play("attackleft", true);

            _this.scene.whip.play("whip_left", true);

            break;

          case "right":
            _this.scene.whip.setPosition(_this.scene.player.x + 70, _this.scene.player.y);

            _this.scene.player.play("attackright");

            _this.scene.whip.play("whip_right");

            break;

          case "up":
            _this.scene.whip.setPosition(_this.scene.player.x, _this.scene.player.y - 70);

            _this.scene.player.play("attackup");

            _this.scene.whip.play("whip_up");

            break;

          case "down":
            _this.scene.whip.setPosition(_this.scene.player.x, _this.scene.player.y + 70);

            _this.scene.player.play("attackdown");

            _this.scene.whip.play("whip_down");

            break;
        }
      }); //attack with ping pong ball input

      this.scene.input.keyboard.on("keydown-SPACE", function () {
        if (_this.scene.player.balls >= 1) {
          //Play sound effect
          _this.scene.sound.play(_CST.CST.AUDIO.THROW, {
            loop: false
          });

          _this.scene.player.balls--;

          _this.scene.player.displayInventory(); //create the new ball sprite to throw, with colliders and a timer to destroy it on contact or no contact


          var ball = new _CharacterSprite.CharacterSprite(_this.scene, _this.scene.player.x, _this.scene.player.y, _CST.CST.SPRITE.BALL, 0).setDepth(5);

          _this.scene.physics.add.collider(_this.scene.enemySet, ball, ball.ballHitEnemy, null, _this.scene);

          _this.scene.physics.add.collider(_this.scene.topLayer, ball, ball.ballHitWall, null, _this.scene); //see if chad is agro and needs a collider


          var chad = _this.getNPC("chad");

          if (chad != null) {
            if (chad.state > 4) {
              _this.scene.physics.add.collider(ball, chad, ball.ballHitEnemy, null, _this.scene);
            }
          } //see if vlad is agro and needs a collider


          var vlad = _this.getNPC("Vlad");

          if (vlad != null) {
            if (vlad.state > 4) {
              _this.scene.physics.add.collider(ball, vlad, ball.ballHitEnemy, null, _this.scene);
            }
          } //delay call by amount of player will power, so lower will power makes throws go less far


          _this.scene.time.delayedCall(50 * _this.scene.player.will, ball.ballHitWall, [ball, ball], _this.scene);

          ball.setOffset(8, 6);

          switch (_this.scene.player.isFacing) {
            case "left":
              _this.scene.player.play("attackleft");

              ball.setVelocityX(-512);
              ball.x -= 25;
              break;

            case "right":
              _this.scene.player.play("attackright");

              ball.setVelocityX(512);
              ball.x += 25;
              break;

            case "up":
              _this.scene.player.play("attackup");

              ball.setVelocityY(-512);
              ball.y -= 25;
              break;

            case "down":
              _this.scene.player.play("attackdown");

              ball.setVelocityY(512);
              ball.y += 25;
              break;
          }
        }
      });
    }
  }, {
    key: "toggleAttack",
    value: function toggleAttack() {
      //this flag checks if the player can move or not
      this.scene.player.setState(0); //this flag checks if an enemy has already taken damage from the whip

      this.scene.whip.setState(0); //this puts the whip sprite out of view until its needed again

      this.scene.whip.x = 0;
      this.scene.whip.y = 0;
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
      this.createItems(462, 3, "energy");
      this.createItems(463, 4, "mask"); //add the collider for all the items

      this.scene.physics.add.collider(this.scene.player, this.itemSet, this.scene.player.collectItem, null, this); //make group for npcs physics

      this.scene.npcSet = this.scene.physics.add.group(); //make npcs from map
      //add the collider for all the npcs

      this.scene.physics.add.collider(this.scene.player, this.npcSet, this.scene.player.npcSpeak, null, this);
      this.scene.npcCont = this.scene.add.container();
      this.createNPCS(4705, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.CHAD, 0, 3, 1, 4, "chad");
      this.createNPCS(5097, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.VLAD, 0, 3, 1, 4, "Vlad");
      this.createNPCS(513, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 49, 85, 61, 73, "Claire1");
      this.createNPCS(474, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 10, 46, 22, 34, "Claire2");
      this.createNPCS(516, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 52, 88, 64, 76, "Prof");
      this.createNPCS(4742, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.KYLE, 2, 14, 6, 10, "Kyle");
      this.createNPCS(4757, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.BRAD, 2, 14, 6, 10, "Brad");
      this.createNPCS(4793, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.STEVIE, 18, 0, 9, 27, "Stevie");
      this.createNPCS(594, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NICOLED, 2, 14, 6, 10, "NicoleD");
      this.createNPCS(471, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 8, 44, 20, 32, "Nicole"); //make enemies group and container to handle them with*/

      this.scene.enemySet = this.scene.physics.add.group();
      this.scene.enemyCont = this.scene.add.container(); //using npcs 6 frame to have blank sprite generated so I can make my own inside the function
      //Make different enemies

      this.createEnemies(561, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1down", 5, 1, 2);
      this.createEnemies(565, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1up", 5, 1, 2);
      this.createEnemies(569, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1right", 5, 1, 2);
      this.createEnemies(573, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd1left", 5, 1, 2);
      this.createEnemies(578, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2down", 5, 1, 2);
      this.createEnemies(589, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2up", 5, 1, 2);
      this.createEnemies(581, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2right", 5, 1, 2);
      this.createEnemies(582, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERD1, 1, "nerd2left", 5, 1, 2);
      this.createEnemies(468, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NPC_LOT, 5, "jason", 5, 0, 1.5);
      this.createEnemies(4725, _CST.CST.SPRITE.NPCS, 6, _CST.CST.SPRITE.NERDGIRL, 2, "nerdgirl", 4724, 0, 1.5);
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
        sprite.body.setSize(sprite.displayWidth / 2, sprite.displayHeight / 2);
        sprite.setScale(1.5);
        sprite.body.setOffset(sprite.displayWidth / 6, 0);

        _this3.scene.npcSet.add(sprite);

        _this3.scene.npcCont.add(sprite); //This triggers when enemy hits player


        _this3.scene.physics.add.collider(_this3.scene.player, sprite, sprite.npcSpeak, null, _this3);
      });
    }
  }, {
    key: "createEnemies",
    value: function createEnemies(key, cst1, frame, cst2, st, name, rep, dmg, size) {
      var _this4 = this;

      this.map.createFromObjects("enemies", key, {
        key: cst1,
        frame: frame
      }).map(function (sprite) {
        sprite = new _EnemySprite.EnemySprite(_this4.scene, sprite.x, sprite.y, cst2, st, name, rep, dmg);
        sprite.body.setSize(22, 44);
        sprite.setScale(size);
        sprite.body.setOffset(16, 16);

        _this4.scene.enemySet.add(sprite);

        _this4.scene.enemyCont.add(sprite);

        sprite.setCollideWorldBounds(true); //This triggers when enemy hits player, npc, furnishings or the toplayer/borders of the game

        _this4.scene.physics.add.collider(_this4.scene.player, sprite, sprite.enemyCollide, null, _this4);

        _this4.scene.physics.add.collider(_this4.scene.npcSet, sprite, sprite.enemyCollide, null, _this4);

        _this4.scene.physics.add.collider(_this4.scene.furnishing, sprite, sprite.enemyCollide, null, _this4);

        _this4.scene.physics.add.collider(_this4.scene.topLayer, sprite, sprite.enemyCollide, null, _this4);
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
      //Chad sprites animation
      this.createAnimation("chadleft", 10, _CST.CST.SPRITE.CHAD, 0, 3, false);
      this.createAnimation("chadright", 10, _CST.CST.SPRITE.CHAD, 4, 7, false);
      this.createAnimation("chaddown", 10, _CST.CST.SPRITE.CHAD, 0, 3, false);
      this.createAnimation("chadup", 10, _CST.CST.SPRITE.CHAD, 4, 7, false);
      this.createAnimation("chadFlex", 10, _CST.CST.SPRITE.CHAD, 8, 15, false); //Vlad sprites animation

      this.createAnimation("Vladleft", 10, _CST.CST.SPRITE.VLAD, 0, 3, false);
      this.createAnimation("Vladright", 10, _CST.CST.SPRITE.VLAD, 4, 7, false);
      this.createAnimation("Vladdown", 10, _CST.CST.SPRITE.VLAD, 0, 3, false);
      this.createAnimation("Vladup", 10, _CST.CST.SPRITE.VLAD, 4, 7, false);
      this.createAnimation("VladCry", 10, _CST.CST.SPRITE.VLAD, 8, 15, false); //Nerd variant 1 animations

      this.createAnimation("nerd1left", 15, _CST.CST.SPRITE.NERD1, 5, 7, false);
      this.createAnimation("nerd1right", 15, _CST.CST.SPRITE.NERD1, 9, 11, false);
      this.createAnimation("nerd1down", 15, _CST.CST.SPRITE.NERD1, 1, 3, false);
      this.createAnimation("nerd1up", 15, _CST.CST.SPRITE.NERD1, 13, 15, false); //Nerd variant 2 animations

      this.createAnimation("nerd2left", 15, _CST.CST.SPRITE.NERD2, 5, 7, false);
      this.createAnimation("nerd2right", 15, _CST.CST.SPRITE.NERD2, 9, 11, false);
      this.createAnimation("nerd2down", 15, _CST.CST.SPRITE.NERD2, 1, 3, false);
      this.createAnimation("nerd2up", 15, _CST.CST.SPRITE.NERD2, 13, 15, false); //NerdGirl animations

      this.createAnimation("nerdgirlleft", 15, _CST.CST.SPRITE.NERDGIRL, 5, 7, false);
      this.createAnimation("nerdgirlright", 15, _CST.CST.SPRITE.NERDGIRL, 9, 11, false);
      this.createAnimation("nerdgirldown", 15, _CST.CST.SPRITE.NERDGIRL, 1, 3, false);
      this.createAnimation("nerdgirlup", 15, _CST.CST.SPRITE.NERDGIRL, 13, 15, false); //Jason enemy animations

      this.createAnimation("jasonleft", 10, _CST.CST.SPRITE.NPC_LOT, 15, 17, false);
      this.createAnimation("jasonright", 10, _CST.CST.SPRITE.NPC_LOT, 27, 29, false);
      this.createAnimation("jasondown", 10, _CST.CST.SPRITE.NPC_LOT, 3, 5, false);
      this.createAnimation("jasonup", 10, _CST.CST.SPRITE.NPC_LOT, 39, 41, false); //NicoleD npc walking animations

      this.createAnimation("NicoleDleft", 15, _CST.CST.SPRITE.NICOLED, 5, 7, false);
      this.createAnimation("NicoleDright", 15, _CST.CST.SPRITE.NICOLED, 9, 11, false);
      this.createAnimation("NicoleDdown", 15, _CST.CST.SPRITE.NICOLED, 1, 3, false);
      this.createAnimation("NicoleDup", 15, _CST.CST.SPRITE.NICOLED, 13, 15, false); //Nicole npc walking sprites

      this.createAnimation("Nicoledown", 10, _CST.CST.SPRITE.NPC_LOT, 6, 8, false);
      this.createAnimation("Nicoleleft", 10, _CST.CST.SPRITE.NPC_LOT, 18, 20, false);
      this.createAnimation("Nicoleright", 10, _CST.CST.SPRITE.NPC_LOT, 30, 32, false);
      this.createAnimation("Nicoleup", 10, _CST.CST.SPRITE.NPC_LOT, 42, 44, false); //Claire1 npc walking sprites

      this.createAnimation("Claire1down", 10, _CST.CST.SPRITE.NPC_LOT, 48, 50, false);
      this.createAnimation("Claire1left", 10, _CST.CST.SPRITE.NPC_LOT, 60, 62, false);
      this.createAnimation("Claire1right", 10, _CST.CST.SPRITE.NPC_LOT, 72, 74, false);
      this.createAnimation("Claire1up", 10, _CST.CST.SPRITE.NPC_LOT, 84, 86, false); //Claire2 npc walking sprites

      this.createAnimation("Claire2down", 10, _CST.CST.SPRITE.NPC_LOT, 9, 11, false);
      this.createAnimation("Claire2left", 10, _CST.CST.SPRITE.NPC_LOT, 21, 23, false);
      this.createAnimation("Claire2right", 10, _CST.CST.SPRITE.NPC_LOT, 33, 35, false);
      this.createAnimation("Claire2up", 10, _CST.CST.SPRITE.NPC_LOT, 45, 47, false); //Kyle npc walking animations

      this.createAnimation("Kyleleft", 15, _CST.CST.SPRITE.KYLE, 4, 7, false);
      this.createAnimation("Kyleright", 15, _CST.CST.SPRITE.KYLE, 8, 11, false);
      this.createAnimation("Kyledown", 15, _CST.CST.SPRITE.KYLE, 0, 3, false);
      this.createAnimation("Kyleup", 15, _CST.CST.SPRITE.KYLE, 12, 15, false); //Brad npc walking animations

      this.createAnimation("Bradleft", 15, _CST.CST.SPRITE.BRAD, 4, 7, false);
      this.createAnimation("Bradright", 15, _CST.CST.SPRITE.BRAD, 8, 11, false);
      this.createAnimation("Braddown", 15, _CST.CST.SPRITE.BRAD, 0, 3, false);
      this.createAnimation("Bradup", 15, _CST.CST.SPRITE.BRAD, 12, 15, false); //Stevie npc walking animations

      this.createAnimation("Stevieleft", 15, _CST.CST.SPRITE.STEVIE, 9, 17, false);
      this.createAnimation("Stevieright", 15, _CST.CST.SPRITE.STEVIE, 28, 36, false);
      this.createAnimation("Stevieup", 15, _CST.CST.SPRITE.STEVIE, 0, 8, false);
      this.createAnimation("Steviedown", 15, _CST.CST.SPRITE.STEVIE, 18, 26, false); //Prof npc walking sprites

      this.createAnimation("Profdown", 10, _CST.CST.SPRITE.NPC_LOT, 51, 53, false);
      this.createAnimation("Profleft", 10, _CST.CST.SPRITE.NPC_LOT, 63, 65, false);
      this.createAnimation("Profright", 10, _CST.CST.SPRITE.NPC_LOT, 75, 77, false);
      this.createAnimation("Profup", 10, _CST.CST.SPRITE.NPC_LOT, 87, 89, false); //My poorly made whip sprites       

      this.createAnimation("whip_left", 15, _CST.CST.SPRITE.WHIP, 17, 22, true);
      this.createAnimation("whip_up", 15, _CST.CST.SPRITE.WHIP, 8, 11, true);
      this.createAnimation("whip_right", 15, _CST.CST.SPRITE.WHIP, 12, 15, true);
      this.createAnimation("whip_down", 15, _CST.CST.SPRITE.WHIP, 0, 4, true); //Player attacking animation

      this.createAnimation("attackleft", 15, _CST.CST.SPRITE.PLAYER, 169, 174, false);
      this.createAnimation("attackup", 15, _CST.CST.SPRITE.PLAYER, 156, 161, false);
      this.createAnimation("attackright", 15, _CST.CST.SPRITE.PLAYER, 195, 200, false);
      this.createAnimation("attackdown", 15, _CST.CST.SPRITE.PLAYER, 182, 187, false); //Player directional movements

      this.createAnimation("left", 10, _CST.CST.SPRITE.PLAYER, 117, 125, false);
      this.createAnimation("right", 10, _CST.CST.SPRITE.PLAYER, 143, 151, false);
      this.createAnimation("up", 10, _CST.CST.SPRITE.PLAYER, 104, 112, false);
      this.createAnimation("down", 10, _CST.CST.SPRITE.PLAYER, 130, 138, false); //Player death animation

      this.createAnimation("die", 10, _CST.CST.SPRITE.PLAYER, 260, 265, false); //Player death animation

      this.createAnimation("win", 10, _CST.CST.SPRITE.PLAYER, 26, 32, false);
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
      //start up the theme for level, commenting out now cause its annoying 

      /*this.sound.play(CST.AUDIO.THEME1, {
      	loop: true
            })*/
      //Set up tiled map
      var mappy = this.add.tilemap("FirstLevel");
      var terrain1 = mappy.addTilesetImage("ground1");
      var terrain2 = mappy.addTilesetImage("ground2");
      var terrain3 = mappy.addTilesetImage("ground3");
      var holster = mappy.addTilesetImage("holster");
      var lightwood = mappy.addTilesetImage("lightwood");
      var fat = mappy.addTilesetImage("fat"); //layers

      mappy.createStaticLayer("bottom_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(-1);
      this.shopLayer = mappy.createStaticLayer("shop_layer", terrain1, 0, 0).setDepth(-1);
      this.furnishing = mappy.createStaticLayer("furnishing", [holster, lightwood, terrain2], 0, 0).setDepth(2);
      this.topLayer = mappy.createStaticLayer("top_layer", [terrain1, terrain2, terrain3], 0, 0).setDepth(2);
      this.claireRoom = mappy.createStaticLayer("claireRoom", fat, 0, 0).setDepth(1);
      this.chadRoom = mappy.createStaticLayer("chadRoom", fat, 0, 0).setDepth(1);
      this.vladRoom = mappy.createStaticLayer("vladRoom", fat, 0, 0).setDepth(1);
      this.examRoom = mappy.createStaticLayer("examRoom", fat, 0, 0).setDepth(1); //Create the level using this scene and the map made above

      this.lm = new _LevelManager.LevelManager(this, mappy); //map collisions

      this.physics.add.collider(this.player, this.topLayer);
      this.physics.add.collider(this.player, this.furnishing); //add whip colliders for enemies

      this.physics.add.collider(this.enemySet, this.whip, this.whip.whipHitEnemy, null, this); //add colliders for chick blocks        

      this.claireRoom.setCollisionByProperty({
        collides: true
      });
      this.chadRoom.setCollisionByProperty({
        collides: true
      });
      this.vladRoom.setCollisionByProperty({
        collides: true
      });
      this.examRoom.setCollisionByProperty({
        collides: true
      });
      this.claireRoomCollider = this.physics.add.collider(this.player, this.claireRoom, this.player.claireBlocked, null, this);
      this.examRoomCollider = this.physics.add.collider(this.player, this.examRoom, this.player.examBlocked, null, this);
      this.chadRoomCollider = this.physics.add.collider(this.player, this.chadRoom, this.player.chadBlocked, null, this);
      this.vladRoomCollider = this.physics.add.collider(this.player, this.vladRoom, this.player.vladBlocked, null, this); //create chick blocks sprites for talking

      this.skinny = new _Sprite.Sprite(this, 0, 0, _CST.CST.SPRITE.FAT, 0, 0, 0, 0, "skinny");
      this.medium = new _Sprite.Sprite(this, 0, 0, _CST.CST.SPRITE.FAT, 0, 0, 0, 0, "medium");
      this.large = new _Sprite.Sprite(this, 0, 0, _CST.CST.SPRITE.FAT, 0, 0, 0, 0, "large");
      this.extralarge = new _Sprite.Sprite(this, 0, 0, _CST.CST.SPRITE.FAT, 0, 0, 0, 0, "extralarge"); //add colliders for terrain

      this.topLayer.setCollisionByProperty({
        collides: true
      });
      this.furnishing.setCollisionByProperty({
        collides: true
      }); //Set collider handler for the shop entrance

      this.shopLayer.setCollisionByProperty({
        collides: true
      });
      this.physics.add.collider(this.player, this.shopLayer, this.player.enterShop, null, this); //Set Nicoled flag to be invisible

      var nicoled = this.lm.getNPC("NicoleD");
      nicoled.state = 9; //this makes sure if claire2 hasn't been talked to yet then give her new dialogue so it doesn't throw sequence 
      //out of order totally. Also she'll drop exams endlessly so the player can speed through the game when you have chad mask

      var claire2 = this.lm.getNPC("Claire2");
      claire2.state = 7; //start talk with nicole

      var nicole = this.lm.getNPC("Nicole");
      this.player.scene.keyboard.E.isDown = true;
      nicole.npcSpeak(this.player, nicole); //progress tracking flags

      this.finished1 = false;
      this.finished2 = false;
      this.finished3 = false;
      this.finished4 = false;
    }
    /*This progress check, checks the following: If the player has talked to Chad
    * and Kyle. And if the player has reached the first level. Then it gets rid of the
    * blocker to the cooking class. Nicole then informs the player this is available 
    * when the check passes.
    */

  }, {
    key: "checkProgress1",
    value: function checkProgress1() {
      var chad = this.lm.getNPC("chad");
      var kyle = this.lm.getNPC("Kyle"); //See if this has been done already, check that all needed conversations are done and player level is high enough

      if (this.finished1 == false && chad.state > 0 && kyle.state > 0 && this.player.knowledgeLevel >= 1) {
        var nicole = this.lm.getNPC("Nicole");
        nicole.state = 2; //hide blocker and remove their collider

        this.claireRoom.visible = false;
        this.physics.world.removeCollider(this.claireRoomCollider);
        this.player.scene.keyboard.E.isDown = true;
        nicole.npcSpeak(this.player, nicole);
        this.finished1 = true;
      }
    }
    /*This blocker checks that the player has talked to Claire, Stevie and Brad. It also checks if the player is level 2 yet.
    * If these conditions are met then it unblocks the exam room and moves Chad to his fighting position there. Nicole then
    * informs the player this is available when the check passes.
    */

  }, {
    key: "checkProgress2",
    value: function checkProgress2() {
      var stevie = this.lm.getNPC("Stevie");
      var claire = this.lm.getNPC("Claire1");
      var brad = this.lm.getNPC("Brad"); //See if this has been done already, check that all needed conversations are done and player level is high enough

      if (this.finished2 == false && stevie.state > 0 && claire.state > 0 && brad.state > 0 && this.player.knowledgeLevel >= 2) {
        var nicole = this.lm.getNPC("Nicole");
        var chad = this.lm.getNPC("chad");
        nicole.state = 3; //4th state is her at chad fight
        //hide blocker and remove their collider

        this.examRoom.visible = false;
        this.physics.world.removeCollider(this.examRoomCollider);
        this.player.scene.keyboard.E.isDown = true;
        nicole.npcSpeak(this.player, nicole); //Move chad to 6200,4020 in the exam room and set him to fight mode

        chad.x = 6600;
        chad.y = 4020;
        chad.startX = 6600;
        chad.startY = 4020;
        chad.state = 4; //Fight state

        this.finished2 = true;
      }
    }
    /*This progress check is for after the first boss fight with Chad, which should open Vlads room. This check unlocks 
    * Vlads room if you have talked to Claire2 and Kyle this semester. You also must be level 3 to pass the check.
    * NicoleD informs the player this is available when the check passes.
    */

  }, {
    key: "checkProgress3",
    value: function checkProgress3() {
      var claire2 = this.lm.getNPC("Claire2");
      var kyle = this.lm.getNPC("Kyle"); //See if this has been done already, check that all needed conversations are done and player level is high enough

      if (this.finished3 == false && kyle.state > 4 && claire2.state > 1 && this.player.knowledgeLevel >= 3) {
        var nicoled = this.lm.getNPC("NicoleD");
        nicoled.state = 3; //hide blocker and remove their collider

        this.vladRoom.visible = false;
        this.physics.world.removeCollider(this.vladRoomCollider);
        this.player.scene.keyboard.E.isDown = true;
        nicoled.npcSpeak(this.player, nicoled);
        this.finished3 = true;
      }
    }
    /*This progress check is for unlocking the final exam and boss fight with Vlad. This makes sure you have talked to 
    * Stevie again and Vlad before entering as well as being level 4. NicoleD informs player this is ready when the check passes.
    */

  }, {
    key: "checkProgress4",
    value: function checkProgress4() {
      var stevie = this.lm.getNPC("Stevie");
      var vlad = this.lm.getNPC("Vlad"); //See if this has been done already, check that all needed conversations are done and player level is high enough

      if (this.finished4 == false && stevie.state > 4 && vlad.state > 0 && this.player.knowledgeLevel >= 4) {
        var nicoled = this.lm.getNPC("NicoleD");
        nicoled.state = 4; //hide blocker and remove their collider

        this.examRoom.visible = false;
        this.physics.world.removeCollider(this.examRoomCollider);
        this.player.scene.keyboard.E.isDown = true;
        nicoled.npcSpeak(this.player, nicoled); //Move Vlad to exam room

        vlad.x = 6600;
        vlad.y = 4020;
        vlad.startX = 6600;
        vlad.startY = 4020;
        vlad.state = 4; //Fight state

        this.finished4 = true;
      }
    }
  }, {
    key: "update",
    value: function update() {
      //Play enemy animations and move them as needed
      this.lm.updateSprites(); //See if the player can move on to the next level

      this.checkProgress1();
      this.checkProgress2();
      this.checkProgress3();
      this.checkProgress4(); //Make sure the player isnt attacking before moving him

      if (!this.player.state) {
        //Set player movement on keypress
        if (this.keyboard.D.isDown === true) {
          this.player.setVelocityX(512);
        }

        if (this.keyboard.W.isDown === true) {
          this.player.setVelocityY(-512);
        }

        if (this.keyboard.S.isDown === true) {
          this.player.setVelocityY(512);
        }

        if (this.keyboard.A.isDown === true) {
          this.player.setVelocityX(-512);
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
          this.player.play("right", true);
          this.player.isFacing = "right";
        } else if (this.player.body.velocity.x < 0) {
          //moving left
          this.player.play("left", true);
          this.player.isFacing = "left";
        } else if (this.player.body.velocity.y < 0) {
          //moving up
          this.player.play("up", true);
          this.player.isFacing = "up";
        } else if (this.player.body.velocity.y > 0) {
          //moving down
          this.player.play("down", true);
          this.player.isFacing = "down";
        }
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
      this.load.image("holster", "./assets/image/holster.png");
      this.load.image("fat", "./assets/sprite/fat.png");
      this.load.image("lightwood", "./assets/image/lightwood.png");
      this.load.tilemapTiledJSON("FirstLevel", "./assets/maps/FirstLevel.json");
    }
  }]);

  return FirstLevel;
}(Phaser.Scene);

exports.FirstLevel = FirstLevel;
},{"../CST":"src/CST.js","../LevelManager":"src/LevelManager.js","../AnimationManager":"src/AnimationManager.js","../Sprite":"src/Sprite.js"}],"src/scenes/PauseScene.js":[function(require,module,exports) {
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
      var resume = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, _CST.CST.IMAGE.RESUME).setDepth(1);
      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT);
      hoverSprite.setVisible(false); //make p resume game as well

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
      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT);
      hoverSprite.setVisible(false); //Make purchase buttons for items

      var exam = this.add.image(this.game.renderer.width / 2 + 250, this.game.renderer.height * 0.7, _CST.CST.IMAGE.EXAM).setDepth(1);
      var dvd = this.add.image(this.game.renderer.width / 2 + 400, this.game.renderer.height * 0.7, _CST.CST.IMAGE.DVD).setDepth(1);
      var energy = this.add.image(this.game.renderer.width / 2 + 100, this.game.renderer.height * 0.7, _CST.CST.IMAGE.ENERGY).setDepth(1); //create sounds for menu and pause!

      /*this.sound.play(CST.AUDIO.TITLE, {
      	loop: true
            })*/
      //make p resume game as well

      this.input.keyboard.on('keyup-SPACE', function () {
        _this.sound.pauseAll();

        _this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.stop();
      }); //make resume button interactive and exit game on click

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
      }); //Make exam button interactive and purchase exam sheet on click for 3.5 dollars if player has enough

      exam.setInteractive();
      exam.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = exam.x;
        hoverSprite.y = exam.y - 150;
      });
      exam.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      exam.on("pointerup", function () {
        if (_this.player.money > 3) {
          _this.player.money -= 3.5;

          _this.player.addItem(_this.player, "examsheet");
        }
      }); //Make energy button interactive and purchase energy on click for 3.5 dollars if player has enough

      energy.setInteractive();
      energy.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = energy.x;
        hoverSprite.y = energy.y - 150;
      });
      energy.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      energy.on("pointerup", function () {
        if (_this.player.money > 3) {
          _this.player.money -= 3.5;

          _this.player.addItem(_this.player, "energy");
        }
      }); //Make  button interactive and purchased on click for 3.5 dollars if player has enough

      dvd.setInteractive();
      dvd.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = dvd.x;
        hoverSprite.y = dvd.y - 150;
      });
      dvd.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      dvd.on("pointerup", function () {
        if (_this.player.money > 3) {
          _this.player.money -= 3.5;

          _this.player.addItem(_this.player, "dvd");
        }
      });
    }
  }, {
    key: "init",
    value: function init(data) {
      //Get data from FirstLevel scene to work with in this scene
      this.player = data;
    }
  }]);

  return ShopScene;
}(Phaser.Scene);

exports.ShopScene = ShopScene;
},{"../CST":"src/CST.js"}],"src/scenes/TalkScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TalkScene = void 0;

var _CST = require("../CST");

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

var TalkScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(TalkScene, _Phaser$Scene);

  function TalkScene() {
    _classCallCheck(this, TalkScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(TalkScene).call(this, {
      key: _CST.CST.SCENES.TALK
    }));
  }

  _createClass(TalkScene, [{
    key: "init",
    value: function init(data) {
      //Get data from FirstLevel scene to work with in this scene
      this.npc = data.npc;
      this.player = data.player;
    }
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //Handle input for dialogue
      this.chatsDone = 0; //The number of sections finished so far

      this.selectDialogue(this.player, this.npc); //add in assets

      var contin = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.75, _CST.CST.IMAGE.CONTINUE).setDepth(1);
      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT);
      hoverSprite.setVisible(false); //make space resume game as well

      this.input.keyboard.on('keyup-R', function () {
        _this.acceptInput();
      }); //make e exit conversation as well

      this.input.keyboard.on('keyup-C', function () {
        //go through all inputs
        while (_this.chatsDone < _this.chats.length) {
          _this.acceptInput();
        }

        _this.acceptInput(); //get the last input

      }); //make buttons interactive

      contin.setInteractive();
      contin.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = contin.x - contin.width / 2 - 50;
        hoverSprite.y = contin.y;
      });
      contin.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      contin.on("pointerup", function () {
        _this.acceptInput();
      });
    }
  }, {
    key: "dropItem",
    value: function dropItem(frame, x, y, name) {
      var sprite = new _Sprite.Sprite(this.player.scene, this.player.x + x, this.player.y + y, _CST.CST.SPRITE.ITEM, 0, 0, frame, 0, name);
      this.player.scene.lm.itemSet.add(sprite);
      sprite.setSize(32, 32);
      sprite.body.setOffset(0, 0);
    }
  }, {
    key: "addCMD2Text",
    value: function addCMD2Text(text, player) {
      //If the command prompt has more than 34 lines, delete the first one before adding another
      if (text.split(/\r\n|\r|\n/).length + player.scene.cmd2Lines >= 35) {
        //Increment the number of lines tracker for each line of dialogue in the string
        for (var i = 0; i < text.split(/\r\n|\r|\n/).length; i++) {
          player.scene.cmd2Text.text = player.scene.cmd2Text.text.replace(/[\w\W]+?\n+?/, "");
        }
      } else {
        //Still room so don't remove anything, just increase counter for lines
        player.scene.cmd2Lines += text.split(/\r\n|\r|\n/).length;
      }

      player.scene.cmd2Text.text += text + "\n";
    }
  }, {
    key: "acceptInput",
    value: function acceptInput() {
      if (this.chatsDone >= this.chats.length) {
        //Return to game, no more dialogue now
        this.scene.resume(_CST.CST.SCENES.FIRSTLEVEL);
        this.scene.stop();
      } else {
        //Add next dialogue to cmd2
        this.addCMD2Text(this.chats[this.chatsDone], this.player);
        this.chatsDone++;
      }
    }
  }, {
    key: "selectDialogue",
    value: function selectDialogue(player, npc) {
      //Append new text to chats array based on npc name for acceptInputs function to print
      switch (npc.name) {
        case "skinny":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Skinny_Sister/Let me in.", "C:/Users/Skinny_Sister/To_Player/No way.\nChads all mine."];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Skinny_Sister/I'm not gonna\ntake him from you.", "C:/Users/Skinny_Sister/To_Player/That's what\neveryone says."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Skinny_Sister/To_Player/Stop trying\nnobodies getting in here."];
              break;
          }

          break;

        case "medium":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Medium_Sister/Let me in.", "C:/Users/Skinny_Sister/To_Player/No way.\nWe gotta go on a date before I'll let you through!"];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Medium_Sister/I'm not gonna\ndate you, you're erm... not my type.", "C:/Users/Medium_Sister/To_Player/That's what\neveryone says."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Medium_Sister/To_Player/Just date me\nor you're not getting in here."];
              break;
          }

          break;

        case "large":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Large_Sister/Let me in.", "C:/Users/Skinny_Sister/To_Player/No way.\nThis room is awful."];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Large_Sister/I'm don't care\njust let me in.", "C:/Users/Large_Sister/To_Player/That's what\neveryone says."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Large_Sister/To_Player/Stop trying\nI won't let you see this."];
              break;
          }

          break;

        case "extralarge":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_ExtraLarge_Sister/Let me in.", "C:/Users/ExtraLarge_Sister/To_Player/No way.\nThe food is all mine."];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_ExtraLarge_Sister/I'm not gonna\ntake it from you.", "C:/Users/ExtraLarge_Sister/To_Player/That's what\neveryone says."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/ExtraLarge_Sister/To_Player/Stop trying\nnobodies eating this food except me."];
              break;
          }

          break;

        case "Nicole":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Self/Hey is that Nicole?", "C:/Users/Nicole/To_Player/Hey! Thought I'd see\nyou here. First day of programming school eh?", "C:/Users/Player/To_Nicole/Yep, you're here for\nthat too right?", "C:/Users/Nicole/To_Player/Sure am! I'm so happy\nwe met up. Things are a bit weird here...", "C:/Users/Player/To_Nicole/Really? It can't be too\nbad its just University.", "C:/Users/Nicole/To_Player/Maybe it's just me but\nthose nerds running around are just gross.", "C:/Users/Player/To_Nicole/Sheesh, I get nerds are\nlame but I wouldn't go that far...", "C:/Users/Nicole/To_Player/No they are! These nerds\nmust not shower cause I smell them a mile a way.\nIt doesn't help they're always running through\nthe halls! One accidently touched me and I\nnearly threw up, he was that greasy!", "C:/Users/Player/To_Nicole/Damn, sounds like they're\nplaying too much smash.", "C:/Users/Nicole/To_Player/Huh? Oh and don't touch\nthe dorky girls!", "C:/Users/Player/To_Nicole/Wasn't planning on it.", "C:/Users/Nicole/To_Player/No seriously. I bumped\ninto one and got rushed by like 10 nerds. Apparently\nthey thought I was hitting on her. I'm not even\nattracted to girls!", "C:/Users/Player/To_Nicole/HaHa that's too funny.\nMust be quite the territorial geeks here.", "C:/Users/Nicole/To_Player/You're telling me. Come\non now. Let's get to class, I'll follow you."];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Nicole/Know where to go?", "C:/Users/Nicole/To_Player/Yeah, the blue room."];
              break;

            case 2:
              this.chats = ["C:/Users/Nicole/To_Player/That's enough music.\nI think we're ready to go to cooking class.", "C:/Users/Player/To_Nicole/Yeah, I'm hungry."];
              break;

            case 3:
              this.chats = ["C:/Users/Nicole/To_Player/That's enough cooking.\nI think we're ready to take our exams now.", "C:/Users/Player/To_Nicole/I agree."];
              break;

            case 4:
              this.chats = ["C:/Users/Nicole/To_Player/Good job! Now we can\ntake our exams and be done with this semester.", "C:/Users/Player/To_Nicole/Yeah, what a relief.\nGuess I'm gonna skip Chads party after this debacle.", "C:/Users/Nicole/To_Player/Yeah, I can't go either.\nI'll be stuck in class until it's almost over.", "C:/Users/Player/To_Nicole/Oh well, guess we'll\nhave to have our own party next year!", "C:/Users/Nicole/To_Player/Haha, yeah I'll be\nlooking forward to it!"];
              npc.state++;
              break;

            case 10:
              //Unlock all rooms got mask
              this.chats = ["C:/Users/Nicole/To_Player/Wow I think this will\nget rid of the girls blocking your way!", "C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."]; //See what state to reset to

              if (npc.scene.finished2) {
                npc.state = 3;
              } else if (npc.scene.finished1) {
                npc.state = 2;
              } else {
                npc.state = 1;
              }

              break;
          }

          break;

        case "NicoleD":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/oliceN/To_Player/Hwy$ddi%sith(paphen?", "C:/Users/Player/To_Self/I can't believe Chad killed\nNicole."];
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/oliceN/To_Player/mI'[os*rosry.", "C:/Users/Player/To_Self/I wish Nicole never had\nthose late classes so she'd still be here..."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/oliceN/To_Player/eAr^uyo+neistling?", "C:/Users/Player/To_Self/I miss Nicole."];
              npc.state = 0; //restart

              break;

            case 3:
              this.chats = ["C:/Users/oliceN/To_Player/lasePe$leph%em!", "C:/Users/Player/To_Self/I should go to the study room.\nNasty brown, who would colour something that?"];
              npc.state = 0; //restart

              break;

            case 4:
              this.chats = ["C:/Users/oliceN/To_Player/odoG#uckl%no@oruy\nxeam!", "C:/Users/Player/To_Self/Time for my last exam."];
              break;

            case 5:
              this.chats = ["C:/Users/oliceN/To_Player/m'I#os rodpu^!$oYu\nta$eslat)amde$ti...", "C:/Users/Player/To_Self/Guess I should leave now...\nShould probably talk to Claire first though, wonder\nif she's still mad."];
              break;

            case 10:
              //Unlock all rooms get mask
              this.chats = ["C:/Users/oliceN/To_Player/oWw,$I%hinkt#hatt$iwll\netg$dir#fo%het#rilgs#lbcokngi@uory#ayw!", "C:/Users/Player/To_Self/Huh, neat. Girls will let\nme go anywhere with the Chad mask."]; //See what state to reset to

              if (npc.scene.finished4) {
                npc.state = 4;
              } else if (npc.scene.finished3) {
                npc.state = 3;
              }

              break;
          }

          break;

        case "Claire1":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Claire/You look like you know\n your way around here, what's your name?", "C:/Users/Claire/To_Player/The name's Claire and I\nsure do! What are you doing here?", "C:/Users/Player/To_Claire/Introducing myself, I\nalways liked it when a friend cooks.", "C:/Users/Claire/To_Player/Well I guess we'll get\nalong great then! Oh by the way, I have exam answers\nfrom last year on this sheet. You can have it. It'll\nimprove your knowledge. *WINKS*"];
              npc.state++;
              this.dropItem(1, 0, -50, "examsheet");
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Claire/Is that food free?", "C:/Users/Claire/To_Player/Nothing in life is free. I\nmight sneak some out to Chads partylater, so you\ncan have some then if you go.", "C:/Users/Player/To_Claire/Guess I'll have to go, see\nya there."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Claire/To_Player/Sorry I can't talk anymore\nor this food won't be ready in time for Chads party."];
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Claire/To_Player/*IGNORES YOU*"];
              break;
          }

          break;

        case "Claire2":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Self/Wow Claire changed clothes.", "C:/Users/Claire/To_Player/Have you seen Brad?", "C:/Users/Player/To_Claire/Wow, nice to see you too.", "C:/Users/Claire/To_Player/I don't have time for\ngames. Have you seen him or not?", "C:/Users/Player/To_Claire/Actually we just fought.", "C:/Users/Claire/To_Player/No way you don't even\nlook hurt! And there's no way you would beat him\nin a fight!", "C:/Users/Player/To_Claire/Well I did. Broke that\nlosers nose right at the school entrance.", "C:/Users/Claire/To_Player/YOU JERK. You better\nnot have ruined his face! I'm going to see him.", "C:/Users/Player/To_Self/I guess it isn't only her\nclothes she changed..."];
              npc.startX = 1250;
              npc.startY = 4100;
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Self/Here it comes.", "C:/Users/Claire/To_Player/You are so immature!\nWhy would you hurt Brad?", "C:/Users/Player/To_Claire/Someone had to put him\nin his place. He may try to act like him but he'll\nnever be a great guy like Chad.", "C:/Users/Claire/To_Player/Chad killed Nicole. Are\nyou forgetting that?", "C:/Users/Player/To_Claire/I forgive him for making\na mistake. I can't forgive Brad intentionally trying\nto hurt my feelings like he did.", "C:/Users/Claire/To_Player/You think that justifies\nfighting him? A fight won't bring your dead friend\nback!", "C:/Users/Player/To_Claire/Well...", "C:/Users/Claire/To_Player/I don't want to hear it. I'm\nnever talking to you again!", "C:/Users/Player/To_Claire/Whatever..."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Player/To_Claire/Really gonna be like this?", "C:/Users/Claire/To_Player/*IGNORES YOU*", "C:/Users/Claire/To_Self/Why won't he leave?"];
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Claire/To_Player/Go away."];
              npc.state++;
              break;

            case 4:
              this.chats = ["C:/Users/Claire/To_Player/I hate you."];
              npc.state = 2;
              break;

            case 5:
              this.chats = ["C:/Users/Player/To_Self/I wonder if Claire is still\nmad at me.", "C:/Users/Claire/To_Player/Hey! How are you doing?\nJust finished school?", "C:/Users/Player/To_Claire/Yeah, it's been interesting\nto say the least.", "C:/Users/Claire/To_Player/Lucky, I'm going to have\nto take another year because of all the time I wasted\nat parties with Brad.", "C:/Users/Player/To_Claire/Well that's too bad...", "C:/Users/Claire/To_Player/Yeah... Hey, look. I'm\nsorry about before. You were right. Brad is a jerk.\nI'm glad you put him in his place.", "C:/Users/Player/To_Claire/Wow really? I thought\nyou two were going strong together.", "C:/Users/Claire/To_Player/Oh no. Seeing him like\nthat after you... well... it made me rethink just how\ncool he really was.", "C:/Users/Player/To_Claire/Glad you came to your\nsenses.", "C:/Users/Claire/To_Player/Me too, thanks for that\nwake up call. Say you want to go get something to eat\nlater?", "C:/Users/Player/To_Claire/Well... sure why not.", "C:/Users/oliceN/To_Player/odGo^eyb.", "C:/Users/Player/To_Self/What else am I gonna do?"];
              npc.state = 6;
              break;

            case 7:
              this.chats = ["C:/Users/Claire/To_Player/Hey.", "C:/Users/Player/To_Claire/Oh, hi there.", "C:/Users/Claire/To_Player/I like your mask here's\na bunch of exam sheets."];
              this.dropItem(1, 0, 50, "examsheet");
              this.dropItem(1, 0, -50, "examsheet");
              this.dropItem(1, 50, 0, "examsheet");
              this.dropItem(1, -50, 0, "examsheet");
              break;
          }

          break;

        case "Kyle":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Nicole/To_Player/Ugh, these mouth\nbreathers are really annoying to listen to. All they\never talk about is JSON.", "C:/Users/Player/To_Nicole/Yep, they're pretty\nannoying, I feel lame just being around them.", "C:/Users/Nicole/To_Player/Can we leave then?", "C:/Users/Player/To_Nicole/No wait this guy seems\nnormal.", "C:/Users/Player/To_Kyle/How's the weather down\nthere?", "C:/Users/Kyle/To_Player/Amazing! I'm so pumped to\nbe here!", "C:/Users/Player/To_Kyle/Good, someone who isn't\neasily offended.", "C:/Users/Kyle/To_Player/Me? Never! Chicks don't\nlike insecure dudes.", "C:/Users/Player/To_Kyle/You're a ladies man then?", "C:/Users/Kyle/To_Player/Yeah, know any girls that I\nshould?", "C:/Users/Nicole/To_Player/Awe he would be so cute\nwith Stevie!", "C:/Users/Player/To_Kyle/Yeah, you should try with\nStevie. As long as you don't mind short people haha.", "C:/Users/Kyle/To_Player/Ha, perfect I love em short.\nThanks pal. You want the rest of this energy drink?", "C:/Users/Player/To_Kyle/Sure *Grabs drink* Why is\nit still full?", "C:/Users/Kyle/To_Player/People my size don't need\nmuch of that. Enjoy the drink, I'll see you around."];
              this.dropItem(3, 0, -50, "energy");
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Kyle/You ask out Stevie yet?", "C:/Users/Kyle/To_Player/Not yet. Need to think of\nan opener.", "C:/Users/Player/To_Kyle/I'll leave you to it."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Kyle/To_Player/Can't talk, I'm scouting for\ngirls."];
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Kyle/To_Player/How's this opener:\nWant to see my... No never mind it sucks.", "C:/Users/Player/To_Kyle/You'll get it. Keep trying."];
              npc.state = 2;
              break;

            case 4:
              this.chats = ["C:/Users/Kyle/To_Player/Hey...", "C:/Users/Player/To_Kyle/You okay. How's Stevie.", "C:/Users/Kyle/To_Player/...great now that she met\nBrad.", "C:/Users/Player/To_Kyle/I don't think he's into her.\nBesides I just beat him up.", "C:/Users/Kyle/To_Player/That's the first good thing\nI've heard in months. Take this exam sheet."];
              this.dropItem(1, 0, -50, "examsheet");
              npc.state++;
              break;

            case 5:
              this.chats = ["C:/Users/Kyle/To_Player/Sorry I'd rather not talk\nright now, kinda bummed out.", "C:/Users/Player/To_Kyle/Take care of yourself, man."];
              break;
          }

          break;

        case "chad":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Chad/Hey, I hear you're throwing\na party..", "C:/Users/Chad/To_Player/Duh, I'm Chad! I throw\nthe sickest parties man! So sick, everyone's invited!", "C:/Users/Player/To_Chad/Awesome man I can't wait\nto go!", "C:/Users/Player/To_Nicole/Are you gonna go?", "C:/Users/Nicole/To_Player/Sorry but I'm gonna be\nstuck late here during my summer courses.", "C:/Users/Chad/To_Nicole/You're gonna miss out! My\nparties are the best in the country. Drive to my place\nand crash with me if you want, no pressure.", "C:/Users/Nicole/To_Chad/Thanks for the offer but I\nprobably won't even be finished class by the time the\nparties over.", "C:/Users/Chad/To_Nicole/Well the offers there if you\nchange your mind.", "C:/Users/Chad/To_Player/Hey, before you go I got\nsome exam sheets you can have.", "C:/Users/Player/To_Chad/Thanks, you're the best!."];
              this.dropItem(1, 0, -50, "examsheet");
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Chad/Got a spare bed I could\ncrash on for the party?", "C:/Users/Chad/To_Player/Sure do!", "C:/Users/Player/To_Chad/Thanks Chad!"];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Player/To_Chad/Who's going to the party?", "C:/Users/Chad/To_Player/Chicks, dudes, everyone!"];
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Chad/To_Player/Not now bro. I'm busy\nsetting up."];
              break;

            case 4:
              this.chats = ["C:/Users/Chad/To_Player/Bro you're gonna love this\nchick I just met. She's perfect for you.", "C:/Users/Player/To_Chad/Can this wait? I got to go\nto my exam.", "C:/Users/Chad/To_Player/No way you can't miss out\non this chick man! I won't let you.", "C:/Users/Player/To_Chad/Sorry but I'm going to go\nto my exam.", "C:/Users/Chad/To_Player/Just try to resist me!", "C:/Users/Nicole/To_Player/Oh my god don't look!\nThat's some HOT STUFF!!!"]; //Put Chad into fighting mode

              npc.state = 7;
              break;
          }

          break;

        case "Brad":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Brad/Hey are you going to\nChads party?", "C:/Users/Brad/To_Player/Of course! Everyones\ngoing to that! Chad's the coolest!", "C:/Users/Player/To_Brad/Cool man, I'll see you\nthere then.", "C:/Users/Brad/To_Player/Oh could you get some\nbooze?", "C:/Users/Player/To_Brad/I would but I'm broke.", "C:/Users/Brad/To_Player/Here take this cash then."];
              npc.state++;
              this.dropItem(2, 0, -50, "money");
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Brad/Hey.", "C:/Users/Brad/To_Player/Can't talk dude, busy\nmirin Chads instagram."];
              break;

            case 2:
              this.chats = ["C:/Users/Player/To_Brad/Hey man long time no see.", "C:/Users/Brad/To_Player/Yeah dude. Been a bummer\nsince Chad isn't here anymore.", "C:/Users/Player/To_Brad/He didn't graduate,\nwhere'd he go?", "C:/Users/Brad/To_Player/Got locked up, it's\nridiculous. We ran out of booze at the party since\nChad did a world record keg stand it was sick!\nThen he wasn't gonna let the party dry up on his\nwatch so he drove to the store to get more.", "C:/Users/Player/To_Brad/He was caught drunk\ndriving?", "C:/Users/Brad/To_Player/Not just that, your friend\nthere... whats her name... Nicole. She must not have\nbeen watching out cause he hit her when he left\nthe dorm and she died.", "C:/Users/Player/To_Brad/Oh my god... no. You're\nmessing with me, right?", "C:/Users/Brad/To_Player/I know it's terrible bro.\nNo more partying with Chad.", "C:/Users/Player/To_Brad/Shutup, I mean Nicole.\nShe's really dead?", "C:/Users/Brad/To_Player/Yeah but who cares! It's\nher fault Chad got locked up! Say have you heard\nof JSON... JSON..."];
              npc.state++;
              break;
          }

          break;

        case "Vlad":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Vlad/Hey.", "C:/Users/Vlad/To_Player/You can see me! Most\npeople who can see me just stare.", "C:/Users/Player/To_Vlad/...", "C:/Users/Vlad/To_Player/Oh, okay. Here's some\nanswers to the exams. I'll just fail anyway."];
              this.dropItem(1, 0, -50, "examsheet");
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Vlad/Got anymore answer sheets?", "C:/Users/Vlad/To_Player/Sure do!", "C:/Users/Player/To_Vlad/Thanks Vlad. I cancount\non you for these sheets.", "C:/Users/Vlad/To_Player/It's the only thing anyone\ncan count on me for."];
              this.dropItem(1, 0, -50, "examsheet");
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Player/To_Vlad/Can I have another sheet?", "C:/Users/Vlad/To_Player/This is my last one.\nGOD why didn't I print more! I'm so pathetic!", "C:/Users/Player/To_Vlad/Uhh, okay."];
              this.dropItem(1, 0, -50, "examsheet");
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Vlad/To_Player/Not now man. I'm busy\nwallowing in self pity."];
              break;

            case 4:
              this.chats = ["C:/Users/Vlad/To_Player/I'm so sorry, I ran out of\nthose exam sheets. You must hate me now.", "C:/Users/Player/To_Vlad/Can this wait? I got to go\nto my exam.", "C:/Users/Vlad/To_Player/Oh god! Now I'm making\nyou late for your exam. You must really hate me!", "C:/Users/Player/To_Vlad/Are you crying?", "C:/Users/Vlad/To_Player/YES! *He won't move*", "C:/Users/oliceN/To_Player/I*nact')ese#mhi!\nsHes'%os^tahpteci!'"]; //Put Vlad into fighting mode

              npc.state = 7;
              break;
          }

          break;

        case "Stevie":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Stevie/Hey there, Mrs Short.", "C:/Users/Stevie/To_Player/Hey I may be energetic\nbut I ain't no StarBucks coffee!", "C:/Users/Nicole/To_Stevie/You're looking great\nStevie! How are you doing?", "C:/Users/Stevie/To_Player/She this nice to you?", "C:/Users/Player/To_Stevie/Nah I think she's hitting\non you...", "C:/Users/Nicole/To_Stevie/You two... always\nscrewing around.", "C:/Users/Player/To_Nicole/Don't worry, I'll let you\nhit on me later. Now though, Stevie needs to hit\non Kyle.", "C:/Users/Stevie/To_Player/Who's Kyle?", "C:/Users/Player/To_Stevie/This guy we met that you\nshould hit on. He said he'll hit on you though, so\nfeel free to just wait.", "C:/Users/Stevie/To_Player/Yeah, I'll just nap. Well\nthis energy drinks no use then. Here take it.", "C:/Users/Nicole/To_Stevie/Aw you're both so similar,\n enjoy the nap."];
              this.dropItem(3, 0, -50, "energy");
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Stevie/I thought you were gonna\nnap?", "C:/Users/Stevie/To_Player/Yeah I'm trying this type\nof nap where you're standing.", "C:/Users/Nicole/To_Stevie/Sounds pretty hard.", "C:/Users/Stevie/To_Player/It is when people are\ntalking to you."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Stevie/To_Player/ZZZZzzzZZZzzz"];
              npc.state++;
              break;

            case 3:
              this.chats = ["C:/Users/Player/To_Stevie/Wake up!", "C:/Users/Stevie/To_Player/Huh? why? Is that kyle\nguy here yet?", "C:/Users/Player/To_Stevie/Nah just bugging ya.", "C:/Users/Stevie/To_Player/Oh...ZZZzzzZZZzzz"];
              npc.state = 2;
              break;

            case 4:
              this.chats = ["C:/Users/Player/To_Stevie/Sup short stuff?", "C:/Users/Stevie/To_Player/Don't talk to me, I heard\nyou hurt Brad!", "C:/Users/Player/To_Stevie/What do you care?", "C:/Users/Stevie/To_Player/We're basically dating.", "C:/Users/Player/To_Stevie/Pretty sure he's dating\nClaire, hate to break it to you.", "C:/Users/Stevie/To_Player/Ugh, just shutup will you?\nYou jerk!"];
              npc.state++;
              break;

            case 5:
              this.chats = ["C:/Users/Stevie/To_Player/Buzz off, Brad hater!"];
              break;
          }

          break;

        case "Prof":
          switch (npc.state) {
            case 0:
              this.chats = ["C:/Users/Player/To_Prof/Hey why do I need to take\nmusic?", "C:/Users/Prof/To_Player/Don't ask questions!", "C:/Users/Player/To_Prof/Wait what?", "C:/Users/Prof/To_Player/Look I'll give you the exam\nanswers, just go away!", "C:/Users/Player/To_Nicole/Is she for real?", "C:/Users/Nicole/To_Player/Shutup don't blow this!"];
              this.dropItem(1, 0, 200, "examsheet");
              npc.state++;
              break;

            case 1:
              this.chats = ["C:/Users/Player/To_Prof/Look we never met and I\ndon't know you, now scram!", "C:/Users/Prof/To_Player/Sheesh, fine."];
              npc.state++;
              break;

            case 2:
              this.chats = ["C:/Users/Player/To_Prof/Hey.", "C:/Users/Prof/To_Player/Who are you?"];
              break;
          }

          break;
      } //Print first segment of speech


      this.acceptInput();
    }
  }]);

  return TalkScene;
}(Phaser.Scene);

exports.TalkScene = TalkScene;
},{"../CST":"src/CST.js","../Sprite":"src/Sprite.js"}],"src/scenes/LoseScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoseScene = void 0;

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

var LoseScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(LoseScene, _Phaser$Scene);

  function LoseScene() {
    _classCallCheck(this, LoseScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(LoseScene).call(this, {
      key: _CST.CST.SCENES.LOSE
    }));
  }

  _createClass(LoseScene, [{
    key: "create",
    value: function create() {
      var _this = this;

      //add in assets
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, _CST.CST.IMAGE.DROPPED).setDepth(1);
      var restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, _CST.CST.IMAGE.RESTART).setDepth(1);
      var menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, _CST.CST.IMAGE.MENU).setDepth(1);
      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT); //Make death animation for player

      var deathSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.PLAYER);
      deathSprite.x = this.game.renderer.width / 2;
      deathSprite.y = this.game.renderer.height / 2;
      deathSprite.setScale(2);
      deathSprite.play("die");
      hoverSprite.setVisible(false); //make restart button interactive

      restart.setInteractive();
      restart.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = restart.x - restart.width / 2 - 50;
        hoverSprite.y = restart.y;
      });
      restart.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      restart.on("pointerup", function () {
        _this.data.scene.restart();

        _this.scene.stop();
      }); //Make menu button interactive

      menu.setInteractive();
      menu.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = menu.x - menu.width / 2 - 50;
        hoverSprite.y = menu.y;
      });
      menu.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      menu.on("pointerup", function () {
        _this.scene.stop(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.run(_CST.CST.SCENES.MENU);

        _this.scene.stop();
      });
    }
  }, {
    key: "init",
    value: function init(data) {
      //Get data from Level scene to work with in this scene
      this.data = data;
    }
  }]);

  return LoseScene;
}(Phaser.Scene);

exports.LoseScene = LoseScene;
},{"../CST":"src/CST.js"}],"src/scenes/WinScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WinScene = void 0;

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

var WinScene =
/*#__PURE__*/
function (_Phaser$Scene) {
  _inherits(WinScene, _Phaser$Scene);

  function WinScene() {
    _classCallCheck(this, WinScene);

    return _possibleConstructorReturn(this, _getPrototypeOf(WinScene).call(this, {
      key: _CST.CST.SCENES.WIN
    }));
  }

  _createClass(WinScene, [{
    key: "create",
    value: function create() {
      var _this = this;

      //add in assets
      this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, _CST.CST.IMAGE.GRADUATED).setDepth(1);
      var restart = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.7, _CST.CST.IMAGE.RESTART).setDepth(1);
      var menu = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.8, _CST.CST.IMAGE.MENU).setDepth(1);
      var hoverSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.FAT); //Make death animation for player

      var winSprite = this.add.sprite(100, 100, _CST.CST.SPRITE.PLAYER);
      winSprite.x = this.game.renderer.width / 2;
      winSprite.y = this.game.renderer.height / 2;
      winSprite.setScale(2);
      winSprite.play("win");
      hoverSprite.setVisible(false); //make restart button interactive

      restart.setInteractive();
      restart.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = restart.x - restart.width / 2 - 50;
        hoverSprite.y = restart.y;
      });
      restart.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      restart.on("pointerup", function () {
        _this.data.scene.restart();

        _this.scene.stop();
      }); //Make menu button interactive

      menu.setInteractive();
      menu.on("pointerover", function () {
        hoverSprite.setVisible(true);
        hoverSprite.play("walk");
        hoverSprite.x = menu.x - menu.width / 2 - 50;
        hoverSprite.y = menu.y;
      });
      menu.on("pointerout", function () {
        hoverSprite.setVisible(false);
      });
      menu.on("pointerup", function () {
        _this.scene.stop(_CST.CST.SCENES.FIRSTLEVEL);

        _this.scene.run(_CST.CST.SCENES.MENU);

        _this.scene.stop();
      });
    }
  }, {
    key: "init",
    value: function init(data) {
      //Get data from Level scene to work with in this scene
      this.data = data;
    }
  }]);

  return WinScene;
}(Phaser.Scene);

exports.WinScene = WinScene;
},{"../CST":"src/CST.js"}],"src/GameActivity.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _FirstLevel = require("./scenes/FirstLevel");

var _PauseScene = require("./scenes/PauseScene");

var _ShopScene = require("./scenes/ShopScene");

var _TalkScene = require("./scenes/TalkScene");

var _LoseScene = require("./scenes/LoseScene");

var _WinScene = require("./scenes/WinScene");

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
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _FirstLevel.FirstLevel, _PauseScene.PauseScene, _ShopScene.ShopScene, _TalkScene.TalkScene, _LoseScene.LoseScene, _WinScene.WinScene],
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
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/FirstLevel":"src/scenes/FirstLevel.js","./scenes/PauseScene":"src/scenes/PauseScene.js","./scenes/ShopScene":"src/scenes/ShopScene.js","./scenes/TalkScene":"src/scenes/TalkScene.js","./scenes/LoseScene":"src/scenes/LoseScene.js","./scenes/WinScene":"src/scenes/WinScene.js"}],"../../../../../Users/Mathew/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51166" + '/');

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