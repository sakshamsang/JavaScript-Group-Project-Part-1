"use strict";

class Player {

    // to initilize the Object with name and noOfCards 
    constructor(name, noOfCards) {
        this.name = name;
        this.noOfCards = noOfCards;
        this.totalScore = 0; // high score
        this.clickCounter = 0;  // to know about which click we are in
        this.imageOrder = [];
        this.firstImageId = null;
        this.secondImageId = null;

    }

    newGame() {
        // method to handle to the new Game
        //take input images from declare images from "ImageArrayList" variable and 
        // display the images (on random order) based on noOfCards on the browser by default only showing 
        //back of the image and
        // attach click event to the images
        // create random order by using randomOrder method
        // for every image there will a unquie id from 1 to noOfCards

        // if no of cards are 24;then we will take 12 images from ImageArrayList and double it to make 24 
        // show these 24 images by the random order from imageOrder variable
    }

    randomOrder() {
        // method to return random order of index's between 1 to noOfCards
        // this order will be saved in imageOrder
    }
    handleClick(event) {
        // method to handle click event on images
        // get id(unqiue index) from the click event
        //increase the totalScore for every click to store the score.
        // update firstImageId and secondImageId value's based on click
        // check if it is first click just show the image by transition
        // if second click, compare the first and and second click image using firstImageId and secondImageId from the ImageArrayList
        // if both are same remove two images from ui
        //  else fade it back to the back of image

        //increase the clickCounter to on every click to know which above conditions to follow 
        // and reset clickCounter to zero on every two clicks

        // finally check if all images are opened
        // if yes , show the highest score and call saveHighestScore method
        // if no, continue
    }

    saveHighestScore(){
        // method to save highscore of player name with no of cards into localstorage
    }

}
