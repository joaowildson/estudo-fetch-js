// https://jsonplaceholder.typicode.com/posts

async function readpost() {
    let postsArea = document.querySelector(".posts");
    postsArea.innerHTML = "carregando...";

    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let json = await response.json()

    if(json.length > 0) {
        postsArea = " ";

        for(let i in json) {
            let postHtml = `<div><h1>${json[i].title}</h1>${json[i].body}<hr></div>`;
            postsArea.innerHTML += postHtml
        }
    } else {
        postsArea.innerHTML = "nenhum post para exibir";
    }
}

async function addNewpost(title, body) {
    await fetch(
        'https://jsonplaceholder.typicode.com/posts',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                body,
                userId: 2
            })
        }
    );

    document.querySelector('#titleField').value = " ";
    document.querySelector('#bodyField').value = " ";

    readpost();
}


document.querySelector('#insertButton').addEventListener('click', () => {
    let title = document.querySelector('#titleField').value;
    let body = document.querySelector('#bodyField').value;

    if(title && body) {
        addNewpost(title, body)
    } else {
        alert('preencha todos os campos')
    }

});

readpost()