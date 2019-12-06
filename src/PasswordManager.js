/* File Name: PasswordManager.js
 * Author: Mathew Boland
 * Last Updated: December 5, 2019
 * Description: A class to generate and decode passwords.
*/
export class PasswordManager{
    
    constructor() {}

    //Generates a password given the game scene and player
    generatePassword(scene, player){
        let pass = '';
        let seed = this.randomNum(0, 25);
        //Check what first letter should be based on player game progress
        //If Chad mask obtained then that is what game progress starts at
        if(player.maskChad == true){
            pass += this.getCharFromNum(this.getNumFromSeed(6, seed));
        }else if(scene.finished4 == true){
            //Progress achieved up to final exam
            pass += this.getCharFromNum(this.getNumFromSeed(5, seed));
        }else if(scene.finished3 == true){
            //Progress achieved up to vlad room unlock
            pass += this.getCharFromNum(this.getNumFromSeed(4, seed));
        }else if(scene.lm.getNPC("NicoleD").state != 9){
            //Progress achieved up to chad room unlock (NicoleD state is no longer 9 after the chad boss fight)
            pass += this.getCharFromNum(this.getNumFromSeed(3, seed));
        }else if(scene.finished2 == true){
            //Progress achieved up to first exam unlock
            pass += this.getCharFromNum(this.getNumFromSeed(2, seed));
        }else if(scene.finished1 == true){
            //Progress achieved up to kitchen room unlock
            pass += this.getCharFromNum(this.getNumFromSeed(1, seed));
        }else{
            //Not enough progress to save
            pass += this.getCharFromNum(this.getNumFromSeed(0, seed));
        }
        //Check what second letter should be based on player level
        pass += this.getCharFromNum(this.getNumFromSeed(player.knowledgeLevel, seed));
        //Check what third letter should be based on player upgrades
        if(player.maxBalls > 3 && player.whipUpgrade > 0){
            //Both upgrades obtained
            pass += this.getCharFromNum(this.getNumFromSeed(3, seed));
        }else if(player.maxBalls > 3){
            //Only ping pong ball upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(2, seed));
        }else if(player.whipUpgrade > 0){
            //Only whip upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(1, seed));
        }else{
            //Nothing upgraded
            pass += this.getCharFromNum(this.getNumFromSeed(0, seed));
        }
        //Check what the fourth letter should be based on player grade
        pass += this.getCharFromNum(this.getNumFromSeed(player.lives - 1, seed));
        //Check what the fifth/sixth letters are based on players money (half dollars are rounded down and not saved)
        let money = Math.floor(player.money);
        pass += this.getCharFromNum(this.getNumFromSeed(((money-(money % 10))/10), seed));
        pass += this.getCharFromNum(this.getNumFromSeed(money % 10, seed));
        //Save the final letter as the seed used
        pass += this.getCharFromNum(seed);
        return pass;
    }

    //Gets the correct adjusted number based on the seed
    getNumFromSeed(num, seed){
        let gen = num + seed;  
        //If the seed generated something above the max character then have it overflow by subtracting the highest value 26 (since 0-25 is 26 numbers)      
        if(gen > 25){
            gen -= 26;
        }
        return gen;
    }

    //Decrypts teh password given based on the final character seed if a proper password is found
    decodePassword(pw){
        //Check length, return null if improper length

        //Get final char to determine seed

        //Decode password with seed

        //Check if any entries are invalid, return null if they are
    }

    //Return random number inbetween min and max
    randomNum(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Gets associated Char for number
    getCharFromNum(num){
        switch(num){
            case 0: return 'A';
            case 1: return 'B';
            case 2: return 'C';
            case 3: return 'D';
            case 4: return 'E';
            case 5: return 'F';
            case 6: return 'G';
            case 7: return 'H';
            case 8: return 'I';
            case 9: return 'J';
            case 10: return 'K';
            case 11: return 'L';
            case 12: return 'M';
            case 13: return 'N';
            case 14: return 'O';
            case 15: return 'P';
            case 16: return 'Q';
            case 17: return 'R';
            case 18: return 'S';
            case 19: return 'T';
            case 20: return 'U';
            case 21: return 'V';
            case 22: return 'W';
            case 23: return 'X';
            case 24: return 'Y';
            case 25: return 'Z';
        }
    }
}