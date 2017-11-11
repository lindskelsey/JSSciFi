//******************************************************//
//***************Build Randomly Generated Map***********//
//******************************************************//
var tilesetTotal = 3;
var tilesTotal = 2;
var tilesetNumber = randomNumber(1, tilesetTotal);

//*************Random Number Generator*************//

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//***********Function to Randomize Array*******//

function createRandomArray(width, height) {
    var result = [];
    for (var i = 0; i < width; i++) {
        result[i] = [];
        for (var j = 0; j < height; j++) {
            result[i][j] = Math.floor(Math.random() * 2) + 1;
        }
    }
    return result;
}

//*********Variable for map size*******//

var generatedArray = createRandomArray(5, 5)

//**************Function to dynamically create CSS classes*****//

function createClass(name, properties) {
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule)
        (style.styleSheet || style.sheet).addRule(name, properties);
    else
        style.sheet.insertRule(name + "{" + properties + "}", 0);
}


//****************Function************//

function createTileClasses() {
    for (i = 1; i <= tilesTotal; i++) {
        var divClass = (".tile" + i);
        var newProperty = ("background-image: url(\"images/tiles/" + tilesetNumber + "/tile" + i + ".png\");")
        createClass(divClass, newProperty);
        console.log(i);
        console.log(divClass);
        console.log(newProperty);
    }
}


//******************Draw Map & Char Start Point************//

function drawMap() {



    var container = document.getElementById("container");
    for (var i = 0; i < generatedArray.length; i++) {
        for (var j = 0; j < generatedArray[i].length; j++) {
            if (parseInt(generatedArray[i][j]) == 1) {
                container.innerHTML += '<div class="tile tile1"></div>';
                console.log("tile1");
            } else if (parseInt(generatedArray[i][j]) == 2) {
                container.innerHTML += '<div class="tile tile2"></div>';
                console.log("tile2");
            }
        }
    }
}


//**********create map on load*********//


window.onload = function() {
    createTileClasses();
    drawMap();
    startChar();
}


//******************************************************//
//***************Move Character************************//
//******************************************************//

//**Key Codes W 87 A 65 S 83 D 68******//

var hero = document.getElementById('hero');
var heroLeft = 0;
var heroTop = 0;


function moveChar(e) {

//*********NEW MOVEMENT- trying to use smooth animation******//

  if(e.keyCode==68) {
    document.getElementById("hero").className = "box-mover";
    console.log("keystroked");

}

//******OLD MOVEMENT- this moves 5px at a time**//

  if(e.keyCode==65) {
    heroLeft -=5;
    hero.style.left = heroLeft + 'px';
    console.log("keystrokea");
 }
 if(e.keyCode==83) {
   heroTop +=5;
   hero.style.top = heroTop + 'px';
   console.log("keystrokes");
 }
 if(e.keyCode==87) {
   heroTop -=5;
   hero.style.top = heroTop + 'px';
   console.log("keystrokew");
 }
}

//***********REMOVE CLASS NAME ON KEYUP**********//

function keyUp(e) {
  if(e.keyCode==68) {
    document.getElementById("hero").className =
    document.getElementById("hero").className
    .replace(new RegExp('(?:^|\\s)'+ 'box-mover' + '(?:\\s|$)'), ' ');
    console.log("keystroked");
  }
}

//***********START CHAR AT TOP=0 LEFT=0************//

function startChar() {
  document.getElementById("hero").className = "start";
}

document.onkeydown = moveCharNew;


/////*******More Animations***********///

left=0;
top=0;

function moveCharNew(e) {
  //****D/RIGHT**//
  if(e.keyCode==68) {
    timer = setInterval(function() {
        hero.style.left = (left += 10) + "px";
        if (left == 100 || left == 200 || left == 300 || left == 400) {
            clearInterval(timer);
    }
  }, 16);
  //****A/Left**//
} if(e.keyCode==65) {
  timer = setInterval(function() {
      hero.style.left = (left -= 10) + "px";
      if (left== 0 || left == 100 || left == 200 || left == 300) {
          clearInterval(timer);
  }
}, 16);
//****W/UP**//
} if(e.keyCode==87) {
  timer = setInterval(function() {
      hero.style.top = (top -= 10) + "px";
      if (top== 0 || top == 100 || top == 200 || top == 300) {
          clearInterval(timer);
  }
}, 16);
//****S/DOWN**//
} if(e.keyCode==83) {
  timer = setInterval(function() {
      hero.style.top = (top += 10) + "px";
      if (top == 100 || top == 200 || top == 300 || top == 400) {
          clearInterval(timer);
  }
}, 16);

}
}
