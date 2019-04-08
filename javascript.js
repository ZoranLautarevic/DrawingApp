$(function() {
    

    //Declare variables

    //Painting/erasing or not
    var paint = false;

    //Painting or erasing
    var paintErase = "paint";

    //Get the canvas and context 
    var canvas = document.getElementById("paint"); 
    var ctx = canvas.getContext("2d");

    //Get the canvas container
    var container = $("#container");

    //Mouse position
    var mouse = {x: 0, y: 0};

    //onload load saved work from localStorage
    if(localStorage.getItem("imgCanvas") != null) {
        var img = new Image();
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        img.src = localStorage.getItem("imgCanvas");
    };

    //Set drawing parameters (lineWidth, lineJoin, lineCap)
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //Click inside container
    container.mousedown(function(e) {
        paint = true;
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        ctx.moveTo(mouse.x, mouse.y);
    });

    //Move the mouse while holding mouse key
    container.mousemove(function(e) {
        mouse.x = e.pageX - this.offsetLeft;
        mouse.y = e.pageY - this.offsetTop;
        if(paint == true) {
            if(paintErase == "paint") {
                //get color imput
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        }
    });

    //Mouse up -> we are not painting/erasing anymore
    container.mouseup(function() {
        paint = false;
    });

    //If we leave the container we are not painting/erasing anymore
    container.mouseleave(function() {
        paint = false;
    });

    //Click on the reset button
    $("#reset").click(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        paintErase = "paint";
        $("#erase").removeClass("eraseMode");
    });

    //Click on save button
    $("#save").click(function() {
        if(typeof(localStorage) != null) {
            localStorage.setItem("imgCanvas", canvas.toDataURL());
        }else{
            window.alert("Your browser does not support local storage!");
        }
    });

    //Click on the erase button
    $("#erase").click(function() {
        if(paintErase == "paint") {
            paintErase = "erase";
        }else{
            paintErase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });

    //Change color input
    $("#paintColor").change(function() {
        $("#circle").css("background-color", $(this).val());
    });

    //Change lineWidth using slider
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event, ui) {
            $("#circle").height(ui.value);
            $("#circle").width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
});