/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: September 30, 2019
 * Description: Class used to create and hold the value of a Sprite object
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
export class Sprite extends Phaser.GameObjects.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
    }
}