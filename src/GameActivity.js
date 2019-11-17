/* File Name: GameActivity.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: JavaScript file used to manage the phaser 3 game
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
/** @type {import("../typings/phaser")}*/
import {LoadScene} from "./scenes/LoadScene";
import {MenuScene} from "./scenes/MenuScene";
import {FirstLevel} from "./scenes/FirstLevel";
import {PauseScene} from "./scenes/PauseScene";
import {ShopScene} from "./scenes/ShopScene";
import {TalkScene} from "./scenes/TalkScene";
import {LoseScene} from "./scenes/LoseScene";
let game = new Phaser.Game({
	width: 1600,
	height: 675,
	parent: 'my-canvas',
	scene:[
		LoadScene, MenuScene, FirstLevel, PauseScene, ShopScene, TalkScene, LoseScene
	],
	render:{
		pixelArt: true
	},
	physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
	},
	scale:{
		mode: Phaser.Scale.FIT
	}
});