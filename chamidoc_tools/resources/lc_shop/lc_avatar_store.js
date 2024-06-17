
var versionShop = 19;
var storeFolder = '';
var skinAvatarGlobal = '';
var itemsAvatarGlobal = '';
var learningcoinsglobal = 0;
var nameLcProduct = '';
var nbLcProductCoins = 0;

function showAvatarShop(){
    
    if (window.jQuery) {

        if ($(".lc_store_windows").length==0) {
            
            if (localStorage) {
                skinAvatarGlobal = window.localStorage.getItem('learningcoinsavatarskin');
                if (typeof skinAvatarGlobal == 'undefined') { skinAvatarGlobal = ''; }
                if (skinAvatarGlobal == 'undefined') { skinAvatarGlobal = ''; }
                if (skinAvatarGlobal === null) { skinAvatarGlobal = ''; }
                itemsAvatarGlobal = window.localStorage.getItem('learningcoinsitemscoll');
                if (typeof itemsAvatarGlobal == 'undefined') { itemsAvatarGlobal = ''; }
                if (itemsAvatarGlobal == 'undefined') { itemsAvatarGlobal = ''; }
                if (itemsAvatarGlobal === null) { itemsAvatarGlobal = ''; }
                learningcoinsglobal = window.localStorage.getItem('learningcoinsglobal');
                if (typeof learningcoinsglobal == 'undefined') { learningcoinsglobal = 0; }
                if (learningcoinsglobal == 'undefined') { learningcoinsglobal = 0; }
                if (learningcoinsglobal === null) { learningcoinsglobal = 0; }
            }

            storeFolder = _p['web_plugin'] +'chalkboard_tools/resources/lc_shop/';

            var tb = '<div id="lc_store_windows" class="lc_store_windows" >';

            tb += '<div id="lc_store_reset" class="lc_store_reset" onClick="resetAvatarShop()" ></div>';

            tb += '<div id="lc_store_windows_head" class="lc_store_windows_head" ></div>';

            tb += '<div id="lc_avatar_view" class="lc_avatar_view" ></div>';
            tb += innerAvatarTools();

            tb += '<div id="lc_package_infos" class="lc_package_infos" >';
            tb += '<img src="' + storeFolder + 'learningcoins64.png" style="margin-left:92px;float:left;" />';
            tb += '<div id="lc_package_count" class="lc_package_count" >';
            tb += learningcoinsglobal + '</div>'
            tb += '</div>';
            tb += innerShopItemsTools();
            tb += innerWallItemsObject();
            tb += '<div onClick="closeAvatarShop();" id="lc_store_windows_close" class="lc_store_windows_close" ></div>';
            tb += '</div>';

            tb += '<div id="lc_store_opac" class="lc_store_opac" ></div>';

            appendShopToBody(tb);

        }

        $(".lc_store_windows").css("display","block");
        $(".lc_store_opac").css("display","block");
        $(".lc_avatar_view").css("display","none");

        setTimeout(function(){
            $(".lc_store_windows").animate({
                height : "700px",
                marginTop : "-350px"
            },1000, function(){
                $(".lc_avatar_view").css("display","block");
                applyAvatarTools();
                adaptObjectItems();
            });
        },500);

    }
    
}
// setTimeout(function(){showAvatarShop();},500);

function resetAvatarShop(){
    window.localStorage.setItem('learningcoinsavatarskin','');
    window.localStorage.setItem('learningcoinsitemscoll','');
}

function innerShopItemsTools(){

    var tb = '';
    tb += '<div id="lc_shopitemstools" class="lc_shopitemstools" >';
    tb += '<div id="extras-01" class="lc_block_item lc_block_item_2" onClick="showWallItemsObject(\'extras-01\',2);" ><div class="lc_block_img lc_block_extras-01"></div></div>';
    tb += '<div id="tshirt-02" class="lc_block_item lc_block_item_2" onClick="showWallItemsObject(\'tshirt-02\',2);" ><div class="lc_block_img lc_block_tshirt-02"></div></div>';
    tb += '<div id="tshirt-03" class="lc_block_item lc_block_item_5" onClick="showWallItemsObject(\'tshirt-03\',5);" ><div class="lc_block_img lc_block_tshirt-03"></div></div>';
    tb += '<div id="extras-02" class="lc_block_item lc_block_item_50" onClick="showWallItemsObject(\'extras-02\',50);" ><div class="lc_block_img lc_block_extras-02"></div></div>';
    tb += '<div id="tshirt-04" class="lc_block_item lc_block_item_5" onClick="showWallItemsObject(\'tshirt-04\',5);" ><div class="lc_block_img lc_block_tshirt-04"></div></div>';
    tb += '<div id="extras-03" class="lc_block_item lc_block_item_50" onClick="showWallItemsObject(\'extras-03\',50);" ><div class="lc_block_img lc_block_extras-03"></div></div>';
    tb += '<div id="extras-04" class="lc_block_item lc_block_item_5" onClick="showWallItemsObject(\'extras-04\',5);" ><div class="lc_block_img lc_block_extras-04"></div></div>';
    tb += '<div id="pant-02" class="lc_block_item lc_block_item_5" onClick="showWallItemsObject(\'pant-02\',5);" ><div class="lc_block_img lc_block_pant-02"></div></div>';
    tb += '<div id="tshirt-05" class="lc_block_item lc_block_item_50" onClick="showWallItemsObject(\'tshirt-05\',50);" ><div class="lc_block_img lc_block_tshirt-05"></div></div>';

    tb += '</div>';
    return tb;

}

function adaptObjectItems(){

    if (itemsAvatarGlobal.indexOf('pant-02')!=-1) {
        $("#pant-02").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('extras-01')!=-1) {
        $("#extras-01").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('extras-02')!=-1) {
        $("#extras-02").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('extras-03')!=-1) {
        $("#extras-03").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('extras-04')!=-1) {
        $("#extras-04").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('tshirt-02')!=-1) {
        $("#tshirt-02").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('tshirt-03')!=-1) {
        $("#tshirt-03").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('tshirt-04')!=-1) {
        $("#tshirt-04").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
    if (itemsAvatarGlobal.indexOf('tshirt-05')!=-1) {
        $("#tshirt-05").css("background-image",'url(' + storeFolder + "avatars/block-items-no.png)");
    }
}

function closeAvatarShop(){

    if (localStorage) {
        window.localStorage.setItem('learningcoinsavatarskin',skinAvatarGlobal);
    }

    $(".lc_store_wall").css("display","none");
    $(".lc_store_wall_opac").css("display","none");

    $(".lc_store_windows").animate({
        height : "200px",
        marginTop : "-100px"
    },500, function(){
        $(".lc_store_windows").css("display","none");
        $(".lc_store_opac").css("display","none");
    });

}

function innerAvatarView(){

    var style = ' style="position:absolute;width:116%;left:-8%;top:0%;" ';

    var tb = '';
    tb += '<img id="perso_avatar_shoes" ' + style + ' src="' + storeFolder + "avatars/shoes/" + "shoes-01.svg" + '" />';
    
    if (skinAvatarGlobal.indexOf("pant-02")!=-1) {
        tb += '<img id="perso_avatar_pant" ' + style + ' src="' + storeFolder + "avatars/pant/" + "pant-02.svg" + '" />';
    } else {
        tb += '<img id="perso_avatar_pant" ' + style + ' src="' + storeFolder + "avatars/pant/" + "pant-01.svg" + '" />';
    }
    if (skinAvatarGlobal.indexOf("tshirt-05")!=-1) {
        tb += '<img id="perso_avatar_tshirt" ' + style + ' src="' + storeFolder + "avatars/tshirt/" + "tshirt-05.svg" + '" />';
    } else {
        if (skinAvatarGlobal.indexOf("tshirt-04")!=-1) {
            tb += '<img id="perso_avatar_tshirt" ' + style + ' src="' + storeFolder + "avatars/tshirt/" + "tshirt-04.svg" + '" />';
        } else {
            if (skinAvatarGlobal.indexOf("tshirt-02")!=-1) {
                tb += '<img id="perso_avatar_tshirt" ' + style + ' src="' + storeFolder + "avatars/tshirt/" + "tshirt-02.svg" + '" />';
            } else {
                if (skinAvatarGlobal.indexOf("tshirt-03")!=-1) {
                    tb += '<img id="perso_avatar_tshirt" ' + style + ' src="' + storeFolder + "avatars/tshirt/" + "tshirt-03.svg" + '" />';
                } else {
                    tb += '<img id="perso_avatar_tshirt" ' + style + ' src="' + storeFolder + "avatars/tshirt/" + "tshirt-01.svg" + '" />';
                }
            }
        }
    }

    tb += '<div id="lc_avatar_head" ' + style + ' class="lc_avatar_head" >';

    if (skinAvatarGlobal.indexOf("head2")!=-1) {
        tb += lchead2.replace('headstyle', " id='avatarheadprocess' style='position:absolute;top:0px;left:0px;width:100%;height:100%;' " );
    } else {
        tb += lchead1.replace('headstyle', " id='avatarheadprocess' style='position:absolute;top:0px;left:0px;width:100%;height:100%;' " );
    }

    tb += '</div>';

    if (skinAvatarGlobal.indexOf("extras-01_")!=-1) {
        tb += '<img id="perso_avatar_extras" ' + style + ' src="' + storeFolder + "avatars/extras/" + "extras-01.svg" + '" />';
    }
    if (skinAvatarGlobal.indexOf("extras-02_")!=-1) {
        tb += '<img id="perso_avatar_extras" ' + style + ' src="' + storeFolder + "avatars/extras/" + "extras-02.svg" + '" />';
    }
    if (skinAvatarGlobal.indexOf("extras-03_")!=-1) {
        tb += '<img id="perso_avatar_extras" ' + style + ' src="' + storeFolder + "avatars/extras/" + "extras-03.svg" + '" />';
    }
    if (skinAvatarGlobal.indexOf("extras-04_")!=-1) {
        tb += '<img id="perso_avatar_extras" ' + style + ' src="' + storeFolder + "avatars/extras/" + "extras-04.svg" + '" />';
    }
    return tb;

}

function applyAvatarTools(){
    $(".lc_avatar_view").html(innerAvatarView());
    if (skinAvatarGlobal.indexOf("color1_")!=-1) {
        applyAvatarColor1();
    }
    if (skinAvatarGlobal.indexOf("color2_")!=-1) {
        applyAvatarColor2();
    }



}

function innerAvatarTools(){

    var tb = '';
    tb += '<div id="lc_avatar_tools" class="lc_avatar_tools" >';
    tb += '<div onClick="touchHead1()" class="lc_block_tools lc_head01" ></div>';
    tb += '<div onClick="touchHead2()" class="lc_block_tools lc_head02" ></div>';
    tb += '<div class="lc_block_tools" ></div>';
    tb += '<div onClick="touchColor0()" class="lc_block_tools" style="background-color:#F5CBA7;" ></div>';
    tb += '<div onClick="touchColor2()" class="lc_block_tools" style="background-color:#cda184;" ></div>';
    tb += '<div onClick="touchColor1()" class="lc_block_tools" style="background-color:#A04000;" ></div>';
    tb += '</div>';
    return tb;

}

function touchHeadErase(){
    skinAvatarGlobal = skinAvatarGlobal.replace("head1_", "");
    skinAvatarGlobal = skinAvatarGlobal.replace("head2_", "");
    skinAvatarGlobal = skinAvatarGlobal.replace("head3_", "");
}

function touchHead1(){
    touchHeadErase();
    skinAvatarGlobal = skinAvatarGlobal + "head1_";
    applyAvatarTools();
}
function touchHead2(){
    touchHeadErase();
    skinAvatarGlobal = skinAvatarGlobal + "head2_";
    applyAvatarTools();
}

function touchColorsErase() {
    skinAvatarGlobal = skinAvatarGlobal.replace("color0_", "");
    skinAvatarGlobal = skinAvatarGlobal.replace("color1_", "");
    skinAvatarGlobal = skinAvatarGlobal.replace("color2_", "");
}

function touchColor0() {
    touchColorsErase();
    skinAvatarGlobal = skinAvatarGlobal + "color0_";
    applyAvatarTools();
}
function touchColor1() {
    touchColorsErase();
    skinAvatarGlobal = skinAvatarGlobal + "color1_";    
    $(".lc_avatar_view").html(innerAvatarView());
    applyAvatarTools();
}
function touchColor2() {
    touchColorsErase();
    skinAvatarGlobal = skinAvatarGlobal + "color2_";    
    applyAvatarTools();
}

function applyAvatarColor1() {

    $(".skin1").attr("fill","#A04000");
    $(".skin1").css("fill","#A04000");
    $(".skin1").css("background-color","#A04000");

    $(".skin2").attr("fill","#6E2C00");
    $(".skin2").css("fill","#6E2C00");
    $(".skin2").css("background-color","#6E2C00");

}

function applyAvatarColor2() {

    $(".skin1").attr("fill","#cda184");
    $(".skin1").css("fill","#cda184");
    $(".skin1").css("background-color","#cda184");

    $(".skin2").attr("fill","#846957");
    $(".skin2").css("fill","#846957");
    $(".skin2").css("background-color","#846957");

}

function appendShopToBody(h) {

    if (window.jQuery) {
        $("body").append(h);
    }else{
        document.body.innerHTML = document.body.innerHTML + h;
    }
    
}

function buyExtras(product){

    if (product.indexOf("tshirt-")!=-1) {
        skinAvatarGlobal = skinAvatarGlobal.replace("tshirt-1_", "").replace("tshirt-2_", "").replace("tshirt-3_", "");
        skinAvatarGlobal = skinAvatarGlobal.replace("tshirt-01_", "").replace("tshirt-02_", "").replace("tshirt-03_", "");
        skinAvatarGlobal = skinAvatarGlobal.replace("tshirt-04_", "").replace("tshirt-05_", "").replace("tshirt-06_", "");
    }
    if (product.indexOf("extras-")!=-1) {
        skinAvatarGlobal = skinAvatarGlobal.replace("extras-01_", "").replace("extras-02_", "").replace("extras-03_", "");
        skinAvatarGlobal = skinAvatarGlobal.replace("extras-04_", "").replace("extras-05_", "").replace("extras-06_", "");
    }
    skinAvatarGlobal = skinAvatarGlobal.replace(product + "_", "");
    skinAvatarGlobal = skinAvatarGlobal + product + "_";
    if (itemsAvatarGlobal.indexOf(product + "_")==-1) {
        itemsAvatarGlobal += product+ "_";
        if (localStorage) {
            window.localStorage.setItem('learningcoinsitemscoll',itemsAvatarGlobal);
        }
    }

    applyAvatarTools();
    adaptObjectItems();
}

function innerWallItemsObject() {

    var nbc = 1;
    
    var h = '';
    
    h += '<div id="lc_store_wall_opac" class="lc_store_wall_opac" oncontextmenu="return false;" ></div>';

    h += '<div id="lc_store_wall" class="lc_store_wall" oncontextmenu="return false;" >';

    h += '<div id="lc_product_wall" class="lc_product_wall" ></div>';

    h += '<img id="imagescoins" ';
    h += 'style="position:absolute;width:60px;height:60px;';
    h += 'left:190px;top:27px;user-select:none;" ';
    h += ' src="' + storeFolder + 'learningcoin-80.gif" />';

    h += '<div id="lc_store_btnpay_message" class="lc_store_btnpay_message" >';
    h += '</div>';
    
    h += '<a id="creditlc1" onclick="stopWallItemsObject();" href="#" style="left:70px;top:172px;background: rgb(251, 238, 230) !important;" class="lc_store_btnpay">';
    h += 'Non</a>';

    h += '<a id="creditlc2" onclick="payWallItemsObject();" href="#" style="left:200px;top:172px;" class="lc_store_btnpay">';
    h += 'Oui</a>';

    // load.gif
    h += '<img id="loadcoins" ';
    h += 'style="position:absolute;width:32px;height:32px;';
    h += 'left:153px;top:172px;display:none;user-select:none;" ';
    h += ' src="' + storeFolder + 'load.gif" />';

    h += '</div>';

    return h;

}

function payWallItemsObject() {

    $("#creditlc1").css("display","none");
    $("#creditlc2").css("display","none");
    $("#loadcoins").css("display","block");

    if (itemsAvatarGlobal.indexOf(nameLcProduct)!=-1) {

        stopWallItemsObject();
        buyExtras(nameLcProduct);

    } else {

        var urlpath = storeFolder +'services/ajax.getproduct.php?item=' + nameLcProduct + '&pc=' + nbLcProductCoins;

        $.ajax({
            url : urlpath, cache : true
        }).done(function(data){
            
            $("#loadcoins").css("display","none");
    
            if (data.indexOf('OK')!=-1) {
                stopWallItemsObject()
                buyExtras(nameLcProduct);

                if (data.indexOf('double')==-1) {
                    learningcoinsglobal = learningcoinsglobal - nbLcProductCoins;
                    $("#lc_package_count").html(learningcoinsglobal);
                    if (localStorage) {
                        window.localStorage.setItem('learningcoinsglobal',learningcoinsglobal);
                    }
                }
            } else {
                $("#creditlc1").css("display","block");
                $("#creditlc2").css("display","block");
            }
    
        }).error(function(xhr, ajaxOptions, thrownError){
            $("#creditlc1").css("display","block");
            $("#creditlc2").css("display","block");
            $("#loadcoins").css("display","none");
        });

    }

}

function showWallItemsObject(product,nbcoins) {

    nameLcProduct = product;
    nbLcProductCoins = nbcoins;
    $(".lc_store_btnpay_message").html('Acheter pour <strong>' + nbLcProductCoins + '</strong> crédits ?')
    if (itemsAvatarGlobal.indexOf(nameLcProduct)!=-1) {
        $(".lc_store_btnpay_message").html('Equiper votre avatar ?')
    }
    $("#creditlc1").css("display","block");
    $("#creditlc2").css("display","block");

    $("#lc_product_wall").removeClass();
    $("#lc_product_wall").addClass("lc_product_wall").addClass("lc_block_"+product);

    $(".lc_store_wall").css("display","block");
    $(".lc_store_wall_opac").css("display","block");
    
    
}

function stopWallItemsObject() {
    $("#loadcoins").css("display","none");
    $(".lc_store_wall").css("display","none");
    $(".lc_store_wall_opac").css("display","none");
    $("#creditlc1").css("display","block");
    $("#creditlc2").css("display","block");
    adaptObjectItems();
}