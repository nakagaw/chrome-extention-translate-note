$(function() {
    console.log("WORK IT!");
    const wrapper = '<div id="TN_Buttons"></div>'
    const saveButton = '<button type="button" class="TN-button -save" id="TN_SaveTranslateButton">SAVE</button>';
    const loadButton = '<button type="button" class="TN-button -load" id="TN_LoadTranslateButton">LOAD</button>';
    const deleteButton = '<button type="button" class="TN-button -delete" id="TN_DeleteTranslateButton">DELETE</button>';
    $("body").append(wrapper);
    $(deleteButton).prependTo("#TN_Buttons");
    $(loadButton).prependTo("#TN_Buttons");
    $(saveButton).prependTo("#TN_Buttons");

    // 左：日本語　右：英語　の場合
    $("#TN_SaveTranslateButton").on("click", function() {
        var hashKey = Math.random().toString(32).substring(2);
        var japanese = $("textarea[aria-label='原文'] + div").text();
        var english = $("span[data-language-for-alternatives] > span").text();

        var lang = {
            "ja": japanese, 
            "en": english
        };
        var textItem = {};

        chrome.storage.sync.get(["TN"], function(items) {
            // Check data
            if (typeof items.TN === 'undefined') {
                textItem[hashKey] = lang;
                console.log("none => ");
                console.log(textItem);
            } else {
                textItem = items.TN;
                console.log("pushed 1 => ");
                console.log(textItem);
                textItem[hashKey] = lang;
                console.log("pushed 2 => ");
                console.log(textItem);
            }
            // Save
            chrome.storage.sync.set({"TN": textItem});
        });
    });

    // デバッグ用
    $("#TN_LoadTranslateButton").on("click", function() {
        chrome.storage.sync.get(["TN"], function(items) {
            console.log(items);
        });
    });

    $("#TN_DeleteTranslateButton").on("click", function() {
        chrome.storage.sync.clear();
        console.log("ALL DELETE");
    });

});