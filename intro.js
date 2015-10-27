var foregroundCanvas;
var backgroundCanvas;
var foregroundCtx;
var backgroundCtx;
var windowSize;

var leftDivShown = false;
var rightDivShown = false;
var introShown = -1;



var canvasHeight;
var canvasInitHeight = 800;
var canvasInitWidth = 800;
var canvasWidth;
var canvasX;
var canvasY;




var loopNumber = 0;
var date;
var moving = true;




var x0 = 400//Math.floor(canvasWidth / 2);
var y0 = 400//Math.floor(canvasHeight / 2);
var radius0 = 60;
var radiusIcon = 45;

var circleNb = 5;
var iconNb = 5;

var rCoord = [];
var thetaCoord = [];


//
// -------------------------------------------------------------------
// Array init :
// -------------------------------------------------------------------
//

for (circleId = 0; circleId < circleNb; circleId++) {
	thetaCoord. push(((Math.random()*360/1)/180*Math.PI));
	var checked = false;
	while (!checked){
		thetaCoord[circleId] = (Math.random()*360/1)/180*Math.PI;
		checked = true;
		for (j = 0; j < circleId; j++){
			angleDifference = Math.abs(thetaCoord[circleId] - thetaCoord[j]);
			angleMin = (55/180)*Math.PI;
			if ( angleDifference < angleMin){
				checked = false;
			}
		}
		
	}
	rCoord.push(100 + (Math.random() * 200)/1);
}


//
// -------------------------------------------------------------------
// Main :
// -------------------------------------------------------------------
//

$(document).ready(function(){
	foregroundCanvas = $("#foregroundCanvas")[0];
	backgroundCanvas = $("#backgroundCanvas")[0];
	foregroundCtx = foregroundCanvas.getContext("2d");
	backgroundCtx = backgroundCanvas.getContext("2d");
	
	foregroundCtx.strokeStyle="#FFFFFF"; //E6E6E6
	foregroundCtx.fillStyle = "#FAFAFA";
	foregroundCtx.lineWidth=4;
	
	for (iconId = 0; iconId<iconNb; iconId++){
		var name = "#icon" + iconId.toString();
		$(name).hide();
		
		name = "#intro" + iconId.toString();
		$(name).hide();
	}
	
	
	windowSize = getSize();
	initWindow();
	drawBackground();
	iterator();
	
	$(document).mousemove(function(event){
		movementManager(event.pageX,event.pageY);
	});
	
});

//
// -------------------------------------------------------------------
// Timing loop:
// -------------------------------------------------------------------
//

function iterator() {

	if (moving){
		moveCircles();
		
		foregroundCtx.clearRect(0,0,foregroundCanvas.width,foregroundCanvas.height)
		drawCircles();
		drawIcons();
	}
	
	if (true){
		loopNumber += 1;
		setTimeout(iterator, 10);
	}
}

function moveCircles(){
	for (circleId = 0; circleId < circleNb; circleId++) {
		thetaCoord[circleId] += 0.002;
	}
}

//
// -------------------------------------------------------------------
// Display :
// -------------------------------------------------------------------
//

function drawCircles(){
	for (circleId = 0; circleId < circleNb; circleId++) {
		foregroundCtx.beginPath();
		pos = convertPolarToCart(thetaCoord[circleId],rCoord[circleId]);
		foregroundCtx.arc(x0 + pos[0], y0 + pos[1],radiusIcon,0,2*Math.PI);
		posStart = convertPolarToCart(thetaCoord[circleId],radius0);
		posEnd = convertPolarToCart(thetaCoord[circleId],rCoord[circleId] - radiusIcon);
		foregroundCtx.moveTo(posStart[0] + x0,posStart[1] + y0);
		foregroundCtx.lineTo(posEnd[0] + x0,posEnd[1] + y0);
		

		foregroundCtx.fill();
		foregroundCtx.stroke();
	}
	
	foregroundCtx.beginPath();
	foregroundCtx.arc(x0,y0,radius0,0,2*Math.PI);
	foregroundCtx.stroke();
}

function drawBackground(){
	for (i = 0; i<10; i++){
		backgroundCtx.fillStyle="#CEE3F6";
		backgroundCtx.fillRect(500,0,250,100);
		backgroundCtx.rotate(10*Math.PI/180);
	}
}

function drawIcons(){
	
	for (iconId = 0; iconId<iconNb; iconId++){
		var name = "#icon" + iconId.toString();
		var img = $(name)[0];
		var pos = convertPolarToCart(thetaCoord[iconId],rCoord[iconId]);
		var imageX = pos[0] - radiusIcon + x0;
		var imageY = pos[1] - radiusIcon + y0;
		var imageWidth = radiusIcon*2;
		var imageHeight = radiusIcon*2;
		foregroundCtx.drawImage(img,imageX,imageY,imageWidth,imageHeight);
	}

}

//
// -------------------------------------------------------------------
// Other
// -------------------------------------------------------------------
//

function convertPolarToCart(theta, r){
	var x = Math.floor(r*Math.cos(theta));
	var y = Math.floor(r*Math.sin(theta));
	return [x,y];
}

//
// -------------------------------------------------------------------
// Animation
// -------------------------------------------------------------------
//

function movementManager(x,y){
	moving = true;
	if (!leftDivShown && !rightDivShown){
		circlesDetection(x,y);

	}
	else{
		moving = false;
		boxDetection(x,y);


	}
	
}

function circlesDetection(x,y){
	for (circleId = 0; circleId < circleNb; circleId++){
		var pos = convertPolarToCart(thetaCoord[circleId], rCoord[circleId]);
		var distance = Math.pow(x - canvasX - (x0 + pos[0]) * canvasWidth / canvasInitWidth,2)
		 + Math.pow(y - canvasY - (y0 + pos[1]) * canvasHeight / canvasInitHeight , 2);
		if (distance < Math.pow(radiusIcon,2)){
			moving = false;
			showIntro(x, y,circleId);
		}
	}
}

function boxDetection(x,y){
	if (loopNumber - date > 50){
		if (rightDivShown){
			if ( (x < windowSize[0]*0.53) || (x > windowSize[0]*0.90) || (y<windowSize[1]*0.10) || (y > windowSize[1]*0.80)){
				var name = "#intro" + introShown.toString();
				$(name).fadeOut();
				rightDivShown = false;
			}
		}
		else{
			if ( (x < windowSize[0]*0.09) || (x > windowSize[0]*0.46) || (y<windowSize[1]*0.10) || (y > windowSize[1]*0.80)){
				var name = "#intro" + introShown.toString();
				$(name).fadeOut();
				leftDivShown = false;
			}
		}
	}
}

function showIntro(x,y,id){
	var name = "#intro" + id.toString();
	
	if (x > windowSize[0]/2){

		$(name)[0].style.top = "10%";
		$(name)[0].style.left = "53%";
		rightDivShown = true;

		
		//$("#rightDiv")[0].innerHTML = '<a href="http://www.google.com" ><img src="Pics/Kirito Asuna.jpg" alt="Kirito" width="400" height="200" style="text-align:center"></a>';
	}
	else{

		$(name)[0].style.top = "10%";
		$(name)[0].style.left = "9%";
		leftDivShown = true;
	}
	
	$(name).fadeIn();
	introShown = id;
	date = loopNumber;
}
//
// -------------------------------------------------------------------
// Window management
// -------------------------------------------------------------------
//

function getSize() {
	var myWidth = 0, myHeight = 0;
	if( typeof( window.innerWidth ) == 'number' ) {
		//Non-IE
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
		//IE 6+ in 'standards compliant mode'
		myWidth = document.documentElement.clientWidth;
		myHeight = document.documentElement.clientHeight;
	} else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
		//IE 4 compatible
		myWidth = document.body.clientWidth;
		myHeight = document.body.clientHeight;
	}
	return [myWidth,myHeight]
}

function initWindow(){
	canvasHeight = Math.floor(windowSize[1] * 0.85);
	canvasWidth = Math.floor(windowSize[1] * 0.85);
	
	foregroundCanvas.style.width = canvasHeight.toString() +"px";
	foregroundCanvas.style.height = canvasHeight.toString() +"px";
	
	canvasX = Math.floor((windowSize[0] - canvasWidth) / 2);
	canvasY = 0;
	foregroundCanvas.style.left = canvasX.toString() + "px";
}