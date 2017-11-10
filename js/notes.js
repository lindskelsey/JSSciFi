window.onload = function() {
    drawMap();
}


function drawMap() {
  var container = document.getElementById("container");
  for (var i = 0; i < generatedArray.length; i++) {
    for (var j = 0; j < generatedArray[i].length; j++) {
      if (parseInt(generatedArray[i][j]) == 1) {
        container.innerHTML += '<div class="tile1"></div>';
        console.log("tile1");
      } else if (parseInt(generatedArray[i][j]) == 2) {
        container.innerHTML += '<div class="tile2"></div>';
        console.log("tile2");
      }
    }
  }
}



function createRandomArray(width, height) {
    var result = [];
    var tilesetNumber = randomNumber(1, tilesetTotal);
    for (var i = 0; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            result[i][j] = '/images/tiles/' + tilesetNumber + '/tile' + randomNumber(1, tilesTotal) + '.png';
        }
    }
    return result;
}

function drawMap() {
    var container = document.getElementById("container");
    for (var i = 0; i < generatedArray.length; i++) {
          var divClass = "tile" + [i];
          var divComplete = "'<div class=\"" + divClass + "\"></div>'";
        for (var j = 0; j < generatedArray[i].length; j++) {
                var selectedTile = (generatedArray[i][j]);
                var newProperty = "background-image: url(\".." + selectedTile +"\");"
                createClass(divClass, newProperty);
                container.innerHTML += '<div class= tile"'+ [i] +'" ></div>'
                console.log(newProperty);
                console.log(divComplete);
        }
    }
}
