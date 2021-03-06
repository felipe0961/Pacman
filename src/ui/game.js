PACMAN.UI.Game = function(spec) {
	var that = {};
	spec = spec || {};


	var constructor = function(){
		spec.ctx = initialize_canvas();  // Initialize Canvas

		spec.map = PACMAN.UI.Map(spec.ctx, {});
		spec.game = PACMAN.Model.Game({});
		draw_pills();

		// Initialize Variables
		spec.blinky = PACMAN.UI.Blinky(spec.ctx, {});
  	spec.pinky = PACMAN.UI.Pinky(spec.ctx, {});
  	spec.cyde = PACMAN.UI.Clyde(spec.ctx, {});
  	spec.inky = PACMAN.UI.Inky(spec.ctx, {});
  	
  	// Set action listener to functions
  	startPacman();  
  	set_keyboard_controls();
  	
	};

	// Private function 
	var initialize_canvas = function() {
    var canvas = document.getElementById("canvas");
    blockSize = document.getElementById("pacman").offsetWidth / 19;

    canvas.setAttribute("width", (blockSize * 19) + "px");
    canvas.setAttribute("height", (blockSize * 22) + 30 + "px");
    return canvas.getContext('2d');
  };

  // Public function  
  var set_keyboard_controls = function() {
    document.body.onkeydown = function(event) {
      var x = (spec.pacman.get_x() / PACMAN.SIZE); // - (PACMAN.SIZE / 2);
      var y = (spec.pacman.get_y() / PACMAN.SIZE); // - (PACMAN.SIZE / 2);

      var newDirection = spec.game.existPath( event.keyCode, x, y);
      if ( newDirection ){ 
        spec.pacman.changeDirection(event.keyCode);
      }
    }
  };

  var draw_pills = function() {
    for (i = 0; i < spec.game.getRowsSize(); i += 1) {
      spec.ctx.beginPath();
      for (j = 0; j < spec.game.getColumnsSize(); j += 1) {
        value = spec.game.getValueAtPosition(i, j);
        spec.map.draw_pill(value, i, j);
        spec.map.draw_biscuit(value, i, j);
      }
      spec.ctx.closePath();
    }
  };

  var startPacman = function(){
  	spec.pacman = PACMAN.UI.Pacman(spec.ctx, {});
  	setInterval(function () { 
  		if ( spec.game.existPath(
  			spec.pacman.get_direction(),
  			spec.pacman.get_x() / PACMAN.SIZE ,
  			spec.pacman.get_y() / PACMAN.SIZE )){
  			
  			spec.pacman.animation();
  		}
  	}, 50);
  };
  
  constructor();
  return that;
  
}