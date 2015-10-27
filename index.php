<?php
	include("pages.php");
	include("head.php");
	include("header.php");
	include("menu.php");
	
	if(isset($_GET['p'])){
		$p = $_GET['p'];
		$pageExists	= false;
		foreach ($pages as $page){
			if ($page["name"] == $p){
				$pageExists = true;
			}
		}
		
		if($pageExists){
			makePage($p);
		}
		else{
			makePage("intro");
		}
		
	}
	else{
		makePage("intro");
	}
	
	function makePage($pageName){
		global $pages;
		foreach ($pages as $page){
			if ($page["name"] == $pageName){
				makeHead($page);
				
				
				if ($page["name"] != "intro"){
					echo ('
						<body>
						<div class="mainBlock">
					');
					makeHeader($page);
					makeMenu($page);
					makeNavigation($page);
					echo ('
						</div>
						</body>
					');
				}
				else{
					makeNavigation($page);
				}

				makeScripts($page);
			}
		}
	}
	
	
	function makeScripts($page) {
		foreach ($page["scripts"] as $script) {
			echo ('<script src="'. $script . '"></script>');
		}
		
		if ($page["name"] != "intro"){
			echo ('<script src="menu.js"></script>');
		}
		
	}
	
	function makeNavigation($page) {
		include ($page["html"]);
	}
	

	
