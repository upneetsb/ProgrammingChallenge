/**
 * Upneet Bir
 * 
 * Asymmetrik Programming Challenge
 * 
 * This is my submission for the Asymmetrik Programming Challenge to apply for the
 * Intern position. 
 */
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
            if (canvas.height == 400) {
                // alert that the value is already at lowest
                window.alert("The height is already at the lowest value!");
            }
            else {
                decreasePanel("h");
            }
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
    /**
     * This function handles increasing the 
     * width and height of the pane
     * @param {char} val 
     */
    function increasePanel(val) {
        if (val == 'w') {
            canvas.width += 10;
        }
        else {
            canvas.height += 10;
        }
    }

    /**
     * This function handles decreasing the 
     * width and height of the pane. After all cases have been
     * handled
     * @param {char} val 
     */
    function decreasePanel(val) {
        if (val == 'w') {
            canvas.width -= 10;
        }
        else {
            canvas.height -= 10;
        }
    }
    /**
     * This function contains the order of the functions 
     * to create the animation
     */
    function snowfall() {
        drawCanvas();
        addElement();
        fall();
    };

    /**
     * This function is used to reset the pane image every frame. 
     * This deals with the background and non-moving elements on the canvas
     */
    function drawCanvas() {
        var styleBackground = "";
        var groundColor = "";
        var treeOffsetValueBigY, treeOffsetValueSmallX, treeOffsetValueSmallY;
        /**
         * For this case, I could have used inline if statements to assign the values
         * to the variable. The reason I did not is if we add more cases, such as snow, rain, and another
         * animation style, we would have to recode this whole section with cases again. 
         */
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
    /**
     * This function is used to add particles to the pane and add
     * the flakes or rain to the flakes array
     */
    function addElement() {
        if (!paused) {
            var x = Math.ceil(Math.random() * canvas.width);
            var s = Math.ceil(Math.random() * 4);
            flakes.push({ "x": x, "y": 0, "s": s });
        }
    };
    /**
     * This function controls the fall of the rain or snow. 
     * Using the array 'flake' created earlier it goes through every 
     * value and moves it a specific amount down the pane.
     */
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
            context.fill();
            if (flakes[i].y > canvas.height - 40) {
                flakes.splice(i, 1);
            }
        };
    };
    setInterval(snowfall, 2);
};
window.onload = initAnimation1;