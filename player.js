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
        this.firstImagePath = null;

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
        this.imageOrder = [];
        this.randomOrder();
        console.log(this.imageOrder);
        let htmlString = "";
        let rowString = "<div class='row'>";
        for (let x = 0; x < this.imageOrder.length; x++) {
            const val = this.imageOrder[x] - 1;
            let path = "";
            if (val > 23) {
                path = ImageArrayList[val - 24];
            } else {
                path = ImageArrayList[val]
            }
            console.log(path);
            const element = `<a id="id_${this.imageOrder[x]}" href="#" class="card-element"> 
                <img src="images/back.png" class="card-img show" />
                </a>`;
            // <img src="${path}" class="card-img hidden" />

            rowString += element;
            if ((x > 0 && (x + 1) % 8 == 0) || x == this.imageOrder.length - 1) {
                rowString += "</div>"
                htmlString += String(rowString).substring(0);
                rowString = "<div class='row'>";
            }
        }

        document.querySelector('#cards').innerHTML = htmlString;
        const elements = document.getElementsByClassName('card-element');

        for (let i = 0; i < elements.length; i++) {
            const id = elements[i].id.substring(3);
            elements[i].addEventListener("click", () => this.handleClick(id));
        }
    }

    randomOrder() {
        // method to return random order of index's between 1 to noOfCards
        // this order will be saved in imageOrder
        while (this.imageOrder.length < this.noOfCards) {
            const val = Math.floor(Math.random() * this.noOfCards) + 1;
            if (this.imageOrder.indexOf(val) === -1) {
                this.imageOrder.push(val);
            }
        }
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
        if (event == this.firstImageId) {
            return;
        }
        // const val = this.imageOrder[event] - 1;

        // let path = `images/card_${event}.png`;
        const val = this.imageOrder[event] - 1;
        console.log(val)
            let path = "";
            if (val > 23) {
                path = ImageArrayList[val - 24];
            } else {
                path = ImageArrayList[val]
            }
            console.log(path);
        const element = document.getElementById('id_' + event);
        const image = element.getElementsByTagName('img');
        image[0].src = path;
        this.totalScore++;
        if (this.clickCounter == 0) {
            this.clickCounter++;
            this.firstImageId = event;
            this.firstImagePath = path;
        } else {
            if (this.firstImagePath == path) {
                [this.firstImageId, event].forEach(row => {
                    const element = document.getElementById('id_' + row);
                    const image = element.getElementsByTagName('img');
                    image[0].style.display = "none";
                })
            } else {
                setTimeout(() => {
                    [this.firstImageId, event].forEach(row => {
                        const element = document.getElementById('id_' + row);
                        const image = element.getElementsByTagName('img');
                        image[0].src = "images/back.png";
                    })
                    this.firstImageId = null;
                    this.firstImagePath = null;
                    this.clickCounter = 0;
                }, 2000);
            }
        }
        $("#high_score").text(this.totalScore);
    }

    saveHighestScore() {
        // method to save highscore of player name with no of cards into localstorage
    }

}
