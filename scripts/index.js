const links = [
    {
        text : "Path finding with DFS on a grid", 
        value : "./basic.html"
    },
    {
        text : "Prunning search with DFS", 
        value : "./pruning.html"
    }
];

links.forEach(link => {
    document.querySelector("#link_list").innerHTML +=
    `<a href="${link.value}">
        <button class="btn btn-primary btn-lg btn-block" type="button">
            ${link.text}
        </button>
        <br/>
    </a>`;
});