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


M.qtype_easyonewman.dragndrop = function(Y, slot){

YUI().use('dd-drag', 'dd-constrain', 'dd-proxy', 'dd-drop', function(Y) {

    //Listen for all drag:drag events
    Y.DD.DDM.on('drag:drag', function(e) {
        //Get the last y point
        var y = e.target.lastXY[1];
        //is it greater than the lastY var?
        if (y < lastY) {
            //We are going up
            goingUp = true;
        } else {
            //We are going down.
            goingUp = false;
        }
        //Cache for next check
        lastY = y;
    });
    //Listen for all drag:start events
    Y.DD.DDM.on('drag:start', function(e) {
        //Get our drag object
        
   var drag = e.target;
        //Set some styles here
        drag.get('node').setStyle('opacity', '.25');

        drag.get('dragNode').set('innerHTML', drag.get('node').get('innerHTML'));
        drag.get('dragNode').setStyles({
            opacity: '.5',
            borderColor: drag.get('node').getStyle('borderColor'),
            backgroundColor: drag.get('node').getStyle('backgroundColor')
        });


    });
    //Listen for a drag:end events
    Y.DD.DDM.on('drag:end', function(e) {

        var drag = e.target;
        drag.get('node').setStyles({
            visibility: '',
            opacity: '1'
        }); 
    });


    Y.DD.DDM.on('drop:hit', function(e) {
	var drop = e.drop.get('node'),
            drag = e.drag.get('node');
        var flag = false;
    });



    //Listen for all drag:drophit events
    Y.DD.DDM.on('drag:drophit', function(e) {
        var drop = e.drop.get('node'),
            drag = e.drag.get('node');
            drop.get('childNodes').remove();
            drop.appendChild(drag);
            var idhand = drop.get('id');
            if(idhand.charAt(0) === 'e'){
            var idhand = idhand.substr(1);
	    }
            document.getElementById('a'+idhand).value=drag.get('id');
        
    });
    
    //Static Vars
    var goingUp = false, lastY = 0;
    var nextsibling = '';
    var dragparentid = '';

    //Get the list of img's and make them draggable

    var lis = Y.Node.all('.dragableimg');
    lis.each(function(v, k) {
        var dd = new Y.DD.Drag({
            node: v,
            target: {
                padding: '0 0 0 20'
            }
        }).plug(Y.Plugin.DDProxy, {
            moveOnEnd: false,
            cloneNode: true,
        }).plug(Y.Plugin.DDConstrained, {
        });
    }); 


    var uls = Y.Node.all('.dropablediv');
    uls.each(function(v, k) {
        var tar = new Y.DD.Drop({
            node: v
        });
    });
    
});


};

