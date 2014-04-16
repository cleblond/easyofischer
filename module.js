M.qtype_easyofischer = {
    insert_easyofischer_applet: function(Y, topnode, numofstereo, feedback, readonly, stripped_answer_id, slot) {

        var inputdiv = Y.one(topnode);
        inputdiv.ancestor('form').on('submit', function() {
            var iterations = 2 * numofstereo + 2;
            var arr = new Array(iterations);
            for (var i = 0; i < iterations; i++) {
                if (document.getElementById('apos' + i + slot).value != '') {
                    arr[i] = document.getElementById('apos' + i + slot).value;
                    arr[i] = arr[i].substring(0, arr[i].length - 1) + '6';
                } else {
                    arr[i] = 'h6'
                }
            }
            textfieldid = topnode + ' input.answer';
            orderstring = arr.join("-");
            Y.one(topnode + ' input.answer').set('value', orderstring);
            Y.one(topnode + ' input.mol').set('value', orderstring);
        }, this);
    }
}


M.qtype_easyofischer2 = {
    insert_structure_into_applet: function(Y, slot, numofstereo, moodleroot) {
        var textfieldid = 'my_answer1';
        if (document.getElementById(textfieldid).value != '') {
            var s = document.getElementById(textfieldid).value;
            console.log(s);
            var groups = s.split("-");
            //console.log('here');
            //console.log(groups);
            for (var i = 0; i <= groups.length - 1; i++) {
                //document.write(cars[i] + "<br>");
                var elem = document.createElement("img");
                group = groups[i];
                trimgroup = group.substring(0, group.length - 1);
                elem.setAttribute("src", moodleroot + "/question/type/easyofischer/pix/" + trimgroup + ".png");
                elem.setAttribute("id", group);
                elem.setAttribute("height", "30");
                elem.setAttribute("width", "40");
                console.log('slot' + slot);
                document.getElementById("pos" + i + slot).appendChild(elem);
                document.getElementById("apos" + i + slot).value = group;
                //console.log('trim'+i+trimgroup);
            }
            //document.MSketch.setMol(s, 'cxsmiles');
        }
    }
}


M.qtype_easyofischer.init_showmyresponse = function(Y, moodle_version, slot, numofstereo, moodleroot) {
    var handleSuccess = function(o) {};
    var handleFailure = function(o) { /*failure handler code*/
        };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }
    var refreshBut = Y.one("#myresponse" + slot, slot, numofstereo);
    refreshBut.on("click", function() {
        //	var xmlStr = document.getElementById('my_answer'+slot).value;
        var textfieldid = 'my_answer1';
        if (document.getElementById(textfieldid).value != '') {
            var s = document.getElementById(textfieldid).value;
            //console.log(numofstereo);
            var groups = s.split("-");
            //	console.log(groups);
            var positions = 2 * numofstereo + 2;
            //console.log('positions='+positions);
            for (var i = 0; i < positions; i++) {
                //document.write(cars[i] + "<br>");
                var elem = document.createElement("img");
                div = document.getElementById('pos' + i + slot);
                div.innerHTML = '';
                group = groups[i];
                trimgroup = group.substring(0, group.length - 1);
                elem.setAttribute("src", moodleroot + "/question/type/easyofischer/pix/" + trimgroup + ".png");
                elem.setAttribute("id", group);
                elem.setAttribute("height", "30");
                elem.setAttribute("width", "40");
                document.getElementById("pos" + i + slot).appendChild(elem);
                document.getElementById("apos" + i + slot).value = group;
            }
        }
    });
};


M.qtype_easyofischer.init_showcorrectanswer = function(Y, moodle_version, slot, numofstereo, moodleroot) {
    var handleSuccess = function(o) {};
    var handleFailure = function(o) { /*failure handler code*/
        };
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    };
    if (moodle_version >= 2012120300) { //Moodle 2.4 or higher
        YAHOO = Y.YUI2;
    }
    var refreshBut = Y.one("#correctanswer" + slot, slot, numofstereo);
    refreshBut.on("click", function() {
        //	var xmlStr = document.getElementById('my_answer'+slot).value;
        var textfieldid = 'correct_answer' + slot;
        if (document.getElementById(textfieldid).value != '') {
            var s = document.getElementById(textfieldid).value;
            //	console.log(s);
            var groups = s.split("-");
            //	console.log(groups);
            var positions = 2 * numofstereo + 2;
            for (var i = 0; i < positions; i++) {
                //document.write(cars[i] + "<br>");
                var elem = document.createElement("img");
                //delete existing image
                div = document.getElementById('pos' + i + slot);
                div.innerHTML = '';
                group = groups[i];
                trimgroup = group.substring(0, group.length - 1);
                elem.setAttribute("src", moodleroot + "/question/type/easyofischer/pix/" + trimgroup + ".png");
                elem.setAttribute("id", group);
                elem.setAttribute("height", "30");
                elem.setAttribute("width", "40");
                document.getElementById("pos" + i + slot).appendChild(elem);
                document.getElementById("apos" + i + slot).value = group;
            }
        }
    });
};
