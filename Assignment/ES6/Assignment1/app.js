let allPosts = [];

function submitPost() {
    let textVal = document.getElementById("post-value");
    let main = document.getElementById("main");

    allPosts.unshift(textVal.value);

    main.innerHTML = "";

    for (var i = 0; i < allPosts.length; i++) {
        main.innerHTML += `
    <div class="post">
    <h1>${allPosts[i]}</h1>

  </div>
    `
    }

    textVal.value=''
}
