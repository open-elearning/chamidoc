
console.log('learning coins is active');

var versionCBT = 19;

function installLerningCoins(){
   
    if (window.jQuery) {

        var ress = $("#user-dropdown-menu .user-header").first();
        if (ress.length==0) {
            ress = $("li.user-header");
        }
       
        if (ress.length>0) {

            if ($("#learningcoins_wallet").length==0) {
                
                $("#user-dropdown-menu .user-header").css('padding','10px');

                var learningcoins64 = _p['web_plugin'] +'chalkboard_tools/resources/img/learningcoins64.png';

                var tb = '<div onClick="showAvatarShop()" id="learningcoins_wallet" class="text-center" style="position:relative" >';
                tb += '<img src="' + learningcoins64 + '" style="margin-left:-50px;" />';
                tb += '<div style="position:absolute;width:76px;border:solid 0px gray;';
                tb += 'text-align:left;right:50%;margin-right:-84px;bottom:3px;font-size:34px;" >';
                var learningcoins = $("#learningcoins").html();
                tb += learningcoins +'</div>';
                tb += '</div>';
                
                ress.append(tb);
 
                if (localStorage) {
                    window.localStorage.setItem('learningcoinsglobal',learningcoins);
                }
            }

        } else {
            setTimeout(function(){installLerningCoins();},500);
        }
       
    } else {
        setTimeout(function(){installLerningCoins();},500);
    }
   
}
setTimeout(function(){installLerningCoins();},500);
