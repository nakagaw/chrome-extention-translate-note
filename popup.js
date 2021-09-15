
$(function() {
    chrome.storage.sync.get(["TN_1"], function(items) {
        console.log(items.TN_1);
        let itemJa = '<div class="text-item">' + items.TN_1.ja + '</div>';
        let itemEn = '<div class="text-item">' + items.TN_1.en + '</div>';
        $(itemJa).prependTo("#TN-list");
        $(itemEn).prependTo("#TN-list");
    });
});