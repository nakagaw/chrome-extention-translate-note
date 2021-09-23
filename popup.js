document.body.onload = function() {
  chrome.storage.sync.get(["TN"], function(TN) {
    if (!chrome.runtime.error) {
      if (!Object.keys(TN).length) return; // undefinedチェック
      
      let obj = Object.values(TN);
      let idList = Object.keys(obj[0]); // 配列から配列のみ取り出し
      let ul = document.createElement('ul');
      ul.className = "TN-list";
      for (let value of idList) {
        // データひとつずつの取り出しに成功 => obj[0][value]
        const li = document.createElement('li');
        let lang1div = document.createElement('pre');
        let lang2div = document.createElement('pre');
  
        li.setAttribute("id", value);
        li.className = "TN-list__item";
        lang1div.className = "TN-list__item-lang -lang1";
        lang2div.className = "TN-list__item-lang -lang2";
        lang1div.innerHTML = obj[0][value]["lang1"];
        lang2div.innerHTML = obj[0][value]["lang2"];
        li.append(lang1div,lang2div);
        ul.append(li);
      }
      console.log(ul);
      document.getElementById("TN").append(ul);
    }
  });
}