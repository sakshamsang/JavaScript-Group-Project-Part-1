"use strict";

$(document).ready(() => {
  
    //set name and no of cards if exists in sessionStorage and 
    // create a new player object and call new game method to start the game
    $("#player_name3").text(sessionStorage.getItem("player_name"));
    $("#num_cards").text(sessionStorage.getItem("num_cards"));


    // handle save_settings click method and reload the page
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

        if (isValid) {
            sessionStorage.setItem("player_name", player_name);
            sessionStorage.setItem("num_cards", num_cards);
            window.location.reload();
        }
        $("#player_name").focus();
    });
    $("#player_name").focus();
}); 