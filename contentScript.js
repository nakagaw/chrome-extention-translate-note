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

    $("#TN_SaveTranslateButton").on("click", function() {
        const hashKey = Math.random().toString(32).substring(2);
        const mode = $("span[data-language-to-translate-into]").attr("data-language-to-translate-into");
        const originLang = $("textarea[aria-label='原文']").text();
        const altLang = $("span[data-language-for-alternatives] > span").text();
        let lang = {};
        let textItem = {};
        console.log(originLang);
        console.log(altLang);

        // 翻訳方向判定して、日本語が lang1 になるようにする
        if(mode == "ja") {
            lang = {
                "lang1": originLang,
                "lang2": altLang
            };
        } else {
            lang = {
                "lang1": altLang,
                "lang2": originLang
            };
        }

        chrome.storage.sync.get(["TN"], function(items) {
            // Check data
            if (typeof items.TN === 'undefined') {
                textItem[hashKey] = lang; // undefinedチェック
            } else {
                textItem = items.TN //既存データ
                textItem[hashKey] = lang; //既存データに新しいデータを足す
            }
            //まとめたデータを保存
            chrome.storage.sync.set({"TN": textItem});
        });
    });

    // デバッグ用
    $("#TN_LoadTranslateButton").on("click", function() {
        chrome.storage.sync.get(["TN"], function(TN) {
            if (!Object.keys(TN).length) return; // undefinedチェック
            
            let obj = Object.values(TN);
            let idList = Object.keys(obj[0]); // 配列から配列のみ取り出し
            let ul = document.createElement('ul');
            ul.className = "TN-list";
            for (let value of idList) {
                // データひとつずつの取り出しに成功 => obj[0][value]
                const li = document.createElement('li');
                let lang1div = document.createElement('div');
                let lang2div = document.createElement('div');

                li.setAttribute("id", value);
                li.className = "TN-list__item";
                lang1div.className = "lang1";
                lang2div.className = "lang2";
                lang1div.innerHTML = obj[0][value]["lang1"];
                lang2div.innerHTML = obj[0][value]["lang2"];
                li.append(lang1div,lang2div);
                ul.append(li);
            }
            console.log(ul);
        });
    });

    $("#TN_DeleteTranslateButton").on("click", function() {
        chrome.storage.sync.clear();
        console.log("ALL DELETE");
    });

});