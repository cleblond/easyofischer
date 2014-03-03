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
 * easyofischer question renderer class.
 *
 * @package    qtype
 * @subpackage easyofischer
 * @copyright  2009 The Open University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


defined('MOODLE_INTERNAL') || die();


/**
 * Generates the output for easyofischer questions.
 *
 * @copyright  2009 The Open University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class qtype_easyofischer_renderer extends qtype_renderer {
    public function formulation_and_controls(question_attempt $qa,
            question_display_options $options) {
		global $CFG, $PAGE;
		
        $question = $qa->get_question();
	$numofstereo=$question->numofstereo;
		$questiontext = $question->format_questiontext($qa);
        $placeholder = false;
	$myanswer_id = "my_answer".$qa->get_slot();
	$correctanswer_id = "correct_answer".$qa->get_slot();

        if (preg_match('/_____+/', $questiontext, $matches)) {
            $placeholder = $matches[0];
        }
	
	$result='';
	if ($options->readonly) {
	
	$name2 = 'easyofischer'.$qa->get_slot();
	$result .= html_writer::tag('input', '', array('type' => 'button', 'id' => 'myresponse'.$qa->get_slot(), 'value' => 'Show My Response'));
	$result .= html_writer::tag('input', '', array('type' => 'button', 'id' => 'correctanswer'.$qa->get_slot(), 'value' => 'Show Correct Answer'));
	$result .= html_writer::tag('BR', '', array());
	
	}

        $toreplaceid = 'applet'.$qa->get_slot();
       /* $toreplace = html_writer::tag('span',
                                      get_string('enablejavaandjavascript', 'qtype_easyofischer'),
                                      array('id' => $toreplaceid)); */

        if ($placeholder) {
	
            $toreplace = html_writer::tag('span',
                                      get_string('enablejavaandjavascript', 'qtype_easyofischer'),
                                      array('class' => 'ablock'));
            $questiontext = substr_replace($questiontext,
                                            $toreplace,
                                            strpos($questiontext, $placeholder),
                                            strlen($placeholder));
        }

        $result .= html_writer::tag('div', $questiontext, array('class' => 'qtext'));



/////crl
//$result .= html_writer::tag('textarea', "every page here");

	
    /*    if (!$placeholder) {
            $answerlabel = html_writer::tag('span', get_string('answer', 'qtype_easyofischer', ''),
                                            array('class' => 'answerlabel'));
            $result .= html_writer::tag('div', $answerlabel.$toreplace, array('class' => 'ablock'));


        }*/
	
        if ($qa->get_state() == question_state::$invalid) {
            $lastresponse = $this->get_last_response($qa);
            $result .= html_writer::nonempty_tag('div',
                                                $question->get_validation_error($lastresponse),
                                                array('class' => 'validationerror'));
 
	
       }
	

		/////read structure into divs
		if ($options->readonly) {
		    //$currentanswer = $qa->get_last_qt_var('answer');


		$jsmodule = array(
            'name'     => 'qtype_easyofischer',
            'fullpath' => '/question/type/easyofischer/module.js',
            'requires' => array(),
            'strings' => array(
                array('enablejava', 'qtype_easyofischer')
            )
        );
		$moodleroot = $CFG->wwwroot;
	$PAGE->requires->js_init_call('M.qtype_easyofischer2.insert_structure_into_applet',
                                      array($qa->get_slot(), $numofstereo, $moodleroot),		
                                      true,
                                      $jsmodule);


$this->page->requires->js_init_call('M.qtype_easyofischer.init_showmyresponse', array($CFG->version, $qa->get_slot(), $numofstereo, $moodleroot));

$this->page->requires->js_init_call('M.qtype_easyofischer.init_showcorrectanswer', array($CFG->version, $qa->get_slot(), $numofstereo, $moodleroot));





		    //echo "current_answer".$currentanswer;
		//$stripped_answer_id="stripped_answer".$qa->get_slot();
		//$result .= html_writer::tag('textarea', $currentanswer, array('id' => $stripped_answer_id, 'style' => 'display:none;','name' => $stripped_answer_id));

//		echo "current ans=".$currentanswer;
	//echo "HEREEEEE";
		    
$result .= html_writer::tag('div', get_string('youranswer', 'qtype_easyofischer', ''), array('class' => 'qtext'));

$answer = $question->get_correct_response();

///buttons to show correct and user answers
		$result .= html_writer::tag('textarea', $qa->get_last_qt_var('answer'), array('id' => $myanswer_id, 'name' => 'my_answer', 'style' => 'display:none;'));

		$result .= html_writer::tag('textarea', $answer['answer'], array('id' => $correctanswer_id, 'name' => 'correct_answer', 'style' => 'display:none;'));


		}

        $result .= html_writer::tag('div',
                                    $this->hidden_fields($qa),
                                    array('class' => 'inputcontrol')); 

	if($options->readonly){
	
		echo $CFG->dirroot;
		$temp = file_get_contents($CFG->dirroot .'/question/type/easyofischer/fischer'.$numofstereo.'.html');
		$temp = str_replace("slot", $qa->get_slot(), $temp);
		$result .= $temp;
		//$result .= "</div></html>";




	}
	else{


		$temp = file_get_contents($CFG->dirroot .'/question/type/easyofischer/fischer'.$numofstereo.'.html');
		$temp = str_replace("slot", $qa->get_slot(), $temp);
		$result .= $temp;

		$temp = file_get_contents($CFG->dirroot .'/question/type/easyofischer/fischer_dragable.html');
		$temp = str_replace("slot", $qa->get_slot(), $temp);
		$result .= $temp;
		//$result .= "</div></html>";


	}


        $this->require_js($qa, $options->readonly, $options->correctness, $numofstereo);

        return $result;
    }













  // protected function require_js($toreplaceid, question_attempt $qa, $readonly, $correctness, $appletoptions) {

    protected function require_js(question_attempt $qa, $readonly, $correctness, $numofstereo) {
        global $PAGE;

        $jsmodule = array(
            'name'     => 'qtype_easyofischer',
            'fullpath' => '/question/type/easyofischer/module.js',
            'requires' => array(),
            'strings' => array(
                array('enablejava', 'qtype_easyofischer')
            )
        );
        $topnode = 'div.que.easyofischer#q'.$qa->get_slot();
        //$appleturl = new moodle_url('appletlaunch.jar');
	
        if ($correctness) {
            $feedbackimage = $this->feedback_image($this->fraction_for_last_response($qa));
        } else {
            $feedbackimage = '';
        }
	//echo "HHHHEREEEEERREE";
        //$name = 'easyofischer'.$qa->get_slot();
        //$appletid = 'easyofischer'.$qa->get_slot();
	$stripped_answer_id="stripped_answer".$qa->get_slot();
        $PAGE->requires->js_init_call('M.qtype_easyofischer.insert_easyofischer_applet',
                                      array($topnode,$numofstereo,
                                            $feedbackimage,
                                            $readonly,
					    $stripped_answer_id,$qa->get_slot()),
                                      false,
                                      $jsmodule);
    }

    protected function fraction_for_last_response(question_attempt $qa) {
        $question = $qa->get_question();
        $lastresponse = $this->get_last_response($qa);
        $answer = $question->get_matching_answer($lastresponse);
        if ($answer) {
            $fraction = $answer->fraction;
        } else {
            $fraction = 0;
        }
        return $fraction;
    }


    protected function get_last_response(question_attempt $qa) {
        $question = $qa->get_question();
        $responsefields = array_keys($question->get_expected_data());
        $response = array();
        foreach ($responsefields as $responsefield) {
            $response[$responsefield] = $qa->get_last_qt_var($responsefield);
        }
        return $response;
    }

    public function specific_feedback(question_attempt $qa) {
        $question = $qa->get_question();

        $answer = $question->get_matching_answer($this->get_last_response($qa));
        if (!$answer) {
            return '';
        }

        $feedback = '';
        if ($answer->feedback) {
            $feedback .= $question->format_text($answer->feedback, $answer->feedbackformat,
                    $qa, 'question', 'answerfeedback', $answer->id);
        }
        return $feedback;
    }

    public function correct_response(question_attempt $qa) {
        $question = $qa->get_question();

        $answer = $question->get_matching_answer($question->get_correct_response());
        if (!$answer) {
            return '';
        }

//        return get_string('correctansweris', 'qtype_easyofischer', s($answer->answer));
        return get_string('correctansweris', 'qtype_easyofischer', s($answer->answer));


    }

    protected function hidden_fields(question_attempt $qa) {
        $question = $qa->get_question();

        $hiddenfieldshtml = '';
        $inputids = new stdClass();
        $responsefields = array_keys($question->get_expected_data());
        foreach ($responsefields as $responsefield) {
            $hiddenfieldshtml .= $this->hidden_field_for_qt_var($qa, $responsefield);
        }
        return $hiddenfieldshtml;
    }
    protected function hidden_field_for_qt_var(question_attempt $qa, $varname) {
        $value = $qa->get_last_qt_var($varname, '');
        $fieldname = $qa->get_qt_field_name($varname);
        $attributes = array('type' => 'hidden',
                            'id' => str_replace(':', '_', $fieldname),
                            'class' => $varname,
                            'name' => $fieldname,
                            'value' => $value);
        return html_writer::empty_tag('input', $attributes);
    }
}
