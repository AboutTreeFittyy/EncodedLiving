/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: November 10, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        this.balls = 3;
        this.maxBalls = 3;
        this.hp = 10;
        this.money = 0;
        this.npcPrev = '';
        this.score = 0;
    }

    collectItem(player, item){
        //destroy the item and then add it to the inventory stats
        item.setVisible(false);
        item.destroy(item.body);
        player.money++;
        player.scene.cmd1Text.text = player.scene.cmd1Text.text+"Player Money: "+player.money+"\n";
    }

    whipHitEnemy(whip, enemy){
        //check if already got hit this animation
        if(!whip.state){
            //adjust enemy stats on hit from whip
            enemy.hp--;
            if(enemy.hp == 0){
                enemy.destroy();
            }
            whip.setState(1); //indicate a hit already occured
        }        
    }

    ballHitEnemy(ball, enemy){
        //adjust inventory and enemy stats on hit from ball
        enemy.scene.player.balls++;
        enemy.hp--;
        if(enemy.hp == 0){
            enemy.destroy();
        }
        ball.destroy();
    }

    ballHitWall(ball, wall){
        //timer calls this even if its been deleted so make sure it still exists
        if(ball.scene != null){
            ball.scene.player.balls++;
            ball.destroy();
        }        
    }
}