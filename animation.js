function initAnimation1() {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    document.getElementById("body").style.textAlign = "center";
    var context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 400;
    var paused = false;
    var opacity = 0.7;
    var snowy = true;

    //instaniate image object for trees, either snowy or rainy.
    //the default is snowy
    var imgPath = 'image-removebg-preview.png';
    var imgObject = new Image();

    var treePath = '3-36870_polar-wallpaper-tree-snow-bear-creative-pine-clipart-removebg-preview.png';
    var treeObject = new Image();
    treeObject.src = treePath;
    imgObject.src = imgPath;
    // this stores the individual particles/flakes
    var flakes = [];

    // THis function listens to the keys being pressed and 
    // reacts accordingly. An invalid keystroke will do nothing 
    document.addEventListener('keypress', function (event) {
        if (event.key == 'p' || event.key == 'P') {
            paused = !paused;
        }

        // BEGIN WIDTH INCREASE/DECREASE PROCESSING CHECK
        if (event.key == 'a' || event.key == 'A') {
            console.log(canvas.width);
            if (canvas.width == 400) {
                // alert that the value is already at lowest
                window.alert("The width is already at the lowest value!");
            }
            else {
                decreasePanel("w");
            }
        }
        if (event.key == 'd' || event.key == 'D') {
            if (canvas.width + 10 > window.screen.width) {
                // too large
                window.alert("The width will exceed the window size!")
            }
            else {
                increasePanel("w");
            }
        }
        // END INCREASE/DECREASE PROCESSING CHECK
        // BEGIN HEIGHT INCREASE/DECREASE PROCESSING CHECK
        if (event.key == 'w' || event.key == 'W') {
            increasePanel("h");
        }
        if (event.key == 's' || event.key == 'S') {
            decreasePanel("h");
        }
        // END INCREASE/DECREASE PROCESSING CHECK

        if (event.key == ' ') {
            // we have to change the animation values from:
            // snow to rain
            // snowy trees to fall trees
            // white ground to green ground
            snowy = !snowy;
        }
        console.log(event.key);
    })

    function increasePanel(val) {
        if (val == 'w') {
            canvas.width += 10;
        }
        else {
            canvas.height += 10;
        }
    }

    function decreasePanel(val) {
        if (val == 'w') {
            canvas.width -= 10;
        }
        else {
            canvas.height -= 10;
        }
    }
    function snowfall() {
        drawCanvas();
        addElement();
        fall();
    };
    function drawCanvas() {
        var styleBackground = "";
        var groundColor = "";
        var treeOffsetValueBigY, treeOffsetValueSmallX, treeOffsetValueSmallY;
        if (snowy) {
            styleBackground = "grey";
            groundColor = "white";
            treePath = '3-36870_polar-wallpaper-tree-snow-bear-creative-pine-clipart-removebg-preview.png';
            treeObject.src = treePath;
            treeOffestValueBigX = -50;
            treeOffsetValueBigY = -380;
            treeOffsetValueSmallX = -350;
            treeOffsetValueSmallY = -200;
            opacity = 0.8;
        }
        else {
            styleBackground = "rgba(51, 102, 204,1.0)";
            groundColor = "rgb(0, 102, 0, 1.0)";
            treePath = 'unnamed.png';
            treeObject.src = treePath;
            treeOffestValueBigX = -50;
            treeOffsetValueBigY = -550;
            treeOffsetValueSmallX = -350;
            treeOffsetValueSmallY = -235;
            opacity = 0.3;
        }

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = styleBackground;
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = groundColor;
        context.fillRect(0, canvas.height - 40, canvas.width, 40);
        context.drawImage(treeObject, treeOffestValueBigX, canvas.height + treeOffsetValueBigY);
        context.drawImage(treeObject, canvas.width + treeOffsetValueSmallX, canvas.height + treeOffsetValueSmallY, 200, 200);
    };
    function addElement() {
        if (!paused) {
            var x = Math.ceil(Math.random() * canvas.width);
            var s = Math.ceil(Math.random() * 4);
            flakes.push({ "x": x, "y": 0, "s": s });
        }
    };

    // function addLeaf() {

    // }
    function fall() {
        for (var i = 0; i < flakes.length; i++) {
            var flake = flakes[i];
            var add_value;

            if (!paused) {
                add_value = flake.s / 2;
            }
            else {
                add_value = 0;
            }
            context.beginPath();
            context.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
            context.arc(flake.x, flakes[i].y += add_value, flake.s / 2, 0, 2 * Math.PI);
            // console.log(add);
            // context.drawImage(imgObject, imgObject.y += add, imgObject.x += add, 100, 30);
            context.fill();
            if (flakes[i].y > canvas.height) {
                flakes.splice(i, 1);
            }
        };
    };
    setInterval(snowfall, 10);
};
window.onload = initAnimation1;