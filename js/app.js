//******************************************************//
//***********************Utilities**********************//
//******************************************************//

//*************Random Number Generator*************//

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

//**************Dynamically create CSS classes*****//

function createClass(name, properties) {
    var style = document.createElement('style');
    style.type = 'text/css';
    document.getElementsByTagName('head')[0].appendChild(style);
    if (!(style.sheet || {}).insertRule)
        (style.styleSheet || style.sheet).addRule(name, properties);
    else
        style.sheet.insertRule(name + "{" + properties + "}", 0);
}

//**********Throttle Intervals********//

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

//**********Random Array********//

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

//******************************************************//
//*************On Load & Event Listeners*****************//
//******************************************************//

window.onload = function() {
    createTileClasses();
    drawMap();
    startChar();
}


window.addEventListener('keydown', resetGame);
window.addEventListener('keydown', throttle(moveCharNew, 100));
window.addEventListener('keydown', throttle(killEnemy,100));
window.addEventListener('keyup', throttle(flashOff,100));
window.addEventListener('keydown', firstSpawn);

//******************************************************//
//********************Config****************************//
//******************************************************//

var tilesetTotal = 3; //**Total number of tilesets in tiles folder
var tilesTotal = 2; //**Total number of tiles per tileset
var tilesetNumber = randomNumber(1, tilesetTotal); //**Choose random tileset
var row = 7 //**Number of rows
var column = 5 //**Number of columns
var generatedArray = createRandomArray(row, column) //**Randomized array based on rows/columns

var score = 0; //**Scoreboard starting value
var scoreBoard = document.getElementById('score'); //**Grab scoreboard


var hitCount = 1; //**Base value for attack animation DO NOT CHANGE



//******************************************************//
//***************Build Randomly Generated Map***********//
//******************************************************//


//*************Assign Each Tile Unique Class************//

function createTileClasses() {
    for (i = 1; i <= tilesTotal; i++) {
        var divClass = (".tile" + i);
        var newProperty = ("background-image: url(\"images/tiles/" + tilesetNumber + "/tile" + i + ".png\");")
        createClass(divClass, newProperty);

    }
}


//****************Draw Map***********//

function drawMap() {
    var container = document.getElementById("container");
    for (var i = 0; i < generatedArray.length; i++) {
        for (var j = 0; j < generatedArray[i].length; j++) {
            if (parseInt(generatedArray[i][j]) == 1) {
                container.innerHTML += '<div class="tile tile1"></div>';

            } else if (parseInt(generatedArray[i][j]) == 2) {
                container.innerHTML += '<div class="tile tile2"></div>';

            }
        }
    }
}


//******************************************************//
//***************Move Character************************//
//******************************************************//

//Key Codes
//W 87
//A 65
//S 83
//D 68
//R 82
//Shift 32



//***********Start Character in Cell 1************//

function startChar() {
    document.getElementById("hero").className = "start";
}

//************Hero Arrow Movements*********//

var container = document.getElementById("container");

var containerTop = getOffsetTop(container) -250;
var containerLeft = getOffsetLeft(container) -350;

function moveCharNew(e) {
    //****D/RIGHT**//
    if (e.keyCode == 68) {
        timer = setInterval(function() {
            hero.style.left = (heroLeft += 10) + "px";
            if (heroLeft == containerLeft + 100 || heroLeft == containerLeft + 200 || heroLeft ==  containerLeft + 300 || heroLeft == containerLeft + 400 || heroLeft == containerLeft + 500 || heroLeft == containerLeft + 600) {
                clearInterval(timer);
            } else if (heroLeft == containerLeft + 610) {
                heroLeft -= 10;
                clearInterval(timer);
            }
        }, 16);

        //****A/Left**//
    }
    if (e.keyCode == 65) {
        timer = setInterval(function() {
            hero.style.left = (heroLeft -= 10) + "px";
            if (heroLeft == containerLeft + 0 || heroLeft == containerLeft + 100 || heroLeft == containerLeft + 200 || heroLeft == containerLeft + 300 || heroLeft == containerLeft + 400 || heroLeft == containerLeft + 500) {
                clearInterval(timer);
            } else if (heroLeft == containerLeft -10) {
                heroLeft += 10;
                clearInterval(timer);
            }
        }, 16);

        //****W/UP**//
    }
    if (e.keyCode == 87) {
        timer = setInterval(function() {
            hero.style.top = (heroTop -= 10) + "px";
            if (heroTop == containerTop + 0 || heroTop == containerTop + 100 || heroTop == containerTop + 200 || heroTop == containerTop + 300) {
                clearInterval(timer);
            } else if (heroTop == containerTop - 10) {
                heroTop += 10;
                clearInterval(timer);

            }
        }, 16);

        //****S/DOWN**//
    }
    if (e.keyCode == 83) {
        timer = setInterval(function() {
            hero.style.top = (heroTop += 10) + "px";
            if (heroTop == containerTop + 100 || heroTop == containerTop + 200 || heroTop == containerTop + 300 || heroTop == containerTop + 400) {
                clearInterval(timer);
            } else if (heroTop == containerTop + 410) {
                heroTop -= 10;
                clearInterval(timer);
            }
        }, 16);

    }
}


//******************************************************//
//***************Move Character*************************//
//******************************************************//

//**********Get Top/Left Values*************//

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


//**********Find Cell Based on Top/Left Values*************//





function Cell(top, left, id) {
  this.cellTop = containerTop + top;
  this.cellLeft = containerLeft + left;
  this.cellId = id;
}

var cellArray = [];
/* row one */
cellArray[0] = new Cell(0, 0, 1);
cellArray[1] = new Cell(0, 100, 2);
cellArray[2] = new Cell(0, 200, 3);
cellArray[3] = new Cell(0, 300, 4);
cellArray[4] = new Cell(0, 400, 5);
cellArray[5] = new Cell(0, 600, 6);
cellArray[6] = new Cell(0, 700, 7);
/* row two */
cellArray[7] = new Cell(100, 0, 8);
cellArray[8] = new Cell(100, 100, 9);
cellArray[9] = new Cell(100, 200, 10);
cellArray[10] = new Cell(100, 300, 11);
cellArray[11] = new Cell(100, 400, 12);
cellArray[12] = new Cell(100, 600, 13);
cellArray[13] = new Cell(100, 700, 14);
/* row three */
cellArray[14] = new Cell(200, 0, 15);
cellArray[15] = new Cell(200, 100, 16);
cellArray[16] = new Cell(200, 200, 17);
cellArray[17] = new Cell(200, 300, 18);
cellArray[18] = new Cell(200, 400, 19);
cellArray[19] = new Cell(200, 600, 20);
cellArray[20] = new Cell(200, 700, 21);
/* row four */
cellArray[21] = new Cell(300, 0, 22);
cellArray[22] = new Cell(300, 100, 23);
cellArray[23] = new Cell(300, 200, 24);
cellArray[24] = new Cell(300, 300, 25);
cellArray[25] = new Cell(300, 400, 26);
cellArray[26] = new Cell(300, 600, 27);
cellArray[27] = new Cell(300, 700, 28);
/* row five */
cellArray[28] = new Cell(400, 0, 29);
cellArray[29] = new Cell(400, 100, 30);
cellArray[30] = new Cell(400, 200, 31);
cellArray[31] = new Cell(400, 300, 32);
cellArray[32] = new Cell(400, 400, 33);
cellArray[33] = new Cell(400, 600, 34);
cellArray[34] = new Cell(400, 700, 35);

var hero = document.getElementById("hero");

var maxCells = row * column;

function getCoordinates(elem) {

  var cell;
  var currentTop = getOffsetTop(elem);
  var currentLeft = getOffsetLeft(elem);
  var cellTop;
  var cellLeft;

  for(i = 0; i < maxCells; i++) {
    cellTop = cellArray[i].cellTop;
    cellLeft = cellArray[i].cellLeft;
    cellBottom = cellTop + 100;
    cellRight = cellLeft + 100;

    if(currentTop >= cellTop && currentTop < cellBottom && currentLeft >= cellLeft && currentLeft < cellRight) {
      cell = cellArray[i].cellId;
      console.log(cell);
    }

    }
  }


//******************************************************//
//********************Attack Enemy**********************//
//******************************************************//

//*******************Kill Enemy********************//

var heroLeft = containerLeft; //**Hero starting location
var heroTop = containerTop;//**Hero starting location

function killEnemy(e) {
    if (e.keyCode == 75) {

        var heroPos = getCoordinates(hero);

        if (document.getElementById('enemy1') != null) {
            var enemy1Pos = getCoordinates(enemy1);
            console.log(enemy1Pos);
        }
        if (heroPos == enemy1Pos) {
            console.log("hit");
            var enemyHit = document.getElementById("enemy1");
            enemyHit.parentNode.removeChild(enemyHit);
            hitFlash();
            scorePlus();
            hitCount = 2;
        }
        if (document.getElementById('enemy2') != null) {
            var enemy2Pos = getCoordinates(enemy2);
        }
        if (heroPos == enemy2Pos) {
            console.log("hit");
            var enemyHit = document.getElementById("enemy2");
            enemyHit.parentNode.removeChild(enemyHit);
            hitFlash();
            scorePlus();
            hitCount = 2;
        }
        if (document.getElementById('enemy3') != null) {
            var enemy3Pos = getCoordinates(enemy3);
        }
        if (heroPos == enemy3Pos) {
            console.log("hit");
            var enemyHit = document.getElementById("enemy3");
            enemyHit.parentNode.removeChild(enemyHit);
            hitFlash();
            scorePlus();
            hitCount = 2;
        } else {
            console.log("nothit");
        }
    }
}


//********************Attack Animation**********************//

function hitFlash() {
    document.getElementById('hero').id = 'heroattack';

}

function flashOff(e) {
    if (e.keyCode == 75 && hitCount == 2) {
        document.getElementById('heroattack').id = 'hero';
    }
    hitCount = 1;
}


//******************************************************//
//********************Spawn Enemies**********************//
//******************************************************//

//*********Randomize Spawn Tile*****************//

function randomTile(min, max) {
    randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return 100 * Math.ceil(randomNum / 100);
}

//*********Spawn Enemies With Unique IDs*****************//

function spawnOne() {
    section = document.createElement("div");
    section.setAttribute("id", "enemy1");
    document.getElementById("container").appendChild(section);
    section.style.position = 'absolute';
    section.style.left = (300) + "px";
    section.style.top = (200) + "px";
}

function spawnTwo() {
    section = document.createElement("div");
    section.setAttribute("id", "enemy2");
    document.getElementById("container").appendChild(section);
    section.style.position = 'absolute';
    section.style.left = (400) + "px";
    section.style.top = (400) + "px";
}

function spawnThree() {
    section = document.createElement("div");
    section.setAttribute("id", "enemy3");
    document.getElementById("container").appendChild(section);
    section.style.position = 'absolute';
    section.style.left = (500) + "px";
    section.style.top = (300) + "px";
}

//*********DeSpawn Enemies Based on IDs*****************//

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

//*********Spawn and DeSpawn Timer***************//

function createEnemy() {
    if (document.getElementById('enemy1') == null) {
        setTimeout(spawnOne, 0)
    }
    if (document.getElementById('enemy2') == null) {
        setTimeout(spawnTwo, 500)
    }
    if (document.getElementById('enemy3') == null) {
        setTimeout(spawnThree, 1000)
    } else if (document.getElementById('enemy1') != null) {
        setTimeout(deSpawnOne, 0)
    } else if (document.getElementById('enemy2') != null) {
        setTimeout(deSpawnTwo, 500)
    } else if (document.getElementById('enemy1') != null) {
        setTimeout(deSpawnThree, 1000)
    }
}

//*********Begin Spawn Action****************//



function startSpawn() {
  count = 0;
    createEnemy();
    startTimer = setInterval(function() {
        createEnemy();
        count++;
        console.log(count);
        if (count == 47) {
            clearInterval(startTimer);
            gameOver();
            console.log("game over");
        }
    }, 1300);
}



//*********Fist Spawn on Shift Keydown*************//


function firstSpawn(e) {
    if (e.keyCode == 32) {
        startSpawn();
        countdown(1);
    }
}



//******************************************************//
//***************************UI*************************//
//******************************************************//

//*********Scoreboard*******//

function scorePlus() {
    score++;
    scoreBoard.innerHTML = score;
}

//*********Timer*******//


var timeoutHandle;

function countdown(minutes) {
    var seconds = 60;
    var mins = minutes
    function tick() {
        var counter = document.getElementById("timer2");
        var current_minutes = mins-1
        seconds--;
        counter.innerHTML =
        current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        if( seconds > 0 ) {
            timeoutHandle=setTimeout(tick, 1000);
        } else {

            if(mins > 1){
               setTimeout(function () { countdown(mins - 1); }, 1000);

            }
        }
    }
    tick();
}


//******************************************************//
//***************Game States*************************//
//******************************************************//

//******Game Over*******//

function gameOver() {
    var gameOver = document.createElement("div");
    gameOver.setAttribute("id", "gameover");
    gameOver.innerHTML = '<p>Game Over</p><p>Score: ' + score + '</p><p>Press "R" to retry!</p>';
    document.getElementById("main").appendChild(gameOver);
}

//*******Restart Game**********//


function resetGame(e) {
    if (e.keyCode == 82) {
        score = 0;
        console.log("RESTART");
        var reset = document.getElementById("gameover");
        gameover.parentNode.removeChild(reset);
        document.getElementById("score").innerHTML = '0';
        startSpawn();
        countdown(1);
    }
}
