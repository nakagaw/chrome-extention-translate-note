$(function() {
    console.log("WORK IT!");
    const wrapper = '<div id="TN_Buttons"></div>'
    const saveButton = '<button type="button" class="TN-button -save" id="TN_SaveTranslateButton">SAVE</button>';
    const loadButton = '<button type="button" class="TN-button -load" id="TN_LoadTranslateButton">LOAD</button>';
    $("body").append(wrapper);
    $(loadButton).prependTo("#TN_Buttons");
    $(saveButton).prependTo("#TN_Buttons");

    // 左：日本語　右：英語　の場合
    $("#TN_SaveTranslateButton").on("click", function() {
        var japanese = $("textarea[aria-label='原文'] + div").text();
        var english = $("span[data-language-for-alternatives] > span").text();
    
        console.log(japanese);
        console.log(english);
        chrome.storage.sync.set(
            {
                "TN_1": { 
                    "ja" : japanese, 
                    "en" : english
                }
            }
        );
    });

    $("#TN_LoadTranslateButton").on("click", function() {
        chrome.storage.sync.get(["TN_1"], function(items) {
            console.log(items.TN_1);
        });
    });

});