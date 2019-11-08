/* File Name: Sprite.js
 * Author: Mathew Boland
 * Last Updated: November 8, 2019
 * Description: Class used to create and hold the value of a Sprite object
*/
export class Sprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, down, up, left, right, name) {
        super(scene, x, y, texture, down);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);     
        scene.physics.world.enableBody(this);
        this.down = down;
        this.up = up;
        this.left = left;
        this.right = right;
        this.startX = x;
        this.startY = y;
        this.name = name;
    }
}