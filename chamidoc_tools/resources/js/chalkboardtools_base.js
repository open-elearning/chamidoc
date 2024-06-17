
var rescuevideoserver = 'urlnone';

var GlobalErrorChalkboard = 0;
var GlobalDataChalkboard = "";
var GlobalArrayChalkboard = "";

var GlobalTitleTopTxt = "";
var GlobalTypeStudioStr = "";

var GlobalOptionTopTxt = "";
var GlobalOptionBotTxt = "";
var GlobalOptionNavigation = false;

var lmssource = 'chamilo';

var _p = [];

function detectChalkboardDocument(){

    _p['web_course'] = getUrlCourses();

    if (window.jQuery) {

        if ($("#page-mod-openelearningstudio-view").length>0) {
            if ($("#region-main").length>0) {
                lmssource = 'moodle';
            }
        }

        $("div").each(function( index ) {
            var extractId = $(this).attr("id");
            if (extractId=="displaytitlechalk") {
                GlobalTitleTopTxt = cleanEmptyHtml($(this).html());
                $(this).css("display","none");
            }
        });

        $("div").each(function( index ) {
            var extractId = $(this).attr("id");
            if (extractId=="displayextrabuttonschalk") {
                GlobalOptionNavigation = true;
                $(this).css("display","none");
            }
        });

        $("div").each(function( index ) {
            var extractId = $(this).attr("id");
            if (extractId=="optiontop") {
                GlobalOptionTopTxt = cleanEmptyHtml($(this).html());
                GlobalOptionTopTxt = correctCoursePath(GlobalOptionTopTxt);
                $(this).css("display","none");
            }
        });

        $("div").each(function( index ) {
            var extractId = $(this).attr("id");
            if (extractId=="optionbot") {
                GlobalOptionBotTxt = cleanEmptyHtml($(this).html());
                GlobalOptionBotTxt = correctCoursePath(GlobalOptionBotTxt);
                $(this).css("display","none");
            }
        });

        $("p").each(function( index ) {
            var extractVal = $(this).text();
            if (extractVal.indexOf("chalkboardguid:")!=-1) {
                $(this).css("display","none");
                GlobalDataChalkboard = extractVal;
                initChalkboardDocument();
            }
        });

    } else {
        var matchesP = document.querySelectorAll("p")
        // Looping through the matched elements through the "length" property of the returned collection of elements
        for(var i=0; i<matchesP.length; i++) {
            var extractVal = matchesP[i].innerText;
            if (extractVal.indexOf("chalkboardguid:")!=-1) {
                matchesP[i].style.display = 'none';
                GlobalDataChalkboard = extractVal;
                initChalkboardDocument();
            }
        }
    }
    
    if(GlobalDataChalkboard==""){
        setTimeout(function(){detectChalkboardDocument();},350);
    }

}
setTimeout(function(){detectChalkboardDocument();},250);

function getTypeChalkboard(){

    var typeS = "";
    if (GlobalDataChalkboard.indexOf("chalkboardguid:")!=-1){
        var data = GlobalDataChalkboard;
        data = data.replace("chalkboardguid:","");
        data = data.replace(":end","");
        data = data + '@@@@@@';
        if(data.indexOf("@")!=-1){
            GlobalArrayChalkboard = data.split('@');
            if(GlobalArrayChalkboard[0]){
                typeS = GlobalArrayChalkboard[0];
            }
          
        }
    }
    if(typeS==""){
        typeS = "error";
    }
    return typeS;
}

var onlyOneInitChamidoc = true;

function initChalkboardDocument(){

    if (onlyOneInitChamidoc) {
        var typeS = getTypeChalkboard();
        if (typeof window['interface' + typeS] === 'function') { 
            GlobalTypeStudioStr = typeS;
            if (GlobalTitleTopTxt!=''
            &&typeS!='solarsystem'
            &&typeS!='turnpages'&&typeS!='turnactivepage') {
                appendToBody('<div class="chalkLeft" ></div>');
                appendToBody('<div class="chalkRight" ></div>');
                appendToBody('<div class="chalkTitle" >' + GlobalTitleTopTxt + '</div>');
            }

            window['interface' + typeS]();
            onlyOneInitChamidoc = false;
            if (typeS!='videocondition') {
                installOptionNavigation();
            }

            
        }
    }


}

function installOptionNavigation(typ){
    if (GlobalOptionNavigation) {
        var navigRight = '<a style="position:fixed;right:2px;top:50%;margin-top:-28px;z-index:1000;" ';
        if (typ=='videocondition') {
            navigRight += ' onClick="nextPageOperationConditional();" ';
        } else {
            navigRight += ' onClick="virtualNextPageOperation();" ';
        }
        navigRight += ' href="#" type="button" class="btn-btnTeach btnroundblue">Next</a>';
        appendToBody(navigRight);
    }
}

function virtualNextPageOperation() {
    var objscormnext = parent.document.getElementById('scorm-next');
    if (objscormnext) {
        objscormnext.click();
    }
}

function installChalkboardSideTxt(collapse){

    var isCola = '';

    if (collapse) {
        isCola = 'Cola';
    }

    if (GlobalOptionTopTxt!=''){
        var txtTop = '<div id=txtTopInformation class=infosTopChalkBoard'+isCola+' >';
        txtTop += GlobalOptionTopTxt;
        txtTop += '</div>';
        txtTop += '<div onClick="showTopTexte();" class=iconTopChalkBoard'+isCola+' ></div>';

        appendToBody(txtTop);
    }
    if (GlobalOptionBotTxt!=''){
        var txtBot = '<div id=txtBottomInformation class=infosBottomChalkBoard'+isCola+' >';
        txtBot += GlobalOptionBotTxt;
        txtBot += '</div>';
        txtBot += '<div onClick="showBottomTexte();" class=iconBotChalkBoard'+isCola+' ></div>';
        appendToBody(txtBot);
    }

}

function showTopTexte(){

    if ($('#txtTopInformation').hasClass("infosTopChalkBoardCola")) {
        
        $('#txtTopInformation').removeClass("infosTopChalkBoardCola");
        $('#txtTopInformation').addClass("infosTopChalkBoard");

        $('.iconTopChalkBoardCola').addClass("iconTopChalkBoard").removeClass("iconTopChalkBoardCola");

    }else{

        $('#txtTopInformation').removeClass("infosTopChalkBoard");
        $('#txtTopInformation').addClass("infosTopChalkBoardCola");

       $('.iconTopChalkBoard').addClass("iconTopChalkBoardCola").removeClass("iconTopChalkBoard");

    }

}

function showBottomTexte(){

    if ($('#txtBottomInformation').hasClass("infosBottomChalkBoardCola")) {
        
        $('#txtBottomInformation').removeClass("infosBottomChalkBoardCola");
        $('#txtBottomInformation').addClass("infosBottomChalkBoard");

        $('.iconBotChalkBoardCola').addClass("iconBotChalkBoard").removeClass("iconBotChalkBoardCola");

    }else{

        $('#txtBottomInformation').removeClass("infosBottomChalkBoard");
        $('#txtBottomInformation').addClass("infosBottomChalkBoardCola");

       $('.iconBotChalkBoard').addClass("iconBotChalkBoardCola").removeClass("iconBotChalkBoard");

    }

}

function correctCoursePath(sourceH){

    sourceH = sourceH.replace('="/courses/','="'+_p['web_course']);
    return sourceH;

}

function getUrlPlugChalkboard(){
    var urlStr = window.location.href;
    if(urlStr.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2 + "/plugin/chamidoc_tools/" ;   
    }

    if(urlStr.indexOf("/openelearningstudio/")!=-1){
        var pattern = "/openelearningstudio/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2 + "/openelearningstudio/chamidoc_tools/" ;   
    }

    return urlStr;
}

function getUrlCourses(){
    var urlStr = window.location.href;
    if(urlStr.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/courses/";   
    }
    if(urlStr.indexOf("/course/")!=-1){
        var pattern = "/course/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/course/";   
    }
    return urlStr;
}

function getUrlMain(){
    var urlStr = window.location.href;
    if(urlStr.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/main/";   
    }
    if(urlStr.indexOf("/course/")!=-1){
        var pattern = "/course/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/main/";   
    }
    return urlStr;
}

function getUrlUpload(){
    var urlStr = window.location.href;
    if(urlStr.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/app/upload/";   
    }
    if(urlStr.indexOf("/course/")!=-1){
        var pattern = "/course/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/app/upload/";   
    }
    return urlStr;
}

function getUrlRenderCache(){
    var urlStr = window.location.href;
    if(urlStr.indexOf("/courses/")!=-1){
        var pattern = "/courses/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/app/upload/rendercache/adv-oel-convert/";   
    }
    if(urlStr.indexOf("/course/")!=-1){
        var pattern = "/course/";
        var str2 = urlStr.substr(0,urlStr.indexOf(pattern));
        urlStr = str2+ "/app/upload/rendercache/adv-oel-convert/";   
    }
    return urlStr;
}

function appendToBody(h){

    if (lmssource == 'chamilo') {
        if (window.jQuery) {
            $("body").append(h);
        }else{
            document.body.innerHTML = document.body.innerHTML + h;
        }
    }
    if (lmssource == 'moodle') {
        if (window.jQuery) {
            $("#region-main").find(".activity-header").after(h);
        }
    }
    
}

function getLoaderSourceDiv() {
    
    var lmg = '<div id="loadchalkboarddiv" ';
    if (lmssource == 'moodle') {
        lmg += 'style="position:relative;min-height:700px;left:0px;right:0px;top:0px;bottom:0px;';
    } else {
        lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    }
    lmg += 'background:white;text-align:center;z-index:998;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';

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

function sizeIframeHeightAUto(){
    var Hifrm = $("#iframeAutoH").contents().find("iframe").height();
    Hifrm = Hifrm + 40;
    $("#iframeAutoH").css("height",Hifrm + 'px');
    setTimeout(function(){sizeIframeHeightAUto();},500);
}

function cancelChamiloStyle(){
    VrAPI = false;
    VrRenderer = false;
}

function loadProgressSvg(color){

    var lmg = '<div id="loadchalkborad" ';

    if (lmssource == 'moodle') {
        lmg += 'style="position:relative;min-height:700px;left:0px;right:0px;top:0px;bottom:0px;padding-top:30%;';
    } else {
        lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;padding-top:30%;';
    }

    lmg += 'background:'+color+';text-align:center;z-index:1000;" >';
    
    //lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" /><br/>';
    lmg += loadCircleSvg('');
    
    lmg += '</div>';

    return lmg;

}

function loadCircleSvg(tp){

    var h = '<svg '+tp+' width="100px" height="100px" version="1.1" id="L3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" ';
    h += ' viewBox="0 0 100 100" enable-background="new 0 0 0 0" xml:space="preserve">';
    h += '<circle fill="none" stroke="#7FB3D5" stroke-width="4" cx="50" cy="50" r="44" style="opacity:0.5;"/>';
    h += '<circle fill="#7FB3D5" stroke="#F8F9F9" stroke-width="3" cx="8" cy="54" r="6" >';
    h += '<animateTransform  attributeName="transform" ';
    h += ' dur="2s" type="rotate"';
    h += ' from="0 50 48" to="360 50 52"';
    h += ' repeatCount="indefinite" />';
    h += '</circle></svg>';
    return h;

}

function parseTexte(s){
	if (s == 'undefined'){return "";}
    if (s == 'NULL'){return "";}
	if (typeof(s) == 'undefined'){return "";}else{return s;}
}

function isMozilla(){
	
	var Moz = false;
	if(navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1){
		Moz = true;
	}
	return Moz;
	
}

function chalkGetParamLang(){
    var langGet = $('html')[0].lang;
    if(langGet==''){
        langGet = 'en'
    }
    return langGet;
}


var pageMaskTurn = '';
var pageMaskTurnInit = '';
var lstBgPgTurn = new Array();

var GlobalDocFlipX = 0;
var GlobalDocFlipY = 0;

var GlobalDocMagW = 0;
var GlobalDocMagH = 0;

var GlobalMoveMagActive = false;
var GlobalMoveMagX = 0;
var GlobalMoveMagY = 0;

var GlobalDecMagX = 0;
var GlobalDecMagY = 0;

var FinalDecMagX = 0;
var FinalDecMagY = 0;

var GlobalDecMoveMagY = 0;

function interfaceturnactivepage() {
    interfaceturnpages();
}

function interfaceturnpages() {

    if (document.getElementById('magazineDoc')) {
    
        return false;
    
    } else {

        var lmg = '<div id="loadmagazine" ';
        lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
        lmg += 'background:white;text-align:center;z-index:1000;" >';
        lmg += '<br/><br/><br/>';
        lmg += '<img style="width:150px;height:150px;" ';
        lmg += ' src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
        lmg += '</div>';
        appendToBody(lmg);
        
        var pg =  GlobalArrayChalkboard[1];
        if (pg.substring(0, 9)=='/courses/') {
            pg = pg.replace('/courses/',getUrlCourses())
        }
        if (pg.substring(0, 12)=='rendercache|') {
            pg = pg.replace('rendercache|',getUrlRenderCache())
        }

        pageMaskTurnInit = pg;
        
        pageMaskTurn = pg.replace('1.jpg','{num}.jpg');
        pageMaskTurn = pageMaskTurn.replace('1.png','{num}.png');
        pageMaskTurn = pageMaskTurn.replace('1.JPG','{num}.JPG');
        pageMaskTurn = pageMaskTurn.replace('1.jpeg','{num}.jpeg');

        var pgNum = parseInt(GlobalArrayChalkboard[2]) + 1;
        var h = '<div id="magZoom" class="magZoom" >'
        h += '<div id="magazineDoc" class="splash" ';
        h += ' style="width:960px;height:720px;background-color:#e0e0e0;border:solid 1px gray;" >';
        h += '<div id="pg1" style="background-image:url(' + pg + ');"></div>';
        lstBgPgTurn[1] = pg;
        if (pgNum>1) {
            for (i=2;i<pgNum;i++) {
                var pageUrl = pageMaskTurn.replace('{num}',i);
                lstBgPgTurn[i] = pageUrl;
                h += '<div id="pg'+i+'" style="background-image:url(' + pageUrl + ');';
                h += 'background-repeat:no-repeat;" >';
                h += '<div id="areaPageCover'+i+'" ';
                h += ' onClick="closeAllObjActFlip();" ';
                h += ' class="areaPageCover" ></div>';
                h += '</div>';
            }
        }
        h += '</div>';
        h += '</div>';
        appendToBody(h);

        controlImageExist();

        // No jquery . Extra Load
        if (!window.jQuery) {
            var js = document.createElement("script");
            js.type = "text/javascript";
            js.src = getUrlPlugChalkboard() + 'resources/js/jquery.js';
            document.body.appendChild(js);
        }

        // Call lib
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = getUrlPlugChalkboard() + 'plug/turnpages/js/turn.js';
        document.body.appendChild(js);

        setTimeout(function(){launchTurnPages();},750);
        
        if (GlobalTypeStudioStr=='turnactivepage') {
            setTimeout(function(){loadZonesFlipA();},1250);
        }

    }
}

function launchTurnPages() {

    if (GlobalErrorChalkboard>2) {
        document.location.reload();
    }
    var install = false;
    if(window.jQuery){
        if(jQuery().turn){
            if($("#magazineDoc").length==1){
                // installChalkboardSideTxt(true);
                installTurnPages();
                install = true;
            }
        }else{
            GlobalErrorChalkboard++;
        }
    }
    if(!install){
        setTimeout(function(){launchTurnPages();},500);
    }

}

//Engine Turnpages
var flipGlobalMag;

function controlImageExist() {

    var img = new Image();
    img.onload = function() {
        console.log('image is load');
    };
    img.onerror = function() {
        console.log('Error image auto correction');
        pageMaskTurn = pageMaskTurn.replace('/courses/','/app/courses/');
        var pgNum = parseInt(GlobalArrayChalkboard[2]) + 1;
        for (i=1;i<pgNum;i++) {
            var pageUrl = pageMaskTurn.replace('{num}',i);
            lstBgPgTurn[i] = pageUrl;
            $("#pg"+i).css("background-image","url(" + pageUrl + ")");
        }
    };
    img.src = pageMaskTurnInit;

}

function installTurnPages() {

    var displaymod = GlobalArrayChalkboard[3];

    $("#magazineDoc").parent().css("overflow","hidden");
    var cBg = "#7F8C8D";
    $("#magazineDoc").parent().css("background-color",cBg);
    $("body").css("background-color",cBg);

    sizeTurnPages(false);

    $("#loadmagazine").css("display","none");

    $('#magazineDoc').turn({
        display: displaymod,
        acceleration: false,
        gradients: !$.isTouch,
        autoCenter: true,
        elevation : 50,
        when: {
            turned: function(e, page) {
            }
        }
    });

    $( window ).resize(function() {
        sizeTurnPages(true);
    });

    var style = "background-color:#f9f9f9;border-radius:5px;user-select:none;color:#666666;font-size:18px;font-weight:bold;text-shadow:0px 1px 0px #ffffff;z-index: 1000;border:1px solid #dcdcdc;padding:15px 15px;cursor:pointer;";
    var flipTurnBtn = ' ';
    flipTurnBtn += '<div id="btnNextMagazine" onClick="fctNextMagazine();" ';
    flipTurnBtn += ' style="position:absolute;bottom:50%;right:6px;'+style+'">></div>';
    flipTurnBtn += '<div id="btnPrevMagazine" onClick="fctPrevMagazine();" ';
    flipTurnBtn += ' style="position:absolute;bottom:50%;left:6px;'+style+'"><</div>';

    $('#magazineDoc').parent().append(flipTurnBtn);
    flipGlobalMag = $("#magazineDoc");

    var style = "background-color:#f9f9f9;border-radius:20px;user-select:none;color:#666666;width:20px;height:20px;padding:10px;z-index: 1000;border:1px solid #dcdcdc;cursor:pointer;";

    $("#magazineDoc").bind("contextmenu",function(){
        return false;
    });

    if (GlobalTypeStudioStr=='turnactivepage') {
        var zoomBtn = '';
        zoomBtn += '<div onClick="processZoomPages();" ';
        zoomBtn += ' style="position:absolute;top:6px;left:50%;margin-left:-20px;'+style+'">'+getIconSvg()+'</div>';
        zoomBtn += '<div id="bottommovearea" ';
        zoomBtn += 'style="position:absolute;bottom:0%;left:0%;right:0%;height:100%;';
        zoomBtn += 'border:red 0px solid;z-index: 999;background:transparent;display:none;"></div>';
        
        $('#magZoom').parent().append(zoomBtn);
        //mouse whell event

        $('#bottommovearea').bind("mousedown",function(event){
            GlobalMoveMagX = event.pageX;
            GlobalMoveMagY = event.pageY;
            GlobalMoveMagActive = true;
        });
        $('#bottommovearea').bind("mousemove",function(event){
            if (GlobalMoveMagActive) {
                GlobalDecMagX = GlobalMoveMagX  -  event.pageX;
                GlobalDecMagY = event.pageY - GlobalMoveMagY;
                processZoomPageA();
            }
        });
        $('#bottommovearea').bind("mouseup",function(event){
            FinalDecMagX = FinalDecMagX + GlobalDecMagX;
            FinalDecMagY = FinalDecMagY + GlobalDecMagY;
            GlobalDecMagX = 0;
            GlobalDecMagY = 0;
            GlobalMoveMagActive = false;
            processZoomPageA();
        });

    }

  

}

var modeMagZoom = 0;
var areaMagX = 1;
var areaMagY = 1;

// Zoom
function processZoomPages(){

    GlobalDocFlipX = $('#pg1').width();
    GlobalDocFlipY = $('#pg1').height();
    GlobalDocMagW = $('.splash').width();
    GlobalDocMagH = $('.splash').height();

    if (modeMagZoom==0) {

        areaMagX = 1;

        if (flipGlobalMag.turn) {
            var pageData = flipGlobalMag.data().page;
            var nbVisible = nbPagesMagVisible();
            if (nbVisible==1&&pageData==1) { // Right Page
                areaMagX = 3;
            }
        }
        
        $('#btnNextMagazine').css('display','none');
        $('#btnPrevMagazine').css('display','none');
        $('#bottommovearea').css('display','');
        modeMagZoom = 1;
        processZoomPageA();

    } else {

        $('#btnNextMagazine').css('display','');
        $('#btnPrevMagazine').css('display','');
        $('.magZoom').css('transition','all 0.5s ease-out');
        $('.magZoom').css('translate','0px 0px');
        $('.magZoom').css('transform','scale(1)');
        $('#bottommovearea').css('display','none');
        modeMagZoom = 0;

    }

}

function processZoomPageA() {

    $('body').css('overflow','hidden');

    var zoomScl = 1.7;
    var bodyW = $('body').width();
    var bodyH = $('body').height();
    var ecartX = (bodyW - GlobalDocMagW);
    var ecartY = (bodyH - GlobalDocMagH);

    var MagPourX = 10;
    var MagPourY = 5;

    var MagdecX = 0;
    var MagdecY = 0;

    if(GlobalMoveMagActive){
        $('.magZoom').css('transition','none');
        MagdecX = (GlobalDecMagX / bodyW * 100);
        MagdecY = (GlobalDecMagY / bodyH * 100);
    }

    var FdecX = 0;
    if (FinalDecMagX!=0) {
        FdecX = (FinalDecMagX / bodyW * 100);
    }
    var FdecY = 0;
    if (FinalDecMagY!=0) {
        FdecY = (FinalDecMagY / bodyH * 100);
    }

    if (modeMagZoom == 1) {
        $('.magZoom').css('transform-origin',(MagPourX+MagdecX+FdecX)+'% '+(MagPourY-(MagdecY+FdecY))+'%');
        $('.magZoom').css('transform','scale('+zoomScl+')');
    }

}

function nbPagesMagVisible() {

    var nb = 0;

    var pageData = flipGlobalMag.data().page;

    if (pageData==1) {
        $('.turn-page-wrapper').first().each(function(){
            var page = $(this).css('display');
            var zindex = $(this).css('z-index');
            var pageattr = $(this).attr('page');
            if (page!='none'&&parseInt(zindex)==4&&parseInt(pageattr)==1) {
                nb = nb + 1;
            }
        });
    }

    return nb;
}

function ajustHeightMagazine(widthPage,displaymod){
    var heightPage = parseInt((widthPage)*0.564);
    if(displaymod=="single"){
        heightPage = parseInt((widthPage)*0.564);
        $("#magazineDoc").css("height",heightPage + 'px');
    }
    if(displaymod=="double"){
        heightPage = parseInt((widthPage/2)*1.30);
        $("#magazineDoc").css("height",heightPage + 'px');
    }
    return heightPage;
}

function sizeTurnPages(isResize){

    var displaymod = GlobalArrayChalkboard[3];

    var widthScreen = $("#magazineDoc").parent().width();
    var heightScreen = $("#magazineDoc").parent().height();

    var hbf = window.innerHeight - 20;
    if(heightScreen<hbf) {heightScreen = hbf;}
    if (heightScreen<450) {heightScreen = 450;}

    var widthPage = widthScreen - 100;
    var heightPage = heightScreen;

    heightPage = ajustHeightMagazine(widthPage,displaymod)

    if( heightPage>(heightScreen-30) ){
        widthPage = widthScreen - 200;
        heightPage = ajustHeightMagazine(widthPage,displaymod)
    }
    if( heightPage>(heightScreen-30) ){
        widthPage = widthScreen - 300;
        heightPage = ajustHeightMagazine(widthPage,displaymod)
    }
    if( heightPage>(heightScreen-30) ){
        widthPage = widthScreen - 400;
        heightPage = ajustHeightMagazine(widthPage,displaymod)
    }
    if( heightPage>(heightScreen-30) ){
        widthPage = widthScreen - 500;
        heightPage = ajustHeightMagazine(widthPage,displaymod)
    }

    $("#magazineDoc").css("width",widthPage + 'px');
    $("#magazineDoc").css("margin-left",parseInt((widthScreen-widthPage)/2)+ 'px');
    $("#magazineDoc").css("margin-top",'50%');
    $("#magazineDoc").css("margin-top",parseInt((heightScreen-heightPage)/2)+ 'px');

    if(isResize){
        $('#magazineDoc').turn('size', widthPage, heightPage);
        $('#magazineDoc').turn('resize');
    }
    

}

function fctNextMagazine(){
    if(flipGlobalMag.turn){
        flipGlobalMag.turn('next');
        closeAllObjActFlip();
    }
}

function fctPrevMagazine(){
    if(flipGlobalMag.turn){
        flipGlobalMag.turn('previous');
        closeAllObjActFlip();
    }
}

function fctToPageMagazine(i){

    if(flipGlobalMag.turn){

        var pageData = flipGlobalMag.data().page;
        
        if (i>pageData+1) {
            flipGlobalMag.turn('next');
            closeAllObjActFlip();
            setTimeout(function(){fctToPageMagazine(i);},250);
        } else {
            if (i<pageData&&pageData>1) {
                flipGlobalMag.turn('previous');
                closeAllObjActFlip();
                setTimeout(function(){fctToPageMagazine(i);},250);
            }
        }
        
    }
    
}

function fctZoomTo(event) {

	if ($(this).zoom('value')==1)
		$(this).zoom('zoomIn', event);
	else
		$(this).zoom('zoomOut');

}

function closeAllObjActFlip() {
    $('.areaPageCover').css('display','none');
    $('.AreaZoomInPg').css('display','none');
    $('.AreaLinkInPg').css('display','none');
    $('.splash').animate({ 'zoom': 1 }, 400);
    $('.splash').css('translate','-0px 0px');
    $('#btnNextMagazine').css('display','');
    $('#btnPrevMagazine').css('display','');
    $('.AreaLinkInPg').css('top','30%').css('height','40%');
    modeMagZoom = 0;
}

// Class objects

var QuickActiveAreas = new Array();
var QuickActiveAreas_count = 0;

function QuickActiveArea(){
	this.id; this.idtmp;
	this.create; this.page;
    this.data;
    this.type;
    this.x; this.y;
    this.w; this.h;
	this.show = function() {
		if (this.create==0) {
            this.idtmp = this.id;
            var objR = "<div id='areaZA" + this.idtmp + "' ";
            objR += " style='position:absolute;left:"+this.x+"%;";
            objR += "top:"+this.y+"%;width:"+this.w+"%;height:"+this.h+"%;' ";
            
            var extrObj = '';
            var innObj = '';

            if (this.type==0) {
                objR += " onclick='setAreaZoomEvent(" + this.id + "," + this.page + "," + this.x + "," + this.y + "," + this.w + "," + this.h + ");' ";
                
                extrObj += "<div id='areaZoom" + this.idtmp + "' ";
                extrObj += " style='position:absolute;left:"+this.x+"%;";
                extrObj += "top:"+this.y+"%;width:"+this.w+"%;height:"+this.h+"%;' ";
                extrObj +=  "class='AreaZoomInPg noselect' ></div>";

            }
            if (this.type==1) {
                objR += " onclick='fctNextMagazine();' ";
            }
            if (this.type==2) {
                objR += " onclick='fctPrevMagazine();' ";
            }
            if (this.type==3) {
                objR += " onclick='fctToPageMagazine("+this.data+");' ";
            }
            if (this.type==4) { // Mask
                objR += " ";
                extrObj += "<div onclick='setAreaMaskEvent(\""+this.idtmp+"\","+this.x+","+this.w+");' id='areaMask"+this.idtmp+"' ";
                extrObj += " style='position:absolute;left:"+this.x+"%;";
                extrObj += "top:"+this.y+"%;width:"+this.w+"%;height:"+this.h+"%;' ";
                extrObj +=  "class='AreaMaskInPg noselect' ></div>";
            }
            if (this.type==5) { // html
                innObj = convertDataToHtmlTurnFct(this.data);
            }
            if (this.type==6) { // link inner
                objR += " onclick='setAreaInnerLinkEvent(\"" + this.idtmp + "\"," + this.page + ",\""+this.data+"\");' ";
                extrObj += "<div id='areaLinkinner" + this.idtmp + "' ";
                extrObj += " style='position:absolute;left:10%;";
                extrObj += "top:30%;width:80%;height:40%;' ";
                extrObj +=  "class='AreaLinkInPg noselect' >'";
                extrObj += "</div>";
            }
            if (this.type==4) { 
                objR +=  "class='AreaZoneTransInPg noselect' ></div>";
            } else if (this.type==5) {
                objR +=  "class='AreaZonehtml5InPg noselect' >"+innObj+"</div>";
            } else {
                objR +=  "class='AreaZoneInPg noselect' ></div>";
            }
            
            objR = objR + extrObj;

            if ($('#pg'+this.page).length==1) {
                $('#pg'+this.page).append(objR);
                this.create = 1;
            } else {
                console.log('Error: pg' + this.page + ' not found');
            }
		}
	}
}

function convertDataToHtmlTurnFct(txt) {
    txt = txt.replace(/zilt;/g,'<');
    txt = txt.replace(/zigt;/g,'>');
    txt = txt.replace(/zisol;/g,'/');
    return txt;
}

function QuickActiveArea_Add(Elem){
    Elem.id = QuickActiveAreas_count;
    Elem.create = 0;
    QuickActiveAreas.push(Elem);
    QuickActiveAreas_count = QuickActiveAreas_count + 1;
    QuickActiveArea_Paint();
}

function QuickActiveArea_Paint(){

	for (var i = 0; i < QuickActiveAreas_count; i++){
        var objElem = QuickActiveAreas[i];
            objElem.show();
	}
	
}

function loadZonesFlipA(){

    var option4 = GlobalArrayChalkboard[4];
    var option5 = GlobalArrayChalkboard[5];

    if (option4.indexOf('$')!=-1) {
        
        option5 += '$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$';

        var ArrayObjects = option4.split('$');
        var ArrayOptions = option5.split('$');

        var i = 0;

        for (i = 0; i < ArrayObjects.length; i++) {
        
            var objInfos = ArrayObjects[i];
            var readDataOpt = ArrayOptions[i];

            if (objInfos.indexOf('|')!=-1) {
                var objetPart = objInfos.split('|');
                var elem  = new QuickActiveArea();
                elem.page = objetPart[0];
                elem.x = objetPart[1];
                elem.y = objetPart[2];
                elem.w = objetPart[3];
                elem.h = objetPart[4];
                elem.type = objetPart[5];
                elem.data = readDataOpt;
                elem.create = 1;
                QuickActiveArea_Add(elem);
            }

        }

    }

}

function setAreaZoomEvent(id,pgid,pourcx,pourcy,pourcw,pourch) {

    $('.AreaZoomInPg').css('display','none');

    $('#areaPageCover' + pgid).css('display','block');

    GlobalDocFlipX = $('#pg' + pgid).width();
    GlobalDocFlipY = $('#pg' + pgid).height();

    var GlobalDoc2FlipX = GlobalDocFlipX * 2;
    var GlobalDoc2FlipY = GlobalDocFlipY * 2;

    var objX = (GlobalDocFlipX / 100) * pourcx;
    var objY = (GlobalDocFlipY / 100) * pourcy;
    var objW = (GlobalDocFlipX / 100) * pourcw;
    var objH = (GlobalDocFlipY / 100) * pourch;

    var obj2X = (GlobalDoc2FlipX / 100) * pourcx;
    var obj2Y = (GlobalDoc2FlipY / 100) * pourcy;
    var obj2W = (GlobalDoc2FlipX / 100) * pourcw;
    var obj2H = (GlobalDoc2FlipY / 100) * pourch;

    $('#areaZoom' + id).css('display','block');
    $('#areaZoom' + id).css('left',pourcx + '%').css('margin-left','0px');
    $('#areaZoom' + id).css('width',objW + 'px').css('height',objH + 'px');

    var objImg = '<img id="areaZoomImg' + id + '" ';
    objImg += ' class="areaZoomImg" src="' + lstBgPgTurn[pgid] + '" ';
    objImg += ' style="left:-'+objX+'px;top:-'+objY+'px;';
    objImg += 'transition: all 0.5s ease-out;';
    objImg += 'width:' + GlobalDocFlipX + 'px;height:' + GlobalDocFlipY + 'px;" />';
    $('#areaZoom' + id).html(objImg);

    setTimeout(function(){
        $('#areaZoom' + id).css({
            left : '50%',
            marginLeft : -(obj2W/2) + 'px',
            width : obj2W + 'px',
            height : obj2H + 'px'
        });
        $('#areaZoomImg' + id).css({
            left : -obj2X,
            top : -obj2Y,
            width : GlobalDoc2FlipX,
            height : GlobalDoc2FlipY
        }); 
    },100);

    /* */

}

function setAreaMaskEvent(id,pourcx,pourcw) {

    setTimeout(function(){
        $('#areaMask' + id).css('width','1%');
        $('#areaMask' + id).css('left',parseInt(pourcx+(pourcw/2))+'%');
        setTimeout(function(){
            $('#areaMask' + id).css('display','none');
        },600);
    },100);

}

function setAreaInnerLinkEvent(id,pgid,datalk) {

    $('.AreaZoomInPg').css('display','none');
    $('#areaPageCover' + pgid).css('display','block');
    $('#areaLinkinner' + id).css('display','block');
    var datalink = convertDataToHtmlTurnFct(datalk);
    var lkfrm = '<iframe src="'+ datalink +'" width="98%" height="98%" frameborder="0" scrolling="auto"';
    lkfrm += ' style="position:absolute;left:1%;top:1%;width:98%;height:98%;" ></iframe>';
    $('#areaLinkinner' + id).html(lkfrm);
    setTimeout(function(){
        $('#areaLinkinner' + id).css('top','10%').css('height','80%');
    },100);

}

function getIconSvg() {

var s = '<?xml version="1.0" encoding="UTF-8"?>';
s += '<svg width="20px" height="20px" version="1.1" viewBox="0 0 450.22 450.22" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">';
s += '<path d="m441.39 398.68-164.47-164.47c16.282-24.491 25.028-53.193 25.028-83.253 0-40.31-15.713-78.229-44.236-106.74-28.498-28.508-66.394-44.212-106.73-44.212-40.326 0-78.246 15.704-106.77 44.211-28.507 28.523-44.203 66.435-44.203 106.74 0 40.318 15.696 78.229 44.211 106.75 28.523 28.507 66.427 44.211 106.74 44.211 30.076 0 58.778-8.746 83.261-25.004l164.42 164.43c5.698 5.714 13.29 8.868 21.37 8.868 8.064 0 15.648-3.129 21.386-8.844 11.739-11.786 11.739-30.929-0.015-42.691zm-221.06-178.36c-18.525 18.517-43.146 28.726-69.361 28.726-26.19 0-50.82-10.209-69.353-28.726-18.533-18.533-28.735-43.163-28.735-69.361 0-26.207 10.201-50.828 28.726-69.353 18.533-18.533 43.171-28.735 69.369-28.735 26.207 0 50.828 10.201 69.361 28.735 18.517 18.517 28.71 43.138 28.71 69.353 1e-3 26.198-10.192 50.828-28.717 69.361z" fill="#010002"/>';
s += '<path d="m207.48 144.26h-45.512v-45.52c0-3.942-3.203-7.129-7.153-7.129-3.926 0-7.137 3.195-7.137 7.129v45.52h-45.52c-3.942 0-7.129 3.195-7.129 7.137s3.186 7.145 7.129 7.145h45.52v45.512c0 3.942 3.211 7.145 7.137 7.145 3.95 0 7.153-3.203 7.153-7.145v-45.512h45.512c3.95 0 7.153-3.203 7.153-7.145s-3.203-7.137-7.153-7.137z" fill="#010002"/>';
s += '</svg>';
return s;

}
var jmolAppletA = new Array();
var InfoJsMolGlobal = new Array();
var InfoJsMolTimer = 2500;
var ObjJsMol = new Array();
var installLibsJsMol = false;
var errorLibsJsMol = false;

function interfaceviewermol3d(){

    var lmg = '<div id="loadviewermol3d" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/>Viewer Mol 3D<br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);

    var html = '';

	html = '<table id="molviewer3d" style="border:dotted 1px gray;background-color:white;z-index:5;" ';
	html += ' class="molviewer3d" >';
	html += ' <tr>';
	html += ' <td><div id="middlepanel" ></div></td>';
	html += ' </tr>';
	html += ' <tr>';
	html += ' <td style="text-align:center;">';
	html += ' <div style="text-align:center;font-size:15px;background:white;z-index:5;user-select:none;cursor:pointer;" id="lowerpanel" ></div>';
	html += ' </td></tr>';
	html += ' </table>';
    appendToBody(html);
    
    //Call lib
    if(installLibsJsMol==false){
        var js = document.createElement("script");
        js.type = "text/javascript";
        js.src = getUrlPlugChalkboard() + "plug/viewermol3d/js/JSmol.min.js";
        document.body.appendChild(js);
        installLibsJsMol = true;
    }

    setTimeout(function(){launchViewerMol3d();},750);

}

function launchViewerMol3d(){

    var install = false;
    if($("#molviewer3d").length==1){
        $("#loadviewermol3d").css("display","none");
        installViewerMol3d();
        installChalkboardSideTxt(true);
        install = true;
    }
    if(!install){
        setTimeout(function(){launchViewerMol3d();},500);
    }

}

function installViewerMol3d(){

    if(GlobalErrorChalkboard>2){
        document.location.reload();
    }

    var install = false;

    if (Jmol === null && typeof Jmol === "undefined"){
        Jmol=false;
    }
    if(Jmol){
        
        install = true;
        var i = 0;

        var filemol = GlobalArrayChalkboard[1];
        if(filemol.substring(0, 9)=='/courses/'){
            filemol = filemol.replace('/courses/',getUrlCourses());
        }
        
        $("#molviewer3d").parent().css("overflow","hidden");
        $("#molviewer3d").parent().css("background-color","white");

        var wb = $("#molviewer3d").parent().width() - 100;
        var hb = $("#molviewer3d").parent().height() - 100;
        //Hack FF
        var hbf = window.innerHeight - 100;
        if(hb<hbf) {hb = hbf;}
        if (hb<450) {hb = 450;}

        InfoJsMolGlobal[i] = {
            width: wb,
            height: hb,
            use: "HTML5",
            jarPath: "java",
            j2sPath: getUrlPlugChalkboard() + 'plug/viewermol3d/js/j2s',
            jarFile: "JmolAppletSigned.jar",
            isSigned: false,
            script: "set antialiasDisplay;load " + filemol,
            addSelectionOptions: false,
            serverURL: "https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php",
            readyFunction: null,
            console: "jmol_infodiv",
            disableInitialConsole: true,
            defaultModel: null,
            debug: false
        }

        jmolAppletA[i] = Jmol.getApplet("appletCheck" + i, InfoJsMolGlobal[i], true);

        $(document).ready(function(){	
            
            $("#middlepanel").html(Jmol.getAppletHtml("appletCheck" + i, InfoJsMolGlobal[i]));
            
            var use = (InfoJsMolGlobal[i].use != "JAVA" ? InfoJsMolGlobal[i].use : InfoJsMolGlobal[i].isSigned ? "SIGNED" : "JAVA"); 

            Jmol.setButtonCss(null,"style='width:45px;font-size:15px!important;user-select:none;cursor:pointer;'");

            var s = Jmol.jmolRadioGroup(jmolAppletA[i], [["set background white", "white", true],["set background black", "black"]]) + "<br/>"
            + Jmol.jmolButton(jmolAppletA[i],"wireframe -0.1 #alt:SETTING Line", "W")
            + Jmol.jmolButton(jmolAppletA[i],"spacefill only;spacefill 23%;wireframe 0.15 #alt:SETTING Ball and Stick","B");
            s += Jmol.jmolButton(jmolAppletA[i],"spacefill #alt:SETTING van der Waals Spheres", "S");
            
            $("#lowerpanel").html(s);
            
            setTimeout(function(){
                $("#lowerpanel").children().css("font-size","15px;");
                $("#lowerpanel").children().children().css("font-size","15px;");
                $("#lowerpanel").children().children().children().css("font-size","15px;");
                $("#jmolRadioGroup0").css("font-size","15px;");
            },250);

        });

    }
    
    if(!install){
        GlobalErrorChalkboard++;
        setTimeout(function(){launchViewerMol3d();},500);
    }


}

function interfacehvpwordsmatch(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var word1 = GlobalArrayChalkboard[1];
    var word2 = GlobalArrayChalkboard[2];
    var word3 = GlobalArrayChalkboard[3];
    var word4 = GlobalArrayChalkboard[4];
    var word5 = GlobalArrayChalkboard[5];
    var word6 = GlobalArrayChalkboard[6];
    var word7 = GlobalArrayChalkboard[7];
    var word8 = GlobalArrayChalkboard[8];

    var dataH = "#" + word1 
    
    if(word2!=''){ dataH += "@" + word2; }
    if(word3!=''){ dataH += "@" + word3; }
    if(word4!=''){ dataH += "@" + word4; }
    if(word5!=''){ dataH += "@" + word5; }
    if(word6!=''){ dataH += "@" + word6; }
    if(word7!=''){ dataH += "@" + word7; }
    if(word8!=''){ dataH += "@" + word8; }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    //Hack FF
    var hbf = window.innerHeight - 50;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<450) {heightPage = 450;}
    heightPage = heightPage + 'px';
    if (GlobalOptionBotTxt!="") {
        heightPage = 'auto';
    }
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() + 'plug/hvpwordsmatch/js/wordsmatch.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:90%;height:' + heightPage + ';margin-left:5%;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchHvpwordsmatch();},500);

}

function launchHvpwordsmatch(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}
//hvpimagejuxapose

function interfacehvpimagejuxapose(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var image1 = GlobalArrayChalkboard[1];
    if(image1.substring(0, 9)=='/courses/'){
        image1 = image1.replace('/courses/',getUrlCourses());
    }

    var image2 = GlobalArrayChalkboard[2];
    if(image2.substring(0, 9)=='/courses/'){
        image2 = image2.replace('/courses/',getUrlCourses());
    }

    var dataH = "#" + image1;
    if(image2!=''){
        dataH += "@" + image2;
    }
    
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    var widthIframe = "width:90%;";

    //Hack FF
    var hbf = window.innerHeight - 50;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<450) {heightPage = 450;}
    heightPage = heightPage + 'px';
    if (GlobalOptionBotTxt!="") {
        heightPage = 'auto';
        widthIframe = "width:80%;";
    }

    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() + 'plug/hvpimagejuxapose/js/imagejuxapose.html'+dataH+'" frameBorder="0" ';
    h += ' style="' + widthIframe + 'height:' + heightPage + ';margin-left:5%;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchHvpimagejuxapose();},500);

}

function launchHvpimagejuxapose(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}
function interfacehvpdragthewords(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var sentence1 = GlobalArrayChalkboard[1];
    var sentence2 = GlobalArrayChalkboard[2];

    var dataH = "#" + sentence1;
    if(sentence2!=''){
        dataH += "@" + decodeURI(sentence2);
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

     //Hack FF
     var hbf = window.innerHeight - 50;
     if(heightPage<hbf) {heightPage = hbf;}
     if (heightPage<450) {heightPage = 450;}
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }
    
    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() ;
    h += 'plug/hvpdragthewords/js/dragthewords.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:90%;height:' + heightPage + 'px;margin-left:5%;';
    h += 'background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchdragthewords();},500);

}

function launchdragthewords(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}

function interfacehvpmarkthewords(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);

    var sentence1 = GlobalArrayChalkboard[1];
    var sentence2 = GlobalArrayChalkboard[2];
    var dataH = "#" + sentence1;
    if(sentence2!=''){
        dataH += "@" + decodeURI(sentence2);
    }
    
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();

    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    //Hack FF
    var hbf = window.innerHeight - 50;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<450) {heightPage = 450;}
    heightPage = heightPage + 'px';
    if (GlobalOptionBotTxt!="") {
        heightPage = 'auto';
    }

    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() ;
    h += 'plug/hvpmarkthewords/js/mark-the-words.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:90%;height:' + heightPage + ';margin-left:5%;';
    h += 'background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    setTimeout(function(){launchmarkthewords();},500);

}

function launchmarkthewords(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}

function interfacehvpfillintheblanks(){
    launchhvpfillintheblanks(false);
}

function interfacehvpfillintheblankscs(){
    launchhvpfillintheblanks(true);
}

function launchhvpfillintheblanks(iscs){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var sentence1 = GlobalArrayChalkboard[1];
    var sentence2 = GlobalArrayChalkboard[2];
    var dataH = "#" + sentence1;
    if(sentence2!=''){
        dataH += "@" + decodeURI(sentence2);
    }
    
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();

    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    //Hack FF
    var hbf = window.innerHeight - 50;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<450) {heightPage = 450;}
    heightPage = heightPage + 'px';
    if (GlobalOptionBotTxt!="") {
        heightPage = 'auto';
    }

    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() ;
    if (iscs) {
        h += 'plug/hvpfillintheblankscs/js/fill-in-the-missing-words.html'+dataH+'" frameBorder="0" ';
    } else {
        h += 'plug/hvpfillintheblanks/js/fill-in-the-missing-words.html'+dataH+'" frameBorder="0" ';
    }
    
    h += ' style="width:90%;height:' + heightPage + ';margin-left:5%;';
    h += 'background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    setTimeout(function(){launchFillintheblanks();},500);

}

function launchFillintheblanks(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}
function interfacehvpcompildragdrop(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);

    var img1 = GlobalArrayChalkboard[1];
    var sen2 = GlobalArrayChalkboard[2];
    var img3 = GlobalArrayChalkboard[3];
    var sen4 = GlobalArrayChalkboard[4];
    var img5 = GlobalArrayChalkboard[5];
    var sen6 = GlobalArrayChalkboard[6];
    
    var dataH = "#" + decodeURI(img1);

    if (sen2!='') {
        dataH += "@" + decodeURI(sen2);
    } else {
        dataH += "@X";
    }
    if (img3!='') {
        dataH += "@" + decodeURI(img3);
    } else {
        dataH += "@X";
    }
    if (sen4!='') {
        dataH += "@" + decodeURI(sen4);
    } else {
        dataH += "@X";
    }
     if (img5!='') {
        dataH += "@" + decodeURI(img5);
    } else {
        dataH += "@X";
    }
    if (sen6!='') {
        dataH += "@" + decodeURI(sen6);
    } else {
        dataH += "@X";
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();

    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    //Hack FF
    var hbf = window.innerHeight - 50;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<450) {heightPage = 450;}
    heightPage = heightPage + 'px';
    if (GlobalOptionBotTxt!="") {
        heightPage = 'auto';
    }
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }
    
    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() ;
    h += 'plug/hvpcompildragdrop/js/txtimgdragdrop3.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:80%;height:' + heightPage + ';margin-left:10%;';
    h += 'background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    setTimeout(function(){launchhvpcompildragdrop();},500);

}

function launchhvpcompildragdrop(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}
var dblactivity = false;

function interfacevideoandactivity(){

    dblactivity = true;

    var link = GlobalArrayChalkboard[3];
    var id_session = ChamiloStudioTopGetParamValue('id_session');
    var cidReq = ChamiloStudioTopGetParamValue('cidReq');
    var link2 = getUrlMain() + 'exercise/overview.php?cidReq=' + link;
    if (link2.indexOf('?cidReq=&')!=-1) {
        link2 = link2.replace('?cidReq=&','?cidReq=' + cidReq + '&');
    }
    if (link2.indexOf('&id_session=0&')!=-1) {
        link2 = link2.replace('&id_session=0&','&id_session=' + id_session + '&');
    }

    var h = '<div id="activityNearContent" class="activityNearContent" >';
    h += '<iframe id="iframePresenterH" src="'+ '' +link2 + '" frameBorder="0" ';
    h += ' style="width:99%;background-color:white;height:99%;" ></iframe>';
    h += '</div>';

    appendToBody(h);
    interfacevideoscreenlock();

}

function interfacevideoscreenlock(){

    var lmg = loadProgressSvg('#B2BABB');
    appendToBody(lmg);

    var heightScreen = $("body").height();
    var heightPage = heightScreen - 50;
    var timebefore = 3000;

    var pg =  GlobalArrayChalkboard[1];
    if (pg.indexOf('vimeo.com')!=-1
    ||pg.indexOf('youtu.be/')!=-1
    ||pg.indexOf('infomaniak.com')!=-1
    ||pg.indexOf('youtube.com')!=-1) {
        timebefore = 1200;
    }
    
    if (lmssource == 'chamilo') {
        
        $("body").css("background-color","#B2BABB");

        var h = '<div id="fakevideoblack" class="fakevideoblack" style="position:fixed;width:96%;height:20%;top:20%;';
        h += 'left:2%;background-color:black;user-select: none;z-index:1010;text-align:center;" ><br><br>';
        h += loadCircleSvg(' style="position:absolute;top:50%;left:50%;margin-top:-50px;margin-left:-50px;" ');
        h += '</div>';
        appendToBody(h);
        $( "#fakevideoblack" ).animate({
            top : "1%",
            height : "96%"
        },1000, function() {
        });

    }

    setTimeout(function(){
        installVideoscreenlock();
    },timebefore);

}

function installVideoscreenlock(){
    
    $("#loadchalkborad").css("display","none");
    $("#mejs__mediaelement").css("background-color","#B2BABB");
    $(".mejs__mediaelement").css("background-color","#B2BABB");

    var pg =  GlobalArrayChalkboard[1];
    if(pg.substring(0, 9)=='/courses/'){
        pg = pg.replace('/courses/',getUrlCourses())
    }
    
    var h = '<video class="framevideo" oncontextmenu="return false;" style="width:96%;height:96%;margin-top:1%;';
    h += 'margin-left:2%;background-color:#B2BABB;user-select: none;" ';
    h += ' controls controlslist="nodownload" disablePictureInPicture nodownload>';
    h += ' <source src="'+ pg + '" type="video/mp4"></source>';
    if (rescuevideoserver != "urlnone") {
        h += ' <source src="'+ rescuevideoserver + getvideoNameFromPath(pg) + '" type="video/mp4"></source>';
    }
    h += '</video>';

    if (pg.indexOf('vimeo.com')!=-1) {
        isExternVideo = true;
        h = getVimeoCodeIntegration(pg);
    }

    if (pg.indexOf('infomaniak.com')!=-1) {
        isExternVideo = true;
        h = getInfomaniakCodeIntegr(pg);
    }

    if(pg.indexOf('youtu.be/')!=-1||pg.indexOf('youtube.com')!=-1){
        

        var dimV = "width:96%;height:96%;margin-top:1%;margin-left:2%";
        var dimWH = ' width="96%" height="96%" ';
        if (dblactivity==true) {
            dimV = "position:fixed;top:25%;left:0pxwidth:50%;height:50%;";
            dimWH = ' width="50%" height="50%" ';
        }

        var idYT = extractYTId(pg);
        h = '<iframe class="framevideo" src="https://www.youtube.com/embed/' + idYT + '" style="' + dimV + '" ' + dimWH + ' frameborder="0" ';
        h += 'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
        
    }

    $('.framevideo').bind('contextmenu',function() { return false; });
    $('video').bind('contextmenu',function() { return false; });
    $('frame').bind('contextmenu',function() { return false; });

    appendToBody(h);

    installChalkboardSideTxt(true);

    $("#fakevideoblack").css("opacity",'0.8');

    setTimeout(function(){
        $( "#fakevideoblack" ).animate({
            left : "44%",
            width : "12%",
            top : "44%",
            height : "12%"
        },500, function() {
            $("#fakevideoblack" ).css("display","none");
        });
        resizeDblActivity();
    },600);
}

function reall(txt, rep, witht) {
    return txt.replace(new RegExp(rep,'g'),witht);
};

function resizeDblActivity(){

    if (dblactivity) {
        var wvid = window.innerWidth;
        if (wvid<801) {
            $(".framevideo").css("width","100%");
            $(".framevideo").css("height","50%");
            $(".framevideo").css("left","0%");
            $(".framevideo").css("top","0%");
       } else {
            $(".framevideo").css("width","50%");
            $(".framevideo").css("height","50%");
            $(".framevideo").css("left","0%");
            $(".framevideo").css("top","25%");
       }
        setTimeout(function(){
            resizeDblActivity()
        },1000);

    }

}
var paramVideoCondition = "1m";
var preventSpeedPass = true;
var activeVideoCondition = false;
var scormVideoCompleted = false;
var paramSET = "";
var messageVideoCondition = "Vous devez voir la vidéo pour passer à la suite.";
var messageValidProgression = "Voulez-vous valider la progression ?";
var alterVideoCondition = "";

function interfacevideocondition(){

    var lmg = loadProgressSvg('#B2BABB');
    appendToBody(lmg);

    if (lmssource == 'chamilo') {
        $("body").css("background-color","#B2BABB");
    }

    if (parent) {
        if (parent.document) {
            
            var objhome = parent.document.getElementById('home-course');
            var objSCo = parent.document.getElementsByClassName('scorm_highlight');
            if (objSCo) {
                if (objSCo.length==1) {
                    if (objSCo[0].classList.contains("scorm_completed")) {
                        scormVideoCompleted = true;
                    }
                }
            }
            if (objhome) {

                if (scormVideoCompleted) {
                    activeVideoCondition = true;
                    preventSpeedPass = true;
                } else {
                    objhome.removeAttribute("onclick");
                    objhome.href = getUrlMain() + 'course_home/last_course.php?c-studio=1';
                }

                 // objhome.removeAttribute("onclick");
                // objhome.href = getUrlMain() + 'course_home/last_course.php?c-studio=1';
                
            }
            var objscormnext = parent.document.getElementById('scorm-next');
            if (objscormnext&&scormVideoCompleted==false) {
                var onClickAlter = objscormnext.getAttribute("onclick");
                // add new attribute 
                objscormnext.removeAttribute("onclick");
                objscormnext.removeAttribute("mouseUp");
                objscormnext.removeAttribute("mouseDown");
                objscormnext.removeAttribute("focus");
                objscormnext.setAttribute("onclick", "alert('"+messageVideoCondition+"');location.reload();");
                objscormnext.setAttribute("alterclick", onClickAlter);
                alterVideoCondition = onClickAlter;
            }
            var objstatslink = parent.document.getElementById('stats_link');
            if (objstatslink) {
                objstatslink.removeAttribute("onclick");
                objstatslink.href = 'javascript:void(0)';
            }
      
        }
    }
    
    var heightScreen = $("body").height();
    var heightPage = heightScreen - 50;
    
    var pg =  GlobalArrayChalkboard[1];

    paramVideoCondition = GlobalArrayChalkboard[3];
    
    paramSET = parseTexte(GlobalArrayChalkboard[4]);
    paramCPA = parseTexte(GlobalArrayChalkboard[5]);
    
    if (paramCPA=='no'||paramCPA=='') {
        setTimeout(function(){installVideoCondition();},3000);
        if (paramSET!='no'&&paramSET!='') {
            if (pg!='') {
                setTimeout(function(){sendEstimatedTime(paramSET)},2000);
            }
        }
    } else {
        setTimeout(function(){installVideoCreditWall();},3000);
    }

}

function installVideoCondition(){
    
    var isExternVideo = false;

    $("#loadchalkborad").css("display","none");
    $("#mejs__mediaelement").css("background-color","#B2BABB");
    $(".mejs__mediaelement").css("background-color","#B2BABB");

    var pg =  GlobalArrayChalkboard[1];
    if (pg.substring(0, 9)=='/courses/') {
        pg = pg.replace('/courses/',getUrlCourses())
    }

    cancelChamiloStyle();

    var h = '<video id="chalkboardvideo" oncontextmenu="return false;" ';
    h += ' style="width:96%;height:96%;margin-top:1%;margin-left:2%;';
    h += 'background-color:#B2BABB;user-select:none;" ';
    h += ' controls controlslist="nodownload" disablePictureInPicture nodownload>';
    h += '<source src="'+ pg + '" type="video/mp4"></source>';
    if (rescuevideoserver != "urlnone") {
        h += ' <source src="'+ rescuevideoserver + getvideoNameFromPath(pg) + '" type="video/mp4"></source>';
    }
    h += '</video>';
    
    if (pg.indexOf('vimeo.com')!=-1) {
        isExternVideo = true;
        h = getVimeoCodeIntegration(pg);
    }

    if (pg.indexOf('infomaniak.com')!=-1) {
        isExternVideo = true;
        h = getInfomaniakCodeIntegr(pg);
    }

    $('video').bind('contextmenu',function() { return false; });

    appendToBody(h);

    installChalkboardSideTxt(true);
    
    if (pg!='') {
        console.log('validCond'+paramVideoCondition);
        if (paramVideoCondition=="1m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},60000);
            setTimeout(function(){validVideoCond();},80000);
        }
        if (paramVideoCondition=="3m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},180000);
            setTimeout(function(){validVideoCond();},250000);
        }
        if (paramVideoCondition=="5m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},300000);
            setTimeout(function(){validVideoCond();},600000);
        }
        if (paramVideoCondition=="10m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},600000);
            setTimeout(function(){validVideoCond();},650000);
        }
        if (paramVideoCondition=="15m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},75000);
            setTimeout(function(){validVideoCond();},800000);
        }
        if (paramVideoCondition=="20m") {
            preventSpeedPass = true;
            setTimeout(function(){validVideoCond();},1200000);
            setTimeout(function(){validVideoCond();},1220000);
        }

        if (paramVideoCondition=="end") {
            preventSpeedPass = false;
            setTimeout(function(){
                preventSpeedPass = true;
            },20000);
            if (isExternVideo==false) {
                document.getElementById('chalkboardvideo').addEventListener("ended", validVideoCond, false);
            }   
        }
        
    }
    
    installOptionNavigation('videocondition');

}

function validVideoCond(){
    
    if (preventSpeedPass) {

        console.log('validVideoCond');
        
        if (activeVideoCondition==false) {
            //if (confirm(messageValidProgression)==true) {
                activeVideoCondition = true;
                if (window.parent && window.parent.API) {
                    let api = window.parent.API;            
                    if (api) { 
                        api.LMSSetValue('cmi.core.score.raw', 100);
                        api.LMSSetValue("cmi.core.lesson_status", "completed");
                        api.LMSCommit('iframe');
                    }
                }
            //} else {
                //setTimeout(function(){validVideoCond();},30000);
            //}
        }

    }

}

function sendEstimatedTime(timesend) {

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.set_te.php" ;
    jssrc += getAllParamsFromUrl() + "&timesend=" + timesend;

    $.ajax({
        url : jssrc,
        cache : true
    }).done(function(codeHtml){
    });

}

function nextPageOperationConditional() {
    
    if (activeVideoCondition==false) {
        alert(messageVideoCondition);
    } else {
        var objscormnext = parent.document.getElementById('scorm-next');
        if (objscormnext) {
            objscormnext.setAttribute("onclick", alterVideoCondition);
            objscormnext.click();
        }
    }

}



function extractYTId(n) {
    n = reall(n,'http://www.youtube.com/watch?v=','');
    n = reall(n,'https://www.youtube.com/watch?v=','');
    n = reall(n,'https://youtu.be/','');
    n = reall(n,'https://www.youtube.com/','');
    n = reall(n,'http://www.youtube.com/','');
    n = reall(n,'/','');
    n = reall(n,' ','');
    n = reall(n,' ','');
    n = n.replace('watch?v=','');
    n = n.replace('/','');
    n = n.replace(' ','');
    n = n.replace(' ','');
    var ampersandPosition = n.indexOf('&');
    if(ampersandPosition != -1) {
        n = n.substring(0, ampersandPosition);
    }
    return n;
};

function getVimeoCodeIntegration(pg) {

    pg = pg.replace('https://vimeo.com/','https://player.vimeo.com/video/')
    pg = pg.replace('https://vimeo.com/manage/videos/','https://player.vimeo.com/video/')
    
    var neoUrl = false;
    // https://vimeo.com/831497786?share=copy
    // New url 2023
    if (pg.indexOf('?share=copy')!=-1) {
        var pgNeo = pg;
        pgNeo = pgNeo.replace('https://player.vimeo.com/','');
        pgNeo = pgNeo.replace('videos/','');
        pgNeo = pgNeo.replace('video/','');
        pgNeo = pgNeo.replace('?share=copy','');
        var ctrUrl = pgNeo + '//';
        var getSplitID = ctrUrl.split('/');
        var firstId = getSplitID[0];
        var secondId = getSplitID[1];
        if (secondId!='') {
            neoUrl = true;
            pg = "https://player.vimeo.com/video/"+firstId+"?h="+secondId+"&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479";
        }
    }

    if (neoUrl==false) {
        pg = pg.replace('?share=copy','');
        pg = pg + '?h=d8dcbf11c7&autoplay=1&title=0&byline=0&portrait=0';
    }
    
    h = '<iframe class="framevideo" src="' + pg + '" style="width:96%;height:96%;margin-top:1%;margin-left:2%" width="96%" height="96%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    
    return h;

}

function getInfomaniakCodeIntegr(pg) {

    // https://player.vod2.infomaniak.com/embed/1jhvl2uqmmblf
    // https://player.vod2.infomaniak.com/share/1jhvl2uqmmbpj

    //<iframe frameborder="0" width="720" height="360"  src="https://player.vod2.infomaniak.com/embed/1jhvl2uqmmbqi" allowfullscreen></iframe>

    pg = pg.replace('infomaniak.com/share/','infomaniak.com/embed/')
    
    h = '<iframe class="framevideo" src="' + pg + '" style="width:96%;height:96%;margin-top:1%;margin-left:2%" width="96%" height="96%" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
    
    return h;

}


//get name file from relative path
function getvideoNameFromPath(path) {
    return path.split('/').pop();
}
var paramCPA = "";
var walletParamCPA = 0;
var walletDelayCPA = "";

function installVideoCreditWall(){

    getCpaFromUser();

    $("#loadchalkborad").css("display","none");
    $("#mejs__mediaelement").css("background-color","#B2BABB");
    $(".mejs__mediaelement").css("background-color","#B2BABB");

    var jssrc = getUrlPlugChalkboard() + "resources/videos/video_2304198.mp4" ;

    var h = '<video id="chalkboardvideow" oncontextmenu="return false;" ';
    h += ' style="position:absolute;width:96%;height:96%;margin-top:1%;margin-left:2%;';
    h += 'background-color:#B2BABB;user-select:none;z-index:100;" ';
    h += ' autoplay muted loop disablePictureInPicture nodownload>';
    h += '<source src="'+ jssrc + '" type="video/mp4"></source>';
    h += '</video>';

    var imgpath = getUrlPlugChalkboard() + "resources/img/" ;

    h += '<div id="chalkboardwall" class="chalkboardwall" oncontextmenu="return false;" >';

    h += '<img id="walletcoins" style="position:absolute;left:194px;top:50px;display:none;user-select:none;" ';
    h += ' src="' + imgpath + 'learningcoins64.png" />';

    h += '<img id="arrowcoins" ';
    h += ' style="position:absolute;left:182px;top:20px;display:none;user-select:none;" ';
    h += ' src="' + imgpath + 'arrow.png" />';

    h += '<img id="imagescoins" ';
    h += 'style="position:absolute;width:64px;height:64px;left:190px;top:50px;user-select:none;" ';
    h += ' src="' + imgpath + 'learningcoin-80.gif" />';

    var nbc = parseInt(paramCPA.replace('c',''));

    h += '<div id="walletcoinsmessage" class="walletCoinsMessage" style="display:none;" >';
    h += 'Débloquer ce contenu pour ' + nbc + ' crédit ?';
    h += '</div>';

    h += '<div id="walletcoinsmessageerror" class="walletCoinsMessage" style="display:none;" >';
    h += 'Pas assez de crédit !</div>';

    h += '<a id="creditquiz1" onClick="installVideoCreditWall2();" href="#" ';
    h += ' style="left:120px;top:167px;" class="unlockvideo" >Débloquer la vidéo</a>';

    h += '<a id="creditquiz2" onClick="retractVideoCreditWall();" href="#" style="left:100px;top:187px;background-color:#FBEEE6!important;background:#FBEEE6!important;display:none;" class="unlockvideo" >Non</a>';
    h += '<a id="creditquiz3" onClick="installVideoCreditWall3(' + nbc + ');" href="#" style="left:250px;top:187px;display:none;" class="unlockvideo" >Oui</a>';

    h += '<a id="creditquiz4" onClick="getCreditWall();" href="#" ';
    h += ' style="left:120px;top:187px;display:none;" class="unlockvideo" >Obtenir des crédits</a>';

    h += '</div>';
    
    appendToBody(h);

}

function getCpaFromUser() {

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.get_ccw.php";
    jssrc += getAllParamsFromUrl();

    $.ajax({
        url : jssrc,
        cache : true
    }).done(function(data){
        walletParamCPA = parseInt(data);
        getDelayCpaFromUser();
    });

}

function getDelayCpaFromUser() {

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.pay_ccw.php";
    jssrc += getAllParamsFromUrl() + "&action=control";

    $.ajax({
        url : jssrc,
        cache : true
    }).done(function(data){
        walletDelayCPA = data;
    });

}

function getAllParamsFromUrl() {

    var cidReq = ChamiloStudioTopGetParamValue('cidReq');
    var id_session = ChamiloStudioTopGetParamValue('id_session');
    var lp_id = ChamiloStudioTopGetParamValue('lp_id');
    var old_id = ChamiloStudioTopGetParamValue('id');

    var item_id = '';
    let api_olms = window.parent.olms;            
    if (api_olms) { 
        item_id = api_olms.lms_item_id;
    }
    var jssrc = "";
    if (item_id!='') {
        jssrc = "?cidReq=" ;
        jssrc += cidReq + "&id_session=" + id_session + "&lp_id=" + lp_id;
        jssrc += "&item_id=" + item_id + "&baseid=" + old_id;
    } else {
        jssrc = "?cidReq=0&baseid=" + old_id ;
    }
    
    return jssrc;

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

function getCreditWall() {
    $( "#creditquiz4" ).css("display","none");
    var lmg = '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" ';
    lmg += ' style="position:absolute;width:150px;height:150px;left:50%;margin-left:-75px;top:50%;margin-top:-75px;" />';
    $('#chalkboardwall').html(lmg);

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.info_ccw.php";
    jssrc += getAllParamsFromUrl();

    $.ajax({
        url : jssrc
    }).done(function(data) {
        if (data.indexOf('error')!=1) {
            if (data.indexOf('inner:')!=1) {
                
                jssrc = data.replace('inner:','');
                
                $.ajax({
                    url : jssrc
                }).done(function(dataInner) {
                    dataInner = dataInner.replace(/.js/g,'.css');
                    $('#chalkboardwall').html(dataInner);
                });

            } else {
                window.top.location.href = data;
            }
        }
    });

}

function payCreditWall(nbc) {
    
    var lmg = '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" ';
    lmg += ' style="position:absolute;width:150px;height:150px;left:50%;margin-left:-75px;top:50%;margin-top:-75px;" />';
    $('#chalkboardwall').html(lmg);

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.pay_ccw.php";
    jssrc += getAllParamsFromUrl() + "&pc=" + nbc;

    $.ajax({
        url : jssrc
    }).done(function(data){
        
        if (data.indexOf('OKnc')!=-1) {
        
            passVideoCreditWall();

        } else {

            if (data.indexOf('DELAY:')!=-1) {
                var delayPart = data.replace('DELAY:','');
                var delayTime = "quelques minutes";
                if (delayPart>3700) {
                    delayTime = parseInt(delayPart/3600) + " heures";
                } else {
                    if (delayPart>120) {
                        var min = parseInt(delayPart /60);
                        delayTime = min + " minutes";
                    } else {
                        delayTime = "quelques secondes";
                    }
                }
                var h = '<div id="walletcoinsmessage" class="walletCoinsMessage"  >';
                h += 'Plus que ' + delayTime + ' pour voir ce contenu !';
                h += '</div>';
                h += '<a id="creditquiz3" onClick="passVideoCreditWall();" ';
                h += ' href="#" style="left:177px;top:187px;" class="unlockvideo" >OK</a>';

                $('#chalkboardwall').html(h);
            }
        
        }

    });

}

function passVideoCreditWall(){
    $('#chalkboardvideow').css('display','none');
    $('#chalkboardwall').css('display','none');
    installVideoCondition();
    setInterval(function(){ window.location.reload(true); },3*60*60000);
}

//Yes process
function installVideoCreditWall3(nbc) {
    
    $('#walletcoinsmessage').css('display','none');
    if (walletParamCPA<nbc) {
        $('#walletcoinsmessageerror').css('display','');
    }
    
    $( "#creditquiz2" ).animate({
        marginLeft : "-200px"
    },700, function(){
        $( "#creditquiz2" ).css("display","none");
    });
    $( "#creditquiz3" ).animate({
        marginLeft : "200px"
    },700, function(){
        $( "#creditquiz3" ).css("display","none");
        if (walletParamCPA>=nbc) {
            payCreditWall(nbc);
        } else {
            $( "#creditquiz4" ).css("display","block");
        }
   
    });

}

function installVideoCreditWall2(){

    $('#walletcoins').css('display','');
    $('#imagescoins').css('display','');
   
    $( "#walletcoins" ).animate({
        marginLeft : "-60px"
    },700, function(){});
    $( "#imagescoins" ).animate({
        marginLeft : "60px"
    },700, function(){
        $('#arrowcoins').css('display','');
        $('#walletcoinsmessage').css('display','');
        if (walletDelayCPA.indexOf('DELAY:')!=-1) {
            var nbc = parseInt(paramCPA.replace('c',''));
            payCreditWall(nbc);
        }
    });

    $('#creditquiz1').css('display','none');
    $('#creditquiz2').css('margin-left','-200px').css('display','');
    $('#creditquiz3').css('margin-left','200px').css('display','');

    if (walletDelayCPA.indexOf('DELAY:')==-1) {
        $( "#creditquiz2" ).animate({
            marginLeft : "0px"
        },800, function(){});
        $( "#creditquiz3" ).animate({
            marginLeft : "0px"
        },800, function(){
        });
    }
}

function retractVideoCreditWall(){

    $('#walletcoins').css('display','none');
    $('#walletcoins').css('margin-left','0px');
    $('#arrowcoins').css('display','none');
    $('#walletcoinsmessage').css('display','none');

    $( "#imagescoins" ).animate({
        marginLeft : "0px"
    },700, function(){
    });

    $( "#creditquiz2" ).animate({
        marginLeft : "-200px"
    },700, function(){});
    $( "#creditquiz3" ).animate({
        marginLeft : "200px"
    },700, function(){
        $('#creditquiz2').css('display','none');
        $('#creditquiz3').css('display','none');
        $('#creditquiz1').css('margin-left','20px').css('display','');
        $( "#creditquiz1" ).animate({
            marginLeft : "0px"
        },200, function(){});
    });

}

function interfacecachecacheword(){

    var lmg = getLoaderSourceDiv();
    appendToBody(lmg);

    var langstr = chalkGetParamLang();

    var word1 = GlobalArrayChalkboard[1];
    if  (word1=='') {
        if(langstr=="en") {
            word1 = "Find the word";
        }
    }

    var word2 = GlobalArrayChalkboard[2].toUpperCase();
    if  (word2=='') {
        if(langstr=="en") {
            word2 = "WORD";
        }
    }

    var word3 = GlobalArrayChalkboard[3];

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var baseCarre = 450;

    if (widthScreen>550) {
        baseCarre = 500;
    }
    if (widthScreen>600) {
        baseCarre = 550;
    }
    var leftPage = parseInteger((widthScreen - baseCarre)/2);
    var heightPage = heightScreen - 100;

    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var ecranPlay = '<div id="ecranPlay" ';
    ecranPlay += 'style="position:relative;width:' + baseCarre + 'px;';
    ecranPlay += 'height:450px;margin-left:auto;margin-right:auto;margin-top:25px;';
    ecranPlay += 'background:white;text-align:center;z-index:3;" >';
    ecranPlay += '</div>';
    appendToBody(ecranPlay);

    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchCacheCacheWord(word2,word1,baseCarre);},500);

}

function launchCacheCacheWord(word2,word1,baseCarre){
    
    launchPlugins('cachecacheword',word2,word1,'','',baseCarre,450);
    $("#loadchalkboarddiv").css("display","none");

}

function interfacesolarsystem(){
    
    $("body").css("background-color","black");

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);

    var lang = GlobalArrayChalkboard[1];

    if (lang!='en'&&lang!='fr'&&lang!='es') {
        lang = '';
    }
   
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<iframe src="'+ getUrlPlugChalkboard() + 'plug/solarsystem/render/index'+lang+'.html" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + 'px;background-color:black;" >';
    h += '</iframe>';
    appendToBody(h);
    
    setTimeout(function(){launchsolarsystem();},500);

}

function launchsolarsystem(){

    $("#loadchalkborad").css("display","none");
    installChalkboardSideTxt(true);
}
function interfacebrain3d(){
    
    $("body").css("background-color","white");

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);

    var lang = GlobalArrayChalkboard[1];
   
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<iframe src="'+ getUrlPlugChalkboard() + 'plug/brain3d/js/run/index.html" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + 'px;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    setTimeout(function(){launchbrain3d();},500);

}

function launchbrain3d(){

    $("#loadchalkborad").css("display","none");
    installChalkboardSideTxt(true);
}
function preparewinanim(){

    $("body").css("background-color","white");
    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);
}

function interfacewinanim01(){
    interfacewinanimsolo('01');
}
function interfacewinanim02(){
    interfacewinanimsolo('02');
}
function interfacewinanim03(){
    interfacewinanimsolo('03');
}

function interfacewinanimsolo(ida){

    preparewinanim();

    var sentence = encodeURIComponent(GlobalArrayChalkboard[1]);
   
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<iframe src="'+ getUrlPlugChalkboard() + 'plug/winanim'+ida+'/js/index.html?v1=' + sentence + '" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + 'px;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    setTimeout(function(){launchwinanim();},2700);

}

function launchwinanim(){

    $("#loadchalkborad").css("display","none");
    installChalkboardSideTxt(true);
}

function interfacequizzacademy(){
    interfaceoelrichcontent('quizzacademy');
}

function interfaceoelrichcontent(ida){

    preparewinanim();

    var sentence = encodeURIComponent(GlobalArrayChalkboard[1]);
   
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<iframe src="'+ getUrlPlugChalkboard() + 'plug/'+ida+'/js/index.php?v1=' + sentence + '" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + 'px;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    setTimeout(function(){launchoelrichcontent();},500);
    
}

function launchoelrichcontent(){
    $("#loadchalkborad").css("display","none");
}
var txtGameImgActic = [];

function interfacegameimageactive(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);

    var lmgD = '<div class="centerMessageChalkBoard" onClick="closeTextWindows();" >message</div>';
   
    lmgD += '<div class="centerImageChalkBoard" >';
    lmgD += '<a class="btn btn-info actBtnClose" onClick="closeTextWindows()" >&nbsp;X&nbsp;</a>';
    lmgD += '</div>';

    var opt1 = GlobalArrayChalkboard[1];

    if(opt1.substring(0, 9)=='/courses/'){
        opt1 = opt1.replace('/courses/',getUrlCourses());
    }

    var option2 = GlobalArrayChalkboard[2];
    var option3 = GlobalArrayChalkboard[3];
    option3 = option3 + '$$$$$$';

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    

    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

    var h = '<div id="imageactivezone" ';
    h += ' style="position:relative;width:80%;top:1%;';
    h += 'margin-left:10%;margin-right:10%;background-color:white;';
    h += 'border:solid 1px black;overflow:hidden;" >';

    h += lmgD;
    if (option2.indexOf('$')!=-1) {

        var ArrayObjects = option2.split('$');
        var ArrayOptions = option3.split('$');

        var i = 0;

        for (i = 0; i < ArrayObjects.length; i++) {
        
            var objInfos = ArrayObjects[i];
            var objValues = ArrayOptions[i];

            objValues = objValues + "|||||";

            if (objInfos.indexOf('|')!=-1) {

                var objdet = objInfos.split('|');
                var objpara = objValues.split('|');
                
                var objType = (objpara[1]);
                var objTxt = (objpara[2]);
                var objPointTy = (objpara[3]);

                var objL = (objdet[1]);
                var objT = (objdet[2]);

                h += "<div id='areaZA" + i + "' ";
                if (objPointTy==1) {
                    h += " class='mapPointZA' ";
                }
                h += "style='position:absolute;left:" + objL + "%;top:" + objT + "%;width:10%;";
                h += "height:10%;z-index:150;cursor:pointer;' ";

                if (objType==1&&objTxt!='') {
                    txtGameImgActic[i] = objTxt;
                    h += " onClick='showTextInWIndows("+i+");' ";
                }
                if (objType==4&&objTxt!='') {
                    txtGameImgActic[i] = objTxt;
                    h += " onClick='showImgInWIndows("+i+");' ";
                }
                if (objType==2) {
                    h += " onClick='nextPageInWind();' ";
                }

                h += " class='areaZA noselect' ></div>";

            }

        }

    }

    h += '<img id="centralimage" style="width:100%;z-index:100;" ';
    h += ' src="'+ opt1 + '" />';
    h += '</div>';

    appendToBody(h);
    
    setTimeout(function(){launchgameimageactive();},500);

    setTimeout(function(){resizegameimageactive();},500);

}

function showTextInWIndows(i){

    $(".centerMessageChalkBoard").html(txtGameImgActic[i]);
    $(".centerMessageChalkBoard").css("display","block");
    $( ".centerMessageChalkBoard" ).animate({
        bottom : "-10%"
    },10, function() {
        $( ".centerMessageChalkBoard" ).animate({
            bottom : "2%"
        },300, function(){});
    });

}

function showImgInWIndows(i){

    var pg =  txtGameImgActic[i];
    pg = pg.replace(/S!L/g,'/');
    if(pg.substring(0, 9)=='/courses/'){
        pg = pg.replace('/courses/',getUrlCourses())
    }
    
    $(".centerImageChalkBoard").css("background-image","url("+pg+")");

    $(".centerImageChalkBoard").css("display","block");
    $( ".centerImageChalkBoard" ).animate({
        left : "40%" , right : "40%",
        bottom : "40%" , top : "40%"
    },10, function() {
        
        $(".centerMessageChalkBoard").css("display","none");
        $( ".centerImageChalkBoard" ).animate({
            left : "7%" , right : "7%",
            bottom : "7%" , top : "7%"
        },750, function(){});
    });

}

function nextPageInWind(){
    
    var sty = "position:fixed;left:0px;top:0px;right:0px;bottom:0px;border:solid 1px gray;color:black;";
    sty += "z-index:1400;text-align:center;font-size:42px;background:white;opacity:0.75;";
    $("body").append("<div style=\"" + sty + "\" ><br><br><br><br><br>...</div>");

    setTimeout(function(){
        var rightBtn = window.parent.document.querySelector(".fa-chevron-right").click();
        if (rightBtn) {
            rightBtn.click();
        }
    },250);

}

function prevPageInWind(){
    
    var sty = "position:fixed;left:0px;top:0px;right:0px;bottom:0px;border:solid 1px gray;color:black;";
    sty += "z-index:1400;text-align:center;font-size:42px;background:white;opacity:0.75;";
    $("body").append("<div style=\"" + sty + "\" ><br><br><br><br><br>...</div>");
    
    setTimeout(function(){
        var leftBtn = window.parent.document.querySelector(".fa-chevron-left").click();
        if (leftBtn) {
            leftBtn.click();
        }
    },250);
     
}

function closeTextWindows(){
    $(".centerMessageChalkBoard").css("display","none");
    $(".centerMessageChalkBoard").css("bottom","-10%");
    $(".centerImageChalkBoard").css("display","none");
    $(".centerImageChalkBoard").css("left","40%");
    $(".centerImageChalkBoard").css("right","40%");
    $(".centerImageChalkBoard").css("bottom","40%");
    $(".centerImageChalkBoard").css("top","40%");
}

var memHeightImgActiv = 0;

function resizegameimageactive(){

    var widthScreen = $("body").width();
    var heightScreen = window.screen.height-100;

    var widthimage = $("#centralimage").width();
    var heightimage = $("#centralimage").height();

    var screenFull = (heightScreen + widthScreen);

    if (memHeightImgActiv!=screenFull) {

        memHeightImgActiv = screenFull;

        if (heightimage<(heightScreen * 0.7)) {
            
            $("#imageactivezone").css("width",'80%');
            $("#imageactivezone").css("margin-left",'10%');
            heightimage = $("#centralimage").height();
            
        }else{

            if (heightimage>heightScreen) {
                
                $("#imageactivezone").css("width",'76%');
                $("#imageactivezone").css("margin-left",'12%');
                heightimage = $("#centralimage").height();

                if (heightimage>heightScreen) {
                    
                    $("#imageactivezone").css("width",'70%');
                    $("#imageactivezone").css("margin-left",'15%');
                    heightimage = $("#centralimage").height();
                    
                    if (heightimage>heightScreen) {
                        $("#imageactivezone").css("width",'60%');
                        $("#imageactivezone").css("margin-left",'20%');
                        heightimage = $("#centralimage").height();
                    }
                    
                }

            }else{
                if (heightimage>(heightScreen-70)) {
                    $("#imageactivezone").css("width",'76%');
                    $("#imageactivezone").css("margin-left",'12%');
                    heightimage = $("#centralimage").height();
                }
            }

        }

    }

    $("#imageactivezone").css("height",heightimage + 'px')
    
    setTimeout(function(){resizegameimageactive();},250);

}

function launchgameimageactive(){

    $("#loadchalkborad").css("display","none");

}

var secondFullCOnf = 0;
var COnfStartTime = 0;

function preparelinktoconference(){

    $("body").css("background-color","white");
    var lmg = getLoaderSourceDiv();
    appendToBody(lmg);

}

function interfacelinktoconference(){
    
    preparelinktoconference();

    var sentence = GlobalArrayChalkboard[1];
    GlobalTimeInHour = parseInt(GlobalArrayChalkboard[2]);
    
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 30;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<div';
    h += ' style="width:99%;height:' + heightPage + 'px;border:solid 0px #E8DAEF;';
    h += 'background-color:white;text-align:center;" ></br>';

    if (GlobalOptionTopTxt!="") {
        h += '<div class="txtpanelconf" >' + GlobalOptionTopTxt + '</div>';
    } else {
        h += '</br></br>';
        h += '<img style="width:98%;max-width:940px;" ';
        h += ' src="'+ getUrlPlugChalkboard() + 'plug/linktoconference/js/imgconf.jpg" />';
    }
    
    h += '</br></br>';

    var link1 = GlobalArrayChalkboard[1];
    var txt2 = GlobalArrayChalkboard[2];

    var langstr = chalkGetParamLang();

    if (txt2=='') {
        if (langstr=='fr') {
            txt2 = 'Lancer la conférence';
        } else {
            txt2 = 'Launch the conference';
        }
    }
    
    h += '<a id="btnlinktoconference" href="' + link1 + '" ';
    h += ' onClick="activetimeconference();" target="_blank" ';
    h += ' class="graphicriver" >' + txt2 + '</a>';
    h += '<a id="timeconference" style="display:none" class="timeconference" >0:00</a>';
    h += '</br></br>';
    
    if (GlobalOptionBotTxt!="") {
        h += '<div class="txtpanelconf" >' + GlobalOptionBotTxt + '</div>';
    }

    h += '</div>';
    appendToBody(h);
    
    setTimeout(function(){launchlinktoconference();},1000);

}

function launchlinktoconference(){
    $("#loadchalkborad").css("display","none");
    $("#loadchalkboarddiv").css("display","none");
}

function activetimeconference(){
    $('#timeconference').css('display','inline-block');
    $('#btnlinktoconference').css('display','none');
    COnfStartTime = (new Date()).getTime();
    updatetimeconference();
}

function updatetimeconference(){

    secondFullCOnf = ((new Date()).getTime() - COnfStartTime);
    secondFullCOnf = parseInt(secondFullCOnf/1000);
    
    if (secondFullCOnf<61) {
        $('#timeconference').html(secondFullCOnf + ' sec ');
    } else {
        var minutes = parseInt(secondFullCOnf/60);
        var second = secondFullCOnf - (minutes*60);
        $('#timeconference').html(minutes + ' min ' + second + ' sec ');
    }
   

    setTimeout(function(){updatetimeconference();},1000);

}

function interfacehvpcrossword(){
    
    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var sentence1 = GlobalArrayChalkboard[1];
    var sentence2 = GlobalArrayChalkboard[2];
    var sentence3 = GlobalArrayChalkboard[3];
    var sentence4 = GlobalArrayChalkboard[4];
    var sentence5 = GlobalArrayChalkboard[5];
    var sentence6 = GlobalArrayChalkboard[6];

    var dataH = "#" + sentence1;
    if(sentence2!=''){
        dataH += "@" + decodeURI(sentence2);
        dataH += "@" + decodeURI(sentence3);
        dataH += "@" + decodeURI(sentence4);
        dataH += "@" + decodeURI(sentence5);
        dataH += "@" + decodeURI(sentence6);
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 50;

     //Hack FF
     var hbf = window.innerHeight - 50;
     if(heightPage<hbf) {heightPage = hbf;}
     if (heightPage<450) {heightPage = 450;}
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }
    
    var h = '<iframe id="iframeAutoH" src="'+ getUrlPlugChalkboard() ;
    h += 'plug/hvpcrossword/js/hvpcrossWord.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:90%;height:' + heightPage + 'px;margin-left:5%;';
    h += 'background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchhvpcrossword();},500);

}

function launchhvpcrossword(){

    $("#loadchalkborad").css("display","none");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}
var GlobalTimeInHour = 128;

function interfacequota(){

    preparewinanim();

    var sentence = GlobalArrayChalkboard[1];
    GlobalTimeInHour = parseInt(GlobalArrayChalkboard[2]);
    
    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 30;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<div';
    h += ' style="width:99%;height:' + heightPage + 'px;border:solid 0px #E8DAEF;';
    h += 'background-color:white;text-align:center;" ><br>';
    h += '<img src="'+ getUrlPlugChalkboard() + 'plug/quota/js/quota-stop.jpg" /><br>';
    
    var dateSave = getContextStorage('quota');
    var currentDate = new Date();
    var timestamp = currentDate.getTime();
    
    if (dateSave=='') {
        dateSave = timestamp;
        setContextStorage('quota'+GlobalTimeInHour,dateSave)
    } else {
        var timePass = parseInt((timestamp - dateSave)/60);
    }
    h += '<h4><span id="timepass" >' + timePass + '</span></h4></br>';

    //h += 'dateSave:' + dateSave + '</br>';

    h += '<h3 id="sentencequota" >' + sentence + '</h3>';
    h += '</div>';
    appendToBody(h);
    
    setTimeout(function(){launchquota();},500);

    setTimeout(function(){timequota()},1000);

}

function launchquota(){
    $("#loadchalkborad").css("display","none");
    installChalkboardSideTxt(true);
}

function timequota(){

    var rest = GlobalTimeInHour * 60 * 60;

    var dateSave = getContextStorage('quota'+GlobalTimeInHour);
    var currentDate = new Date();
    var timestamp = currentDate.getTime();
    
    var timePass = parseInt(timestamp - dateSave);
    
    timePass = parseInt(timePass / 1000);

    var FinalTimePass = parseInt(rest - timePass);

    if (FinalTimePass > 2000) {

        var Fhour = parseInt(FinalTimePass / (3600));
        var FhourInSec = parseInt(Fhour * (3600));

        FinalTimePass = FinalTimePass - FhourInSec

        var Fmin = parseInt(FinalTimePass / 60);
        var Pmin0 = '';
        if (Fmin<10) {
            Pmin0 = '0';
        }

        var FminuInSec = parseInt(Fmin * 60);
        
        FinalTimePass = FinalTimePass - FminuInSec;

        var Fsec = parseInt(FinalTimePass);
        var Psec0 = '';
        if (Fsec<10) {
            Psec0 = '0';
        }

        $('#timepass').html(Fhour + 'h ' + Pmin0 + Fmin + 'm ' + Psec0 + Fsec + 's' );

        setTimeout(function(){timequota()},1000);
        
    } else {

        $('#timepass').html('OK');
        $('#sentencequota').css("display","none");
        validQuotaCond();
    }

}


function validQuotaCond(){
    
    if (preventSpeedPass) {
        
        if (window.parent && window.parent.API) {
            let api = window.parent.API;            
            if (api) { 
                api.LMSSetValue('cmi.core.score.raw', 100);
                api.LMSSetValue("cmi.core.lesson_status", "completed");
                api.LMSCommit('iframe');
            }
        }

    }

}
function interfacehtmlpresenter(){

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var link = GlobalArrayChalkboard[2];
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;

    //Hack FF
    if (isMozilla()) {
        var hbf = window.innerHeight - 50;
        if(heightPage<hbf) {heightPage = hbf;}
        if (heightPage<450) {heightPage = 450;}
        heightPage = heightPage + 'px';
        if (GlobalOptionBotTxt!="") {
            heightPage = 'auto';
        }
    }
    
    var h = '<iframe id="iframePresenterH" src="'+ getUrlUpload() + 'rendercache/' +link+'" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + ';background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchhtmlpresenter();},500);

}

function launchhtmlpresenter(){

    $("#loadchalkborad").css("display","none");
    $("#iframePresenterH").css("display","block");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}

function interfacequizpresenter() {
    
    var lmg = loadProgressSvg('#B2BABB');
    appendToBody(lmg);

    if (lmssource == 'chamilo') {
        $("body").css("background-color","#B2BABB");
        $("body").css("background-image","url('" + getUrlPlugChalkboard() + 'resources/img/quiz_blue.png' + "')");

        $("body").css("background-image","url('" + getUrlPlugChalkboard() + 'resources/img/school.jpg' + "')");
        $("body").css("background-positon","left bottom");
        $("body").css("background-repeat","no-repeat");
        $("body").css("background-size","cover");

    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen;
    var heightPage = heightScreen - 10;

    //Hack FF
    if (isMozilla()) {
        var hbf = window.innerHeight - 50;
        if(heightPage<hbf) {heightPage = hbf;}
        if (heightPage<450) {heightPage = 450;}
        heightPage = heightPage + 'px';
        if (GlobalOptionBotTxt!="") {
            heightPage = 'auto';
        }
    }

    var link = GlobalArrayChalkboard[1];
    var id_session = ChamiloStudioTopGetParamValue('id_session');
    var cidReq = ChamiloStudioTopGetParamValue('cidReq');
    var link2 = getUrlMain() + 'exercise/overview.php?cidReq=' + link;
    if (link2.indexOf('?cidReq=&')!=-1) {
        link2 = link2.replace('?cidReq=&','?cidReq=' + cidReq + '&');
    }
    if (link2.indexOf('&id_session=0&')!=-1) {
        link2 = link2.replace('&id_session=0&','&id_session=' + id_session + '&');
    }

    var h = '<div  ';
    h += ' style="';
    h += 'border-radius:10px;border:solid 2px #2874A6;overflow:hidden;';
    h += 'margin-left:auto;margin-right:auto;';
    if (widthPage<1000) {
        h += 'width:90%;background-color:white;';
    } else {
        h += 'width:900px;background-color:white;';
    }
    if (heightPage<650) {
        h += 'height:' + heightPage + 'padding-top:20px;" >';
    } else {
        h += 'height:600px;padding-top:20px;margin-top:7%;" >';
    }

    h += '<iframe id="iframePresenterH" src="'+ '' +link2 + '" frameBorder="0" ';
    h += ' style="width:100%;background-color:white;';
    if (heightPage<650) {
        h += 'height:' + (heightPage + 20) + ';" >';
    } else {
        h += 'height:620px;" >';
    }
    h += '</iframe>';

    h += '</div>';
    appendToBody(h);
    
    setTimeout(function(){launchhtmlpresenter();},500);

}

function interfaceh5player() {

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img style="width:150px;height:150px;" src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.svg" />';
    lmg += '</div>';
    appendToBody(lmg);
    
    var link = GlobalArrayChalkboard[1];
    
    if (GlobalOptionTopTxt!="") {
        var pTopTxt = '<div class="divParamChalk" >';
        pTopTxt +=  GlobalOptionTopTxt + '</div>';
        appendToBody(pTopTxt);
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;

    //Hack FF
    if (isMozilla()) {
        var hbf = window.innerHeight - 50;
        if(heightPage<hbf) {heightPage = hbf;}
        if (heightPage<450) {heightPage = 450;}
        heightPage = heightPage + 'px';
        if (GlobalOptionBotTxt!="") {
            heightPage = 'auto';
        }
    }

    var h = '<iframe id="iframePresenterH" src="'+ getUrlUpload() + 'rendercache/h5pplay/' +link+'.html" frameBorder="0" ';
    h += ' style="width:89%;margin-left:5%;margin-right:6%;height:' + heightPage + ';background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    if (GlobalOptionBotTxt!="") {
        var pBotTxt = '<div class="divParamChalk" >';
        pBotTxt +=  GlobalOptionBotTxt + '</div>';
        appendToBody(pBotTxt);
    }
    
    setTimeout(function(){launchh5player();},1000);

}

function launchh5player(){

    $("#loadchalkborad").css("display","none");
    $("#iframePresenterH").css("display","block");
    if (GlobalOptionBotTxt!="") {
        sizeIframeHeightAUto();
    }
}



function setContextStorage(key,val){

    if (localStorage) {
        var context_data = val;
        try {
            window.localStorage.setItem(getContextDataId()+key,context_data);
        } catch(err) {
        }
    }

}

function getContextStorage(key){

    var context_data = "";
    if (localStorage) {
        try {
            context_data = window.localStorage.getItem(getContextDataId()+key);
        } catch(err) {
        }
    }
    if (context_data=='null') {
        context_data = '';
    }
    if (context_data === null) {
        context_data = '';
    }
    return context_data;

}

function getContextDataId(){

    var lpid = getParamValueContext('lp_id');
    var idSession = getParamValueContext('id_session');
    var lpIdItem = 0
    var lmsUserId = 0;
    if (window.parent && window.parent.olms) {
        let olms = window.parent.olms;            
        if (olms) { 
            lpIdItem = olms.lms_item_id;
            lmsUserId = olms.lms_user_id;
        }
    }
    var context = lpid + '-' + idSession + '-' + lpIdItem + '-' + lmsUserId;
    return context;

}

function getParamValueContext(param) {
	var u = window.top.location.href;var reg=new RegExp('(\\?|&|^)'+param+'=(.*?)(&|$)');
	matches=u.match(reg);
	if(matches==null){return '';}
	var vari=matches[2] != undefined ? decodeURIComponent(matches[2]).replace(/\+/g,' ') : '';
	return vari;
}

function preparelearningcoins() {

    $("body").css("background-color","white");
    var lmg = getLoaderSourceDiv();
    appendToBody(lmg);

}

function interfacelearningcoins1() {
    interfacelearningcoinssolo('1');
}
function interfacelearningcoins5() {
    interfacelearningcoinssolo('5');
}
function interfacelearningcoins10() {
    interfacelearningcoinssolo('10');
}

function interfacelearningcoinssolo(ida) {

    preparelearningcoins();

    var sentence = GlobalArrayChalkboard[1];

    var langstr = chalkGetParamLang();
    
    if (sentence=='') {
        if (langstr=='fr') {
            sentence = "Récupérer la pièce"; 
        } else {
            sentence = "Get the coin"; 
        }
    }
    var emptySentence = GlobalArrayChalkboard[2];
    if (emptySentence=='') {
        if (langstr=='fr') {
            emptySentence = "Tous les objets ont été pris ici !"; 
        } else {
            emptySentence = "All objects have been taken here!"; 
        }
    }

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}

    var lmg = '<div id="loadchalktitle" ';

    if (lmssource == 'moodle') {
        lmg += 'style="position:relative;z-index:1;min-height:700px;';
    } else {
        lmg += 'style="position:fixed;z-index:1000;';
    }

    lmg += 'left:0px;right:0px;top:0px;bottom:0px;background:white;text-align:center;background:#E5E7E9;" >';
    lmg += '<br/><br/><br/><br/><br/><br/><br/>';

    lmg += '<div id="learningcoinpanelA" class="learningcoinpanel" style="display:none;" >';
    lmg += '<br/><br/><br/><br/>';

    var img80 = '<img style="width:80px;height:80px;" ';
    img80 += ' src="' + getUrlPlugChalkboard() + 'resources/img/learningcoin-80.gif" />';
    var img65 = '<img style="width:65px;height:65px;" ';
    img65 += ' src="' + getUrlPlugChalkboard() + 'resources/img/learningcoin-80.gif" />';
    var img50 = '<img style="width:50px;height:50px;" ';
    img50 += ' src="' + getUrlPlugChalkboard() + 'resources/img/learningcoin-80.gif" />';

    if (ida==1) {
        lmg += img80
    } else {
        if (ida==5) {
            lmg += img50 + img65 + img80 + img65 + img50;
        }
    }

    lmg += '<br/><br/><br/>';
    
    lmg += '<a id="btnlearningcoinbutton" href="#" title="' + sentence + '" ';
    lmg += ' onClick="getLearningCoins(' + ida + ');" ';
    lmg += ' class="learningcoinbutton" >' + sentence + '</a>';
    
    lmg += '<br/><br/><br/><br/><br/><br/></div>';

    lmg += '<div id="learningcoinpanelB" class="learningcoinpanel" style="display:none;" >';

    lmg += '<br/><br/><br/><br/><img style="width:100px;height:100px;" ';
    lmg += ' src="' + getUrlPlugChalkboard() + 'resources/img/learningcoin_empty.png" />';
    lmg += '<br/><br/><br/>';

    lmg += '<p style="font-size:22px;" >' + emptySentence + '</p><br/><br/>';
    
    lmg += '</div>';

    lmg += '</div>';

    appendToBody(lmg);
    
    controlLearningCoins();

    setTimeout(function(){launchlearningcoins();},200);

}

function launchlearningcoins() {
    $("#loadchalkborad").css("display","none");
    $("#loadchalkboarddiv").css("display","none");
    installChalkboardSideTxt(true);
}

function controlLearningCoins() {

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.get_l_coins.php" ;
    jssrc += getAllParamsFromUrl() + "&pc=9&action=controlcoin";

    $.ajax({
        url : jssrc,
        cache : true
    }).done(function(codeHtml){
        
        if (codeHtml.indexOf('exitsOk')!=-1) {
            $("#learningcoinpanelA").css("display","none");
            $("#learningcoinpanelB").css("display","block");
        } else {
            $("#learningcoinpanelA").css("display","block");
            $("#learningcoinpanelB").css("display","none");
        }

    });

}

function getLearningCoins(ida) {

    $("#btnlearningcoinbutton").css("display","none");

    var jssrc = getUrlPlugChalkboard() + "plug/ajaxprocess/ajax.get_l_coins.php" ;
    jssrc += getAllParamsFromUrl() + "&pc=" + ida ;

    $.ajax({
        url : jssrc,
        cache : true
    }).done(function(codeHtml){
        if (codeHtml.indexOf('KO')==-1&&codeHtml.indexOf('OK')!=-1) {
            $("#learningcoinpanelA").css("display","none");
            $("#learningcoinpanelB").css("display","block");
        } else {
            $("#btnlearningcoinbutton").css("display","inline-block");
        }
    });

}
function interfacemodxlightboxgallery(){
    
    $("body").css("background-color","white");

    var lmg = '<div id="loadchalkborad" ';
    lmg += 'style="position:fixed;left:0px;right:0px;top:0px;bottom:0px;';
    lmg += 'background:white;text-align:center;z-index:1000;" >';
    lmg += '<br/><br/><br/>';
    lmg += '<img src="' + getUrlPlugChalkboard() + 'resources/img/loadtable.gif" />';
    lmg += '</div>';
    appendToBody(lmg);

    var titleobj = encodeURI(correctImgPath(GlobalArrayChalkboard[1]));
    var img1 = encodeURI(correctImgPath(GlobalArrayChalkboard[2]));
    var img2 = encodeURI(correctImgPath(GlobalArrayChalkboard[3]));
    var img3 = encodeURI(correctImgPath(GlobalArrayChalkboard[4]));
    var img4 = encodeURI(correctImgPath(GlobalArrayChalkboard[5]));
    var img5 = encodeURI(correctImgPath(GlobalArrayChalkboard[6]));
    var img6 = encodeURI(correctImgPath(GlobalArrayChalkboard[7]));
    var img7 = encodeURI(correctImgPath(GlobalArrayChalkboard[8]));
    var dataH = "#"+titleobj+"@"+img1+"@"+img2+"@"+img3+"@"+img4+"@"+img5+"@"+img6+"@"+img7+"@";

    var widthScreen = $("body").width();
    var heightScreen = $("body").height();
    
    var widthPage = widthScreen - 100;
    var heightPage = heightScreen - 10;
    
    var hbf = window.innerHeight - 20;
    if(heightPage<hbf) {heightPage = hbf;}
    if (heightPage<600) {heightPage = 600;}
    
    var h = '<iframe src="'+ getUrlPlugChalkboard() + 'moolinks/mod_lightboxgallery/compil.html'+dataH+'" frameBorder="0" ';
    h += ' style="width:100%;height:' + heightPage + 'px;background-color:white;" >';
    h += '</iframe>';
    appendToBody(h);
    
    setTimeout(function(){
        launchmodxlightboxgallery();
    },500);

}

function launchmodxlightboxgallery(){
    $("#loadchalkborad").css("display","none");
    installChalkboardSideTxt(true);
}

function correctImgPath(src){
    if (src.indexOf("[web]-")!=-1) {
        src = src.replace("[web]-",_p['web']);
    }
    if(src.substring(0, 9)=='/courses/'){
        src = src.replace('/courses/',getUrlCourses());
    }
    return src;
}
function interfacelearningapps(){

    appendToBody(loadProgressSvg('#B2BABB'));

    $("body").css("background-color","#B2BABB");

    setTimeout(function(){
        installlearningapps();
    },500);

}

function interfacepadletapps(){

    appendToBody(loadProgressSvg('#B2BABB'));

    $("body").css("background-color","#B2BABB");

    setTimeout(function(){
        installlearningapps();
    },500);

}

function installlearningapps(){
    
    $("#loadchalkborad").css("display","none");

    var pg =  GlobalArrayChalkboard[1];
  
    var h = '';
    
    if (pg.indexOf('learningapps.org/')!=-1||pg.indexOf('learningapps.org')!=-1) {
        
        var idYT = extractLAId(pg);
        h = '<iframe class="frameapps" src="https://learningapps.org/watch?app=' + idYT + '" style="width:96%;height:96%;margin-top:1%;margin-left:2%" width="96%" height="96%" frameborder="0" ';
        h += ' ></iframe>';
        
    }

    if (pg.indexOf('padlet.com/')!=-1) {
        
        var idYT = extractLAId(pg);
        h = '<iframe class="frameapps" src="https://padlet.com/embed/' + idYT + '" style="width:96%;height:96%;margin-top:1%;margin-left:2%" width="96%" height="96%" frameborder="0" ';
        h += ' ></iframe>';
        
    }
    
    $('.frameapps').bind('contextmenu',function() { return false; });
    $('frame').bind('contextmenu',function() { return false; });

    appendToBody(h);

    installChalkboardSideTxt(true);

}

function extractLAId(n) {
    n = reall(n,'https://learningapps.org/','');
    n = reall(n,'https://learningapps.org/view','');
    n = reall(n,'https://padlet.com/embed/','');
    n = reall(n,'/','');
    n = reall(n,' ','');
    n = reall(n,' ','');
    n = n.replace('/','');
    n = n.replace(' ','');
    n = n.replace(' ','');
    var ampersandPosition = n.indexOf('&');
    if(ampersandPosition != -1) {
        n = n.substring(0, ampersandPosition);
    }
    return n;
};



var CacheCacheMot = "FRAISAGE";
var CacheCacheLength = 0;
var CacheCacheWin = 0;
var CacheCacheDes = "Trouver le mot caché";
var CacheCacheObj;
var CacheCacheIsOk = false;
var CacheCacheLETTERS = ('abcdefghijklmnoprstuvwy').toUpperCase();

function cachecachewordOnPaint(obj){
	
	CacheCacheObj = obj;
	var h = '';
	if(obj.fields[0]!=''){
		CacheCacheMot = obj.fields[0];
	}
	if(obj.fields[1]!=''){
		CacheCacheDes = obj.fields[1];
	}
	h += '<div style="position:absolute;" ';
	h += ' id="bloc' + obj.id + '" ';
	h += ' class="bloc' + obj.id + ' tableCache" >';
	CacheCacheLength = CacheCacheMot.length;
	h += '<table class="CachDescription" ><tr><td style="text-align:center;" >';
	h += CacheCacheDes;
	h += '</td></tr></table>';
	h += '<div class="CachWord" >' + installTuiles(obj) + '</div>';
	h += '</div>';
	return h;
	
}

function installTuiles(obj){
	
	var nbT = 1;

	var goodAnswerT = 0;

	var posDec = 43;
	var posLeft = 7;
	CacheCacheWin = CacheCacheLength;
	var h = '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter"  >' + getRandomCacheCacheLetter() +'</div>';
	posLeft = posLeft + posDec;
	for(i=0;i<=(CacheCacheLength-1); i++){

		var rdm = Math.floor(Math.random() * 3);
		
		if(rdm==1&&nbT<12){
			nbT++;
			h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
			posLeft = posLeft + posDec;
		}
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="yesTuile('+ nbT +','+ goodAnswerT +')" id="CachLetter'+ nbT +'" class="CachLetter" >' + CacheCacheMot.substring(i,i+1) +'</div>';
		posLeft = posLeft + posDec;
		goodAnswerT++;
	}

	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

	return h;

}

function cachecachewordOnZoom(obj){
	
}

function yesTuile(idt,pos){
	
	$('#CachLetter'+idt).css("top","50px");
	$('#CachLetter'+idt).css("left",((pos * 44) + 5) + "px");
	$('#CachLetter'+idt).css("background","#D0F5A9");
	$('#CachLetter'+idt).prop("onclick", null).off("click");

	CacheCacheWin = CacheCacheWin - 1;

	if(CacheCacheWin==0){
		setTimeout(function(){
			processTuileWin();
		},600);
	}

	for(i=1;i<=(CacheCacheLength+10);i++){
		correctTuile(idt+i);
	}
	
}

function correctTuile(idt){

	var position = $('#CachLetter' + (idt)).position();
	if(position){
		if(position.top<30){
			$('#CachLetter' + (idt)).css("left",(position.left-43) + "px");
		}
	}

}

function processTuileWin(){

	CacheCacheIsOk = true;

	for(i=0;i<=(CacheCacheLength+30);i++){
		correctTuileWin(i);
	}
}

function correctTuileWin(idt){

	var position = $('#CachLetter' + idt).position();

	if(position){
		if(position.top){
			if(position.top<30){
				$('#CachLetter' + idt ).css("left","-103px");
			}else{
				$('#CachLetter' + idt ).css("background","yellow");
			}
		}	
	}

}

function noTuile(){

	$(".CachLetter").each(function(index){

		$(this).prop("onclick", null).off("click");
		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","30px");			
		}else{
			$(this).css("margin-top","40px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","5px");
		}else{
			$(this).css("margin-left","15px");
		}

		$(this).css("background","red");
		$(this).css("transform","scale(1.2) rotate(45deg)");
	});
	setTimeout(function(){ cleanTuile(); }, 1000);
}
function cleanTuile(){

	$(".CachLetter").each(function(index){

		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","130px");			
		}else{
			$(this).css("margin-top","140px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","0px");
		}else{
			$(this).css("margin-left","50px");
		}
		$(this).css("opacity","0.5");
		$(this).css("background","red");
		$(this).css("transform","scale(1) rotate(135deg)");

	});
	setTimeout(function(){
		$(".CachLetter").css("left","-100px");
	},400);
	setTimeout(function(){
		$(".CachWord").html(installTuiles(CacheCacheObj));
	},2000);

}
function getRandomCacheCacheLetter(){

	var lt =  CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];

	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	return lt;

}

function cachecachewordIsOK(obj){
	return CacheCacheIsOk;
}


var CacheCacheMot = "FRAISAGE";
var CacheCacheLength = 0;
var CacheCacheWin = 0;
var CacheCacheDes = "Trouver le mot caché";
var CacheCacheObj;
var CacheCacheIsOk = false;
var CacheCacheLETTERS = ('abcdefghijklmnoprstuvwy').toUpperCase();

function cachecachewordOnPaint(obj){
	
	CacheCacheObj = obj;
	var h = '';
	if(obj.fields[0]!=''){
		CacheCacheMot = obj.fields[0];
	}
	if(obj.fields[1]!=''){
		CacheCacheDes = obj.fields[1];
	}
	h += '<div style="position:absolute;" ';
	h += ' id="bloc' + obj.id + '" ';
	h += ' class="bloc' + obj.id + ' tableCache" >';
	CacheCacheLength = CacheCacheMot.length;
	h += '<table class="CachDescription" ><tr><td style="text-align:center;" >';
	h += CacheCacheDes;
	h += '</td></tr></table>';
	h += '<div class="CachWord" >' + installTuiles(obj) + '</div>';
	h += '</div>';
	return h;
	
}

function installTuiles(obj){
	
	var nbT = 1;

	var goodAnswerT = 0;

	var posDec = 43;
	var posLeft = 7;
	CacheCacheWin = CacheCacheLength;
	var h = '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter"  >' + getRandomCacheCacheLetter() +'</div>';
	posLeft = posLeft + posDec;
	for(i=0;i<=(CacheCacheLength-1); i++){

		var rdm = Math.floor(Math.random() * 3);
		
		if(rdm==1&&nbT<12){
			nbT++;
			h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
			posLeft = posLeft + posDec;
		}
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="yesTuile('+ nbT +','+ goodAnswerT +')" id="CachLetter'+ nbT +'" class="CachLetter" >' + CacheCacheMot.substring(i,i+1) +'</div>';
		posLeft = posLeft + posDec;
		goodAnswerT++;
	}

	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}
	if(nbT<14){
		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;
	}

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

		nbT++;
		h += '<div style="left:' + posLeft + 'px;" onClick="noTuile()"  id="CachLetter'+ nbT +'" class="CachLetter" >' + getRandomCacheCacheLetter() +'</div>';
		posLeft = posLeft + posDec;

	return h;

}

function cachecachewordOnZoom(obj){
	
}

function yesTuile(idt,pos){
	
	$('#CachLetter'+idt).css("top","50px");
	$('#CachLetter'+idt).css("left",((pos * 44) + 5) + "px");
	$('#CachLetter'+idt).css("background","#D0F5A9");
	$('#CachLetter'+idt).prop("onclick", null).off("click");

	CacheCacheWin = CacheCacheWin - 1;

	if(CacheCacheWin==0){
		setTimeout(function(){
			processTuileWin();
		},600);
	}

	for(i=1;i<=(CacheCacheLength+10);i++){
		correctTuile(idt+i);
	}
	
}

function correctTuile(idt){

	var position = $('#CachLetter' + (idt)).position();
	if(position){
		if(position.top<30){
			$('#CachLetter' + (idt)).css("left",(position.left-43) + "px");
		}
	}

}

function processTuileWin(){

	CacheCacheIsOk = true;

	for(i=0;i<=(CacheCacheLength+30);i++){
		correctTuileWin(i);
	}
}

function correctTuileWin(idt){

	var position = $('#CachLetter' + idt).position();

	if(position){
		if(position.top){
			if(position.top<30){
				$('#CachLetter' + idt ).css("left","-103px");
			}else{
				$('#CachLetter' + idt ).css("background","yellow");
			}
		}	
	}

}

function noTuile(){

	$(".CachLetter").each(function(index){

		$(this).prop("onclick", null).off("click");
		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","30px");			
		}else{
			$(this).css("margin-top","40px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","5px");
		}else{
			$(this).css("margin-left","15px");
		}

		$(this).css("background","red");
		$(this).css("transform","scale(1.2) rotate(45deg)");
	});
	setTimeout(function(){ cleanTuile(); }, 1000);
}
function cleanTuile(){

	$(".CachLetter").each(function(index){

		var rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-top","130px");			
		}else{
			$(this).css("margin-top","140px");
		}
		rdm = Math.floor(Math.random() * 10);
		
		if(rdm<5){
			$(this).css("margin-left","0px");
		}else{
			$(this).css("margin-left","50px");
		}
		$(this).css("opacity","0.5");
		$(this).css("background","red");
		$(this).css("transform","scale(1) rotate(135deg)");

	});
	setTimeout(function(){
		$(".CachLetter").css("left","-100px");
	},400);
	setTimeout(function(){
		$(".CachWord").html(installTuiles(CacheCacheObj));
	},2000);

}
function getRandomCacheCacheLetter(){

	var lt =  CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];

	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	if(CacheCacheMot.indexOf(lt)!=-1){
		lt = CacheCacheLETTERS[Math.floor(Math.random() * CacheCacheLETTERS.length)];
	}
	return lt;

}

function cachecachewordIsOK(obj){
	return CacheCacheIsOk;
}



var zoom = 1;
var LUDImoney = 0;
var objGlob = new Object();
var CObjets = new Array();

function launchPlugins(name,field1,field2,field3,help,wo,ho){

    objGlob = new Object();

    objGlob.id = 0;
    objGlob.type = 'plugin-' + name;
    objGlob.x = 5 ;
	objGlob.y = 5;
	
	objGlob.getX = function(){return 5;};
	objGlob.getY = function(){return 5;};
	
    objGlob.w = wo;
    objGlob.h = ho;

    objGlob.field1 = field1;
    objGlob.field2 = field2;
	objGlob.field3 = field3;

	objGlob.fields = (objGlob.field1 + '|' + objGlob.field2 +'|' + objGlob.field3 +'||||||').split('|');

	CObjets[0] = objGlob;

    installPlugins(objGlob);
    zoomPlugin(objGlob);
    
}

function uiFooterGame(){
	$(".footer").css("display","none");
	$(".chatboxmain").css("display","none");
}

function zoomScreen(){
	
	var documentWidth = $(document).width();
	var documentHeight = $(document).height();

	$("#ecranPlay").removeClass("ecranPlay");
	$("#ecranPlay").removeClass("ecranPlay2");

	zoom = 1;

	if(objGlob){
		zoomPlugin(objGlob);
	}
	
}

function ctrPlugin(){

	if(objGlob){

		if(objGlob.type.indexOf('plugin-')!=-1){

			var ret = false;
			var fct = objGlob.type.replace('plugin-','');
			fct = fct.replace('plugques-','');
			fct = 'ret = ' + fct + 'IsOK(objGlob)';
			eval(fct);
			
			if(ret){
				
			}

		}

	}

	setTimeout(function(){
        ctrPlugin()
    },500);

}

function zoomPlugin(obj){

	if(obj){

		$(".bloc" + obj.id).css("position","absolute");
		$(".bloc" + obj.id).css("left", obj.x * zoom + "px").css("top", obj.y * zoom + "px");
		$(".bloc" + obj.id).css("width", obj.w * zoom + "px").css("height", obj.h * zoom + "px");
		
		if(obj.type){
			if(obj.type.indexOf('plugin-')!=-1){

				var fct = obj.type.replace('plugin-','');
				
				var namePlgFct = fct ;
				var fctstrCtr = fct + 'OnZoom';
				var fctstr = fct + 'OnZoom(obj);';
				
				if (typeof window[fctstrCtr] === "function") {
					eval(fctstr);
				}

			}
		}
	}

}

function installPlugins(obj){
	
	if(obj.type.indexOf('plugin-')!=-1){
	
		var Ecran = document.getElementById("main");
		var h = '';
		var fct = obj.type.replace('plugin-','');
		
		var namePlgFct = fct ;
		var fctstrCtr = fct + 'OnPaint';
		var fctstr = fct + 'OnPaint(obj)';
		fct = 'h = ' + fctstr;

		if (typeof window[fctstrCtr] === "function") {
			eval(fct);
		}else{
			h = '<div class="bloc' + obj.id + '" style="background:gray;color:white;text-align:center;" >"Could not <br>find or load <br>the ' + namePlgFct + '  plugin</div>'
		}
		
		if(h!=''){

			if(obj.contenu2=='drag'){
				appliqueDragObj(obj);
			}
			
			$('#ecranPlay').append(h);
			
		}
		
	}
	
}

function parseInteger(inv){
	inv = parseInt(inv);
	return inv;
}

function recupCss3(){

	var Css3 = false;
	
	if(navigator.userAgent.toUpperCase().indexOf("WINDOWS PHONE") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("ANDROID") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("CHROME") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("FIREFOX") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("IPAD") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("SAFARI") != -1){
			Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/9.0") != -1){
		Css3 = true;
	}
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/8.0") != -1){
		Css3 = true;
	}
	//IE 11
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/7.0") != -1){
		Css3 = true;
	}
	//IE 10
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/6.0") != -1){
		Css3 = true;
	}
	//Old IE 9 <
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
		Css3 = false;
	}
	//Old
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){
		Css3 = false;
	}

	if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS XP") != -1){
			Css3 = false;
		}
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 5.1") != -1){
			Css3 = false;
		}
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 6.0") != -1){
			Css3 = false;
		}
	}
	
	return Css3;
}

function haveCss3D(){
	
	var Css3 = true;
	
	if(navigator.userAgent.toUpperCase().indexOf("MSIE 9.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("MSIE 8.0") != -1){
		Css3 = false;
	}
	//Old IE 9 <
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/5.0") != -1){
		Css3 = false;
	}
	//Old
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/4.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("TRIDENT/3.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("MSIE 6.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("MSIE 7.0") != -1){
		Css3 = false;
	}
	if(navigator.userAgent.toUpperCase().indexOf("MSIE") != -1){
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS XP") != -1){
			Css3 = false;
		}
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 5.1") != -1){
			Css3 = false;
		}
		if(navigator.userAgent.toUpperCase().indexOf("WINDOWS NT 6.0") != -1){
			Css3 = false;
		}
	}
	
	return Css3;
}
