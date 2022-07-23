"use strict";

$(document).ready(() => {
    $("#player_name3").text(sessionStorage.getItem("player_name"));
    $("#num_cards").text(sessionStorage.getItem("num_cards"));

    $("#save_settings").click(() => {
        const player_name = $("#player_name").val();
        let isValid = true;
        if (player_name === "") {
            isValid = false;
            $("#player_name").next().text("Please enter a valid player name.");
        }

        if (num_cards === "") {
            isValid = false;
            $("#num_cards").next().text("Please enter a valid player name.");
        }
        console.log("dddasd",player_name)

        if (isValid) {
            console.log(player_name)
            sessionStorage.setItem("player_name", player_name);
            sessionStorage.setItem("num_cards", num_cards);
            window.location.reload();
        }
        $("#player_name").focus();
    });
    $("#player_name").focus();
}); 

const imageArray = [
    "images/card_1.png",
    "images/card_2.png",
    "images/card_3.png",
    "images/card_4.png",
    "images/card_5.png",
    "images/card_6.png",
    "images/card_7.png",
    "images/card_8.png",
    "images/card_9.png",
    "images/card_10.png",
    "images/card_11.png",
    "images/card_12.png",
    "images/card_13.png",
    "images/card_14.png",
    "images/card_15.png",
    "images/card_16.png",
    "images/card_17.png",
    "images/card_18.png",
    "images/card_19.png",
    "images/card_20.png",
    "images/card_21.png",
    "images/card_22.png",
    "images/card_23.png",
    "images/card_24.png",
];
const imageOrder = [];
const imagesLength = 48;
$(document).ready(() => {

    while (imageOrder.length < imagesLength) {
        const val = Math.floor(Math.random() * imagesLength) + 1;
        if (imageOrder.indexOf(val) === -1) {
            imageOrder.push(val);
        }
    }
    console.log(imageOrder);
    let htmlString = "";
    let rowString = "<div class='row'>";
    for (let x = 0; x < imageOrder.length; x++) {   
        const val = imageOrder[x] - 1;
        let path = "";
        if(val > 23){
            path = imageArray[val - 24];
        }else{
            path = imageArray[val]
        }         
        const element = `<a id="id_${imageOrder[x]} href="#"> 
            <img src="${path}" class="card-img" />
            </a>`;
            rowString +=element;
            if((x >0 &&(x+1) % 8 == 0) || x == imageOrder.length -1){
                rowString += "</div>"
                htmlString += String(rowString).substring(0);
                rowString = "<div class='row'>";
            }
    }
    document.querySelector('#cards').innerHTML = htmlString;
});