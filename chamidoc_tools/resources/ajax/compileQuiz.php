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

if (file_exists(__DIR__."/../../inc/functions.php")) {
    require_once(__DIR__."/../../inc/functions.php");
} else {
    echo "error";
    exit;
}

$quizzId = isset($_GET['quizid']) ? $_GET['quizid'] : 0;

$progressLST = getAllQuestions($quizzId);

$cnt = 0;

$Htlocal = 'basedataoff["BASEQUIZZ"]="<?xml version=\"1.0\" encoding=\"UTF-8\"?><d>';

foreach ($progressLST as &$row){

	if($row['id']!=''){

		$idquestion = $row['id'];
		$textquestion = $row['textquestion'];
		$Htlocal .= '<data>';
		$Htlocal .= '<value><![CDATA['.cleanTxt($textquestion).']]></value>';
		$Htlocal .= '<value></value>';

		$progressANSW = getAllAnswers($idquestion);

		foreach ($progressANSW as &$rowA){
			$textanswer = $rowA['textanswer'];
			$Htlocal .= '<value><![CDATA['.cleanTxt($textanswer).']]></value>';
		}

		$Htlocal .= '<value><![CDATA[]]></value>';
		$Htlocal .= '<value><![CDATA[]]></value>';
		$Htlocal .= '<value><![CDATA[]]></value>';

		$Htlocal .= '</data>';

		$cnt++;

	}

}

$Htlocal .= '</d>";';

$renderPath = getPathRenderCacheChamiDoc();

$fd = fopen($renderPath.'dataquiz'.$quizzId.'.js','w');	
fwrite($fd,$Htlocal);
fclose($fd);

function getAllQuestions($quizId){

	$result = array();
	
	$sql = " SELECT c_quiz_rel_question.question_id as id, question as textquestion
	FROM c_quiz_question
	INNER JOIN c_quiz_rel_question ON c_quiz_rel_question.question_id = c_quiz_question.iid
	WHERE c_quiz_rel_question.exercice_id = $quizId";

	$resultQuiz = Database::query($sql);

	while($row = Database::fetch_array($resultQuiz)){
		$result[] = $row;
	}

	return $result;

}

function getAllAnswers($questionId){

	$result = array();

	$sql = " SELECT answer as textanswer
	FROM c_quiz_answer 
	WHERE question_id = $questionId 
	AND correct = 1 LIMIT 1";

	$resultCorrect= Database::query($sql);

	while($row = Database::fetch_array($resultCorrect)){
		$result[] = $row;
	}

	$sqlW = " SELECT answer  as textanswer
	FROM c_quiz_answer 
	WHERE question_id = $questionId 
	AND correct = 0 LIMIT 3";

	$resultWrong= Database::query($sqlW);
		
	while($rowW = Database::fetch_array($resultWrong)){
		$result[] = $rowW;
	}

	return $result;

}

function cleanTxt($string){

	$string = str_replace('<p>&nbsp;</p>', '', $string);
	$string = str_replace('"', '&apos;', $string);
	$string = str_replace(array("\r", "\n"), '', $string);
	return $string;

}

