
var turn = 0;
var i = 0;
var winner = false;

var xImage = "./images/x_light.png";
var oImage = "./images/o_light.png";

var xImageLight = "./images/x_light.png";
var oImageLight = "./images/o_light.png";
var xImageDark = "./images/x_dark.png";
var oImageDark = "./images/o_dark.png";

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
        xImage = xImageDark;
        oImage = oImageDark;
    } else {
        $('body').removeClass('dark');
        xImage = xImageLight;
        oImage = oImageLight;
    }
    themeChange();
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
        xImage = xImageDark;
        oImage = oImageDark;
    } else {
        $('body').addClass('light').removeClass('dark');
        setTimeout(function () {
            $('meta[name="theme-color"]').attr('content', '#ebebeb');
        }, 0);
        localStorage.setItem('theme', 'light');
        xImage = xImageLight;
        oImage = oImageLight;
    }
    themeChange();
});

function themeChange() {
    setTimeout(function () {
        $('.mark.x').attr("src", xImage);
        $('.mark.o').attr("src", oImage);
    }, 250);
};

function newGame() {

    $('.header').removeClass('fadeout');
    $('.header').addClass('fadein');
    
    i = 0;
    setTimeout( function () {
        $('.square').removeClass('darken');
        winner = false;
    }, 520);
    squares = new Array(9);

    $('.gameinfo').html('<h1 class> <img id="charSelectX" class="mark x" src="' + xImage + '" alt="X"> or <img id="charSelectO" class="mark o" src="' + oImage + '" alt="O"> </h1>')

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
        if (square.children('img')[0] != null) {
            const mark = square.children('img');
            mark.toggleClass("touched");
            setTimeout(function () {
                mark.toggleClass("touched");
            }, 1000);
        }
    } else if (square.children('img')[0] == null) {
        addMark(square);
        turn++; i++;
        if (calculateWin(square.attr("class").split(" ")[1])) {
            //calculateWinningSquares(square.attr("class").split(" ")[1]);
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
    x.append("<img>");
    var className;
    var src;
    var alt;
    let index = x.attr("class").split(" ")[1];
    if (turn % 2 == 0) {
        className = "mark x";
        src = xImage;
        alt = "x";
        squares[index] = 'X';
    } else {
        className = "mark o";
        src = oImage;
        alt = "y";
        squares[index] = 'O';
    }

    x.children('img').attr("class", className);
    x.children('img').attr("src", src);
    x.children('img').attr("alt", alt);
};

function removeMark() {

    markType = $('.grid').attr('class').split(' ').length - 2;

    console.log(markType);
    if (markType == 4) {
        $('.grid').removeClass($('.grid').attr('class').split(' ').pop());
        setTimeout( function () {
            $('.grid').removeClass('horizontal center');
            setTimeout( function () {
                $('.grid').removeClass($('.grid').attr('class').split(' ').pop());
            }, 20);
        }, 200);
    } else if (markType == 5) {
        //$('.grid').removeClass($('.grid').attr('class').split(' ').pop());
        $('.grid').removeClass('tl bl');
        setTimeout( function () {
            $('.grid').removeClass('extendh');
            setTimeout( function () {
                $('.grid').removeClass('horizontal center');
                setTimeout( function () {
                    //$('.grid').removeClass($('.grid').attr('class').split(' ').pop());
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
        image = '<img class="mark x" src="' + xImage + '" alt="X">';
        h1.attr("class", "red");
    } else {
        image = '<img id="charSelectO" class="mark o" src="' + oImage + '" alt="O">';
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
        image = '<img class="mark x" src="' + xImage + '" alt="X">';
        h1.attr("class", "red");
    } else {
        image = '<img id="charSelectO" class="mark o" src="' + oImage + '" alt="O">';
        h1.attr("class", "green");
    }
    
    winner = true;
    h1.html(image + " Won!");
    $('.gameinfo').prepend('<div class="reset" style="height: calc(var(--squarewidth) / 2); width: var(--gridwidth);position: absolute;"></div>');
    gameOver();
}

function calculateWins(squareNum) {
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
};

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

function calculateWin/*ningSquares*/(squareNum) {
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