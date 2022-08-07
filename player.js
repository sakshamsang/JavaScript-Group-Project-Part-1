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
        this.correctScore = 0;

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
        let htmlString = "";
        let rowString = "<div class='row'>";
        for (let x = 0; x < this.imageOrder.length; x++) {
            const val = this.imageOrder[x] - 1;
            let path = "";
            if (val > ((this.noOfCards / 2) - 1)) {
                path = ImageArrayList[val - this.noOfCards / 2];
            } else {
                path = ImageArrayList[val]
            }
            const element = `<a id="id_${this.imageOrder[x]}" href="#" class="card-element"> 
                <img src="images/back.png" class="card-img show" />
                </a>`;

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

        const label = `name_${this.noOfCards}_${this.name}`;
        const value = localStorage.getItem(label);
        if (value) {
            $("#previous_score").text(value);
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
        const val = this.imageOrder[event - 1] - 1;
        let path = "";
        if (val > ((this.noOfCards / 2) - 1)) {
            path = ImageArrayList[val - this.noOfCards / 2];
        } else {
            path = ImageArrayList[val]
        }

        $('#id_' + event).find('img').fadeOut(200, function () {
            $(this).attr('src', path).fadeIn(200);
        });

        this.totalScore++;
        if (this.clickCounter == 0) {
            this.clickCounter++;
            this.firstImageId = event;
            this.firstImagePath = path;
        } else {
            if (this.firstImagePath == path) {
                setTimeout(() => {
                    [this.firstImageId, event].forEach(row => {
                        $('#id_' + row).find('img').fadeOut(200, function () {
                            $(this).attr('src', "images/blank.png").fadeIn(200);
                        });
                    })
                    this.firstImageId = null;
                    this.firstImagePath = null;
                    this.clickCounter = 0;
                    this.correctScore++;
                    if (this.correctScore == this.noOfCards / 2) {
                        $("#cards").hide();
                        $("#result").text("Hurry! You finished in " + this.totalScore + " moves");
                        this.saveHighestScore();
                    }
                }, 1000);
            } else {
                setTimeout(() => {
                    [this.firstImageId, event].forEach(row => {
                        $('#id_' + row).find('img').fadeOut(200, function () {
                            $(this).attr('src', "images/back.png").fadeIn(200);
                        });
                    })
                    this.firstImageId = null;
                    this.firstImagePath = null;
                    this.clickCounter = 0;
                }, 1000);
            }
        }
        $("#click_score").text(this.totalScore);
        $("#correct_Score").text(`${this.correctScore} / ${this.noOfCards / 2}`);
    }

    saveHighestScore() {
        // method to save highscore of player name with no of cards into localstorage
        const label = `name_${this.noOfCards}_${this.name}`;
        const value = localStorage.getItem(label);
        if (value && parseInt(value) < this.totalScore) {
            localStorage.setItem(label, this.totalScore);
        } else {
            localStorage.setItem(label, this.totalScore);
        }
    }

}
