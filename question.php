<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * marvin Molecular Editor question definition class.
 *
 * @package    qtype
 * @subpackage easyofischer
 * @copyright  2011 The Open University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/question/type/shortanswer/question.php');


/**
 * Represents a easyofischer question.

 */
class qtype_easyofischer_question extends qtype_shortanswer_question {
	// all comparisons in easyofischer are case sensitive
	public function compare_response_with_answer(array $response, question_answer $answer) {

	$numofstereo = $this->numofstereo;
	$strictfischer = $this->strictfischer;
	//echo "numofstereo=".$numofstereo;
	//echo "strictfischer=".$strictfischer;
	//echo "orientimportant=".$orientimportant;
	$usranswer=$response['answer'];
	$coranswer=$answer->answer;

	$cor=explode("-",$coranswer);
	$usr=explode("-",$usranswer);

	//echo "<br>";
	//var_dump($cor);
	//echo "<br>";
	//var_dump($usr);

	///strip image number for now
	for ($i = 0; $i < 2*$numofstereo+2; $i++) {

	$cor[$i]=substr($cor[$i], 0, -1);
	$usr[$i]=substr($usr[$i], 0, -1);
 	 
	}
//	echo "<br>cor=";
//	var_dump($cor);
//	echo "<br>usr=";
//	var_dump($usr);


	//echo "<br>";
	//var_dump($cor);
	//echo "<br>";
	//var_dump($usr);



//	echo "usranswer=".$response['answer'];
//	echo "coranswer=".$answer->answer;








////quick check to see if they got it exactly correct
	if($cor==$usr){
	//echo "here 1";
	$return_flag = 1;}
	else{
	//echo "here 0";
//	return 0;
	$return_flag = 0;
	}
	


	////roTation allowed
	if($strictfischer == 1){ 
			
			
			$return_flag = $this->check_rotation_allowed($usr,$cor, $numofstereo);
			//return $return_flag;

	
	}
	//echo "return flag=".$return_flag;
	return $return_flag;

}
 


	

public function check_rotation_allowed($usr, $cor, $numofstereo) {
     
		if($numofstereo==1){
		
		$usr_temp=$usr[0];
		$usr[0]=$usr[2];
		$usr[2]=$usr_temp;

		$usr_temp=$usr[1];
		$usr[1]=$usr[3];
		$usr[3]=$usr_temp;

		}
		


		if($numofstereo==2){
		
		$usr_temp=$usr[0];
		$usr[0]=$usr[3];
		$usr[3]=$usr_temp;

		$usr_temp=$usr[1];
		$usr[1]=$usr[4];
		$usr[4]=$usr_temp;

		$usr_temp=$usr[5];
		$usr[5]=$usr[2];
		$usr[2]=$usr_temp;

		}



		if($numofstereo==3){
		
		$usr_temp=$usr[0];
		$usr[0]=$usr[4];
		$usr[4]=$usr_temp;

		$usr_temp=$usr[1];
		$usr[1]=$usr[5];
		$usr[5]=$usr_temp;

		$usr_temp=$usr[7];
		$usr[7]=$usr[3];
		$usr[3]=$usr_temp;

		$usr_temp=$usr[6];
		$usr[6]=$usr[2];
		$usr[2]=$usr_temp;
		}

		if($numofstereo==4){
		
		$usr_temp=$usr[0];
		$usr[0]=$usr[5];
		$usr[5]=$usr_temp;

		$usr_temp=$usr[1];
		$usr[1]=$usr[6];
		$usr[6]=$usr_temp;

		$usr_temp=$usr[9];
		$usr[9]=$usr[4];
		$usr[4]=$usr_temp;

		$usr_temp=$usr[8];
		$usr[8]=$usr[3];
		$usr[3]=$usr_temp;

		$usr_temp=$usr[7];
		$usr[7]=$usr[2];
		$usr[2]=$usr_temp;

		}


		ksort($usr);

		if($usr==$cor){
		return 1;
		}
		else{
		return 0;
		}




    }





	
	public function get_expected_data() {
        return array('answer' => PARAM_RAW, 'easyofischer' => PARAM_RAW, 'mol' => PARAM_RAW);
    }
}
