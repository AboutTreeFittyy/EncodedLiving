/* File Name: CharacterSprite.js
 * Author: Mathew Boland
 * Last Updated: November 16, 2019
 * Description: A class to create and hold the value of a CharacterSprite object
 * with arcade physics.
 * Citation: Code adapted from: https://github.com/jestarray/gate/tree/yt, jestarray
*/
import {CST} from "./CST";
import {Sprite} from "./Sprite";
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
        this.knowledgeNeeded = 1; ////Exam sheets increase this as player level
        this.knowledgeProgress = 0;
        this.knowledgeLevel = 0;
        this.will = 10; //Energy Drinks increase this as the players stamina
        this.willMax = 10;
        this.money = 0;
    }

    enterShop(player){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            player.scene.scene.launch(CST.SCENES.SHOP, player);
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    collectItem(player, item){
        player.addItem(player, item.name);
        //Picked up so destroy it
        item.setVisible(false);
        item.destroy(item.body);        
    }

    addItem(player, name){
        //Find out which item was grabbed
        switch(name){
            case "dvd": //Got DVD
            if(player.rep < player.repMax){
                player.rep++;
            }
            break;
            case "examsheet": //Got Exam Sheet
            //Increase xp and then if its full, level up player
            player.knowledgeProgress++;
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
    }

    displayInventory(){
        let invBuffer = '';
        invBuffer = "C:/Users/Player/Stats/";
        invBuffer += "\n\n    <LEVEL>                   "+this.knowledgeLevel;
        invBuffer += "\n\n    <KNOWLEDGE>      "+this.knowledgeProgress+" / "+this.knowledgeNeeded;
        invBuffer += "\n\n    <WILLPOWER>      "+this.will+" / "+this.willMax;
        invBuffer += "\n\n    <REPUTATION>      "+this.rep+" / "+this.repMax;
        invBuffer += "\n\n    <MONEY>                $"+this.money;
        invBuffer += "\n\n    <PINGPONGS>           "+this.balls+"/"+this.maxBalls;
        this.scene.cmd1Text.text = invBuffer;
    }

    dropLoot(enemy){
        let rand = enemy.scene.lm.randomNum(0, 3);
        let name= '';
        if(rand == 0){
            name = "dvd";
        }else if(rand == 1){
            name = "examsheet";
        }else if(rand == 2){
            name = "money";
        }else if(rand == 3){
            name = "energy";
        }
        let sprite = new Sprite(enemy.scene, enemy.x, enemy.y, CST.SPRITE.ITEM, 0, 0, rand, 0, name);
		enemy.scene.lm.itemSet.add(sprite);
		sprite.setSize(32,32);
		sprite.body.setOffset(0,0);
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
                if(enemy.name == "chad"){                    
                    whip.startNextSemester(whip, enemy);
                }else if(enemy.name == "Vlad"){                    
                    whip.endGame(whip, enemy);
                }
                whip.dropLoot(enemy);
                enemy.destroy();
            }
            whip.setState(1); //indicate a hit already occured
        }        
    }

    endGame(weapon, enemy){
        enemy.scene.sound.removeByKey(CST.AUDIO.VLAD); //Stop vlads sound
        //Start convo with nicoled
        let nicoled = enemy.scene.lm.getNPC("NicoleD");
        nicoled.state = 5;
        enemy.scene.keyboard.E.isDown = true;
        nicoled.npcSpeak(enemy.scene.player, nicoled);
        //Change claire2 to final playing state to end game convo
        enemy.scene.lm.getNPC("Claire2").state = 5;
    }

    winGame(player){
        //Play death sound effect
        player.visible = false;
        player.scene.sound.play(CST.AUDIO.WIN, {
            volume: 0.5,
            loop: false
        })
        //Enter the game over scene (LoseScene)
        player.scene.scene.pause();
        player.scene.scene.launch(CST.SCENES.WIN, player.scene);
    }

    startNextSemester(weapon, enemy){
        enemy.scene.sound.removeByKey(CST.AUDIO.CHAD); //Stop chads sound
        //Start next semester
        let player = weapon.scene.player;
        let nicole = weapon.scene.lm.getNPC("Nicole");
        nicole.state = 4; //TalkScene will set this to 5 when done and trigger more in the update sprites function in levelmanager
        player.scene.keyboard.E.isDown = true;
        nicole.npcSpeak(player, nicole); 
        player.scene.scene.pause();
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
            if(enemy.name == "chad"){
                ball.startNextSemester(ball, enemy);
            }else if(enemy.name == "Vlad"){                    
                ball.endGame(ball, enemy);
            }
            ball.dropLoot(enemy);
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

    claireBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.extralarge;
            player.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    chadBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.skinny;
            player.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    vladBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.large;
            player.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
    }

    examBlocked(player, fat){
        //If the r button is pressed then begin chat scene
        if (player.scene.keyboard.E.isDown) {
            let npc = player.scene.medium;
            player.scene.scene.launch(CST.SCENES.TALK, {player, npc});
            player.scene.scene.pause();
            //Reset buttons so they don't get stuck when resuming
            player.scene.keyboard.E.reset();
            player.scene.keyboard.W.reset();
            player.scene.keyboard.A.reset();
            player.scene.keyboard.S.reset();
            player.scene.keyboard.D.reset();
        }
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