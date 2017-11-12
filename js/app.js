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

  if ((currentTop == 0 && currentLeft == 0) || (currentTop == -10 && currentLeft == 0) || (currentTop == 0 && currentLeft == -10) || (currentTop == -10 && currentLeft == -10)) {
    cell = 1;
  } else if ((currentTop == 0 && currentLeft == 100) || (currentTop == -10 && currentLeft == 100)){
    cell = 2;
  } else if ((currentTop == 0 && currentLeft == 200) || (currentTop == -10 && currentLeft == 200)){
    cell = 3;
  } else if ((currentTop == 0 && currentLeft == 300) || (currentTop == -10 && currentLeft == 300)){
    cell = 4;
  } else if ((currentTop == 0 && currentLeft == 400) || (currentTop == -10 && currentLeft == 400) || (currentTop == 0 && currentLeft == -410) || (currentTop == -10 && currentLeft == 410)){
    cell = 5;
  } else if ((currentTop == 100 && currentLeft == 0) || (currentTop == 100 && currentLeft == -10)){
    cell = 6;
  } else if (currentTop == 100 && currentLeft == 100){
    cell = 7;
  } else if (currentTop == 100 && currentLeft == 200){
    cell = 8;
  } else if (currentTop == 100 && currentLeft == 300){
    cell = 9;
  } else if ((currentTop == 100 && currentLeft == 400) || (currentTop == 100 && currentLeft == 410)){
    cell = 10;
  } else if ((currentTop == 200 && currentLeft == 0) || (currentTop == 200 && currentLeft == -10)){
    cell = 11;
  } else if (currentTop == 200 && currentLeft == 100){
    cell = 12;
  } else if (currentTop == 200 && currentLeft == 200){
    cell = 13;
  } else if (currentTop == 200 && currentLeft == 300){
    cell = 14;
  } else if ((currentTop == 200 && currentLeft == 400) || (currentTop == 200 && currentLeft == 410)){
    cell = 15;
  } else if ((currentTop == 300 && currentLeft == 0) || (currentTop == 300 && currentLeft == -10)){
    cell = 16;
  } else if (currentTop == 300 && currentLeft == 100){
    cell = 17;
  } else if (currentTop == 300 && currentLeft == 200){
    cell = 18;
  } else if (currentTop == 300 && currentLeft == 300){
    cell = 19;
  } else if ((currentTop == 300 && currentLeft == 400) || (currentTop == 300 && currentLeft == 410)){
    cell = 20;
  } else if ((currentTop == 400 && currentLeft == 0) || (currentTop == 400 && currentLeft == -10) || (currentTop == 410 && currentLeft == 0) || (currentTop == 410 && currentLeft == -10)){
    cell = 21;
  } else if (currentTop == 400 && currentLeft == 100){
    cell = 22;
  } else if (currentTop == 400 && currentLeft == 200){
    cell = 23;
  } else if (currentTop == 400 && currentLeft == 300){
    cell = 24;
  } else if ((currentTop == 400 && currentLeft == 400)|| (currentTop == 400 && currentLeft == 410) || (currentTop == 410 && currentLeft == 400) || (currentTop == 410 && currentLeft == 410)){
    cell = 25;
  } else {
    console.log(currentTop);
    console.log(currentLeft);
  }
  return cell;
}



var hitCount = 1;



  function killEnemy(e) {
    if(e.keyCode == 75) {

      var heroPos = getCoordinates(hero);

        if(document.getElementById('enemy1')!=null) {
          var enemy1Pos = getCoordinates(enemy1);
          console.log(enemy1Pos);
        } if (heroPos == enemy1Pos) {
            console.log("hit");
            var enemyHit = document.getElementById("enemy1");
            enemyHit.parentNode.removeChild(enemyHit);
            hitFlash();
            scorePlus();
            hitCount = 2;
      } if(document.getElementById('enemy2')!=null) {
          var enemy2Pos = getCoordinates(enemy2);
        } if (heroPos == enemy2Pos) {
            console.log("hit");
            var enemyHit = document.getElementById("enemy2");
            enemyHit.parentNode.removeChild(enemyHit);
            hitFlash();
            scorePlus();
            hitCount = 2;
        }  if (document.getElementById('enemy3')!=null) {
            var enemy3Pos = getCoordinates(enemy3);
          } if (heroPos == enemy3Pos) {
              console.log("hit");
              var enemyHit = document.getElementById("enemy3");
              enemyHit.parentNode.removeChild(enemyHit);
              hitFlash();
              scorePlus();
              hitCount = 2;
          }  else {
        console.log("nothit");
      }
      }
    }

window.addEventListener('keydown', killEnemy);
window.addEventListener('keyup', flashOff);


//*******screen flash******//

function hitFlash() {
 document.getElementById('hero').id = 'heroattack';

}
 function flashOff(e) {
 if(e.keyCode == 75 && hitCount ==2){
 document.getElementById('heroattack').id = 'hero';
} hitCount = 1;
}


//***SPawn**//

//**************Create Enemy******//

function randomTile(min, max) {
    randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return 100 * Math.ceil(randomNum / 100);
}



function spawnOne() {
  section = document.createElement("img");
  section.setAttribute("src", "images/avatars/enemy.png");
  section.setAttribute("id", "enemy1");
  document.getElementById("container").appendChild(section);
  section.style.position = 'absolute';
  section.style.left = ((randomTile(-100,400)-8) + "px"); // units ('px')  are unnecessary for 0 but added for clarification
  section.style.top = ((randomTile(-100,400)-8) + "px");
}

function spawnTwo() {
  section = document.createElement("img");
  section.setAttribute("src", "images/avatars/enemy.png");
  section.setAttribute("id", "enemy2");
  document.getElementById("container").appendChild(section);
  section.style.position = 'absolute';
  section.style.left = ((randomTile(-100,400)-8) + "px"); // units ('px')  are unnecessary for 0 but added for clarification
  section.style.top = ((randomTile(-100,400)-8) + "px");
}

function spawnThree() {
  section = document.createElement("img");
  section.setAttribute("src", "images/avatars/enemy.png");
  section.setAttribute("id", "enemy3");
  document.getElementById("container").appendChild(section);
  section.style.position = 'absolute';
  section.style.left = ((randomTile(-100,400)-8) + "px"); // units ('px')  are unnecessary for 0 but added for clarification
  section.style.top = ((randomTile(-100,400)-8) + "px");
}

function deSpawnOne() {
  var enemyDeSpawn = document.getElementById("enemy1");
  enemy1.parentNode.removeChild(enemyDeSpawn);
}

function deSpawnTwo() {
  var enemyDeSpawn = document.getElementById("enemy2");
  enemy2.parentNode.removeChild(enemyDeSpawn);
}

function deSpawnThree() {
  var enemyDeSpawn = document.getElementById("enemy3");
  enemy3.parentNode.removeChild(enemyDeSpawn);
}

var enemyStart = 1

function createEnemy() {
    if(document.getElementById('enemy1')==null) {
    setTimeout(spawnOne, 0)
  } if(document.getElementById('enemy2')==null) {
    setTimeout(spawnTwo, 400)
  } if(document.getElementById('enemy3')==null) {
    setTimeout(spawnThree, 800)
  } else if(document.getElementById('enemy1')!=null) {
    setTimeout(deSpawnOne, 0)
  } else if(document.getElementById('enemy2')!=null) {
    setTimeout(deSpawnTwo, 400)
  } else if(document.getElementById('enemy1')!=null) {
    setTimeout(deSpawnThree, 800)
  }
}

var count=1;

function startSpawn() {
    createEnemy();
    display();
    startTimer = setInterval(function() {
      createEnemy();
      count++;
      console.log(count);
     if(count == 44) {
       clearInterval(startTimer);
       gameOver();
       console.log("game over");
     }
   } ,1300);
  }


function firstSpawn(e) {
  if (e.keyCode == 32) {
    startSpawn();
  }
}






window.addEventListener('keydown', firstSpawn);


//******score********//


var score = 0;
var scoreBoard = document.getElementById('score');

function scorePlus() {
  score ++;
  scoreBoard.innerHTML = score;
}

//*********timer*******//

var milisec=0
var seconds=60



function display(){
    if (milisec<=0){
        milisec=9
        seconds-=1
    }
    if (seconds<=-1){
        milisec=0
        seconds+=1
    }
    else
        milisec-=1
        document.getElementById("timer").innerHTML=seconds+"."+milisec
        setTimeout("display()",100)
}

//******Game Over*******//

function gameOver() {
  var gameOver = document.createElement("div");
  gameOver.setAttribute("id", "gameover");
  gameOver.innerHTML = '<p>Game Over</p><p>Score: ' + score + '</p><p>Press Shift to play again</p>';
  document.getElementById("main").appendChild(gameOver);
}

//*******Restart Game**********//


function resetGame(e) {
  if(e.keyCode == 16) {
    console.log("shift");
    var reset = document.getElementById("gameover");
    gameover.parentNode.removeChild(reset);
    count = 1;
    score = 0;
    seconds = 60;
    milisec=0;
    document.getElementById("score").innerHTML='0';
    document.getElementById("timer").innerHTML='60';
    startSpawn();
  }
}

document.getElementById("timer").innerHTML='60';



window.addEventListener('keydown', resetGame);
