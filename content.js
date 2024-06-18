
// content.js

// Create the container for the floating buttons
const container = document.createElement('div');
container.id = 'floating-button-container';
document.body.appendChild(container);


// Define the bookmarklets
const internalBookmarklets = [
    {
        name: 'Reload',
        url: "javascript:(function()%7Bvar%20w%20%3D%20window.open(window.location.href)%3BsetInterval(function()%7Bw.window.location.reload()%7D%2C10000)%7D)()",
        internal: true
    },
    {
        name: 'Change Background Color',
        url: 'javascript:(function()%7Bdocument.body.style.backgroundColor%20%3D%20%22lightblue%22%3B%7D)()%3B',
        internal: true
    }
];
let bookmarklets = internalBookmarklets;

function fetchJavaScriptBookmarks() {
    chrome.runtime.sendMessage({ action: 'getJavaScriptBookmarks' }, (response) => {
        if (response && response.bookmarks) {
            // Process the bookmarks with "javascript:" URLs
            console.log('JavaScript bookmarks:', response.bookmarks);
            // Example of using the fetched bookmarks
            response.bookmarks.forEach(bookmarklet => {
                console.log(`Name: ${bookmarklet.name}, URL: ${bookmarklet.url}`);
            });
            bookmarklets = internalBookmarklets.concat(response.bookmarks);
            updateFloatingContainer(document.querySelector('#draggableDivcontent'), bookmarklets);
        }
    });
}

// Call the function to fetch JavaScript bookmarks
fetchJavaScriptBookmarks();

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}





function createFloatingContainer() {

    const div = document.createElement('div');
    div.id = 'draggableDiv';

    const head = document.createElement('div');
    head.id = 'draggableDivheader';
    div.appendChild(head);

    let content = document.createElement('div')
    content.id = 'draggableDivcontent';
    div.appendChild(content);

    return div;

}


function updateFloatingContainer(div, bookmarklets) {

    console.log("updating")
    console.log(bookmarklets)

    if (typeof (div) != 'undefined' && div != null) {

        bookmarklets.forEach(bookmarklet => {

            //const p = document.createElement('p');
            const a = document.createElement('a');
            a.innerHTML = bookmarklet.name;
            if (bookmarklet.internal && bookmarklet.internal === true) {
                a.style.backgroundColor = "#007bff";
            }
            //a.classList.add("dragaButton");
            a.href = bookmarklet.url;

            //p.appendChild(a);
            div.appendChild(a);


        });
    }
}

function main() {
    let div = createFloatingContainer()
    document.body.appendChild(div);

    let header = document.querySelector('#draggableDivheader')
    header.innerHTML = "service now helper";

    let content = document.querySelector('#draggableDivcontent')
    console.log(content)


    div.style.top = (window.innerHeight - 200) + "px";
    div.style.left = (window.innerWidth - 200) + "px";

    content.classList.add("vertical-btn-group");

    updateFloatingContainer(content, bookmarklets)

    dragElement(document.getElementById("draggableDiv"));

}


window.addEventListener('load', function () {
    main()
})
