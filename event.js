// Wrap in an onInstalled callback in order to avoid unnecessary work
// every time the background script is run
chrome.runtime.onInstalled.addListener(() => {
    // Page actions are disabled by default and enabled on select tabs
    chrome.action.disable();

    // Clear all rules to ensure only our expected rules are set
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        // Declare a rule to enable the action on example.com pages
        let exampleRule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: {hostEquals: 'translate.google.co.jp'},
                })
            ],
            actions: [
                new chrome.declarativeContent.ShowAction()
            ],
        };

        // Finally, apply our new array of rules
        let rules = [exampleRule];
        chrome.declarativeContent.onPageChanged.addRules(rules);
    });
});

// chrome.action.onClicked.addListener((tab) => {
//     console.log(tab);
//     // https://stackoverflow.com/questions/4698118/google-chrome-extensions-how-to-include-jquery-in-programmatically-injected-con
//     chrome.scripting.executeScript(
//         {
//             target: { tabId: tab.id },
//             files: ['content.js']
//         }
//     );
// });