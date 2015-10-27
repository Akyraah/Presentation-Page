<?php
	function makeHeader($page){
		echo '
			<a href="index.php	" class = "home"><img src="Pics/home2.png" alt="home" width="70" height="70" ></a>
			<div class="header" >'.$page["title"].'</div>
		';
	}
?>

