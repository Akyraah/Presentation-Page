<?php
	function makeMenu($page){
		echo '
			<div>
			<ul class="menu">
		';
		
		for ($tabId = 0; $tabId < count($page["tabs"]); $tabId++)
			{
				echo'
					<li><button class="normal" id="menu'.$tabId.'" onClick="elClick('.$tabId.');">'.$page["tabs"][$tabId].'</button></li>
				';
			}
		echo '
			</ul>
			</div>
		';
	}
?>