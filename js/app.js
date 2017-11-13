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
window.addEventListener('keydown', throttle(moveCharNew, 200));
window.addEventListener('keydown', killEnemy);
window.addEventListener('keyup', flashOff);
window.addEventListener('keydown', firstSpawn);

//******************************************************//
//********************Config****************************//
//******************************************************//

var tilesetTotal = 3; //**Total number of tilesets in tiles folder
var tilesTotal = 2; //**Total number of tiles per tileset
var tilesetNumber = randomNumber(1, tilesetTotal); //**Choose random tileset
var row = 5 //**Number of rows
var column = 5 //**Number of columns
var generatedArray = createRandomArray(row, column) //**Randomized array based on rows/columns
var heroLeft = 0; //**Hero starting location
var heroTop = 0;//**Hero starting location
var score = 0; //**Scoreboard starting value
var scoreBoard = document.getElementById('score'); //**Grab scoreboard

var milisec = 0; //**Base value for timer DO NOT CHANGE
var seconds = 60; //**Base value for timer DO NOT CHANGE
var hitCount = 1; //**Base value for attack animation DO NOT CHANGE
var count = 1; //**Base value for spawn loop DO NOT CHANGE


//******************************************************//
//***************Build Randomly Generated Map***********//
//******************************************************//


//*************Assign Each Tile Unique Class************//

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


//****************Draw Map***********//

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

function getCoordinates(elem) {
    var cell;
    var currentTop = getOffsetTop(elem);
    var currentLeft = getOffsetLeft(elem);

    if ((currentTop == 25 && currentLeft == 25) || (currentTop == 15 && currentLeft == 25) || (currentTop == 25 && currentLeft == 15) || (currentTop == 15 && currentLeft == 15)) {
        cell = 1;
    } else if ((currentTop == 25 && currentLeft == 125) || (currentTop == 15 && currentLeft == 125)) {
        cell = 2;
    } else if ((currentTop == 25 && currentLeft == 225) || (currentTop == 15 && currentLeft == 225)) {
        cell = 3;
    } else if ((currentTop == 25 && currentLeft == 325) || (currentTop == 15 && currentLeft == 325)) {
        cell = 4;
    } else if ((currentTop == 25 && currentLeft == 425) || (currentTop == 15 && currentLeft == 425) || (currentTop == 5 && currentLeft == -415) || (currentTop == -15 && currentLeft == 415)) {
        cell = 5;
    } else if ((currentTop == 125 && currentLeft == 25) || (currentTop == 125 && currentLeft == 15)) {
        cell = 6;
    } else if (currentTop == 125 && currentLeft == 125) {
        cell = 7;
    } else if (currentTop == 125 && currentLeft == 225) {
        cell = 8;
    } else if (currentTop == 125 && currentLeft == 325) {
        cell = 9;
    } else if ((currentTop == 125 && currentLeft == 425) || (currentTop == 125 && currentLeft == 435)) {
        cell = 10;
    } else if ((currentTop == 225 && currentLeft == 25) || (currentTop == 225 && currentLeft == 15)) {
        cell = 11;
    } else if (currentTop == 225 && currentLeft == 125) {
        cell = 12;
    } else if (currentTop == 225 && currentLeft == 225) {
        cell = 13;
    } else if (currentTop == 225 && currentLeft == 325) {
        cell = 14;
    } else if ((currentTop == 225 && currentLeft == 425) || (currentTop == 225 && currentLeft == 435)) {
        cell = 15;
    } else if ((currentTop == 325 && currentLeft == 25) || (currentTop == 325 && currentLeft == 15)) {
        cell = 16;
    } else if (currentTop == 325 && currentLeft == 125) {
        cell = 17;
    } else if (currentTop == 325 && currentLeft == 225) {
        cell = 18;
    } else if (currentTop == 325 && currentLeft == 325) {
        cell = 19;
    } else if ((currentTop == 325 && currentLeft == 425) || (currentTop == 325 && currentLeft == 435)) {
        cell = 20;
    } else if ((currentTop == 425 && currentLeft == 25) || (currentTop == 425 && currentLeft == 15) || (currentTop == 435 && currentLeft == 25) || (currentTop == 435 && currentLeft == 15)) {
        cell = 21;
    } else if (currentTop == 425 && currentLeft == 125) {
        cell = 22;
    } else if (currentTop == 425 && currentLeft == 225) {
        cell = 23;
    } else if (currentTop == 425 && currentLeft == 325) {
        cell = 24;
    } else if ((currentTop == 425 && currentLeft == 425) || (currentTop == 425 && currentLeft == 435) || (currentTop == 435 && currentLeft == 425) || (currentTop == 435 && currentLeft == 435)) {
        cell = 25;
    } else {
        console.log(currentTop);
        console.log(currentLeft);
    }
    return cell;
}

//******************************************************//
//********************Attack Enemy**********************//
//******************************************************//

//*******************Kill Enemy********************//

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
    section.style.left = (((randomTile(-100, 400)) - 8) + "px");
    section.style.top = (((randomTile(-100, 400)) - 8) + "px");
}

function spawnTwo() {
    section = document.createElement("div");
    section.setAttribute("id", "enemy2");
    document.getElementById("container").appendChild(section);
    section.style.position = 'absolute';
    section.style.left = (((randomTile(-100, 400)) - 8) + "px");
    section.style.top = (((randomTile(-100, 400)) - 8) + "px");
}

function spawnThree() {
    section = document.createElement("div");
    section.setAttribute("id", "enemy3");
    document.getElementById("container").appendChild(section);
    section.style.position = 'absolute';
    section.style.left = (((randomTile(-100, 400)) - 8) + "px");
    section.style.top = (((randomTile(-100, 400)) - 8) + "px");
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
        setTimeout(spawnTwo, 400)
    }
    if (document.getElementById('enemy3') == null) {
        setTimeout(spawnThree, 800)
    } else if (document.getElementById('enemy1') != null) {
        setTimeout(deSpawnOne, 0)
    } else if (document.getElementById('enemy2') != null) {
        setTimeout(deSpawnTwo, 400)
    } else if (document.getElementById('enemy1') != null) {
        setTimeout(deSpawnThree, 800)
    }
}

//*********Begin Spawn Action****************//



function startSpawn() {
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


function display() {
    if (milisec <= 0) {
        milisec = 9
        seconds -= 1
    }
    if (seconds <= -1) {
        milisec = 0
        seconds += 1
    } else
        milisec -= 1
    document.getElementById("timer").innerHTML = seconds + "." + milisec
    setTimeout("display()", 100);
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
        console.log("RESTART");
        var reset = document.getElementById("gameover");
        gameover.parentNode.removeChild(reset);
        document.getElementById("score").innerHTML = '0';
        startSpawn();
        countdown(1);
    }
}

//***

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

               // countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
               setTimeout(function () { countdown(mins - 1); }, 1000);

            }
        }
    }
    tick();
}
