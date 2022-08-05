"use strict";

$(document).ready(() => {

    //set name and no of cards if exists in sessionStorage and 
    // create a new player object and call new game method to start the game
    const name = sessionStorage.getItem("player_name");
    const num_cards = sessionStorage.getItem("num_cards");
    if (name && num_cards) {
        $("#player_name3").text(name);
        $("#player_name").val(name);
        $("#num_cards").val(num_cards);
        const player = new Player(name,num_cards);
        player.newGame();
    }

    // handle save_settings click method and reload the page
    $("#save_settings").click(() => {
        const player_name = $("#player_name").val();
        const cards = $("#num_cards").val();
        let isValid = true;
        if (player_name === "") {
            isValid = false;
            $("#player_name").next().text("Please enter a valid player name.");
        }

        if (cards === "") {
            isValid = false;
            $("#num_cards").next().text("Please select a cards.");
        }

        if (isValid) {
            sessionStorage.setItem("player_name", player_name);
            sessionStorage.setItem("num_cards", cards);
            window.location.reload();
        }
        $("#player_name").focus();
    });

    $("#player_name").focus();
}); 