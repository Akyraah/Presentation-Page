var j = 0;
var menuEls = [];
var nbMenuEls=4;

$(document).ready(function(){
	
	for (i=0; i<nbMenuEls; i++){
		menuEls.push($("#menu" + i.toString()));
		$("#nav" + i.toString()).hide();
		}
	elClick(0);
});
	
function elClick(i){
	menuEls[j][0].className = "normal";
	menuEls[i][0].className = "selected";
	$("#nav" + j.toString()).hide();
	$("#nav" + i.toString()).show();
			
	j = i;
	return false;
}