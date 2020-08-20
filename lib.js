class Player {
    constructor (x, y) {
	this.x = x;
	this.y = y;
    }
}

class Viewpoint {
    constructor (start_row, start_col, width, height) {
	this.start_row = start_row;
	this.start_col = start_col;
	this.width = width;
	this.height = height;
    }
}

class Clue {
    constructor (text, row, col, index) {
	this.text = text;
	this.row = row;
	this.col = col;
	this.index = index;
    }
}