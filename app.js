
var turn = 0;
var i = 0;
var winner = false;

var xImage = "./img/x_light.png";
var oImage = "./img/o_light.png";

var xImageLight = "./img/x_light.png";
var oImageLight = "./img/o_light.png";
var xImageDark = "./img/x_dark.png";
var oImageDark = "./img/o_dark.png";

var squares = new Array(9);

window.onload = function() {
    newGame();
};

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
    }
}

$('.darkSwitch').click(function () {
    if ($(this).prop('checked')) {
        $('body').addClass('dark').removeClass('light');
        $('meta[name="theme-color"]').attr('content', '#1c1c1c');
        localStorage.setItem('theme', 'dark');
        xImage = xImageDark;
        oImage = oImageDark;
    } else {
        $('body').addClass('light').removeClass('dark');
        $('meta[name="theme-color"]').attr('content', '#ebebeb');
        localStorage.setItem('theme', 'light');
        xImage = xImageLight;
        oImage = oImageLight;
    }
    themeChange();
});

function newGame() {
    
    $('.grid').addClass('hidden');
    
    i = 0;
    winner = false;
    squares = new Array(9);

    $('.gameinfo').html('<h1 class> <img id="charSelectX" class="mark x" src="' + xImage + '" alt="X"> or <img id="charSelectO" class="mark o" src="' + oImage + '" alt="O"> </h1>')

    $('.board').on('click', '#charSelectX', function() {
        turn = 0;
        changeGameInfoTurn();
        $(".grid").removeClass("hidden");
    });

    $('.board').on('click', '#charSelectO', function() {
        event.stopImmediatePropagation();
        turn = 1;
        changeGameInfoTurn();
        $(".grid").removeClass("hidden");
    });

};

$(".square").click(function () {
    const square = $(this);

    if (winner) {
        square.toggleClass("i");
        setTimeout(function () {
            square.toggleClass("i");
        }, 1250);
    } else if (square.children('img')[0] == null) {
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
        const mark = square.children('img');
        mark.toggleClass("touched");
        setTimeout(function () {
            mark.toggleClass("touched");
        }, 1000);
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
        h1.html("Game Over");
        h1.attr("class", "");
        $('.gameinfo').prepend('<div class="reset" style="height: var(--gameinfo_height); width: var(--gridwidth);position: absolute;"></div>');
        gameOver();
    }
};

function themeChange() {
    setTimeout(function () {
        $('.mark.x').attr("src", xImage);
        $('.mark.o').attr("src", oImage);
    }, 500);
};

function gameOver() {
    $('body').on('click', '.reset',function () {
        $('.reset').toggleClass('hidden');
        $('.square').html(" ");
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
    $('.gameinfo').prepend('<div class="reset" style="height: var(--gameinfo_height); width: var(--gridwidth);position: absolute;"></div>');
    gameOver();
}

function calculateWin(squareNum) {
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
