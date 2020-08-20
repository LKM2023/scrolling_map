const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const backpack = document.getElementById("backpack");

var w = canvas.width;
var h = canvas.height;
var rows = map.length;
var columns = map[0].length;
var size = 16;
var scaled_size = 64;
var edge_size = 1;

var player = new Player(0, 0);
var viewpoint = new Viewpoint(2, 2, 6, 6);

var current_clue = 0;

function loop() {
    requestAnimationFrame(loop);
    ctx.imageSmoothingEnabled = false;

    // Check if moving off the screen to the right
    if (player.x / scaled_size >= viewpoint.width - edge_size && viewpoint.start_col + viewpoint.width < columns) {
	viewpoint.start_col += 1;
	player.x -= scaled_size;
    }

    // Check if moving off the screen to the left
    if (player.x / scaled_size < edge_size && viewpoint.start_col > 0) {
	player.x += scaled_size;
	viewpoint.start_col -= 1;
    }

    // Check if moving off the screen to the bottom
    if (player.y / scaled_size >= viewpoint.height - edge_size && viewpoint.start_row + viewpoint.height < rows) {
	player.y -= scaled_size;
	viewpoint.start_row += 1;
    }

    // Check if moving off the screen to the top
    if (player.y / scaled_size < edge_size && viewpoint.start_row > 0) {
	player.y += scaled_size;
	viewpoint.start_row -= 1;
    }

    // Make sure the player doesn't move off the scree
    if (player.x <= 0) player.x = 0;
    if (player.x >= scaled_size * (viewpoint.width - 1)) player.x = scaled_size * viewpoint.width - scaled_size;
    if (player.y <= 0) player.y = 0;
    if (player.y >=  scaled_size * (viewpoint.height - 1)) player.y = scaled_size * viewpoint.height - scaled_size;

    // Draw the map
    for (var row = 0; row < viewpoint.width; row++) {
	for (var col = 0; col < viewpoint.height; col++) {
	    var index = map[viewpoint.start_row + row][viewpoint.start_col + col];
	    var tile_x = col * scaled_size;
	    var tile_y = row * scaled_size;
	    ctx.drawImage(tile_sheet, index * size, 0, size, size, tile_x, tile_y, scaled_size, scaled_size);
	}
    }

    // Draw the player
    ctx.drawImage(tile_sheet, 64, 0, size, size, player.x, player.y, scaled_size, scaled_size);

    // Draw the clue
    if (current_clue < clues.length - 1) {

	for (var i = 0; i < clues[current_clue].text.length; i++) {

	}

    }
}

// Configure the tile sheet
var tile_sheet = new Image();
tile_sheet.addEventListener("load", e => {
	loop();
    });
tile_sheet.src = "tile_sheet.png";

// Adjust the position of the player as keys are pressed
window.addEventListener("keydown", e => {
	e.preventDefault();

	if (e.which == 39) {
	    player.x += scaled_size;
	} else if (e.which == 37) {
	    player.x -= scaled_size; // Left arrow key pressed
	}

	if (e.which == 38) {
	    player.y -= scaled_size; // Up arrow pressed
	} else if (e.which == 40) {
	    player.y += scaled_size; // Down arrow pressed
	}
    });