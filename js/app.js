//******************************************************//
//***************Build Randomly Generated Map***********//
//******************************************************//


//*********Function to Randomize Array with numbers 1-2*******//

function createRandomArray(width, height) {
    var result = [];
    for (var i = 0; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            result[i][j] = (Math.floor(Math.random() * 2) + 1);
        }
    }
    return result;
}

var generatedArray = createRandomArray(5, 5)

//******************Draw Map from Random Array************//


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

//**********create map on load*********//

window.onload = function() {
    drawMap();
}


//*****//
