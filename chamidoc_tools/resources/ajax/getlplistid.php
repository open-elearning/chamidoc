<?php


ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


$cglobal = __DIR__.'/../../../../main/inc/global.inc.php';

if(file_exists($cglobal)){
	require_once __DIR__.'/../../../../main/inc/global.inc.php';
}else{
	$cglobal =  __DIR__.'/../../../../main/inc/global.inc.php';
	if(file_exists($cglobal)){
		require_once __DIR__.'/../../../../main/inc/global.inc.php';
	}else{
		echo "error";
		exit;
	}

}

function getAllExercices($directory){

	$result = array();
	
	$sql = " SELECT 
	c_quiz.iid as quizid,
	c_quiz.title as title 
	FROM c_quiz
	INNER JOIN course ON c_quiz.c_id = course.id
	WHERE course.directory = '$directory'
	GROUP BY quizid";

	$resultLp = Database::query($sql);

	while($row = Database::fetch_array($resultLp)){
		$result[] = $row;
	}

	return $result;

}

$directory = api_get_course_path();

$progressLST = getAllExercices($directory);

$cnt = 0;

$Htlocal = '';

foreach ($progressLST as &$row){

	if($row['quizid']!=''){

		$title = $row['title'];

		$Htlocal .= '<a onClick="applikSelectItemsID('.$row['quizid'].')" href="javascript:void(0);" class="btn btn-default" >quizid : '.$row['quizid'].' '.$title.'</a><br>';
		
		$cnt++;

	}

}

echo $Htlocal;


