
document.body.onload = function() {
    chrome.storage.sync.get(["TN"], function(items) {
      if (!chrome.runtime.error) {
        console.log(items);
        document.getElementById("TN-list").innerText = items.data;
      }
    });
  }

  
$(function() {
    chrome.storage.sync.get(["TN"], function(items) {
        console.log(items.TN);
        // let itemJa = '<div class="text-item">' + items.TN_1.ja + '</div>';
        // let itemEn = '<div class="text-item">' + items.TN_1.en + '</div>';
        // $(itemJa).prependTo("#TN-list");
        // $(itemEn).prependTo("#TN-list");
    });
});