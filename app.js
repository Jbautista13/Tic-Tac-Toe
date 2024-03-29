var turn = 0;
var i = 0;

const board = document.querySelector('.board')
const xImage = '<div class="svg-wrapper"><svg version="1.1" class="mark x" id="X_Shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><rect x="281.55" y="323.71" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -187.5368 322.119)" class="shapeShadow" width="27.02" height="127.46"/><polyline class="shapeShadow" points="148.07,259.55 167.18,240.45 77.05,150.32 57.95,169.42 148.07,259.55 	"/><polyline class="shapeShadow" points="77.05,330.57 57.95,349.68 150.32,442.05 169.43,422.95 77.05,330.57 	"/></g><polygon id="xTop" class="xTop" points="442.05,150.32 349.68,57.95 259.55,148.07 169.43,57.95 77.05,150.32 167.18,240.45 77.05,330.57 169.43,422.95 259.55,332.82 349.68,422.95 442.05,330.57 351.93,240.45 "/> </svg></div>';
const oImage = '<div class="svg-wrapper"><svg version="1.1" class="mark y" id="O_Shape" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve"><g id="shapeShadow"><path class="shapeShadow" d="M245.99,132.01c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S212.06,132.01,245.99,132.01    M245.99,75.01c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S347.61,75.01,245.99,75.01L245.99,75.01z"/></g><g id="oTop"><path class="oTop" d="M254.01,113.99c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S220.09,113.99,254.01,113.99    M254.01,56.99c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S355.63,56.99,254.01,56.99L254.01,56.99z"/></g></svg></div>';

var squares = new Array(9);

window.onload = function() {

    if ((window.navigator.standalone) || (window.matchMedia('(display-mode: standalone)').matches))
        $('#viewport').attr('content', 'width=device-width, initial-scale=1.0, user-scalable=no')

    newGame();
};

// Check for stored Theme and Wins
if (localStorage.getItem('theme') != null) {
    $('body').addClass(localStorage.getItem('theme'));
    if (localStorage.getItem('theme') == "dark") {
        $('body').removeClass('light');
        $('meta[name="theme-color"]').attr('content', '#1c1c1c');
        $('.darkSwitch').prop('checked', true);
    }
}

if (localStorage.getItem('xwins') > 0 || localStorage.getItem('ywins') > 0) {
    displayScore();
}

$('.darkSwitch').click(function () {
    if ($(this).prop('checked')) {
        $('body').addClass('dark').removeClass('light');
        $('meta[name="theme-color"]').attr('content', '#1c1c1c');
        localStorage.setItem('theme', 'dark');
    } else {
        $('body').addClass('light').removeClass('dark');
        $('meta[name="theme-color"]').attr('content', '#ebebeb');
        localStorage.setItem('theme', 'light');
    }
});

function newGame() {
    
    i = 0;
    board.dataset.winner = false;

    setTimeout( function () {
        $('.header').removeClass('fadeout');
        $('.square').removeClass('darken');
    }, 520);

    squares = new Array(9);
    
    $('.gameinfo').addClass('fadeout');
    setTimeout( function () {
        $('.gameinfo').removeClass('fadeout');
        $('.gameinfo').html('<h1 class> <div class="svg-wrapper"><svg version="1.1" class="mark side x clickable" id="charSelectX" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve" tabindex="0"><g id="shapeShadow"><rect x="281.55" y="323.71" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -187.5368 322.119)" class="shapeShadow" width="27.02" height="127.46"/><polyline class="shapeShadow" points="148.07,259.55 167.18,240.45 77.05,150.32 57.95,169.42 148.07,259.55 	"/><polyline class="shapeShadow" points="77.05,330.57 57.95,349.68 150.32,442.05 169.43,422.95 77.05,330.57 	"/></g><polygon id="xTop" class="xTop" points="442.05,150.32 349.68,57.95 259.55,148.07 169.43,57.95 77.05,150.32 167.18,240.45 77.05,330.57 169.43,422.95 259.55,332.82 349.68,422.95 442.05,330.57 351.93,240.45 "/> </svg> </div> or <div class="svg-wrapper"><svg version="1.1" class="mark side o clickable" id="charSelectO" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"viewBox="0 0 500 500" style="enable-background:new 0 0 500 500;" xml:space="preserve" tabindex="0"><g id="shapeShadow"><path class="shapeShadow" d="M245.99,132.01c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S212.06,132.01,245.99,132.01    M245.99,75.01c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S347.61,75.01,245.99,75.01L245.99,75.01z"/></g><g id="oTop"><path class="oTop" d="M254.01,113.99c33.92,0,65.82,13.21,89.8,37.2s37.2,55.88,37.2,89.8s-13.21,65.82-37.2,89.8   s-55.88,37.2-89.8,37.2s-65.82-13.21-89.8-37.2s-37.2-55.88-37.2-89.8s13.21-65.82,37.2-89.8S220.09,113.99,254.01,113.99    M254.01,56.99c-101.62,0-184,82.38-184,184s82.38,184,184,184s184-82.38,184-184S355.63,56.99,254.01,56.99L254.01,56.99z"/></g></svg> </div></h1>')
    }, 250);

    $('.board').on('click keypress', '#charSelectX', function(press) {
        if(clickOrKeyPress(press))
        {
            turn = 0;
            startNewGame();
        }
    });

    $('.board').on('click keypress', '#charSelectO', function(press) {
        if(clickOrKeyPress(press))
        {
            turn = 1;
            startNewGame();
        }
    });

};

function startNewGame() {
    changeGameInfoTurn();
            $('.header').addClass('fadeout');
            $('.informationbar, .selections').addClass('movedown');
            setTimeout(function () {
                $('.informationbar, .selections').removeClass('movedown');
                $(".grid").removeClass('hidden');
            }, 500);
            setTimeout(function () {
                $('.grid').addClass('visible');
            }, 520);
}

function clickOrKeyPress(press) {
    
    if (press.type == 'click')
        return true;
    else if (press.type == 'keypress') {
        code = press.charCode || press.charCode;
        if((code === 32)|| (code === 13)){
            return true;
        }
    }

    return false;
}

$('body').keydown(function(keyPress) {
    
    current = $(':focus')[0];
    currentIndex = $(':tabbable').index(current);
    numElements = $(':tabbable').length;

    if (document.activeElement instanceof HTMLInputElement)
        return;

    if (numElements > 2)
        numElements--;

    switch(keyPress.which)
    {
        case 65:
        case 37:
            if (current == null || currentIndex == numElements)
                $(':tabbable')[0].focus();
            else if (numElements == 2)
                $(':tabbable')[(currentIndex + 1) % 2].focus();
            else if (numElements == 9)
            {
                if (currentIndex % 3 == 0)
                    $(':tabbable')[currentIndex + 2].focus();
                else
                    $(':tabbable')[currentIndex - 1].focus();
            }
            else
            {
                if (currentIndex != 9 && currentIndex % 3 == 0)
                    $(':tabbable')[currentIndex + 2].focus();
                else if (currentIndex != 9)
                    $(':tabbable')[currentIndex - 1].focus();
            }
            break;
        case 68:
        case 39:
            if (current == null || currentIndex == numElements)
                $(':tabbable')[0].focus();
            else if (numElements == 2)
                $(':tabbable')[(currentIndex + 1) % 2].focus();
            else if (numElements == 9)
            {
                if (currentIndex % 3 == 2)
                    $(':tabbable')[currentIndex - 2].focus();
                else
                    $(':tabbable')[currentIndex + 1].focus();
            }
            else
            {
                if (currentIndex != 9 && currentIndex % 3 == 2)
                    $(':tabbable')[currentIndex - 2].focus();
                else if (currentIndex != 9)
                    $(':tabbable')[currentIndex + 1].focus();
            }
            break;
        case 87:
        case 38:
            if (current == null || currentIndex == numElements)
                $(':tabbable')[0].focus();
            else if (numElements == 2)
                $(':tabbable')[(currentIndex + 1) % 2].focus();
            else if (numElements == 9)
            {
                if (Math.floor(currentIndex / 3) == 0)
                    $(':tabbable')[currentIndex + 6].focus();
                else
                    $(':tabbable')[currentIndex - 3].focus();
            }
            else
            {
                
                if (currentIndex != 9 && Math.floor(currentIndex / 3) == 0) {
                    $(':tabbable')[9].focus();
                    board.dataset.column = currentIndex % 3;
                }
                else if (currentIndex != 9)
                    $(':tabbable')[currentIndex - 3].focus();
                else
                    $(':tabbable')[currentIndex - (3 - board.dataset.column)].focus();
            }
            break;
        case 83:
        case 40:
            if (current == null || currentIndex == numElements)
                $(':tabbable')[0].focus();
            else if (numElements == 2)
                $(':tabbable')[(currentIndex + 1) % 2].focus();
            else if (numElements == 9)
            {
                if (Math.floor(currentIndex / 3) == 2)
                    $(':tabbable')[currentIndex - 6].focus();
                else
                    $(':tabbable')[currentIndex + 3].focus();
            }
            else
            {
                if (currentIndex != 9 && Math.floor(currentIndex / 3) == 2) {
                    $(':tabbable')[9].focus();
                    board.dataset.column = currentIndex % 3;
                }
                else if (currentIndex != 9) {
                    $(':tabbable')[currentIndex + 3].focus();
                    board.dataset.column = currentIndex % 3;
                }
                else {
                    $(':tabbable')[currentIndex - (9 - board.dataset.column)].focus();
                }
            }
            break;
    }
});

function displayNoScoresPopup() {
    $('.mark.clickable').attr('tabindex', '-1');
    $('.darkSwitch').attr('disabled', 'disabled');
    $('.reset').attr('tabindex', '-1');
    $('.square').attr('tabindex', '-1');

    $('.noScores').removeClass('hidden');
    $('.screen').removeClass('hidden');
    setTimeout(function () {
        $('.noScores').removeClass('fadeout');
        $('.screen').removeClass('fadeout');
    }, 20);

    setTimeout(function () {
        $('.mark.clickable').attr('tabindex', '0');
        $('.darkSwitch').removeAttr('disabled');
        $('.reset').attr('tabindex', '0');
        $('.square').attr('tabindex', '0');

        $('.noScores').addClass('fadeout');
        $('.screen').addClass('fadeout');
        setTimeout(function () {
            $('.noScores').addClass('hidden');
            $('.screen').addClass('hidden');
        }, 520);
    }, 1520);
}

function displayPopup() {
    $('.mark.clickable').attr('tabindex', '-1');
    $('.darkSwitch').attr('disabled', 'disabled');
    $('.reset').attr('tabindex', '-1');
    $('.square').attr('tabindex', '-1');

    $('.popup').removeClass('hidden');
    $('.screen').removeClass('hidden');
    setTimeout(function () {
        $('.popup').removeClass('fadeout');
        $('.screen').removeClass('fadeout');
    }, 20);
}

function hidePopup() {
    $('.mark.clickable').attr('tabindex', '0');
    $('.darkSwitch').removeAttr('disabled');
    $('.reset').attr('tabindex', '0');
    $('.square').attr('tabindex', '0');

    $('.popup').addClass('fadeout');
    $('.screen').addClass('fadeout');
    setTimeout(function () {
        $('.popup').addClass('hidden');
        $('.screen').addClass('hidden');
    }, 520);
}

$('.score').on('click', function() {

    if(localStorage.getItem('xwins') == 0 && localStorage.getItem('ywins') == 0) {
        displayNoScoresPopup();
    } else {
        displayPopup();
    }

    $('.popup').on('click keypress', '.optionyes', function(press) {
        if(clickOrKeyPress(press))
        {
            localStorage.setItem('xwins', 0);
            localStorage.setItem('ywins', 0);
            changeXScore();
            changeYScore();
            hidePopup();
        }
    });

    $('.popup').on('click keypress', '.optionno', function(press) {
        if(clickOrKeyPress(press))
        {
            hidePopup();
        }
    });
})

$(".square").on('click keypress', function(press) {
    const square = $(this);

    if(clickOrKeyPress(press))
    {
        if (board.dataset.winner == 'true') {
            if (!square.hasClass('i'))
            {
                square.addClass("i");
                setTimeout(function () {
                    square.removeClass("i");
                }, 1250);
            }
        } else if (square.children('div')[0] == null) {
            addMark(square);
            turn++; i++;
            if (calculateWin(square.attr("class").split(" ")[1])) {
                won(turn % 2 == 0);
            } else {
                changeGameInfoTurn();
            }
        } else {
            if (!square.hasClass('i'))
            {
                square.addClass("i");
                setTimeout(function () {
                    square.removeClass("i");
                }, 1250);
            }
        }
    }
});

function addMark(x) {
    x.removeClass('clickable');
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
    if (!(document.querySelector('.grid').dataset.diagonal == 'true')) {
        $('.grid').removeClass('extendh extendv');
        setTimeout( function () {
            $('.grid').removeClass('horizontal vertical center top bottom left middle right');
        }, 200);
    } else {
        $('.grid').removeClass('tl bl');
        setTimeout( function () {
            $('.grid').removeClass('extendh');
            setTimeout( function () {
                $('.grid').removeClass('horizontal center');
            }, 300);
            document.querySelector('.grid').dataset.diagonal = false;
        }, 400); 
    }
};

function changeGameInfoTurn() {
    var image;
    var h1 = $('.gameinfo').children('h1');
    if (turn % 2 == 0) {
        image = xImage;
        setTimeout( function () {
            h1.attr("class", "red");
        }, 250);
        
    } else {
        image = oImage;
        setTimeout( function () {
            h1.attr("class", "green");
        }, 250);
        
    }

    if (i <= 8) {
        $('.gameinfo').addClass('fadeout');
        setTimeout( function () {
            $('.gameinfo').removeClass('fadeout');
            if ($('.gameinfo').find('.svg-wrapper').length == 1)
               $('.gameinfo').find('.svg-wrapper').replaceWith(image);
            else
                $('.gameinfo').prepend(image);
            h1.html('<span class="turnInfoText">\'s Turn</span>');
        }, 250);
        
    } else {
        $('.gameinfo').addClass('fadeout');
        setTimeout( function () {
            $('.gameinfo').removeClass('fadeout');
            $('.gameinfo').find('.svg-wrapper').remove();
            h1.html("Tied!");
            h1.attr("class", "");
            $('.gameinfo').prepend('<div class="reset" style="height: calc(var(--squarewidth) / 2); width: var(--gridwidth);position: absolute; border-radius: calc(var(--squarewidth) / 10); cursor: pointer; z-index: 3;" tabindex="0"></div>');
        }, 250);
        gameOver();
    }
};

function darkenTiles(j, f, k) {
    for (i = 0; i < j; i++) {
        $('.'+i).find('.svg-wrapper').addClass('darken');
    } for (i++; i < f; i++) {
        $('.'+i).find('.svg-wrapper').addClass('darken');
    } for (i++; i < k; i++) {
        $('.'+i).find('.svg-wrapper').addClass('darken');
    } for (i++; i <= 8; i++) {
        $('.'+i).find('.svg-wrapper').addClass('darken');
    }
};

function gameOver() {
    $('body').on('click keypress', '.reset', function(press) {
        if(clickOrKeyPress(press))
        {
            setTimeout(function () {
                $('.square').html(' ');
                $('.square').find('.svg-wrapper').removeClass('fadeout');
                $('.square').addClass('clickable');
                $('.informationbar, .selections').addClass('moveup');
                setTimeout(function () {
                    $('.informationbar, .selections').removeClass('moveup');
                    $('.grid').addClass('hidden');
                }, 500);
            }, 520);
            setTimeout(function () {
                $('.grid').removeClass('visible');
            }, 250);
            if (board.dataset.winner == 'true') {
                removeMark();
            }
            $('.square').find('.svg-wrapper').addClass('fadeout');
            newGame();
        }
    });
};

function won(shape) {
    var image;
    var h1 = $('.gameinfo').children('h1');
    
    if (shape == 0) {
        localStorage.setItem('xwins', +localStorage.getItem('xwins')+1);
        if ($('.score').hasClass('hidden')) {
            displayScore();
        } else {
            changeXScore();
        }
        image = xImage;
        setTimeout( function () {
            h1.attr("class", "red");
        }, 250);
    } else {
        localStorage.setItem('ywins', +localStorage.getItem('ywins')+1);
        image = oImage;
        if ($('.score').hasClass('hidden')) {
            displayScore();
        } else {
            changeYScore();
        }
        setTimeout( function () {
            h1.attr("class", "green");
        }, 250);
    }

    $('.square').removeClass('clickable');

    board.dataset.winner = true;
    $('.gameinfo').addClass('fadeout');
    setTimeout( function () {
        $('.gameinfo').removeClass('fadeout');
        $('.gameinfo').find('.svg-wrapper').replaceWith(image);
        h1.html('<span class="turnInfoText" style="margin-left: 1vmin"> Won!</span>');
        $('.gameinfo').prepend('<div class="reset" style="height: calc(var(--squarewidth) / 2); width: var(--gridwidth);position: absolute; border-radius: calc(var(--squarewidth) / 10); cursor: pointer;" tabindex="0"></div>');
    }, 250);
    gameOver();
}

function displayScore() {
    if (localStorage.getItem('xwins') == null) {
        localStorage.setItem('xwins', 0);
    }
    if (localStorage.getItem('ywins') == null) {
        localStorage.setItem('ywins', 0);
    }
    $('.darkSwitch').addClass('movedown');
    $('.board').addClass('moveleft');
    setTimeout(function () {
        $('.darkSwitch').removeClass('movedown');
        $('.board').removeClass('moveleft');
        $('.score').removeClass('hidden');
    }, 500);
    setTimeout(function () {
        $('.score').addClass('visible');
        $('.count').addClass('fadein');
        $('.countX').html(localStorage.getItem('xwins'));
        $('.countY').html(localStorage.getItem('ywins'));
    }, 520);
}

function changeXScore() {
    $('.countX').removeClass('fadein');
    setTimeout(function () {
        $('.countX').html(localStorage.getItem('xwins'));
        $('.countX').addClass('fadein');
    }, 500);
}

function changeYScore() {
    $('.countY').removeClass('fadein');
    setTimeout(function () {
        $('.countY').html(localStorage.getItem('ywins'));
        $('.countY').addClass('fadein');
    }, 500);
}

function markRow(row) {
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
                document.querySelector('.grid').dataset.diagonal = true;
                $('.grid').addClass('horizontal center extendh tl');
                break;

            case 7:
                document.querySelector('.grid').dataset.diagonal = true;
                $('.grid').addClass('horizontal center extendh bl');
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