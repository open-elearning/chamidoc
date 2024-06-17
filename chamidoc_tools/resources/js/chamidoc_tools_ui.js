
console.log('Chamidoc Tools is active ' + _p['chamiloversion']);

var versionCBT = 40;
var mooCompati = false;

function installInPageChalkBoard(){
    
    if (window.jQuery) {

        var btnLength = $("#ul_resource_tab").length;
        var ress = $("#resource_tab").find(".tab-content").first();

        if (btnLength>0&&ress.length>0) {
            if ($("#resource_tabtools").length==0) {

                var tb = '<li role="presentation" style="cursor:pointer;" class="" >';
                tb += '<a onClick="showTabTools();" role="tab" data-toggle="tab" ';
                tb += ' id="resource_tabtools">';
                tb += '<img src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/c_tools.png?v=39" ';
                tb += ' alt="Chamidoc Tools" title="Chamidoc Tools" >';
                tb += '</a></li>';
                $("#ul_resource_tab").append(tb);

                var tbc = '<div id="resource_tab-tools" class="tab-pane" role="tabpanel" >';
                
                tbc += '<div class="blocChalkBoard tmpChalkBoardA"  >';
                tbc += '<img style="position:relative;left:30px;top:15px;width:80px;height:80px;" ';
                tbc += ' src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/loadtable.svg" />';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardB" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardC" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardD" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardE" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardF" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardG" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';
                tbc += '<div class="blocChalkBoard tmpChalkBoardH" style="display:none;" >';
                tbc += '<div class="titleChalkBoard" >...</div></div>';

                tbc += '</div>';
                ress.append(tbc);

              
                $("#resource_tab3").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/links.png');
                $("#resource_tab4").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/works.png');
                $("#resource_tab5").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/forums.png');
                $("#resource_tab6").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/add_learnpath_section.png');
                
                if ($("#resource_tab8").length>0) {
                    var src8 = $("#resource_tab8").find("img").attr("src");
                    if (src8.indexOf('flag_')!=-1) {
                        $("#resource_tab8").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/flag_checkered.png');
                    }
                }
                if ($("#resource_tab7").length>0) {
                    var src7 = $("#resource_tab7").find("img").attr("src");
                    if (src7.indexOf('h5p_')!=-1) {
                        $("#resource_tab7").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/plugin_h5p_import_upload.png');
                    }
                    if (src7.indexOf('flag_')!=-1) {
                        $("#resource_tab7").find("img").attr("src",_p['web_plugin'] +'chamidoc_tools/resources/img/flag_checkered.png');
                    }
                }

                $("#resource_tab3").find("img").css('width','auto');
                $("#resource_tab4").find("img").css('width','auto');
                $("#resource_tab5").find("img").css('width','auto');
                $("#resource_tab6").find("img").css('width','auto');

                var rt = '<div class="panel-group" id="rapid_studio" >';
                rt += '<div class="panel panel-default" id="scorm-list">';
                rt += '<div class="panel-heading" role="tab">';
                rt += '<h4 class="panel-title"><a role="button" >Ajout rapide</a></h4>';
                rt += '</div>';
                rt += '<div id="scorm-list-collapse" class="panel-collapse collapse in " role="tabpanel">';
                rt += '<div class="panel-body">';

                rt += '<div style="text-align:center;" >';
                rt += '<div class="btn-group">';

                rt += '<a title="Ajouter une vidéo" onClick="showVideoManagerToObject();" href="#" class="bloc_decrease_font btn btn-default">';
                rt += '<em style="font-size:18px;" class="fa fa-video-camera"></em>';
                rt += '</a>';
                
                 /* rt += '<a title="Charger un élément" onClick="showUploadManagerToObject();"  href="#" class="bloc_reset_font btn btn-default">';
                rt += '<em style="font-size:18px;" class="fa fa-upload" ></em>';
                rt += '</a>';*/
                // showUploadManagerToObject()

                rt += '<a title="Ajouter un objet" onClick="showTabTools();" href="#" class="bloc_increase_font btn btn-default">';
                rt += '<em style="font-size:18px;" class="fa fa-cube"></em>';
                rt += '</a>';

                rt += '</div>';
                rt += '</div>';

                rt += '</div>';
                rt += '</div>';
                rt += '</div>';
                rt += '</div>';

                //$("#lp_sidebar").append(rt);

                $("#lp_sidebar > .panel-group").after(rt);

            }
        }
        
    }
    if (mooCompati==false) {
        setTimeout(function(){installInPageChalkBoard();},500);
    }

}
setTimeout(function(){installInPageChalkBoard();},250);

function processFormChalkBoard(nameType){
    processObjectChalkBoard(nameType,'');
}

function processObjectChalkBoard(nameType,urldata){
    
    var tbc = '<center><br>';
    tbc += '<img style="width:150px;height:150px;" src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/loadtable.svg" ';
    tbc += ' alt="Chalkboard" title="Chalkboard" />';
    tbc += '</center>';
    $("#resource_tab-tools").html(tbc);
    
    var directoryparentid = $('select[name="directory_parent_id"]').val();

    var lpid = ChamiloStudioTopGetParam('lp_id');
    var cidReq = ChamiloStudioTopGetParam('cidReq');
    var urlpath = _p['web_plugin'] +'chamidoc_tools/resources/ajax/addItem.php';
    urlpath += '?typec=' + nameType ;
    urlpath += '&lpid=' + lpid;
    urlpath += "&cidReq=" + cidReq;
    urlpath += "&directoryparentid=" + directoryparentid;
    urlpath += "&urldata=" + encodeURI(urldata);

    $.ajax({
        url : urlpath,cache : false
	}).done(function(codeHtml){
        //alert(codeHtml);
        if(codeHtml.indexOf("http")!=-1){
            window.location = codeHtml;
        }
    });

}

function ChamiloStudioTopGetParam(param){
	
	var u = window.top.location.href;
	var reg = new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches = u.match(reg);
	
	if(matches==null){return '';}
	
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	
	for (var i=100; i > -1; i--){
		vari=vari.replace('#page' + i,'');
	}
	return vari;
	
}

function showTabTools(){

    $("#resource_tab-1").removeClass("active");
    $("#resource_tab-2").removeClass("active");
    $("#resource_tab-3").removeClass("active");
    $("#resource_tab-4").removeClass("active");
    $("#resource_tab-5").removeClass("active");
    $("#resource_tab-6").removeClass("active");
    $("#resource_tab-7").removeClass("active");
    $("#resource_tab-tools").addClass("active");
    
    setTimeout(function(){$(".tmpChalkBoardB").css('display','block');},200);
    setTimeout(function(){$(".tmpChalkBoardC").css('display','block');},400);
    setTimeout(function(){$(".tmpChalkBoardD").css('display','block');},600);
    setTimeout(function(){$(".tmpChalkBoardE").css('display','block');},800);
    setTimeout(function(){$(".tmpChalkBoardF").css('display','block');},1000);
    setTimeout(function(){$(".tmpChalkBoardG").css('display','block');},1200);
    setTimeout(function(){$(".tmpChalkBoardH").css('display','block');},1400);

    loadChalkBoard();

    if (typeof inclusiveHidePanel === "function") { 
        inclusiveHidePanel();
    }
    $("#doc_form > .alert-info").css("display","none");

}

function adaptListTools(){

    if (cleanTxtBs("option_3")=="") {
        $(".predefchamilostudio3").css("display","none");
    } else {
        $(".predefchamilostudio3").css("display","block");
    }

    if (cleanTxtBs("option_4")=="") {
        $(".predefchamilostudio4").css("display","none");
    } else {
        $(".predefchamilostudio4").css("display","block");
    }
    if (cleanTxtBs("option_5")=="") {
        $(".predefchamilostudio5").css("display","none");
    } else {
        $(".predefchamilostudio5").css("display","block");
    }
    if (cleanTxtBs("option_6")=="") {
        $(".predefchamilostudio6").css("display","none");
    } else {
        $(".predefchamilostudio6").css("display","block");
    }
    if (cleanTxtBs("option_7")=="") {
        $(".predefchamilostudio7").css("display","none");
    } else {
        $(".predefchamilostudio7").css("display","block");
    }
    setTimeout(function(){adaptListTools();},250);

}

function loadChalkBoard(){
    
    var urlpath = _p['web_plugin'] +'chamidoc_tools/resources/ajax/getTools.php';

    $.ajax({
        url : urlpath,
        cache : true
	}).done(function(codeHtml){
        $('#resource_tab-tools').html(codeHtml);
        getListStoreInstall();
    });

}


function loadcChalkboardToolsObjects(){
    insertExtrasObjectsWindows();
    $(".cke_dialog_background_cover").css('display','block');
    $("#innerEditCoolDocs").css("display","none");
    $("#extrasobjectwindows").css('display','block');
}

var actualDataChalkboard = '';
var futurDataChalkboard = '';
var memoryDataChalkboard = '';
var typePlugChalkboard = '';

var actualDisplayTitle = false;
var displayExtraButtons = false;

var oneTimeUpdate = false;
var twoTimeUpdate = false;

function detectChalkboardDocument() {
    
    var btnLength = $(".cke_button__source").length;
    var btnLengthMoo = $(".atto_link_button_unlink").length;

    if (btnLength>0||btnLengthMoo>0) {
        
        if (actualDataChalkboard=="") {
            
            var codeHtml = getDocumentTxt();

            if (codeHtml.indexOf("chalkboardguid:")!=-1) {

                if (codeHtml.indexOf("displaytitlechalk")!=-1) { 
                    actualDisplayTitle = true;
                }

                if (codeHtml.indexOf("displayextrabuttonschalk")!=-1) { 
                    displayExtraButtons = true;
                }

                $("#cke_content_lp").css("display","none");
                $("#cke_editor_content_lp").css("display","none");
                
                $("button[name='submit_button']").first().css("display","none");
                $(".lp-add-item").css("display","none");

                $("label[for='previous']").parent().css("display","none");
                
                var clueDom = $(".editor-lp");
                //class="form-group" 
                if(clueDom.length>0){
                    clueDom.before('<div class="form-group" id="interface-contain" >Load</div>');
                    var tbc = '<div class="col-sm-2" >.</div><div id="interface-load" class="col-sm-10" ></div>';
                    $("#interface-contain").html(tbc);
                    var timg = '<p style="text-align:center;" ><img src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/loadtable.gif" alt="Chalkboard" title="Chalkboard" /></p>';
                    $("#interface-load").html(timg);
                    $("legend").prepend("<img src='"+ _p['web_plugin'] + "chamidoc_tools/resources/img/chalkboard_icon.png' />&nbsp;");

                    clueDom.after('<a id="interface-params" onClick="showParamsChalkboard();" style="float:right;cursor:pointer;" >...</a>')

                    $("body").append("<table style='position:fixed;left:-1500px;top:-150px;' ><tr><td id='tablesizetopinner' ></td></tr></table>");
                    $("body").append("<table style='position:fixed;left:-1500px;top:-150px;' ><tr><td id='tablesizebotinner' ></td></tr></table>");
                    
                }
                
                $(codeHtml).filter("div").each(function( index ) {
                    var extractId = $(this).attr("id");
                    if (extractId=="optiontop") {
                        option_top_txt = cleanEmptyHtml($(this).html());
                    }else if (extractId=="optionbot") {
                        option_bot_txt = cleanEmptyHtml($(this).html());
                    }
                });

                $(codeHtml).filter("p").each(function( index ) {
                   var extractVal = $(this).text();
                   if (extractVal.indexOf("chalkboardguid:")!=-1) {
                        actualDataChalkboard = extractVal;
                        loadInterfaceChalkboard();
                    }
                });

            }
            
        }  
    
    } else {

        setTimeout(function(){ 
            detectChalkboardDocument();
        },350);
    
    }

}
setTimeout(function(){detectChalkboardDocument();},250);

function getDocumentTxt() {

    var codeHtml = "";
    if (mooCompati==false) {
        if (CKEDITOR) {
            if(CKEDITOR.instances.content_lp) {
                codeHtml = CKEDITOR.instances.content_lp.getData();
            }
        }
    }
    if (codeHtml=="") {
        var oelModLength = $("#id_openelearningstudio").length;
        if (oelModLength>0) {
            codeHtml = $("#id_openelearningstudio").html();
            codeHtml = codeHtml.replace(/&lt;/g,"<");
            codeHtml = codeHtml.replace(/&gt;/g,">");
            mooCompati = true;
        }
    }
    if (codeHtml==""&&mooCompati==false) {
        if (CKEDITOR) {
            var editorI = CKEDITOR.instances['content_lp'];
            if (editorI) {
                codeHtml = editorI.getData();
            }
        }
    }
    return codeHtml;

}

function setDocumentTxt(contH) {

    if (mooCompati==false) {
        if (CKEDITOR) {
            var editorI = CKEDITOR.instances['content_lp'];
            if (editorI) {
                editorI.setData(contH);
            }
        }
    }

    if (mooCompati) {
        var btnLength = $("#id_openelearningstudio").length;
        if (btnLength > 0) {
            $("#id_openelearningstudioeditable").html(contH);
            $("#id_openelearningstudio").html(contH);
        }
    }

}

function showParamsChalkboard(){
    $("#interface-params").css("display","none");
    $("#cke_content_lp").css("display","");
    $("#cke_editor_content_lp").css("display","");
    $(".hide-ctrlstudio").css("display","");
}

var option_top_txt = "";
var option_bot_txt = "";
var memoryoption_top_txt = "";
var memoryoption_bot_txt = "";
var memoryoption_title_txt = "";

function loadInterfaceChalkboard(){

    typePlugChalkboard = getTypeChalkboard();
    var urlpath = _p['web_plugin'] +'chamidoc_tools/plug/' + typePlugChalkboard + '/interface.php';

    $.ajax({
        url : urlpath,
        cache : true
	}).done(function(codeHtml){
        
        $("label[for='form_extra_no_automatic_validation']").html('Block Progress')
        
        var displayBloc = " style='display:none;' ";
        if (option_top_txt!="") {
            displayBloc = " style='display:block;' ";
        }
        var editHtml  = '';
        editHtml += '<div class="col-sm-12" >';
        editHtml += '<div><input style="margin-left:90px;" type="checkbox" ';
        editHtml += ' onChange="oneTimeUpdate=true;" id="displaytitle" name="displaytitle" ';
        if (actualDisplayTitle) {
            editHtml += 'checked>';
        } else {
            editHtml += ' >';
        }
        editHtml += '<label style="cursor:pointer;" for="displaytitle">&nbsp;&nbsp;Studio Style</label>';

        editHtml += '<input style="margin-left:20px;" type="checkbox" ';
        editHtml += ' onChange="oneTimeUpdate=true;" id="displayextrabuttons" name="displayextrabuttons" ';
        if (displayExtraButtons) {
            editHtml += 'checked>';
        } else {
            editHtml += ' >';
        }
        editHtml += '<label style="cursor:pointer;" for="displayextrabuttons">&nbsp;&nbsp;Studio Navigation</label>';
        editHtml += '</div><br/></div>';

        editHtml += '<div class="form-group option_top_txt" '+displayBloc+' >';

        editHtml += '<div class="col-sm-12" >';
        editHtml += '<textarea id="content_option_top" name="content_option_top" class="ckeditor"></textarea>';
        editHtml += '</div>';
        
        editHtml += '</div>';

        if (displayBloc.indexOf("display:none")!=-1&&mooCompati==false) {
            editHtml += '<div class="btnAddText btn_top" onClick="showTopTxt();"  ></div>';
        }
        
        editHtml += '<div class="blocSeparatorLineBlue col-sm-12" ></div>';

        $("#interface-contain").before(editHtml);
        $("#interface-contain").html(codeHtml);
        var editHtml2  = '<div class="blocSeparatorLineBlue col-sm-12" ></div>';

        displayBloc = " style='display:none;' ";
        if (option_bot_txt!="") {
            displayBloc = " style='display:block;' ";
        }else{
            if (mooCompati==false) {
                editHtml2 += '<div class="btnAddText btn_bottom"  onClick="showBottomTxt();" ></div>';
            }
        }
        
        editHtml2 += '<div class="form-group option_bottom_txt" '+displayBloc+' >';

        editHtml2 += '<div class="col-sm-12" >';
        editHtml2 += '<textarea id="content_option_bottom" name="content_option_bottom" class="ckeditor"></textarea>';
        editHtml2 += '</div>';

        editHtml2 += '</div>';

        $("#interface-contain").after(editHtml2);

        processTraductionChalk();
        
        loadInputChalkboard();
        loadEditorHtml();
        loopInterfaceChalkboard();
        
        if (mooCompati==false) {
            if (_p['chamiloversion']=="1.11.2") {
                initCKEEditorMini('content_option_top',true);
                initCKEEditorMini('content_option_bottom',true);
            } else {
                initCKEEditorMini('content_option_top',false);
                initCKEEditorMini('content_option_bottom',false);
            }
        }

        if (typePlugChalkboard=='gameimageactive') {
            loadExtrasTools();
            loadExtrasZonesA();
        }
        if (typePlugChalkboard=='quizzacademy') {
            hideAllControls();
        }
        if (typePlugChalkboard=='quota'
            &&typePlugChalkboard=='videocondition'
            &&typePlugChalkboard=='videoscreenlock') {
            hideStyleControls();
        }

        setTimeout(function(){adaptListTools();},250);

    });
    
}

function hideAllControls(){
    $("#displaytitle").parent().css("visibility",'hidden');
    $(".btn_top").css("visibility",'hidden');
    $(".btn_bottom").css("visibility",'hidden');
    $("#extra_no_automatic_validation-group").css("visibility",'hidden');
    $("#extra_no_automatic_validation-group").css("display",'none');
}

function hideStyleControls(){
    //Chalkboard Page Style
    $("#displaytitle").parent().css("visibility",'hidden');
    $("#displaytitle").parent().css("display",'none');
}

function initCKEEditorMini(idTxtArea,low){

    if (mooCompati) {
        return false;
    }
    if (low) {
        
        CKEDITOR.replace(idTxtArea,
            { "toolbar_minToolbar": 
                [   
                    ["Undo","Link","Image","BulletedList"],
                    [ "JustifyLeft", "JustifyCenter"],
                    ["Format", "Bold", "Italic", "Underline", "TextColor","Source" ]
                ]
            });

    } else {

        CKEDITOR.replace(idTxtArea,
            { "toolbar_minToolbar": 
                [   
                    ["Undo","Link","Image","BulletedList"],
                    [ "JustifyLeft", "JustifyCenter"],
                    ["Format", "Bold", "Italic", "Underline", "TextColor","Source" ]
                ],
                "customConfig": _p['web_main'] + "inc/lib/javascript/ckeditor/config_js.php?cidReq=" + ChalkGetParamValue('cidReq') + "\x26id_session=" + ChalkGetParamValue('id_session') + "\x26gidReq=0\x26gradebook=0\x26origin=course",
                "extraPlugins": "adobeair,ajax,audio,image2_chamilo,bidi,colorbutton,colordialog,dialogui,dialogadvtab,div,docprops,find,flash,font,iframe,iframedialog,indentblock,justify,language,lineutils,liststyle,newpage,oembed,pagebreak,preview,print,save,selectall,sharedspace,showblocks,smiley,sourcedialog,stylesheetparser,tableresize,templates,uicolor,video,widget,wikilink,wordcount,inserthtml,xml,qmarkersrolls,youtube,mapping,toolbarswitch",
                "removePlugins": 'elementspath,pathitems,wordcount',
                "skin": "moono-lisa",
                "image2_chamilo_alignClasses" : 
                    [
                        "pull-left","text-center", "pull-right", "img-va-baseline", "img-va-top", "img-va-bottom",
                        "img-va-middle", "img-va-super", "img-va-sub", "img-va-text-top", "img-va-text-bottom"
                    ],
                "startupOutlineBlocks": false,
                "resize_enabled": false,
                "width": "100%", "height": "200", 
                "CreateDocumentWebDir": _p['web'] + "courses/" + ChalkGetParamValue('cidReq') + "/document/",
                "fullPage": false, "CreateDocumentDir": "../../",
                "style": false,"language": "en","uiColor" : "#FBFCFC"
            });
            
    }

    
    if (idTxtArea=='content_option_top') {
        var ckTop =  CKEDITOR.instances.content_option_top;
        if (ckTop) {
            ckTop.setData(correctCoursePath(option_top_txt));
            ckTop.on('change', function() { 
                option_top_txt = ckTop.getData();
            });
        }
    }
    if (idTxtArea=='content_option_bottom') {
        var ckBot =  CKEDITOR.instances.content_option_bottom;
        if (ckBot) {
            ckBot.setData(option_bot_txt);
            ckBot.on('change', function() { 
                option_bot_txt = ckBot.getData();
            });
        }
        dynamicCorrectPath();
    }

}

function correctCoursePath(sourceH){
    sourceH = sourceH.replace('="/courses/','="'+_p['web_course']);
    return sourceH;
}

function dynamicCorrectPath(){

    var ckBot =  CKEDITOR.instances.content_option_bottom;
    if (ckBot) {
        var control_bot_txt = ckBot.getData();
        if(control_bot_txt.indexOf('="/courses/')!=-1) {
            control_bot_txt = correctCoursePath(control_bot_txt);
            ckBot.setData(control_bot_txt);
        }
    }

    var ckTop =  CKEDITOR.instances.content_option_top;
    if (ckTop) {
        var control_Top_txt = ckTop.getData();
        if(control_Top_txt.indexOf('="/courses/')!=-1) {
            control_Top_txt = correctCoursePath(control_Top_txt);
            ckTop.setData(control_Top_txt);
        }
    }

    setTimeout(function(){dynamicCorrectPath();},500);

}

function ChalkGetParamValue(param){
	
	var u = document.location.href;
	var reg = new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches = u.match(reg);
	
	if(matches==null){return '';}
	
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	
	for (var i=100; i > -1; i--){
		vari=vari.replace('#page' + i,'');
	}
	return vari;
	
}

function showTopTxt(){
    $(".option_top_txt").css("display","block");
    $(".btn_top").css("display","none");
}

function showBottomTxt(){
    $(".option_bottom_txt").css("display","block");
    $(".btn_bottom").css("display","none");
}

function getTypeChalkboard(){
    var typeS = "turnpages";
    if (actualDataChalkboard.indexOf("chalkboardguid:")!=-1) {
        var data = actualDataChalkboard;
        data = data.replace("chalkboardguid:","");
        data = data.replace(":end","");
       
        if(data.indexOf("@")!=-1){
            var vals = data.split('@');
            if(vals[0]){
                typeS = vals[0];
            }
          
        }
    }
    if(typeS==""){
        typeS = "error";
    }
    return typeS;
}

function loadInputChalkboard(){

    if (actualDataChalkboard.indexOf("chalkboardguid:")!=-1) {
        var data = actualDataChalkboard;
        data = data.replace("chalkboardguid:","");
        data = data.replace(":end","");
        data = data + "@@@@@@@@@";
        if(data.indexOf("@")!=-1){
            var vals = data.split('@');
            for (let pas = 1; pas < 9; pas++) {
                if(vals[pas]){
                    var valsF = vals[pas];
                    valsF = valsF.replace(_p['web'],"[web]-");
                    valsF = valsF.replace(_p['web'],"[web]-");
                    valsF = valsF.replace(_p['web'],"[web]-");
                    valsF = valsF.replace(_p['web'],"[web]-");
                    if($("#option_"+pas).attr('type')=="number"){
                        if (isNaN(valsF)) {
                            valsF = "1";
                        }
                        valsF = parseInt(valsF);
                    }
                    
                    if (getTagNameObj("#option_" + pas)=='textarea') {
                        valsF = valsF.replace(/!br!/g,"\n");
                    }
                    $("#option_"+pas).val(valsF);
                    
                }
            }
        }
    }

}

//save content
function loopInterfaceChalkboard(){

    setTimeout(function(){loopInterfaceChalkboard();},300);
    
    futurDataChalkboard = "chalkboardguid:" + typePlugChalkboard + "@" + cleanTxtBs("option_1");
    
    if (getTagNameObj("#option_2")=='textarea') {
        futurDataChalkboard += "@" + cleanTxtBsTextA("option_2");
    } else {
        futurDataChalkboard += "@" + cleanTxtBs("option_2");
    }
    
    futurDataChalkboard += "@" + cleanTxtBs("option_3");
    futurDataChalkboard += "@" + cleanTxtBs("option_4");
    futurDataChalkboard += "@" + cleanTxtBs("option_5");
    futurDataChalkboard += "@" + cleanTxtBs("option_6");
    futurDataChalkboard += "@" + cleanTxtBs("option_7");
    futurDataChalkboard += "@" + cleanTxtBs("option_8");
    futurDataChalkboard += "@" + cleanTxtBs("option_9");
    futurDataChalkboard += ":end";

    if (memoryoption_title_txt!=$('#idTitle').val()) {
        memoryoption_title_txt = $('#idTitle').val();
        oneTimeUpdate = true;
    }
    if (futurDataChalkboard!=memoryDataChalkboard
        ||memoryoption_bot_txt!=option_bot_txt
        ||memoryoption_top_txt!=option_top_txt) {
        oneTimeUpdate = true;
    }
   
    var codeHtmlCtr = getDocumentTxt();

    if (codeHtmlCtr!='') {
        if (codeHtmlCtr.indexOf("chalkboardtools.js")==-1) {
            oneTimeUpdate = true;
        }
        if (codeHtmlCtr.indexOf("chalkboardtools.css")==-1) {
            oneTimeUpdate = true;
        }
        if (codeHtmlCtr.indexOf("jquery.min.js")==-1) {
            oneTimeUpdate = true;
        }
            
    }
    
    doubleCtrChalkboard();

    if (oneTimeUpdate) {
        
        var ctrEdit = false;

        if (mooCompati==false) {
            var editorI = CKEDITOR.instances['content_lp'];
            if (editorI) {
                ctrEdit = true;
            }
            if (mooCompati==false) {
                editorI.commands.source.exec();
            }
        }
        if (mooCompati) {
            ctrEdit = true;
        }

        if (ctrEdit) {
            
            oneTimeUpdate = false;
            
            var contH = "<html><head></head><body>";
            
            var CdisplTitle = $('input[name=displaytitle]').is(':checked');
            if (CdisplTitle) {
                contH += "<div id='displaytitlechalk' >&nbsp;";
                contH += $('#idTitle').val() + "</div>";
            }

            if (option_top_txt!='') {
                contH += "<div id='optiontop' >" + option_top_txt + "</div>";
            }

            contH += "<p style='color:#F4F6F6;background-color:#F4F6F6;' >" + futurDataChalkboard + "</p>";
            
            if (option_bot_txt!='') {
                contH += "<div id='optionbot' >" + option_bot_txt + "</div>";
            }

            var CdisplButtons = $('input[name=displayextrabuttons]').is(':checked');
            if (CdisplButtons) {
                contH += "<div id=displayextrabuttonschalk >studionavigation</div>";
            }
            
            if (mooCompati==false) {
                contH += '<script src="' + _p['web_plugin'] + 'chamidoc_tools/resources/js/jquery.min.js?v='+versionCBT+'" type="text/javascript" ></script>';
                contH += '<script src="' + _p['web_plugin'] + 'chamidoc_tools/resources/js/chalkboardtools.js?v='+versionCBT+'" type="text/javascript" ></script>';
                contH += '<link href="' + _p['web_plugin'] + 'chamidoc_tools/resources/css/chalkboardtools.css?v='+versionCBT+'" rel="stylesheet" media="screen" type="text/css" />';
            }
            
            contH += "</body></html>";
            
            setDocumentTxt(contH);

            memoryDataChalkboard = futurDataChalkboard;
            memoryoption_bot_txt = option_bot_txt;
            memoryoption_top_txt = option_top_txt;

        }

    }
   
}

function doubleCtrChalkboard() {

    var editorI = getDocumentTxt();
    
    if (editorI!='') {

        var ctrDataChalkboard = "";
        var codeHtmlCtr = getDocumentTxt();

        if (codeHtmlCtr.indexOf("chalkboardguid:")!=-1) {

            $(codeHtmlCtr).filter("p").each(function( index ) {
                var extractVal = $(this).text();
                if (extractVal.indexOf("chalkboardguid:")!=-1) {
                    ctrDataChalkboard = extractVal;
                }
            });

        }
        if (ctrDataChalkboard!="") {
            
            var data = ctrDataChalkboard;
            data = data.replace("chalkboardguid:","");
            data = data.replace(":end","");
            data = data + "@@@@@@@@@@@";

            if(data.indexOf("@")!=-1){

                var vals = data.split('@');

                if (document.getElementById("option_1")) {
                    var act1 = vals[1];
                    var ctr1 = cleanTxtBs("option_1");
                    if (act1!=ctr1&&ctr1!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_2")) {
                    var act2 = vals[2];
                    var ctr2 = cleanTxtBs("option_2");
                    if (act2!=ctr2&&ctr2!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_3")) {
                    var act3 = vals[3];
                    var ctr3 = cleanTxtBs("option_3");
                    if (act3!=ctr3&&ctr3!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_4")) {
                    var act4 = vals[4];
                    var ctr4 = cleanTxtBs("option_4");
                    if (act4!=ctr4&&ctr4!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_5")) {
                    var act5 = vals[5];
                    var ctr5 = cleanTxtBs("option_5");
                    if (act5!=ctr5&&ctr5!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_6")) {
                    var act6 = vals[6];
                    var ctr6 = cleanTxtBs("option_6");
                    if (act6!=ctr6&&ctr6!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_7")) {
                    var act7 = vals[7];
                    var ctr7 = cleanTxtBs("option_7");
                    if (act7!=ctr7&&ctr7!='') {
                        oneTimeUpdate = true;
                    }
                }
                if (document.getElementById("option_8")) {
                    var act8 = vals[8];
                    var ctr8 = cleanTxtBs("option_8");
                    if (act8!=ctr8&&ctr8!='') {
                        oneTimeUpdate = true;
                    }
                }

            }

        }

        var CdisplTitle = $('input[name=displaytitle]').is(':checked');
        if (CdisplTitle&&codeHtmlCtr.indexOf("displaytitlechalk")==-1) {
            oneTimeUpdate = true;
        }
        var CdisplButtons = $('input[name=displayextrabuttons]').is(':checked');
        if (CdisplButtons&&codeHtmlCtr.indexOf("displayextrabuttons")==-1) {
            oneTimeUpdate = true;
        }

    }

}

function getTagNameObj(ids){

    var objtagName = $(ids).prop("tagName");
    if(typeof objtagName == 'undefined'){
        objtagName = "";
    }
    if(objtagName == 'undefined'){
        objtagName = "";
    }
    if(objtagName === null){
        objtagName = "";
    }
    return objtagName.toLowerCase();
}

function cleanTxtBsTextA(ids){

    var src = $("#"+ids).val();

    if(typeof src == 'undefined'){
        src = "";
    }
    if(src == 'undefined'){
        src = "";
    }
    if(src === null){
        src = "";
    }
    
    src = src.replace(/(?:\r|\n|\r\n)/g,'!br!');
    
    src = src.replace("chalkboardguid:","");
    src = src.replace(":end","");
    src = src.replace("@","aro!");
    src = src.replace(" [web]","[web]");
    src = src.replace("[web]-",_p['web']);

    src = src.replace(" [web]","[web]");
    src = src.replace(" [web]","[web]");
    src = src.replace(" [web]","[web]");

    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);

    return src;
}

function cleanTxtBs(ids){

    var src = $("#"+ids).val();
    if(typeof src == 'undefined'){
        src = "";
    }
    if(src == 'undefined'){
        src = "";
    }
    if(src === null){
        src = "";
    }
    src = src.replace("chalkboardguid:","");
    src = src.replace(":end","");
    src = src.replace("@","aro!");
    src = src.replace(" [web]","[web]");
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);
    src = src.replace("[web]-",_p['web']);

    return src;
}

function cleanEmptyHtml(src){

    var srcControl = src;
    
    srcControl = srcControl.replace(/(\r\n|\n|\r)/gm, "");
    srcControl = srcControl.replace("&nbsp;","");
    srcControl = srcControl.replace(" ","");
    if(typeof srcControl == 'undefined'){
        src = "";
    }
    if(srcControl == 'undefined'){
        src = "";
    }
    if(srcControl === null){
        src = "";
    }
    if(srcControl == "<p>&nbsp;</p>"){
        src = "";
    }
    if(srcControl == "<p></p>"){
        src = "";
    }
    if(srcControl == "&nbsp;"){
        src = "";
    }
    if(srcControl == ""){
        src = "";
    }
    return src;

}

var inputNumId = 0;

function showFileManagerToInput(numId){
    
    inputNumId = numId;
	$('<div \>').dialog({modal: true, width: "80%", title: "Select your file", zIndex: 99999,
		create: function(event, ui) {
			$(this).elfinder({
				resizable: false,
                url: "../../main/inc/lib/elfinder/connectorAction.php",
				commandsOptions: {
					getfile: {
					oncomplete: 'destroy' 
					}
				},                            
				getFileCallback: function(file) {
					$('.ui-dialog').css("display","none");
                    $('.ui-widget-overlay').css("display","none");
                    var urlF = file.url;
                    urlF = urlF.replace('/https','https');
                    urlF = urlF.replace('/http','http');
                    urlF = urlF.replace(_p['web'],"[web]-");

                    if (inputNumId==100) {
                        $('#urlextraimg').val(urlF);
                    }else{
                        $('#option_' + inputNumId).val(urlF);
                    }

				}
			}).elfinder('instance')
		}
	});

}

function loadEditorHtml(){

    /*
    var editorPell1 = window.pell.init({
        element: document.getElementById('option_top'),
        actions: [
            'bold',
            'italic',
            'underline',
            'heading2',
            'image',
            'list'
        ],
        defaultParagraphSeparator: 'p',
        onChange: function (html) {
            option_top_txt = html;
        }
    });
    editorPell1.content.innerHTML = option_top_txt;
  

    var editorPell2 = window.pell.init({
        element: document.getElementById('option_bottom'),
        actions: [
            'bold',
            'italic',
            'underline',
            'heading2',
            'image',
            'list'
        ],
        defaultParagraphSeparator: 'p',
        onChange: function (html) {
            option_bot_txt = html;
        }
    });
    editorPell2.content.innerHTML = option_bot_txt;
    */
}

function calculHeightAuto(){

    var pw = $('#cke_content_option_top').width();
    if(cleanEmptyHtml(option_top_txt)!=""){
        $('#tablesizetopinner').html(option_top_txt);
        $('#tablesizetopinner').width(pw + 'px');
        var fh = $('#tablesizetopinner').height();
        fh = fh + 70;
        if(fh<100){
            fh = 100;
        }
        $('#cke_content_option_top').find(".cke_contents").css("height",fh + "px");
    }

    if(cleanEmptyHtml(option_bot_txt)!=""){
        $('#tablesizebotinner').html(option_bot_txt);
        $('#tablesizebotinner').width(pw + 'px');
        var fh = $('#tablesizebotinner').height();
        fh = fh + 70;
        if(fh<100){
            fh = 100;
        }
        $('#cke_content_option_bottom').find(".cke_contents").css("height",fh + "px");
    }

    setTimeout(function(){calculHeightAuto();},500);
}

setTimeout(function(){calculHeightAuto();},1000);

var advBridgeT = 500;

function AdvBridge() {
   
    advBridgeT += 100;
    //<input class="form-control" style="width:91%;" chamidoc-action="pdfimg" id="option_1" />
    // control if input object with attribute chamidoc-action is exist
    if (isInputObjExist()) {
        
        var button = document.getElementById('option_1pdfimg');
        button.addEventListener('click', function() {
            adv_oel_convert_process_to_input('pdf', 'image', 'option_1');
        });

    } else {
        setTimeout(function() {
            AdvBridge();
        }, advBridgeT);
    }

}

setTimeout(function() {
    AdvBridge();
}, 500);

function isInputObjExist() {
    var inputObj = document.querySelector('input[chamidoc-action]');
    return inputObj ? true : false;
}
var interface_oel_convert = 'pdf-image-converter-main';
var interface_oel_result_json = new Object();
var interface_oel_type = '';
var interface_oel_toType = '';
var interface_oel_inputobj = document.createElement('input');

function adv_oel_convert_process_to_input(type,toType,inputobj) {
    interface_oel_convert = 'no-engine';
    interface_oel_type = type;
    interface_oel_toType = toType;
    if (type == 'pdf'&& toType == 'image') {
        interface_oel_inputobj = inputobj;
        interface_oel_convert = 'libconverter';
    }
    adv_oel_convert_win();
}

function adv_oel_convert_win() {

    var title = ' Select a ' + interface_oel_type + ' please';

    if (document.getElementById('adv_oel_convert_body')) {
        document.getElementById('div_loader_oel').style.display = 'none';
        document.getElementById('adv_oel_convert_body').style.display = 'block';
        document.getElementById('interface_ifrm').style.display = 'block';
        document.getElementsByClassName('adv_oel_convert_header')[0].innerHTML = title;
        document.getElementsByClassName('adv_oel_convert_cover')[0].style.display = 'block';
        document.getElementById('interface_ifrm').src = _p['web_plugin'] + 'chamidoc_tools/plug/' + interface_oel_convert + '/interface.php';
    
    } else {
       
        var h = '<div id="adv_oel_convert_body" class="adv_oel_convert_body" >';
        h += '<div class="adv_oel_convert_header">';
        h += title + '</div>';
        
        h += '<div id="div_loader_oel" ></div>';

        h += '<iframe id="interface_ifrm" src="' + _p['web_plugin'] + 'chamidoc_tools/plug/'+interface_oel_convert+'/interface.php" ';
        h += ' class="adv_oel_convert_content" ></iframe></div>';
        h += '<div onClick="adv_oel_convert_close();" class="adv_oel_convert_cover" ></div>';
        $('body').append(h);
        // document.body.innerHTML += h;
    }

}

function adv_oel_convert_receive_message(event) {
    if (event.data == 'close') {
        adv_oel_convert_close();
    } else if (event.data == 'loaded') {
        document.getElementById('div_loader_oel').style.display = 'block';
        document.getElementById('interface_ifrm').style.display = 'none';
    } else {
        adv_oel_convert_back(event.data);
    }
}

window.addEventListener('message', adv_oel_convert_receive_message, false);

function adv_oel_convert_close() {
    document.getElementById('adv_oel_convert_body').style.display = 'none';
    document.getElementsByClassName('adv_oel_convert_cover')[0].style.display = 'none';
}

function adv_oel_convert_back(json) {

    interface_oel_result_json = JSON.parse(json);
    if (document.getElementById(interface_oel_inputobj)) {
        var txtfinal = interface_oel_result_json.url;
        document.getElementById(interface_oel_inputobj).value = 'rendercache|' + txtfinal;
        document.getElementById('option_2').value = interface_oel_result_json.nb;
        adv_oel_convert_close();
    }
    
}

var currentDroppable = false;
var GshiftX = 0;
var GshiftY = 0;

var idZA = 0;
var currentidZA = -1;

function loadExtrasTools(){
    
    var option1 = $('#option_1').val();
    if (option1.indexOf("[web]-")!=-1) {
        option1 = option1.replace("[web]-",_p['web']);
    }
    if (option1.indexOf("/courses/")!=-1) {
        option1 = option1.replace("/courses/",_p['web_course']);
    }
    
    $('#reviewImg').attr("src",option1);

    $('#lp_sidebar').removeClass("col-md-4");
    $('#lp_sidebar').addClass("col-md-2");

    $('#doc_form').removeClass("col-md-8");
    $('#doc_form').addClass("col-md-10");

    setTimeout(function(){loadExtrasTools();},250);

}

function loadExtrasZonesA(){

    var option2 = $('#option_2').val();
    var option3 = $('#option_3').val();
    if (option2.indexOf('$')!=-1) {
        
        option3 = option3 + '$$$$$$';

        var ArrayObjects = option2.split('$');
        var ArrayOptions = option3.split('$');

        var i = 0;

        for (i = 0; i < ArrayObjects.length; i++) {
        
            var objInfos = ArrayObjects[i];
            var objValues = ArrayOptions[i];

            if (objInfos.indexOf('|')!=-1) {
                var objdet = objInfos.split('|');
                addZoneToZoneAFromOpt2(objdet[1],objdet[2],objValues);
            }

            document.getElementById('zoneButtonRightZA').addEventListener('mousemove',calculCoordZA);
            document.getElementById('zoneButtonRightZA').ondragstart = function() { return false; };
            document.getElementById('zoneButtonRightZA').onmouseup = function(event) { currentDroppable = false; };

        }

    }

}

function addZoneToZoneAFromOpt2(l,t,ovals){
    
    ovals = ovals + '||||||';
    var objparam = ovals.split('|');

    var actZASelect = objparam[1];
    var zAtextArea = objparam[2];
    var typeZA = objparam[3];

    var para = "<div id='paramsZA' class='paramsZA' onClick='launchActionEditZA(" + idZA + ");' ></div>";

    $('#zoneButtonRightZA').append("<div action='"+actZASelect+"' typeZA='"+typeZA+"' zatext='"+zAtextArea+"' id='areaZA" + idZA + "' style='left:" + l + "%;top:" + t + "%;' class='areaZA noselect' >"+para+"</div>");
    eventsZoneZA(idZA);
    idZA++;
    
}

function addZoneToZoneA(){
    
    var para = "<div id='paramsZA' class='paramsZA' onClick='launchActionEditZA(" + idZA + ");' ></div>";

    $('#zoneButtonRightZA').append("<div id='areaZA" + idZA + "' typeZA=0 style='left:5%;top:5%;' class='areaZA noselect' >"+para+"</div>");
    document.getElementById('zoneButtonRightZA').addEventListener('mousemove',calculCoordZA);
    document.getElementById('zoneButtonRightZA').ondragstart = function() { return false; };
    document.getElementById('zoneButtonRightZA').onmouseup = function(event) { currentDroppable = false; };
    eventsZoneZA(idZA);
    idZA++;

}

function eventsZoneZA(i){

    var ZA = document.getElementById('areaZA' + i);
    ZA.onmousedown = function(event) {
        currentDroppable = true;
        currentidZA = i;
    };
    ZA.onmouseup = function(event) {
        currentDroppable = false;
        currentidZA = -1;
        
    };
    ZA.ondragstart = function() {
        return false;
    };

}

var xcoord = 0;
var ycoord = 0;

function calculCoordZA(e) {

    if( !e ) {
      if( window.event ) {
        //Internet Explorer
        e = window.event;
      } else {
        //total failure, we have no way of referencing the event
        return;
      }
    }
    if( typeof( e.pageX ) == 'number' ) {
      //most browsers
      xcoord = e.pageX;
      ycoord = e.pageY;
    } else if( typeof( e.clientX ) == 'number' ) {
        
      //Internet Explorer and older browsers
      //other browsers provide this, but follow the pageX/Y branch
      
      xcoord = e.clientX;
      ycoord = e.clientY;
      
      var badOldBrowser = ( window.navigator.userAgent.indexOf( 'Opera' ) + 1 ) ||//**
       ( window.ScriptEngine && ScriptEngine().indexOf( 'InScript' ) + 1 ) ||//**
       ( navigator.vendor == 'KDE' );//**
       
      if( !badOldBrowser ) {//**
        if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {//**
          //IE 4, 5 & 6 (in non-standards compliant mode)
          xcoord += document.body.scrollLeft;
          ycoord += document.body.scrollTop;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {//**
          //IE 6 (in standards compliant mode)
          xcoord += document.documentElement.scrollLeft;//**
          ycoord += document.documentElement.scrollTop;//**
        }
      }
      
    } else {
      //total failure, we have no way of obtaining the mouse coordinates
      return;
    }
    var e_posx = 0;
    var e_posy = 0;
    var obj = this;
    //get parent element position in document
    if (obj.offsetParent){
        do { 
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    //var decX = 
    xcoord = (xcoord - e_posx);
    ycoord = (ycoord - e_posy);
   
    var documentWidth = $('#zoneButtonRightZA').width();
	var documentHeight = $('#zoneButtonRightZA').height();

    var pourcX = (xcoord / documentWidth)  * 100;
	var pourcY = (ycoord / documentHeight) * 100;
    
    pourcX = Math.round(pourcX * 10) / 10;
    pourcY = Math.round(pourcY * 10) / 10;
    if (pourcX>99) {pourcX = 99; }
    if (pourcY>99){ pourcY = 99; }

    $('#logZA').html('x:' + (xcoord) + '<br>' + 'y:' + (ycoord) );
    if (currentDroppable&&currentidZA!=-1) {
        var ZA = document.getElementById('areaZA'+currentidZA);
        ZA.style.left = (pourcX -5) + '%';
        ZA.style.top = (pourcY-5) + '%';
        calculZAdata();
    }
  
}

function calculZAdata() {

    var finaldata = "";

    $( ".areaZA" ).each(function( index ) {
        
        var documentWidth = $('#zoneButtonRightZA').width();
        var documentHeight = $('#zoneButtonRightZA').height();
        
        var position = $( this ).position();
        var idObj = $( this ).attr("id");
        idObj = idObj.replace("areaZA","");
        var pourcX = (position.left / documentWidth)  * 100;
        var pourcY = (position.top / documentHeight) * 100;
        
        pourcX = Math.round(pourcX * 10) / 10;
        pourcY = Math.round(pourcY * 10) / 10;

        finaldata += idObj + '|' + pourcX + '|' + pourcY;
        finaldata += '$';
    
    });
    
    $('#option_2').val(finaldata);
    
    calculZAaction();

}

function calculZAaction() {

    var finaldata = "";

    $( ".areaZA" ).each(function( index ) {
        
        var idObj = $( this ).attr("id");
        idObj = idObj.replace("areaZA","");
        
        var actStr = $( this ).attr("action");
        if (actStr=='') { actStr = 0; }
        if (actStr === undefined) { actStr = 0; }

        var zAtextArea = $( this ).attr("zatext");
        if (zAtextArea === undefined) { typeZA = ''; }
        if (zAtextArea == 'undefined') { typeZA = ''; }

        var typeZA = $( this ).attr("typeZA");
        if (typeZA === undefined) { typeZA = 0; }
        if (typeZA == 'undefined') { typeZA = 0; }
        if (typeZA == '') { typeZA = 0; }

        finaldata += idObj + '|' + actStr + '|' + zAtextArea + '|' + typeZA;
        finaldata += '$';
    
    });
    
    $('#option_3').val(finaldata);

}

function launchActionEditZA(i){

    $('.actioneditorwin').css("display",'block');

    var actZASelect = $('#areaZA' + i).attr("action");
    if (actZASelect=='') { actZASelect = 0; }
    if (actZASelect === undefined) { actZASelect = 0; }

    var zAtextArea = $('#areaZA' + i).attr("zatext");
    if (zAtextArea === undefined) { zAtextArea = ''; }
    if (zAtextArea == 'undefined') { zAtextArea = ''; }

    $('#actionZASelect').val(actZASelect);

    $('#urlextraimg').val('');
    $('#actionZAtextArea').val('');

    var typeZA = $('#areaZA' + i).attr("typeZA");
    if (typeZA === undefined) { typeZA = 0; }
    if (typeZA == 'undefined') { typeZA = 0; }
    if (typeZA == '') { typeZA = 0; }
    typeZA = parseInt(typeZA);

    $('#typeZA01').prop("checked", false);
    $('#typeZA02').prop("checked", false);

    if (typeZA==1) {
        $('#typeZA02').prop("checked", true);
    } else {
        $('#typeZA01').prop("checked", true);
    }

    $('#actionZASelect').on('change', function() {
        arrangeActionEditZA();
    });
    
    if (actZASelect==4) {
        zAtextArea = zAtextArea.replace(/S!L/g,'/');
        $('#urlextraimg').val(zAtextArea);
    } else {
        $('#actionZAtextArea').val(zAtextArea);
    }

    currentidZA = i;
    
    arrangeActionEditZA();

}

function closeActionEditZA(){

    currentDroppable = false;
    $('.actioneditorwin').css("display",'none');
    
}

function arrangeActionEditZA(){

    var actZASelect = $('#actionZASelect').val();

    if (actZASelect==4) {
        $('.extraimg').css("display","block");
        $('#actionZAtextArea').css("display","none");
    }else{
        $('.extraimg').css("display","none");
        $('#actionZAtextArea').css("display","block");
    }
}

function applyActionEditZA(){

    $('.actioneditorwin').css("display",'none');

    var actZASelect = $('#actionZASelect').val();

    var zAtextArea = $('#actionZAtextArea').val();
    zAtextArea = zAtextArea.replace(/\n/g,' ');
    zAtextArea = zAtextArea.replace(/@/g,'');
    zAtextArea = zAtextArea.replace(/$/g,'');
    
    if (actZASelect==4) {
        zAtextArea =  $('#urlextraimg').val();
        zAtextArea = zAtextArea.replace(/\//g,'S!L');
    }

    var typeZA = $('input:radio[name=typeZA]:checked').val();
    
    $('#areaZA' + currentidZA).attr("action",actZASelect);
    $('#areaZA' + currentidZA).attr("zatext",zAtextArea);
    $('#areaZA' + currentidZA).attr("typeZA",typeZA);
    
    calculZAaction();
    
    currentDroppable = false;

}

function getTextSample2(){

    var opt2 = $("#option_2").val();
    if (opt2=='') {
        var valsF = "The avenues to *death* are numerous and strange.A London paper mentions the *decease* of a person from a singular cause. ";
        $("#option_2").val(valsF);
    }

}

var pageMaskTurn = '';

var currentFlipDroppable = false;
var currentFlipResizeX = false;
var currentFlipResizeY = false;

var currentidFlipA = -1;
var idFlipZa = 0;
var idFlipPage = 1;
var flipXcoord = 0;
var flipYcoord = 0;

var editorZiiAreaTmp = '';

var memXcoord = 0;
var memYcoord = 0;

var incremAreaZii = 1;

var redimAct = false;

var actualZiiURLimage = '';

function launchEditWindowsZII() {

    if (QuickActiveAreas_count==0) {
        loadFlipZonesA();
    }

    getMaskFromOpt1();

    if ($("#ZoneInImagesManage").length==0) {
        $("body").append('<div class="ZoneInImagesManagerWindows_cover" ></div>');
        $("body").append('<div id="ZoneInImagesManage" class="ZoneInImagesMgA4" ></div>');
    }

    if (pageMaskTurn!='') {
        editorZiiAreaTmp = ramdomLets(7);
        currentFlipDroppable = false;
        currentFlipResizeX = false;
        currentFlipResizeY = false;
        currentidFlipA = -1;
        $(".ZoneInImagesManagerWindows_cover").css('display','');
        $("#ZoneInImagesManage").css('display','');
        $('#ZoneInImagesManage').html(inZIIManagerArea());
        var eZ = document.getElementById('editorZiiArea' + editorZiiAreaTmp);
        eZ.addEventListener('mousemove',calculCoordFlipA);
        eZ.ondragstart = function() { return false; };
        eZ.onmouseup = function(event) { currentFlipDroppable = false; };

        $(".closeZii").css('display','');
        var pageUrl = pageMaskTurn.replace('{num}',idFlipPage);
        actualZiiURLimage = pageUrl;
        $(".innerZiiArea").html('<img class="imgarea" src="' + pageUrl + '" style="width:100%;" >');    
        QuickActiveArea_ResetPages();

        setTimeout(() => {
            ctrImageValidZii();
            var imgheight = $('.imgarea').height();
            $('.editorZiiArea,.innerZiiArea').css('height',imgheight+'px');
        }, 50);

        if (redimAct==false) {
            setTimeout(() => {
                functionResizeEdition();
            }, 250);
            redimAct = true;
        }
   
        
    }

}

function inZIIManagerArea() {

    var h = '';
    h += '<a onClick="prevFlipZoneA()" class="addFlipBtn addFlipBtnA" ><</a>';
    h += '<a onClick="addFlipZoneA()" class="addFlipBtn addFlipBtnB" >+</a>';
    h += '<a onClick="nextFlipZoneA()" class="addFlipBtn addFlipBtnC" >></a>';
    h += '<div id="logFlipA" ></div>';
    h += '<div class="closeZii" onClick="closeZIIManager()" >X</div>';
    h += '<div class="innerZiiArea" ></div>';
    h += '<div class="editorZiiArea" id="editorZiiArea'+ editorZiiAreaTmp +'" ></div>';
    return h;

}
function prevFlipZoneA() {
    if (idFlipPage!=1) {
        idFlipPage = idFlipPage - 1;
        if (idFlipPage<1) {
            idFlipPage = 1;
        }
        launchEditWindowsZII();
    }
}
function nextFlipZoneA() {
    idFlipPage = idFlipPage + 1;
    launchEditWindowsZII();
}

function ctrImageValidZii() {

    if (actualZiiURLimage!='') {
        var img = new Image();
        img.onload = function() {
            var otpFlipPage =  $('#option_2').val();
            if (idFlipPage>otpFlipPage) {
                $('#option_2').val(idFlipPage);
            }
        };
        img.onerror = function() {
            if (idFlipPage==1) {
                idFlipPage = 1;
                closeZIIManager();
            } else {
                idFlipPage = idFlipPage-1;
                launchEditWindowsZII();
            }
        };
        img.src = actualZiiURLimage;
    }

}

function functionResizeEdition() {

    var imgw = $('.imgarea').width();
    var imgh = $('.imgarea').height();

    //screen place
    var screenw = $(window).width();
    var screenh = $(window).height();

    //A4
    if (imgh>imgw) {
        if (screenh>850&&screenw>655) {
            $('#ZoneInImagesManage').removeClass('ZoneInImagesMgA4');
            $('#ZoneInImagesManage').removeClass('ZoneInImagesMgPPT');
            $('#ZoneInImagesManage').removeClass('ZoneInImagesMgA4xl');

            $('#ZoneInImagesManage').addClass('ZoneInImagesMgA4xxl');
        } else {
            if (screenh>800&&screenw>616) {
                $('#ZoneInImagesManage').removeClass('ZoneInImagesMgA4');
                $('#ZoneInImagesManage').removeClass('ZoneInImagesMgPPT');
                $('#ZoneInImagesManage').addClass('ZoneInImagesMgA4xl');
            }
        }
    } else {
        if (screenw>800&&screenh>600) {
            $('#ZoneInImagesManage').removeClass('ZoneInImagesMgA4xl');
            $('#ZoneInImagesManage').removeClass('ZoneInImagesMgA4');
            $('#ZoneInImagesManage').addClass('ZoneInImagesMgPPT');
        }
    }

    var imgheight = $('.imgarea').height();
    $('.editorZiiArea,.innerZiiArea').css('height',imgheight+'px');

    setTimeout(() => {
        functionResizeEdition();
    },750);
}

function closeZIIManager() {
    $(".ZoneInImagesManagerWindows_cover").css('display','none');
    $(".closeZii").css('display','none');
    $('#ZoneInImagesManage').css('display','none');
    $('#ZoneInImagesManage').html('');
    compilFlipAdata();
}

function getMaskFromOpt1(){

    var pg = $('#option_1').val();
    if (pg!='') {

        if (pg.substring(0, 9)=='/courses/') {
            pg = pg.replace('/courses/',_p['web']+'app/courses/');
        }
        if (pg.substring(0,12)=='rendercache|') {
            pg = pg.replace('rendercache|',_p['web']+'app/upload/rendercache/adv-oel-convert/');
        }

        pageMaskTurn = pg.replace('1.jpg','{num}.jpg');
        pageMaskTurn = pageMaskTurn.replace('1.png','{num}.png');
        pageMaskTurn = pageMaskTurn.replace('1.JPG','{num}.JPG');
        pageMaskTurn = pageMaskTurn.replace('1.jpeg','{num}.jpeg');
    }

}

function installLinksPgEdit(){

    $('.bubblenumberpageeditline').append();

}

function addFlipZoneA(){
    QuickActiveArea_New();
}

function eventsFlipZoneA(i){

    var ZA = document.getElementById('areaZA' + i);
    ZA.onmousedown = function(event) {
        currentFlipDroppable = true;
        currentidFlipA = i;
    };
    ZA.onmouseup = function(event) {
        currentFlipDroppable = false;
        currentFlipResizeX = false;
        currentFlipResizeY = false;
        currentidFlipA = -1;
        compilFlipAdata();
    };
    ZA.ondragstart = function() {
        return false;
    };

    var rA = document.getElementById('resizeQAA' + i);
    rA.onmousedown = function(event) {
        currentFlipDroppable = true;
        currentFlipResizeX = true;
        currentFlipResizeY = false;
        currentidFlipA = i;
        var documentWidth = $('#editorZiiArea'+editorZiiAreaTmp).width();
        var currObj = QuickActiveArea_getbyid(currentidFlipA);
        var pourcX = documentWidth * (currObj.x / 100);
        memXcoord = pourcX;
    };
    rA.onmouseup = function(event) {
        currentFlipDroppable = false;
        currentFlipResizeX = false;
        currentFlipResizeY = false;
        currentidFlipA = -1;
        compilFlipAdata();
    };
    rA.ondragstart = function() {
        return false;
    };

    var hA = document.getElementById('resizeHAA' + i);
    hA.onmousedown = function(event) {
        currentFlipDroppable = true;
        currentFlipResizeX = false;
        currentFlipResizeY = true;
        currentidFlipA = i;
        var documentHeight = $('#editorZiiArea'+editorZiiAreaTmp).height();
        var currObj = QuickActiveArea_getbyid(currentidFlipA);
        var pourcY = documentHeight * (currObj.y / 100);
        memYcoord = pourcY;
    };
    hA.onmouseup = function(event) {
        currentFlipDroppable = false;
        currentFlipResizeX = false;
        currentFlipResizeY = false;
        currentidFlipA = -1;
        compilFlipAdata();
    };
    hA.ondragstart = function() {
        return false;
    };

}

function loadFlipZonesA(){

    var option4 = $('#option_4').val();
    var option5 = $('#option_5').val();
    
    if (option4.indexOf('$')!=-1) {
        
        option5 = option5 + '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$';

        var ArrayObjects = option4.split('$');
        var ArrayOptions = option5.split('$');

        var i = 0;

        for (i = 0; i < ArrayObjects.length; i++) {
        
            var objInfos = ArrayObjects[i] + '||';
            var objValues = ArrayOptions[i];

            if (objInfos.indexOf('|')!=-1) {
                var objetPart = objInfos.split('|');
                var elem  = new QuickActiveArea();
                elem.page = objetPart[0];
                elem.x = objetPart[1];
                elem.y = objetPart[2];
                elem.w = objetPart[3];
                elem.h = objetPart[4];
                elem.type = objetPart[5];
                if (elem.type=='') { elem.type = '0'; }
                elem.data = objValues;
                elem.create = 1;
                QuickActiveArea_Add(elem);
            }

        }

    }

}

function calculCoordFlipA(e) {

    if ( !e ) {
      if( window.event ) {
        e = window.event;
      } else {
        return;
      }
    }
    if( typeof( e.pageX ) == 'number' ) {
      //most browsers
      flipXcoord = e.pageX;
      flipYcoord = e.pageY;
    } else if( typeof( e.clientX ) == 'number' ) {
        
      flipXcoord = e.clientX;
      flipYcoord = e.clientY;
      
    } else {
      //total failure, we have no way of obtaining the mouse coordinates
      return;
    }
    var e_posx = 0;
    var e_posy = 0;

    var obj = this;
    // get parent element position in document
    if (obj.offsetParent){
        do { 
            e_posx += obj.offsetLeft;
            e_posy += obj.offsetTop;
        } while (obj = obj.offsetParent);
    }
    //var decX = 
    flipXcoord = (flipXcoord - e_posx);
    flipYcoord = (flipYcoord - e_posy);
    
    if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
        flipYcoord -= document.body.scrollTop;
    } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
        flipYcoord -= document.documentElement.scrollTop;
    }

    var documentWidth = $('#editorZiiArea'+editorZiiAreaTmp).width();
	var documentHeight = $('#editorZiiArea'+editorZiiAreaTmp).height();

    var pourcX = (flipXcoord / documentWidth)  * 100;
	var pourcY = (flipYcoord / documentHeight) * 100;
    
    pourcX = Math.round(pourcX * 10) / 10;
    pourcY = Math.round(pourcY * 10) / 10;
    if (pourcX>99) {pourcX = 99; }
    if (pourcY>99){ pourcY = 99; }
    var pref = '';
    $('#logFlipA').html(pref + 'x:' + parseInt(flipXcoord) + '&nbsp;&nbsp;' + 'y:' + parseInt(flipYcoord) );
    if (currentFlipDroppable&&currentidFlipA!=-1) {
        var objElem = QuickActiveArea_getbyid(currentidFlipA);
        var ZA = document.getElementById('areaZA'+currentidFlipA);
        if (currentFlipResizeX) {
            
            var pourcW = ((flipXcoord- memXcoord) / documentWidth) * 100;

            if (pourcW>0) {
                pourcW = Math.round(pourcW * 10) / 10;
                ZA.style.width = pourcW + '%';
                objElem.w = pourcW;
            }

        } else {

            if (currentFlipResizeY) {
                
                var pourcH = ((flipYcoord- memYcoord) / documentHeight)  * 100;
                if (pourcH>0) {
                    pourcH = Math.round(pourcH * 10) / 10;
                    ZA.style.height = pourcH + '%';
                    objElem.h = pourcH;
                }

            } else {
            
                var finalPx = (pourcX - (objElem.w/2));
                finalPx = Math.round(finalPx * 10) / 10;
                var finalPy = (pourcY - (objElem.h/2));
                finalPy = Math.round(finalPy * 10) / 10;
                ZA.style.left = finalPx + '%';
                ZA.style.top = finalPy + '%';
                objElem.x = finalPx;
                objElem.y = finalPy;

            }

        }
    }
  
}

function compilFlipAdata() {

    var finaldata = "";
    var finaldata5 = "";
    for (var i = 0; i < QuickActiveAreas_count; i++) {
        var objElemCtr = QuickActiveAreas[i];
        if (objElemCtr.delete==0) {
            finaldata += objElemCtr.page + '|' + objElemCtr.x + '|' + objElemCtr.y ;
            finaldata += '|' + objElemCtr.w + '|' + objElemCtr.h + '|' + objElemCtr.type;
            finaldata += '$';
            finaldata5 += objElemCtr.data + '$';
        }
	}
	
    $('#option_4').val(finaldata);
    $('#option_5').val(finaldata5);
    
}

// Class objects

var QuickActiveAreas = new Array();
var QuickActiveAreas_count = 0;

function QuickActiveArea() {
	
	this.id;
    this.idtmp;
	this.create;
    this.data;
    this.type;
    this.page;
    this.delete = 0;
    this.x;this.y;
    this.w;this.h;
	this.show = function() {
		if (this.create==0&&this.delete==0) {
            this.idtmp = this.id + ramdomLets(7);
			var para = "<div class='paramsQAA' ";
            para += " onClick='showQuickActiveAreaManager(\"" + this.idtmp + "\");' ></div>";
            para += "<div id='resizeQAA" + this.idtmp + "' class='resizeQAA' ></div>";
            para += "<div id='resizeHAA" + this.idtmp + "' class='resizeHAA' ></div>";
            if (this.type==5) {
                para +='<div style="padding:5px;" id="tmptxt'+this.idtmp+'" >'+convertDataToHtml(this.data)+'</div>';
            }
            var objR = "<div id='areaZA" + this.idtmp + "' ";
            objR += " style='left:"+this.x+"%;top:"+this.y+"%;width:"+this.w+"%;height:"+this.h+"%;' ";
            objR +=  "class='areaQAA"+this.type+" noselect' >"+para+"</div>";
            if ($('#editorZiiArea'+editorZiiAreaTmp).length==1) {
                $('#editorZiiArea'+editorZiiAreaTmp).append(objR);
                eventsFlipZoneA(this.idtmp);
                this.create = 1;
            } else {
                console.log('Error: editorZiiArea'+editorZiiAreaTmp+' not found');
            }
		}
	}
	
}

function QuickActiveArea_New(){
    var elem  = new QuickActiveArea();
    elem.page = idFlipPage;
    elem.x = 5;
    elem.y = 5;
    elem.w = 10;
    elem.h = 5;
    elem.type = 0;
    elem.data = 0;
    elem.create = 0;
    QuickActiveArea_Add(elem);
}

function QuickActiveArea_Add(Elem){
    Elem.id = QuickActiveAreas_count;
    QuickActiveAreas.push(Elem);
    QuickActiveAreas_count = QuickActiveAreas_count + 1;
    QuickActiveArea_Paint();
}

function QuickActiveArea_Paint(){

	for (var i = 0; i < QuickActiveAreas_count; i++){
        var objElem = QuickActiveAreas[i];
        if (objElem.page==idFlipPage) {
            objElem.show();
        }
	}
	
}

function QuickActiveArea_ResetPages() {

	for (var i = 0; i < QuickActiveAreas_count; i++){
        var objElem = QuickActiveAreas[i];
        if (objElem.page==idFlipPage) {
            objElem.create = 0;
            objElem.show();
        }
	}
	
}

function QuickActiveArea_getbyid(id) {

    var elem  = new QuickActiveArea();
	for (var i = 0; i < QuickActiveAreas_count; i++){
        var objElem = QuickActiveAreas[i];
        if (objElem.id==id||objElem.idtmp==id) {
            elem = objElem;
        }
	}
	return elem;
}

function ramdomLets(n) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for (var i = 0; i < n; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function showQuickActiveAreaManager(idtmp) {

    if($("#QuickActiveAreaManager").length==0){
        $("body").append('<div class="QuickActiveAreaManager_Cover" ></div>');
        $("body").append('<div id="QuickActiveAreaManager" class="QuickActiveAreaManager" ></div>');
    }
    $("#QuickActiveAreaManager").html(innerQuickActiveAreaManager(idtmp));
    
    $("#QuickActiveAreaManager").css('display','');
    $(".QuickActiveAreaManager_Cover").css('display','');
    $("#closequizmana").css('display','');
}

function innerQuickActiveAreaManager(idtmp) {
    
    var obj = QuickActiveArea_getbyid(idtmp);
    var ch = '';
    editorTxtZii = '';
    editorIsLoad = false;
    var h = '';
    h += '<div class="QuickActiveAreaManager_title" >&nbsp;&nbsp;Action&nbsp;Editor</div>';
    h += '<div class="closeQuickActiveAreaManager" onClick="closeQuickActiveAreaM()" >X</div>';
    h += '<div id="innerQuickActiveAreaManager" >';
    
    // Radio box option list
    if (obj.type==0) { ch = 'checked'; }
    h += '<div class="QuickActiveAreaManager_option_mid" >';
    h += '<input ' + ch + ' type="radio" id="typeQA0" name="typeQAA" value="0" >';
    h += '<label for="typeQA0" >Zoom</label>';
    h += '</div>';
    ch = '';

    ch = ''; if (obj.type==4) { ch = 'checked'; }
    h += '<div class="QuickActiveAreaManager_option_mid" >';
    h += '<input ' + ch + ' type="radio" id="typeQA4" name="typeQAA" value="4" >';
    h += '<label for="typeQA4" >Mask</label>';
    h += '</div>';

    ch = ''; if (obj.type==1) { ch = 'checked'; }
    h += '<div class="QuickActiveAreaManager_option_mid" >';
    h += '<input ' + ch + ' type="radio" id="typeQA1" name="typeQAA" value="1" >';
    h += '<label for="typeQA1" >Next page</label>';
    h += '</div>';

    ch = ''; if (obj.type==2) { ch = 'checked'; }
    h += '<div class="QuickActiveAreaManager_option_mid" >';
    h += '<input ' + ch + ' type="radio" id="typeQA2" name="typeQAA" value="2" >';
    h += '<label for="typeQA2" >Previous page</label>';
    h += '</div>';

    ch = ''; if (obj.type==3) { ch = 'checked'; }
    h += '<div class="QuickActiveAreaManager_option" >';
    h += '<input ' + ch + ' type="radio" id="typeQA3" name="typeQAA" value="3" >';
    h += '<label for="typeQA3" >to Page Number</label>';
    h += '<input type="number" class="numberPage" ';
    h += ' value="' + forceParseInteger(obj.data) + '" />';
    h += '</div>';
    
    ch = ''; if (obj.type==5) { 
        ch = 'checked'; 
        editorTxtZii = obj.data;
    }
    h += '<div class="QuickActiveAreaManager_option" >';
    h += '<input ' + ch + ' type="radio" id="typeQA5" name="typeQAA" value="5" >';
    h += '<label for="typeQA5" >HTML</label>';
    h += '<div class="editPage" onClick="loadTxtEditorZii();" ></div>';
    h += '</div>';

    ch = ''; if (obj.type==6) { ch = 'checked';
        editorlinkZii = obj.data;
    }
    h += '<div class="QuickActiveAreaManager_option" >';
    h += '<input ' + ch + ' type="radio" id="typeQA6" name="typeQAA" value="6" >';
    h += '<label for="typeQA6" >Pop Link</label>';
    h += '<div class="editPage" onClick="loadTxtEditorZii();" ></div>';
    h += '</div>';

    h += '<p style="width:97%;text-align:center;margin:15px;padding:5px;float:left;" >';
    h += '<a onClick="saveQuickActiveAreaM(\''+idtmp+'\');" ';
    h += ' class="btn btn-info" >&nbsp;OK&nbsp;</a></p>';

    var imgLoad = '<img src="'+ _p['web_plugin'] + 'chamidoc_tools/resources/img/delete-icon-24.png" />';
    h += '<a onClick="if (confirm(\'Delete ?\')) DeleteTxtLinkZii(\''+idtmp+'\');" ';
    h += ' style="position:absolute;left:5px;bottom:5px;background:white;color:white;" ';
    h += ' class="btn btn-classic" >&nbsp;' + imgLoad + '&nbsp;</a>';

    h += '</div>';

    incremAreaZii ++;

    h += '<div id="innerQuickActiveAreaTxtEditor" class="innerQuickActiveAreaTxtEditor" >';
    
    h += '<textarea id="content_option_area' + incremAreaZii + '" ';
    h += ' name="content_option_area" class="ckeditor" >';
    h += convertDataToHtml(editorTxtZii) + '</textarea>';

    h += '<p style="width:97%;text-align:center;margin:5px;padding:5px;float:left;" >';
    h += '<a onclick="ApplyTxtEditorZii();" ';
    h += ' class="btn btn-info" >&nbsp;Apply&nbsp;</a></p>';

    h += '</div>';

    h += '<div id="innerQuickActiveAreaTxtLink" class="innerQuickActiveAreaTxtLink" >';
    h += '<p>Data link :&nbsp;<a style="float:right;cursor:pointer;" ';
    h += ' onClick="helpLinkZii();" >&darr;</a>&nbsp;&nbsp;&nbsp;&nbsp;</p>';
    h += '<input type="text" value="' + convertDataToHtml(editorlinkZii) + '" ';
    h += ' id="content_option_link" style="width:97%;" />';

    h += '<p style="width:97%;text-align:center;margin:5px;padding:5px;float:left;" >';;
    h += '<a onclick="ApplyTxtLinkZii();" class="btn btn-info" >&nbsp;Apply&nbsp;</a>';
    h += '</p>';

    h += '</div>';

    return h;

}

var editorIsLoad = false;
var editorTxtZii = '';
var editorlinkZii = '';

function loadTxtEditorZii() {
    
    var typeQAA = $('input[name=typeQAA]:checked').val();
    if (typeQAA==5) {
        $("#innerQuickActiveAreaManager").css("display","none");
        $("#innerQuickActiveAreaTxtEditor").css("display","block");
        if (editorIsLoad==false) {
            initCKEEditorMini('content_option_area'+incremAreaZii,true);
            editorIsLoad = true;
        }
    }
    if (typeQAA==6) {
        $("#innerQuickActiveAreaManager").css("display","none");
        $("#innerQuickActiveAreaTxtLink").css("display","block");
    }

}

function ApplyTxtEditorZii() {

    var ckArea =  CKEDITOR.instances['content_option_area'+incremAreaZii];
    if (ckArea) {
        var ck_area_txt = ckArea.getData();
        editorTxtZii = convertHtmlToData(ck_area_txt);
        $("#innerQuickActiveAreaManager").css("display","block");
        $("#innerQuickActiveAreaTxtEditor").css("display","none");
    }

}

function DeleteTxtLinkZii(idtmp) {
    var obj = QuickActiveArea_getbyid(idtmp);
    obj.delete = 1;
    $('#tmptxt'+idtmp).remove();
    $('#areaZA'+idtmp).css("background","red");
    setTimeout(() => {
        $('#areaZA'+idtmp).remove();
    }, 300);
    closeQuickActiveAreaM();
}

function ApplyTxtLinkZii() {
    $("#innerQuickActiveAreaManager").css("display","block");
    $("#innerQuickActiveAreaTxtLink").css("display","none");
    editorlinkZii = convertHtmlToData($('#content_option_link').val());
}

function forceParseInteger(data) {
    data = data+'';
    data = data.replace(/[^0-9]/g, '');
    if (data=='') {data = 0;}
    return parseInt(data);
}

function saveQuickActiveAreaM(idtmp) {

    // Get radio typeQAA value
    var typeQAA = $('input[name=typeQAA]:checked').val();
    var obj = QuickActiveArea_getbyid(idtmp);
    obj.type = typeQAA;
    if (obj.type==3) {
        obj.data = parseInt($('.numberPage').val());
    }
    if (obj.type==5) {
        obj.data = editorTxtZii;
        $('#tmptxt'+idtmp).remove();
        $('#areaZA'+idtmp).append('<div style="padding:5px;" id="tmptxt'+idtmp+'" >'+convertDataToHtml(obj.data)+'</div>');
    } else {
        $('#tmptxt'+idtmp).remove();
    }
    if (obj.type==6) {
        obj.data = editorlinkZii;
    }
    $('#areaZA'+idtmp).removeClass('areaQAA1').removeClass('areaQAA2');
    $('#areaZA'+idtmp).removeClass('areaQAA3').removeClass('areaQAA4');
    $('#areaZA'+idtmp).removeClass('areaQAA5').removeClass('areaQAA6');
    $('#areaZA'+idtmp).removeClass('areaQAA7').removeClass('areaQAA8');
    $('#areaZA'+idtmp).removeClass('areaQAA9').removeClass('areaQAA10');
    $('#areaZA'+idtmp).addClass('areaQAA'+typeQAA);

    closeQuickActiveAreaM();

}

function closeQuickActiveAreaM() {
    $("#QuickActiveAreaManager").css('display','none');
    $(".QuickActiveAreaManager_Cover").css('display','none');
}

function convertHtmlToData(txt) {
    txt = txt.replace(/</g,'zilt;');
    txt = txt.replace(/>/g,'zigt;');
    txt = txt.replace(/\//g,'zisol;');
    return txt;
}
function convertDataToHtml(txt) {
    txt = txt.replace(/zilt;/g,'<');
    txt = txt.replace(/zigt;/g,'>');
    txt = txt.replace(/zisol;/g,'/');
    return txt;
}

function helpLinkZii() {
    
    var h = 'https://en.m.wikipedia.org/wiki/Chamilo';
    $('#content_option_link').val(h);

}
var compilOpt = false;

function showQuizzManagerToInput(numId){
    
    compilOpt = true;

    inputNumId = numId;
	
    if($("#quizzManagerWindows").length==0){
        $("body").append('<div class="quizzManagerWindows_cover" ></div>');
        $("body").append('<div id="quizzManagerWindows" class="quizzManagerWindows" >' + inQuizzManagerToInput() + '</div>');
    }
    
    $("#quizzManagerWindows").css('display','');
    $(".quizzManagerWindows_cover").css('display','');
    $("#closequizmana").css('display','');
    showSelectItemsID();
}

function showQuizzManagerToInputNC(numId){
    
    compilOpt = false;

    inputNumId = numId;
	
    if($("#quizzManagerWindows").length==0){
        $("body").append('<div class="quizzManagerWindows_cover" ></div>');
        $("body").append('<div id="quizzManagerWindows" class="quizzManagerWindows" >' + inQuizzManagerToInput() + '</div>');
    }
    
    $("#quizzManagerWindows").css('display','');
    $(".quizzManagerWindows_cover").css('display','');
    $("#closequizmana").css('display','');
    showSelectItemsID();
}

/**
 * Generate the HTML to insert Quizz objects in an HTML document
 * @returns {string}
 */
 function inQuizzManagerToInput(){
    
    var h = '';
    h += '<div style="position:relative;left:0px;top:0px;right:0px;height:36px;font-size:18px;line-height:36px;';
    h += 'border-bottom:solid 1px gray;cursor:pointer;background:#f8f8f8;" >&nbsp;&nbsp;Selection&nbsp;Helper</div>';
    h += '<div id="closequizmana" style="position:absolute;right:5px;top:5px;width:20px;font-size:18px;height:20px;line-height:20px;';
    h += 'text-align:center;cursor:pointer;" onClick="closeExtrasSelectionQuizz()" >X</div>';
    
    h += '<div id="innerSelectQuizz" style="position:absolute;left:10px;top:45px;right:2px;bottom:5px;';
    h += 'border:solid 0px green;background:white;overflow:hidden;z-index:10010;" ></div>';

    return h;

}

function showSelectItemsID() {
	
    var imgLoad = '<p style="text-align:center;" ><br><br><br><br>';
    imgLoad += '<img src="'+ _p['web_plugin'] + 'chamidoc_tools/resources/img/loadtable.gif" /></p>';

    var urlpath = _p['web_plugin'] + "chamidoc_tools/resources/ajax/getlplistid.php?dir=";
    
    $("#innerSelectQuizz").html(imgLoad);

    $.ajax({
        method: "GET",
        url: urlpath
        }).done(function(datalst){
        $("#innerSelectQuizz").html(datalst);
    });

}

function applikSelectItemsID(i) {
    
    $("#closequizmana").css("display","none");
	$("#option_" + inputNumId).val(i);
    
    if (compilOpt) {
        compileSelectItemsID(i);
    } else {
        var cidReq = ChamiloStudioTopGetParam('cidReq');
        var idsess = ChamiloStudioTopGetParam('id_session');
        var u = cidReq +'&id_session=' + idsess + '&exerciseId=' + i + '&origin=iframe&gidReq=0&gradebook=0';
        $("#option_" + inputNumId).val(u);
        closeExtrasSelectionQuizz();
    }

}

function compileSelectItemsID(quizid) {
	
    var imgLoad = '<p style="text-align:center;" ><br><br><br><br>';
    imgLoad += '<img src="'+ _p['web_plugin'] + 'chamidoc_tools/resources/img/loadtable.gif" /></p>';

    var urlpath = _p['web_plugin'] + "chamidoc_tools/resources/ajax/compileQuiz.php?quizid=" + quizid;
    
    $("#innerSelectQuizz").html(imgLoad);
    
    $.ajax({
        method: "GET",
        url: urlpath
        }).done(function(datalst){
            closeExtrasSelectionQuizz()
        }
    );

}

/**
 * Visually remove objects
 */
 function closeExtrasSelectionQuizz(){

    $("#quizzManagerWindows").css('display','none');
    $(".quizzManagerWindows_cover").css('display','none');
}

function showVideoManagerToObject(){
    
    if ($("#videoManagerWindows").length==0) {
        $("body").append('<div class="videoManagerWindows_cover" ></div>');
        $("body").append('<div id="videoManagerWindows" class="videoManagerWindows" ></div>');
    }

    $("#videoManagerWindows").html(inVideoManager());

    $("#videoManagerWindows").css('display','');
    $(".videoManagerWindows_cover").css('display','');
    $("#closeVideoMana").css('display','');

}

/**
 * Generate the HTML to insert Video objects in an HTML document
 * @returns {string}
 */
 function inVideoManager(){
    
    var h = '';
    h += '<div style="position:relative;left:0px;top:0px;right:0px;height:36px;font-size:18px;line-height:36px;';
    h += 'border-bottom:solid 1px gray;cursor:pointer;background:#f8f8f8;" >&nbsp;&nbsp;Video&nbsp;Helper</div>';
    h += '<div id="closeVideoMana" style="position:absolute;right:5px;top:5px;width:20px;font-size:18px;height:20px;line-height:20px;';
    h += 'text-align:center;cursor:pointer;" onClick="closeExtrasSelectionVideo()" >X</div>';
    
    h += '<div id="innerSelectVideo" class="innerSelectVideo" >';
    
    h += '<p><b>Vimeo / Youtube URL</b></p>';
    
    h += '<p><input type="text" class="inputLargeVideo" id="studioVideoUrl" /></p>';
    
    h += '<p><b>Or load mp4 video from my computer</b></p>';

    h += '<p><a onclick="showUploadManagerToObject()" style="cursor:pointer;" ><img style="width:350px;height:60px;" ';
    h += ' src="'+_p['web_plugin'] + 'chamidoc_tools/resources/img/download-local.svg" /></a></p>';

    h += '<p style="text-align:center;" >';
    h += '<button class="btn btn-primary" onCLick="addVideoBase()" >Insert</button>';
    h += '</p>';
    
    h += '</div>';

    return h;

}

/**
 * Visually remove objects
 */
 function closeExtrasSelectionVideo() {
    $("#videoManagerWindows").css('display','none');
    $(".videoManagerWindows_cover").css('display','none');
}

/**
 * add Video Base
 */
function addVideoBase() {

    var urlData = $("#studioVideoUrl").val();
    if (urlData!=''
    &&urlData.indexOf('/embed/')==-1
    &&urlData.indexOf('<iframe')==-1) {
        if (urlData.indexOf('vimeo.')!=-1
        ||urlData.indexOf('youtu./')!=-1
        ||urlData.indexOf('youtube.')!=-1) {
            $("#innerSelectVideo").css('display','none');
            processObjectChalkBoard('videoscreenlock',urlData);
        } else {
            $("#studioVideoUrl").css("background","#FADBD8 ");
        }
    } else {
        $("#studioVideoUrl").css("background","#FADBD8 ");
    }


}

// chalkboard_upload js
function showUploadManagerToObject(){

    if ($("#uploadManagerWindows").length==0) {
        $("body").append('<div class="uploadManagerWindows_cover" ></div>');
        $("body").append('<div id="uploadManagerWindows" class="uploadManagerWindows" ></div>');
    }
    
    $("#uploadManagerWindows").html(inUploadManager());

    $("#videoManagerWindows").css('display','none');
    $(".videoManagerWindows_cover").css('display','none');
    
    $("#uploadManagerWindows").css('display','');
    $(".uploadManagerWindows_cover").css('display','');
    $("#closeUploadMana").css('display','');

}

function inUploadManager(){
    
    window.addEventListener("message", receiveMessageDirectUpload, false);

    var h = '';
    h += '<div style="position:relative;left:0px;top:0px;right:0px;height:36px;font-size:18px;line-height:36px;';
    h += 'border-bottom:solid 1px gray;cursor:pointer;background:#f8f8f8;" >&nbsp;&nbsp;Upload&nbsp;Helper</div>';
    h += '<div id="closeVideoMana" style="position:absolute;right:5px;top:5px;width:20px;font-size:18px;height:20px;line-height:20px;';
    h += 'text-align:center;cursor:pointer;" onClick="closeExtrasSelectionUpload();" >X</div>';
    
    h += '<div id="innerSelectUpload" class="innerSelectUpload" >';
    var lp_id = ChamiloStudioTopGetParam("lp_id");
    
    h += '<iframe src="' +_p['web_plugin'] + "chamidoc_tools/plug/";
    h += 'libimport/import-file.php?id=' + lp_id + '&lpid=' + lp_id + '" ';
    h += ' class="frameUpload" ></iframe>';

    h += '</div>';

    return h;

}

function receiveMessageDirectUpload(event)
{

    $('.innerSelectUpload').css("display","none");

    if (event.data.indexOf('importfileok:')!=-1) {
    
        var urlData = event.data;
        urlData = urlData.replace('importfileok:','');
        
        if (urlData.indexOf('.mp4')!=-1) {
            processObjectChalkBoard('videoscreenlock',urlData);
        }
        if (urlData.indexOf('h5p-')!=-1) {
            processObjectChalkBoard('h5player',urlData);
        }
    }

    if (event.data.indexOf('importfileko:')!=-1) {

        var urlData = event.data;
        urlData = urlData.replace('importfileko:','');
        alert(urlData);
    

    }
    
}

function closeExtrasSelectionUpload() {
    $("#uploadManagerWindows").css('display','none');
    $(".uploadManagerWindows_cover").css('display','none');
}

var listObjExtras = ';';

// chamilo_studio_extensions
function showStoreManagerToObject(){

    if ($("#uploadStoreWindows").length==0) {
        $("body").append('<div class="uploadStoreWindows_cover" ></div>');
        $("body").append('<div id="uploadStoreWindows" class="uploadStoreWindows" ></div>');
    }
    
    $("#uploadStoreWindows").html(inStoreManager());

    $("#uploadStoreWindows").css('display','none');
    $(".uploadStoreWindows_cover").css('display','none');

    $("#uploadStoreWindows").css('display','');
    $(".uploadStoreWindows_cover").css('display','');
    $("#closeUpStore").css('display','');

    setTimeout(function(){loadStoreBoard();},1000);

}

function loadStoreBoard(){

    var urlpath = _p['web_plugin'] +'chamidoc_tools/resources/ajax/getToolsStore.php';

    $.ajax({
        url : urlpath,
        cache : true
	}).done(function(codeHtml){
        
        $('#innerSelectStore').html(codeHtml);

        if (localStorage) {
            try {
                listObjExtras = window.localStorage.getItem('listObjExtras');
            } catch(err) { }
            if (listObjExtras==null) {listObjExtras = ";";}
            if (listObjExtras=="") {listObjExtras = ";";}
            if (typeof listObjExtras == 'undefined') {listObjExtras = ";";}

            var ArrayObjects = listObjExtras.split(';');
            var iter = 0;
            for (iter=0;iter<ArrayObjects.length;iter++) {
                var objInfos = ArrayObjects[iter];
                if (objInfos!='') {
                    $(".btn-" + objInfos).html("Delete");
                    $(".btn-" + objInfos).css("background","#C0392B").css("color","white");
                    $(".btn-" + objInfos).attr("onClick","processStoreDelete('" + objInfos + "')");
                }
            }
        }

    });

}

function processStoreInstall(nameObj){

    var tbc = '<center>';
    tbc += '<div class="titleStoreprogress" >Installation in progress ..</div>';
    tbc += '<div class="blocStoreprogress" >';
    tbc += '<div class="blocStorevalue" >';
    tbc += '</div>';
    tbc += '</div>';
    $('#innerSelectStore').html(tbc);

    listObjExtras = listObjExtras + nameObj +';';
    if (localStorage) {
        try {
            window.localStorage.setItem('listObjExtras',listObjExtras);
        } catch(err) {
        }
    }
    
    $(".blocChalkBoard" + '.' + nameObj).css("border","solid 1px red");

    $(".blocStorevalue").animate({
        width : "80%"
    },3000, function(){

        $(".blocStorevalue").animate({
            width : "100%"
        },400, function(){});

    });

    setTimeout(function(){
        closeExtrasSelectionStore();
        getListStoreInstall();
    },3600);

}

function processStoreDelete(nameObj){

    listObjExtras = listObjExtras.replace(nameObj +';','');
    if (localStorage) {
        try {
            window.localStorage.setItem('listObjExtras',listObjExtras);
        } catch(err) {
        }
    }
    $(".btn-" + nameObj).css("display","none");

    var tbc = '<center><br>';
    tbc += '<img style="width:150px;height:150px;" ';
    tbc += ' src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/loadtable.svg" ';
    tbc += ' alt="Chamilo Studio Tools" title="Chamilo Studio Tools" />';
    tbc += '</center>';
    $('#innerSelectStore').html(tbc);

    setTimeout(function(){
        loadChalkBoard();
        closeExtrasSelectionStore();
    },500);

}

function getListStoreInstall(){
    if (localStorage) {
        try {
            listObjExtras = window.localStorage.getItem('listObjExtras');
        } catch(err) {
        }

        if (listObjExtras==null) {
            listObjExtras = ";;;;";
        }
        if (typeof listObjExtras == 'undefined') {
            listObjExtras = ";;;;";
        }

        var ArrayObjects = listObjExtras.split(';');
        var iter = 0;
        for (iter=0;iter<ArrayObjects.length;iter++) {
            var objInfos = ArrayObjects[iter];
            if (objInfos!='') {
                $(".blocChalkBoard" + '.' + objInfos).css("display","");
            }
        }
    }
}
getListStoreInstall();

/**
 * Generate the HTML to insert Video objects in an HTML document
 * @returns {string}
 */
function inStoreManager(){
    
    var h = '';
    h += '<div id="titleWinStore" class="titleWinStore" >&nbsp;&nbsp;Extensions&nbsp;</div>';
    h += '<div id="closeUpStore" class="closeUpStore" onClick="closeExtrasSelectionStore()" >X</div>';
    
    h += '<div id="innerSelectStore" class="innerSelectStore" >';
    
    var tbc = '<center><br>';
    tbc += '<img style="width:150px;height:150px;" ';
    tbc += ' src="'+ _p['web_plugin'] +'chamidoc_tools/resources/img/loadtable.svg" ';
    tbc += ' alt="Chamilo Studio Tools" title="Chamilo Studio Tools" />';
    tbc += '</center>';

    h += tbc + '</div>';

    return h;

}

/**
 * Visually remove objects
 */
function closeExtrasSelectionStore() {
    $("#uploadStoreWindows").css('display','none');
    $(".uploadStoreWindows_cover").css('display','none');
}

var OldPathZip = '';

function cleanPathZip(str){

    str = str.replace('/https','https');
    str = str.replace('\/https','https');

    if(str.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = str.substr(str.indexOf(pattern));
        str = str2;
    }
    
    return str;
}

function showZipManagerToInput(id){
    OldPathZip = $('#option_1').val();
    showFileManagerToInput(id);
    htmlpresenterControl();
}

function htmlpresenterControl(){

    var NeoPathZip = $('#option_1').val();
    if (NeoPathZip!=OldPathZip) {
        $('#option_1').val(cleanPathZip(NeoPathZip));
        compileZipToPresenter();
    } else {
        setTimeout(function(){htmlpresenterControl();},500);
    }

}

function compileZipToPresenter(){
	
    var iditem = ChamiloStudioTopGetParamValue('id');

    var imgLoad = '<p style="text-align:center;" ><br><br><br><br>';
    imgLoad += '<img src="'+ _p['web_plugin'] + 'chamidoc_tools/resources/img/loadtable.gif" /></p>';

    var urlpath = _p['web_plugin'] + "chamidoc_tools/resources/ajax/prepareZip.php?iditem=" + encodeURI(iditem);
    urlpath = urlpath + '&zipsource=' + encodeURI($('#option_1').val());
    
    $('#load745').css('display','block');

    $.ajax({
        method: "GET",
        url: urlpath
        }).done(function(datalst){
            $('#option_2').val(datalst);
            $('#load745').css('display','none');
        }
    );

}


function ChamiloStudioTopGetParamValue(param){
	
	var u = window.top.location.href;
	var reg = new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches = u.match(reg);
	
	if(matches==null){return '';}
	
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	
	for (var i=100; i > -1; i--){
		vari=vari.replace('#page' + i,'');
	}
	return vari;
	
}
//.labeltrad

function processTraductionChalk(){

    var langGet = $('html')[0].lang;

    if (langGet=='') {langGet = 'en'}
    if (langGet.indexOf("es")!=-1) {langGet = 'es'}
    if (langGet.indexOf("fr")!=-1) {langGet = 'fr'}
    if (langGet.indexOf("en")!=-1) {langGet = 'en'}

    $(".labeltrad").each(function(index){
        
        var baseTxt = $(this).html();
        var origTxt = baseTxt;

        if (langGet=='en') {
            
            if (baseTxt=='Texte&nbsp;Bouton'||baseTxt=='Texte Bouton') {
                baseTxt = 'Button Text';
            }
            if (baseTxt=='Texte&nbsp;') {
                baseTxt = 'Text&nbsp;';
            }
            if (baseTxt=='Texte&nbsp;Vide'||baseTxt=='Texte Vide') {
                baseTxt = 'Empty Text';
            }
            if (baseTxt=='Texte&nbsp;Haut'||baseTxt=='Texte Haut') {
                baseTxt = 'Top Text';
            }
            if (baseTxt=='Texte&nbsp;Bas'||baseTxt=='Texte Bas') {
                baseTxt = 'Bottom Text';
            }
            if (baseTxt=='Mot'||baseTxt=='Mot') {
                baseTxt = 'Word';
            }

        }

        if (langGet=='es') {
            
            if (baseTxt=='Texte&nbsp;') {
                baseTxt = 'Texto&nbsp;';
            }
            if (baseTxt=='Texte&nbsp;Bouton'||baseTxt=='Texte Bouton') {
                baseTxt = 'Texto Botón';
            }
            if (baseTxt=='Texte&nbsp;Vide'||baseTxt=='Texte Vide') {
                baseTxt = 'Texto Vacío';
            }
            if (baseTxt=='Texte&nbsp;Haut'||baseTxt=='Texte Haut') {
                baseTxt = 'Texto Superior';
            }
            if (baseTxt=='Texte&nbsp;Bas'||baseTxt=='Texte Bas') {
                baseTxt = 'Texto Inferior';
            }
            if (baseTxt=='Mot'||baseTxt=='Mot') {
                baseTxt = 'Palabra';
            }

        }

        if (langGet=='fr') {

            if(baseTxt=='Size&nbsp;Mode'||baseTxt=='Size Mode') {
                baseTxt = 'Taille Mode';
            }

        }

        if (origTxt!=baseTxt) {
            $(this).html(baseTxt);
        }

    });

}

setTimeout(function(){
    if (document.getElementById('chamidoc_migration')) {
        showMigration()
    }
}, 1000);

function showMigration(){
    
    if($("#quizzManagerWindows").length==0){
        $("body").append('<div class="quizzManagerWindows_cover" ></div>');
        $("body").append('<div id="quizzManagerWindows" class="quizzManagerWindows" >' + inMigration() + '</div>');
    }
    $("#quizzManagerWindows").css('display','');
    $(".quizzManagerWindows_cover").css('display','');

}

function inMigration(){
    
    var h = '';
    h += '<div style="position:relative;left:0px;top:0px;right:0px;height:36px;font-size:18px;line-height:36px;';
    h += 'border-bottom:solid 1px gray;cursor:pointer;background:#f8f8f8;" >&nbsp;&nbsp;Move&nbsp;Files&nbsp;to&nbsp;ChamiDoc&nbsp;</div>';
    h += '<div id="innerSelectQuizz" style="position:absolute;left:10px;top:45px;right:2px;bottom:5px;';
    h += 'border:solid 0px green;background:white;overflow:hidden;z-index:10010;" >';

    var imgLoad = '<p style="text-align:center;font-size:18px;" ><br><br><br><br>';
    imgLoad += 'Chamidoc Need Migration !';
    imgLoad += '<br><br><a href="' + _p['web_plugin'] +'chamidoc_tools/migration.php" >Start Migration</a><br>';
    imgLoad += '</p>';
    h += '</p>';
    h += imgLoad;
    h += '</div>';

    return h;

}