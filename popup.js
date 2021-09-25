$(function() {
  //initDOM
  chrome.storage.sync.get(["TN"], function(items) {
    if (!chrome.runtime.error) {
      createDOM(items)
    }
  });

  //deleteItem
  $("#TN").on('click', '.js_delete', function(e) {
    let _id = e.currentTarget.parentNode.id;
    console.log(_id); 
    
    chrome.storage.sync.get(["TN"], function(items) {
      let textItem = {};
      // Check data
      if (typeof items.TN === 'undefined') {
          textItem[hashKey] = lang; // undefinedチェック
      } else {
          textItem = items.TN //既存データ
          console.log(textItem);
          delete textItem[_id];
          console.log(textItem);
      }
      //削除後のデータを保存して再描画
      chrome.storage.sync.set({"TN": textItem});
      chrome.storage.sync.get(["TN"], function(items) {
        if (!chrome.runtime.error) {
          createDOM(items)
        }
      });
      window.location.reload();
    });
  });
});


function createDOM(items) {
  if (!Object.keys(items).length) return; // undefinedチェック
  
  let obj = Object.values(items);
  let idList = Object.keys(obj[0]); // 配列から配列のみ取り出し
  let ul = document.createElement('ul');
  ul.className = "TN-list";
  for (let value of idList) {
    // データひとつずつの取り出しに成功 => obj[0][value]
    let li = document.createElement('li');
    let deleteButton = document.createElement('button');
    let lang1div = document.createElement('textarea');
    let lang2div = document.createElement('textarea');

    li.setAttribute("id", value);
    li.className = "TN-list__item";
    deleteButton.setAttribute("type", "button");
    deleteButton.className = "TN-list__delete js_delete";
    deleteButton.innerHTML = "x";
    lang1div.className = "TN-list__item-lang -lang1";
    lang2div.className = "TN-list__item-lang -lang2";
    lang1div.innerHTML = obj[0][value]["lang1"];
    lang2div.innerHTML = obj[0][value]["lang2"];
    li.append(deleteButton,lang1div,lang2div);
    ul.append(li);
  }
  console.log(ul);
  document.getElementById("TN").append(ul);
}