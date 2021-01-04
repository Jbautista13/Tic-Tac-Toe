
var turn = 0;
var i = 0;
var winner = false;

var xImage = '<svg version="1.1" class="mark x" id="X_Shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><rect x="281.55" y="323.71" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -187.5368 322.119)" class="shapeShadow" width="27.02" height="127.46"/><polyline class="shapeShadow" points="148.07,259.55 167.18,240.45 77.05,150.32 57.95,169.42 148.07,259.55 	"/><polyline class="shapeShadow" points="77.05,330.57 57.95,349.68 150.32,442.05 169.43,422.95 77.05,330.57 	"/></g><polygon id="xTop" class="xTop" points="442.05,150.32 349.68,57.95 259.55,148.07 169.43,57.95 77.05,150.32 167.18,240.45 77.05,330.57 169.43,422.95 259.55,332.82 349.68,422.95 442.05,330.57 351.93,240.45 "/> </svg>';

var oImage = '<svg version="1.1" class="mark y" id="O_Shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><path class="shapeShadow" d="M245.99,132.01c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S212.06,132.01,245.99,132.01    M245.99,75.01c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S347.61,75.01,245.99,75.01L245.99,75.01z"/></g><g id="oTop"><path class="oTop" d="M254.01,113.99c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S220.09,113.99,254.01,113.99    M254.01,56.99c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S355.63,56.99,254.01,56.99L254.01,56.99z"/></g></svg>';

var squares = new Array(9);

window.onload = function() {
    newGame();
};

// Check for stored Theme and Wins

if (localStorage.getItem('theme') != null) {
    $('body').addClass(localStorage.getItem('theme'));
    if (localStorage.getItem('theme') == "dark") {
        $('body').removeClass('light');
        $('meta[name="theme-color"]').attr('content', '#1c1c1c');
        $('.darkSwitch').prop('checked', true);
    } else {
        $('body').removeClass('dark');
    }
}

if (localStorage.getItem('xwins') != null) {
}

$('.darkSwitch').click(function () {
    if ($(this).prop('checked')) {
        $('body').addClass('dark').removeClass('light');
        setTimeout(function () {
            $('meta[name="theme-color"]').attr('content', '#1c1c1c');
        }, 0);
        localStorage.setItem('theme', 'dark');
    } else {
        $('body').addClass('light').removeClass('dark');
        setTimeout(function () {
            $('meta[name="theme-color"]').attr('content', '#ebebeb');
        }, 0);
        localStorage.setItem('theme', 'light');
    }
});

function newGame() {

    $('.header').removeClass('fadeout');
    
    i = 0;
    setTimeout( function () {
        $('.square').removeClass('darken');
        winner = false;
    }, 520);
    squares = new Array(9);

    $('.gameinfo').html('<h1 class> <svg version="1.1" class="mark side x" id="charSelectX" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><rect x="281.55" y="323.71" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -187.5368 322.119)" class="shapeShadow" width="27.02" height="127.46"/><polyline class="shapeShadow" points="148.07,259.55 167.18,240.45 77.05,150.32 57.95,169.42 148.07,259.55 	"/><polyline class="shapeShadow" points="77.05,330.57 57.95,349.68 150.32,442.05 169.43,422.95 77.05,330.57 	"/></g><polygon id="xTop" class="xTop" points="442.05,150.32 349.68,57.95 259.55,148.07 169.43,57.95 77.05,150.32 167.18,240.45 77.05,330.57 169.43,422.95 259.55,332.82 349.68,422.95 442.05,330.57 351.93,240.45 "/> </svg> or <svg version="1.1" class="mark side o" id="charSelectO" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><path class="shapeShadow" d="M245.99,132.01c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S212.06,132.01,245.99,132.01    M245.99,75.01c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S347.61,75.01,245.99,75.01L245.99,75.01z"/></g><g id="oTop"><path class="oTop" d="M254.01,113.99c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S220.09,113.99,254.01,113.99    M254.01,56.99c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S355.63,56.99,254.01,56.99L254.01,56.99z"/></g></svg> </h1>')

    $('.board').on('click', '#charSelectX', function() {
        turn = 0;
        changeGameInfoTurn();
        $('.header').addClass('fadeout');
        $('.gameinfo').addClass('movedown');
        setTimeout(function () {
            $('.gameinfo').removeClass('movedown');
            $('.grid').removeClass('hidden');
        }, 500);
        setTimeout(function () {
            $('.grid').addClass('visible');
        }, 520);
    });

    $('.board').on('click', '#charSelectO', function() {
        event.stopImmediatePropagation();
        turn = 1;
        changeGameInfoTurn();
        $('.header').addClass('fadeout');
        $('.gameinfo').addClass('movedown');
        setTimeout(function () {
            $('.gameinfo').removeClass('movedown');
            $(".grid").removeClass('hidden');
        }, 500);
        setTimeout(function () {
            $('.grid').addClass('visible');
        }, 520);
    });

};

$(".square").click(function () {
    const square = $(this);

    if (winner) {
        square.toggleClass("i");
        setTimeout(function () {
            square.toggleClass("i");
        }, 1250);
    } else if (square.children('svg')[0] == null) {
        addMark(square);
        turn++; i++;
        if (calculateWin(square.attr("class").split(" ")[1])) {
            won(turn % 2 == 0);
        } else {
            changeGameInfoTurn();
        }
    } else {
        square.toggleClass("i");
        setTimeout(function () {
            square.toggleClass("i");
        }, 1250);
    }
});

function addMark(x) {
    let index = x.attr("class").split(" ")[1];
    if (turn % 2 == 0) {
        x.append(xImage);
        squares[index] = 'X';
    } else {
        x.append(oImage);
        squares[index] = 'O';
    }
};

function removeMark() {

    diagonal = $('.grid').attr('class').indexOf("bl") != -1 || $('.grid').attr('class').indexOf("tl") != -1;

    console.log(diagonal);
    if (!diagonal) {
        $('.grid').removeClass($('.grid').attr('class').split(' ').pop());
        setTimeout( function () {
            $('.grid').removeClass('horizontal center');
            setTimeout( function () {
                $('.grid').removeClass($('.grid').attr('class').split(' ').pop());
            }, 20);
        }, 200);
    } else {
        $('.grid').removeClass('tl bl');
        setTimeout( function () {
            $('.grid').removeClass('extendh');
            setTimeout( function () {
                $('.grid').removeClass('horizontal center');
                setTimeout( function () {
                    $('.grid').removeClass('red green');
                }, 20);
            }, 300);
        }, 400); 
    }
};

function changeGameInfoTurn() {
    var image;
    var h1 = $('.gameinfo').children('h1');
    if (turn % 2 == 0) {
        image = xImage;
        h1.attr("class", "red");
    } else {
        image = oImage;
        h1.attr("class", "green");
    }

    if (i <= 8) {
        h1.html(image + "'s Turn");
    } else {
        h1.html("Tied!");
        h1.attr("class", "");
        $('.gameinfo').prepend('<div class="reset" style="height: calc(var(--squarewidth) / 2); width: var(--gridwidth);position: absolute;"></div>');
        gameOver();
    }
};

function darkenTiles(j, f, k) {
    for (i = 0; i < j; i++) {
        $('.'+i).find('.mark').addClass('darken');
    } for (i++; i < f; i++) {
        $('.'+i).find('.mark').addClass('darken');
    } for (i++; i < k; i++) {
        $('.'+i).find('.mark').addClass('darken');
    } for (i++; i <= 8; i++) {
        $('.'+i).find('.mark').addClass('darken');
    }
};

function gameOver() {
    $('body').on('click', '.reset',function () {
        $('.reset').toggleClass('hidden');
        setTimeout(function () {
            $('.square').html(' ');
            $('.square').find('.mark').removeClass('fadeout');
            $('.gameinfo').addClass('moveup');
            setTimeout(function () {
                $('.gameinfo').removeClass('moveup');
                $('.grid').addClass('hidden');
            }, 500);
        }, 520);
        setTimeout(function () {
            $('.grid').removeClass('visible');
        }, 250);
        if (winner == true) {
            removeMark();
        }
        $('.square').find('.mark').addClass('fadeout');
        newGame();
    });
};

function won(shape) {
    var image;
    var h1 = $('.gameinfo').children('h1');
    if (shape == 0) {
        image = xImage;
        h1.attr("class", "red");
    } else {
        image = oImage;
        h1.attr("class", "green");
    }
    
    winner = true;
    h1.html(image + " Won!");
    $('.gameinfo').prepend('<div class="reset" style="height: calc(var(--squarewidth) / 2); width: var(--gridwidth);position: absolute;"></div>');
    gameOver();
}

function markRow(row) {
    if (turn % 2 == 0) {
        $('.grid').addClass('red');
    } else {
        $('.grid').addClass('green');
    }
    
    setTimeout(function () {
        switch(row) {
            case 0:
                $('.grid').addClass('horizontal top extendh');
                break;
            
            case 1:
                $('.grid').addClass('horizontal center extendh');
                break;
        
            case 2:
                $('.grid').addClass('horizontal bottom extendh');
                break;
        
            case 3:
                $('.grid').addClass('vertical left extendv');
                break;
        
            case 4:
                $('.grid').addClass('vertical middle extendv');
                break;
        
            case 5:
                $('.grid').addClass('vertical right extendv');
                break;

            case 6:
                $('.grid').addClass('horizontal center extendh');
                setTimeout(function () {
                    $('.grid').addClass('tl')
                }, 200);
                break;

            case 7:
                $('.grid').addClass('horizontal center extendh');
                setTimeout(function () {
                    $('.grid').addClass('bl')
                }, 200);
                break;
        
        }
    }, 250);
}

function calculateWin(squareNum) {
    if (i < 5) {
        return false;
    } else {
        switch(squareNum) {
            case '0':
                if (squares[0] == squares[1] && squares[1] == squares[2]) {
                    markRow(0);
                    darkenTiles(0, 1, 2);
                    return true;
                }
                else if (squares[0] == squares[3] && squares[3] == squares[6]) {
                    markRow(3);
                    darkenTiles(0, 3, 6);
                    return true;
                }
                else if (squares[0] == squares[4] && squares[4] == squares[8]) {
                    markRow(6);
                    darkenTiles(0, 4, 8);
                    return true;
                }

                return false;
                
            case '1':
                if (squares[0] == squares[1] && squares[1] == squares[2]) {
                    markRow(0);
                    darkenTiles(0, 1, 2);
                    return true;
                }
                else if (squares[1] == squares[4] && squares[4] == squares[7]) {
                    markRow(4);
                    darkenTiles(1, 4, 7);
                    return true;
                }

                return false;
                
            case '2':
                if (squares[0] == squares[1] && squares[1] == squares[2]) {
                    markRow(0);
                    darkenTiles(0, 1, 2);
                    return true;
                }
                else if (squares[2] == squares[4] && squares[4] == squares[6]) {
                    markRow(7);
                    darkenTiles(2, 4, 6);
                    return true;
                }
                else if (squares[2] == squares[5] && squares[5] == squares[8]) {
                    markRow(5);
                    darkenTiles(2, 5, 8);
                    return true;
                }

                return false;
                
            case '3':
                if (squares[0] == squares[3] && squares[3] == squares[6]) {
                    markRow(3);
                    darkenTiles(0, 3, 6);
                    return true;
                }
                else if (squares[3] == squares[4] && squares[4] == squares[5]) {
                    markRow(1);
                    darkenTiles(3, 4, 5);
                    return true;
                }

                return false;
                
            case '4':
                if (squares[0] == squares[4] && squares[4] == squares[8]) {
                    markRow(6);
                    darkenTiles(0, 4, 8);
                    return true;
                }
                else if (squares[1] == squares[4] && squares[4] == squares[7]) {
                    markRow(4);
                    darkenTiles(1, 4, 7);
                    return true;
                }
                else if (squares[2] == squares[4] && squares[4] == squares[6]) {
                    markRow(7);
                    darkenTiles(2, 4, 6);
                    return true;
                }
                else if (squares[3] == squares[4] && squares[4] == squares[5]) {
                    markRow(1);
                    darkenTiles(3, 4, 5);
                    return true;
                }

                return false;
                
            case '5':
                if (squares[2] == squares[5] && squares[5] == squares[8]) {
                    markRow(5);
                    darkenTiles(2, 5, 8);
                    return true;
                }
                else if (squares[3] == squares[4] && squares[4] == squares[5]) {
                    markRow(1);
                    darkenTiles(3, 4, 5);
                    return true;
                }

                return false;
                
            case '6':
                if (squares[0] == squares[3] && squares[3] == squares[6]) {
                    markRow(3);
                    darkenTiles(0, 3, 6);
                    return true;
                }
                else if (squares[2] == squares[4] && squares[4] == squares[6]) {
                    markRow(7);
                    darkenTiles(2, 4, 6);
                    return true;
                }
                else if (squares[6] == squares[7] && squares[7] == squares[8]) {
                    markRow(2);
                    darkenTiles(6, 7, 8);
                    return true;
                }

                return false;
                
            case '7':
                if (squares[1] == squares[4] && squares[4] == squares[7]) {
                    markRow(4);
                    darkenTiles(1, 4, 7);
                    return true;
                }
                else if (squares[6] == squares[7] && squares[7] == squares[8]) {
                    markRow(2);
                    darkenTiles(6, 7, 8);
                    return true;
                }

                return false;
                
            case '8':
                if (squares[0] == squares[4] && squares[4] == squares[8]) {
                    markRow(6);
                    darkenTiles(0, 4, 8);
                    return true;
                }
                else if (squares[2] == squares[5] && squares[5] == squares[8]) {
                    markRow(5); 
                    darkenTiles(2, 5, 8);
                    return true;
                }
                else if (squares[6] == squares[7] && squares[7] == squares[8]) {
                    markRow(2);
                    darkenTiles(6, 7, 8);
                    return true;
                }

                return false;
                
            }
        }
};

/*function calculateWins(squareNum) {
    if (i < 5) {
        return false;
    } else {
        switch(squareNum) {
            case '0':
                return (
                    (squares[0] == squares[1] && squares[1] == squares[2]) ||
                    (squares[0] == squares[3] && squares[3] == squares[6]) ||
                    (squares[0] == squares[4] && squares[4] == squares[8])
                );
            case '1':
                return (
                    (squares[0] == squares[1] && squares[1] == squares[2]) ||
                    (squares[1] == squares[4] && squares[4] == squares[7])
                );
            case '2':
                return (
                    (squares[0] == squares[1] && squares[1] == squares[2]) ||
                    (squares[2] == squares[4] && squares[4] == squares[6]) ||
                    (squares[2] == squares[5] && squares[5] == squares[8])
                );
            case '3':
                return (
                    (squares[0] == squares[3] && squares[3] == squares[6]) ||
                    (squares[3] == squares[4] && squares[4] == squares[5])
                );
            case '4':
                return (
                    (squares[0] == squares[4] && squares[4] == squares[8]) ||
                    (squares[1] == squares[4] && squares[4] == squares[7]) ||
                    (squares[2] == squares[4] && squares[4] == squares[6]) ||
                    (squares[3] == squares[4] && squares[4] == squares[5])
                );
            case '5':
                return (
                    (squares[2] == squares[5] && squares[5] == squares[8]) ||
                    (squares[3] == squares[4] && squares[4] == squares[5])
                );
            case '6':
                return (
                    (squares[0] == squares[3] && squares[3] == squares[6]) ||
                    (squares[2] == squares[4] && squares[4] == squares[6]) ||
                    (squares[6] == squares[7] && squares[7] == squares[8])
                );
            case '7':
                return (
                    (squares[1] == squares[4] && squares[4] == squares[7]) ||
                    (squares[6] == squares[7] && squares[7] == squares[8])
                );
            case '8':
                return (
                    (squares[0] == squares[4] && squares[4] == squares[8]) ||
                    (squares[2] == squares[5] && squares[5] == squares[8]) ||
                    (squares[6] == squares[7] && squares[7] == squares[8])
                );
        }
    }
};*/