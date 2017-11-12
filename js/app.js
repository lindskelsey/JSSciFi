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



//***********START CHAR AT TOP=0 LEFT=0************//

function startChar() {
    document.getElementById("hero").className = "start";
}


window.addEventListener('keydown', throttle(moveCharNew, 200));



/////*******More Animations***********///

var heroLeft = 0;
var heroTop = 0;

function moveCharNew(e) {
    //****D/RIGHT**//
    if (e.keyCode == 68) {
        timer = setInterval(function() {
            hero.style.left = (heroLeft += 10) + "px";
            if (heroLeft == 100 || heroLeft == 200 || heroLeft == 300 || heroLeft == 400) {
                clearInterval(timer);
            } else if (heroLeft == 410) {
                heroLeft -= 10;
                clearInterval(timer);
            }
        }, 16);

        //****A/Left**//
    }
    if (e.keyCode == 65) {
        timer = setInterval(function() {
            hero.style.left = (heroLeft -= 10) + "px";
            if (heroLeft == 0 || heroLeft == 100 || heroLeft == 200 || heroLeft == 300) {
                clearInterval(timer);
            } else if (heroLeft == -10) {
                heroLeft += 10;
                clearInterval(timer);
            }
        }, 16);

        //****W/UP**//
    }
    if (e.keyCode == 87) {
        timer = setInterval(function() {
            hero.style.top = (heroTop -= 10) + "px";
            if (heroTop == 0 || heroTop == 100 || heroTop == 200 || heroTop == 300) {
                clearInterval(timer);
            } else if (heroTop == -10) {
                heroTop += 10;
                clearInterval(timer);

            }
        }, 16);

        //****S/DOWN**//
    }
    if (e.keyCode == 83) {
        timer = setInterval(function() {
            hero.style.top = (heroTop += 10) + "px";
            if (heroTop == 100 || heroTop == 200 || heroTop == 300 || heroTop == 400) {
                clearInterval(timer);
            } else if (heroTop == 410) {
                heroTop -= 10;
                clearInterval(timer);
            }
        }, 16);

    }
}



//**********Throttle Function********//

function throttle(func, limit) {
    var inThrottle,
        lastFunc,
        lastRan;
    return function() {
        var context = this,
            args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            lastRan = Date.now()
            inThrottle = true;
        } else {
            clearTimeout(lastFunc)
            lastFunc = setTimeout(function() {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(context, args)
                    lastRan = Date.now()
                }
            }, limit - (Date.now() - lastRan))
        }
    };
}

//**************Create Enemy******//

function randomTile(min, max) {
    randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return 100 * Math.ceil(randomNum / 100);
}




function createEnemy(e) {
    if (e.keyCode == 32) {
      section = document.createElement("img");
      section.setAttribute("src", "images/avatars/enemy.png");
      section.setAttribute("id", "enemy");
      document.getElementById("container").appendChild(section);
      section.style.position = 'absolute';
      section.style.left = ((randomTile(-100,400)-8) + "px"); // units ('px')  are unnecessary for 0 but added for clarification
      section.style.top = ((randomTile(-100,400)-8) + "px");
  }
}







window.addEventListener('keydown', createEnemy);

//*************Collision Detection**********//

function getOffsetLeft(elem) {
    var offsetLeft = 0;
    do {
        if (!isNaN(elem.offsetLeft)) {
            offsetLeft += elem.offsetLeft;
        }
    } while (elem = elem.offsetParent);
    return offsetLeft;
}

function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while (elem = elem.offsetParent);
    return offsetTop;
}



//**********FIND CELL*************//

function getCoordinates(elem) {
  var cell;
  var currentTop = getOffsetTop(elem);
  var currentLeft = getOffsetLeft(elem);

  if (currentTop == 0 && currentLeft == 0) {
    cell = 1;
  } else if (currentTop == 0 && currentLeft == 100){
    cell = 2;
  } else if (currentTop == 0 && currentLeft == 200){
    cell = 3;
  } else if (currentTop == 0 && currentLeft == 300){
    cell = 4;
  } else if (currentTop == 0 && currentLeft == 400){
    cell = 5;
  } else if (currentTop == 100 && currentLeft == 0){
    cell = 6;
  } else if (currentTop == 100 && currentLeft == 100){
    cell = 7;
  } else if (currentTop == 100 && currentLeft == 200){
    cell = 8;
  } else if (currentTop == 100 && currentLeft == 300){
    cell = 9;
  } else if (currentTop == 100 && currentLeft == 400){
    cell = 10;
  } else if (currentTop == 200 && currentLeft == 0){
    cell = 11;
  } else if (currentTop == 200 && currentLeft == 100){
    cell = 12;
  } else if (currentTop == 200 && currentLeft == 200){
    cell = 13;
  } else if (currentTop == 200 && currentLeft == 300){
    cell = 14;
  } else if (currentTop == 200 && currentLeft == 400){
    cell = 15;
  } else if (currentTop == 300 && currentLeft == 0){
    cell = 16;
  } else if (currentTop == 300 && currentLeft == 100){
    cell = 17;
  } else if (currentTop == 300 && currentLeft == 200){
    cell = 18;
  } else if (currentTop == 300 && currentLeft == 300){
    cell = 19;
  } else if (currentTop == 300 && currentLeft == 400){
    cell = 20;
  } else if (currentTop == 400 && currentLeft == 0){
    cell = 21;
  } else if (currentTop == 400 && currentLeft == 100){
    cell = 22;
  } else if (currentTop == 400 && currentLeft == 200){
    cell = 23;
  } else if (currentTop == 400 && currentLeft == 300){
    cell = 24;
  } else if (currentTop == 400 && currentLeft == 400){
    cell = 25;
  } else {
    console.log(currentTop);
    console.log(currentLeft);
  }
  return cell;
}





function killEnemy(e) {
  if(e.keyCode == 75) {
  var heroPos = getCoordinates(hero);
  var enemyPos = getCoordinates(enemy);
  if (heroPos == enemyPos) {
      console.log("hit");
      var enemyHit = document.getElementById("enemy");
      enemyHit.parentNode.removeChild(enemyHit);
    } else {
      console.log("nothit");
    }
    }
  }

window.addEventListener('keydown', killEnemy);
