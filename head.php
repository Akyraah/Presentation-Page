<?php
	function makeHead($page){
		echo '
			<!DOCTYPE html>
			<html>
			<head>
			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> 
		';
		
		makeTitle($page);
		makeGeneralCss($page);
		makeCss($page);
		
		echo '
			<script src="jquery-1.11.3.min.js"></script>
			</head>
		';
		
	}
	
	function makeTitle($page){
		echo '<title>' . $page["title"] . '</title>';
	}
	
	function makeCss($page){
		foreach ($page["css"] as $css) {
			echo '
				<link rel="stylesheet" href="CSS/'.$css.'">
			';
		}
	}
	
	function makeGeneralCss($page){
		
		if($page["name"]  != "intro"){
			echo '
				<link rel="stylesheet" href="CSS/general.css">
				<link rel="stylesheet" href="CSS/menu.css">
				<link rel="stylesheet" href="CSS/header.css">
				<link rel="stylesheet" href="CSS/footer.css">
				<link rel="stylesheet" href="CSS/navigation.css">
			';
		}
		
	}

?>