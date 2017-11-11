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

//***********START CHAR AT TOP=0 LEFT=0************//

function startChar() {
  document.getElementById("hero").className = "start";
}


window.addEventListener('keydown', throttle(moveCharNew,200));



/////*******More Animations***********///

var heroLeft = 0;
var heroTop = 0;

function moveCharNew(e) {
  //****D/RIGHT**//
  if(e.keyCode==68) {
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
} if(e.keyCode==65) {
  timer = setInterval(function() {
      hero.style.left = (heroLeft -= 10) + "px";
      if (heroLeft== 0 || heroLeft == 100 || heroLeft == 200 || heroLeft == 300) {
          clearInterval(timer);
    } else if (heroLeft == -10) {
      heroLeft += 10;
      clearInterval(timer);
    }
}, 16);
//****W/UP**//
} if(e.keyCode==87) {
  timer = setInterval(function() {
      hero.style.top = (heroTop -= 10) + "px";
      if (heroTop== 0 || heroTop == 100 || heroTop == 200 || heroTop == 300) {
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

//************Get Coordinates********//

function getOffsetLeft( elem )
{
    var offsetLeft = 0;
    do {
      if ( !isNaN( elem.offsetLeft ) )
      {
          offsetLeft += elem.offsetLeft;
      }
    } while( elem = elem.offsetParent );
    return offsetLeft;
}

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}


//**********Throttle Function********//

function throttle (func, limit) {
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

function createEnemy(e) {
  if (e.keyCode == 32) {
  var container = document.getElementById("container");
  container.innerHTML += '<img src="images/avatars/enemy.png" class="enemy"></div>';
}
}



window.addEventListener('keydown', createEnemy);
