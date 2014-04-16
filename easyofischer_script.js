function getSmiles(textfieldid) {
    document.getElementById(textfieldid).value = document.getElementById('EASYOFISCHER' + textfieldid).smiles();
}


function getSmilesEdit(buttonname, numofstereo) {
    var buttonnumber = buttonname.slice(7, -1);
    //console.log(numofstereo);
    var answerstring = '';
    numofstereo = document.getElementById('id_numofstereo').value;
    //if(isset(document.getElementById('id_numofstereo').value
    var iterations = 2 * numofstereo + 2;
    var arr = new Array(iterations);
    //console.log('its='+iterations);
    for (var i = 0; i < iterations; i++) {
        //var pos = document.getElementById('apos0').value;
        if (document.getElementById('apos' + i).value != '') {
            arr[i] = document.getElementById('apos' + i).value;
            arr[i] = arr[i].substring(0, arr[i].length - 1) + '6';
        } else {
            arr[i] = 'h6'
        }
        //console.log(pos);
        //console.log(buttonnumber);
        //pos2=pos.substring(0, pos.length - 1)+'6';
        //answerstring = answerstring + '-' + pos2;
        //console.log(answerstring);
    }
    textfieldid = 'id_answer_' + buttonnumber;
    document.getElementById(textfieldid).value = arr.join("-");
    //	alert('here');
}
M.qtype_easyofischer = {
    insert_structure_into_applet: function(Y, numofstereo) {
        var textfieldid = 'id_answer_0';
        if (document.getElementById(textfieldid).value != '') {
            //console.log('stereo'+numofstereo);
            var s = document.getElementById(textfieldid).value;
            //console.log(s);
            var positions = 2 * numofstereo + 2;
            var groups = s.split("-");
            //console.log(groups);
            for (var i = 0; i < positions; i++) {
                //document.write(cars[i] + "<br>");
                var elem = document.createElement("img");
                group = groups[i];
                trimgroup = group.substring(0, group.length - 1);
                elem.setAttribute("src", "type/easyofischer/pix/" + trimgroup + ".png");
                elem.setAttribute("id", group + i);
                elem.setAttribute("height", "30");
                elem.setAttribute("width", "40");
                document.getElementById("pos" + i).appendChild(elem);
                document.getElementById("apos" + i).value = group;
            }
            //document.MSketch.setMol(s, 'cxsmiles');
        }
    }
}
M.qtype_easyofischer.init_reload = function(Y, url, htmlid) {
    var handleSuccess = function(o) {
            //fischer_template.innerHTML = '';
            //selected = document.getElementById('id_stagoreclip').value;
            //console.log(selected);
            fischer_template.innerHTML = o.responseText;
            M.qtype_easyofischer.insert_structure_into_applet(Y, document.getElementById('id_numofstereo').value);
            M.qtype_easyofischer.dragndrop(Y, document.getElementById('id_numofstereo').value);
            //div.innerHTML = "<li>JARL!!!</li>";
        }
    var handleFailure = function(o) { /*failure handler code*/
        }
    var callback = {
        success: handleSuccess,
        failure: handleFailure
    }
    var button = Y.one("#id_numofstereo");
    button.on("change", function(e) {
        div = Y.YUI2.util.Dom.get(htmlid);
        Y.use('yui2-connection', function(Y) {
            newurl = url + document.getElementById('id_numofstereo').value;
            //console.log(newurl);
            Y.YUI2.util.Connect.asyncRequest('GET', newurl, callback);
        });
    });
};


M.qtype_easyofischer.dragndrop = function(Y, slot) {
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
            if (idhand.charAt(0) === 'e') {
                var idhand = idhand.substr(1);
            }
            document.getElementById('a' + idhand).value = drag.get('id');
        });
        //Static Vars
        var goingUp = false,
            lastY = 0;
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
            }).plug(Y.Plugin.DDConstrained, {});
        });
        var uls = Y.Node.all('.dropablediv');
        uls.each(function(v, k) {
            var tar = new Y.DD.Drop({
                node: v
            });
        });
    });
};

