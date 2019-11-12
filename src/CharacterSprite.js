/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: November 11, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "./CST";
export class CharacterSprite extends Phaser.Physics.Arcade.Sprite {
    
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.sys.updateList.add(this);
        scene.sys.displayList.add(this);
        this.setScale(2);        
        scene.physics.world.enableBody(this);
        this.setCollideWorldBounds(true);
        //PingPong weapon stats
        this.balls = 3; // Current number of balls available
        this.maxBalls = 3; //Max player can have
        //Player stats
        this.rep = 10; //DVDs increase this as player health
        this.repMax = 10;
        this.knowledgeNeeded = 10; ////Exam sheets increase this as player level
        this.knowledgeProgress = 0;
        this.knowledgeLevel = 0;
        this.will = 10; //Energy Drinks increase this as the players stamina
        this.willMax = 10;
        this.money = 0;
    }

    collectItem(player, item){
        //Find out which item was grabbed
        switch(item.name){
            case "dvd": //Got DVD
            if(player.rep < player.repMax){
                player.rep++;
            }
            break;
            case "examsheet": //Got Exam Sheet
            //Increase xp and then if its full, level up player
            player.knowledgeProgress++
            if(player.knowledgeProgress == player.knowledgeNeeded){
                //Level up player
                player.knowledgeLevel++;
                //Increment stats by 5 times the player level
                player.willMax = player.willMax + player.knowledgeLevel * 5;
                player.repMax = player.repMax + player.knowledgeLevel * 5;
                //Fill stats to new max at start of new knowledge level
                player.will = player.willMax;
                player.rep = player.repMax;
                //Reset knowledge progress and double the needed progress to the next level
                player.knowledgeProgress = 0;
                player.knowledgeNeeded = player.knowledgeNeeded * 2;
            }
            break;
            case "money": //Got Money
            player.money++;
            break;
            case "energy": //Got Energy Drink
            if(player.will < player.willMax){
                player.will++;
            }
            break;
        }
        player.displayInventory();
        //Picked up so destroy it
        item.setVisible(false);
        item.destroy(item.body);        
    }

    displayInventory(){
        let invBuffer = '';
        invBuffer = "C:/Users/Player/Stats/";
        invBuffer += "\n\n    <LEVEL>                   "+this.knowledgeLevel;
        invBuffer += "\n\n    <KNOWLEDGE>      "+this.knowledgeProgress+" / "+this.knowledgeNeeded;
        invBuffer += "\n\n    <WILLPOWER>      "+this.will+" / "+this.willMax;
        invBuffer += "\n\n    <REPUTATION>      "+this.rep+" / "+this.repMax;
        invBuffer += "\n\n    <MONEY>                $"+this.money+".00";
        invBuffer += "\n\n    <PINGPONGS>           "+this.balls+"/"+this.maxBalls;
        this.scene.cmd1Text.text = invBuffer;
    }

    whipHitEnemy(whip, enemy){
        //check if already got hit this animation
        if(!whip.state){
            //Play sound effect
            whip.scene.sound.play(CST.AUDIO.WHIPHIT, {
                loop: false
            })
            //adjust enemy stats on hit from whip
            enemy.rep--;
            if(enemy.rep == 0){
                enemy.destroy();
            }
            whip.setState(1); //indicate a hit already occured
        }        
    }

    ballHitEnemy(ball, enemy){
        //adjust inventory and enemy stats on hit from ball
        enemy.scene.player.balls++;
        ball.scene.player.displayInventory();
        enemy.rep--;
        //Play sound effect
        ball.scene.sound.play(CST.AUDIO.BALLHIT, {
            loop: false
        })
        if(enemy.rep == 0){
            enemy.destroy();
        }
        ball.destroy();
    }

    ballHitWall(ball, wall){
        //timer calls this even if its been deleted so make sure it still exists
        if(ball.scene != null){            
            ball.scene.player.balls++;
            ball.scene.player.displayInventory();
            ball.destroy();
        }        
    }

    blocked(){
        console.log("blocked");
    }

    decrementWill(player){
        //Make sure there is some will to lose before decrementing 
        if(player.will > 0){
            player.will--;
            player.displayInventory();
        }  
        //recursively call function continuously so its always happening      
        player.scene.time.delayedCall(15000, player.decrementWill, [player], player.scene);
    }
}