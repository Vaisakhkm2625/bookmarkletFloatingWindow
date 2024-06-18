
// background.js

// This file can be used to handle background tasks if needed



//// Listener for messages from the content script
//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//    if (message.action === 'getBookmarks') {
//        // Fetch all bookmarks
//        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
//            // Send the bookmarks back to the content script
//            sendResponse({ bookmarks: bookmarkTreeNodes });
//        });
//        return true; // Indicates that the response is sent asynchronously
//    }
//});


//// background.js
//
//// Listener for messages from the content script
//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//    if (message.action === 'getJavaScriptBookmarks') {
//        // Fetch all bookmarks
//        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
//            const javascriptBookmarks = [];
//            // Recursive function to traverse bookmarks tree
//            function traverseBookmarks(bookmarkNodes) {
//                for (const node of bookmarkNodes) {
//                    if (node.url && node.url.startsWith('javascript:')) {
//                        javascriptBookmarks.push(node);
//                    }
//                    if (node.children) {
//                        traverseBookmarks(node.children);
//                    }
//                }
//            }
//            traverseBookmarks(bookmarkTreeNodes);
//            // Send the JavaScript bookmarks back to the content script
//            sendResponse({ bookmarks: javascriptBookmarks });
//        });
//        return true; // Indicates that the response is sent asynchronously
//    }
//});



// background.js

// Listener for messages from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'getJavaScriptBookmarks') {
        // Fetch all bookmarks
        chrome.bookmarks.getTree((bookmarkTreeNodes) => {
            const javascriptBookmarks = [];
            // Recursive function to traverse bookmarks tree
            function traverseBookmarks(bookmarkNodes) {
                for (const node of bookmarkNodes) {
                    if (node.url && node.url.startsWith('javascript:')) {
                        javascriptBookmarks.push({ url: node.url, name: node.title });
                    }
                    if (node.children) {
                        traverseBookmarks(node.children);
                    }
                }
            }
            traverseBookmarks(bookmarkTreeNodes);
            // Send the JavaScript bookmarks back to the content script
            sendResponse({ bookmarks: javascriptBookmarks });
        });
        return true; // Indicates that the response is sent asynchronously
    }
});
