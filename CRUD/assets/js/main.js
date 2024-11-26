const botao = document.getElementById("Salvar");






const postFilmes = async function () {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/novo/filme';

    // Receber dados do formulário
    let nome = document.getElementById('tituloFilme');
    let sinopse = document.getElementById('sinopseFilme');
    let foto = document.getElementById('imgFilme');
    let valor = document.getElementById('valorFilme');

    // Cria um objeto JSON
    let filmeJSON = {};
    filmeJSON.nome = nome.value;
    filmeJSON.sinopse = sinopse.value;
    filmeJSON.image = foto.value;
    filmeJSON.valor = valor.value;

    let response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(filmeJSON)  // Forçando conversão para JSON
    });

    if (response.status == 201) {
        alert("Inserido com sucesso");
        getFilme();
    } else {
        alert("Não foi possível adicionar os registros, verifique os dados enviados.");
    }
};

const putFilmes = async function () {
    let id = sessionStorage.getItem('idfilme');
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/atualizar/filme/' + id;

    // Receber dados do formulário
    let nome = document.getElementById('tituloFilme');
    let sinopse = document.getElementById('sinopseFilme');
    let foto = document.getElementById('imgFilme');
    let valor = document.getElementById('valorFilme');

    // Cria um objeto JSON
    let filmeJSON = {};
    filmeJSON.nome = nome.value;
    filmeJSON.sinopse = sinopse.value;
    filmeJSON.image = foto.value;
    filmeJSON.valor = valor.value;

    let response = await fetch(url, {
        method: 'PUT',
        mode: 'cors',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(filmeJSON)  // Forçando conversão para JSON
    });

    if (response.status == 200) {
        alert("Atualizado com sucesso");
        getFilme();
    } else {
        alert("Não foi possível atualizar os registros, verifique os dados enviados.");
    }
};

const deleteFilme = async function (idfilme) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/excluir/filme/' + idfilme;

    let response = await fetch(url, {
        method: 'DELETE'
    });

    if (response.status == 200) {
        alert('Deletado com sucesso');
        getFilme();
    } else {
        alert("Registro não encontrado");
    }
};

const getFilme = async function () {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/listar/filmes'; 

    let response = await fetch(url);

    let dados = await response.json();

    let divlistDados = document.getElementById("listDados");

    // Limpa a lista de dados antes de carregar uma nova lista
    divlistDados.innerHTML = '';  // Limpa o conteúdo da div

    dados.filmes.forEach(function (filme) {
        // Criação dos elementos HTML
        let divDados = document.createElement('div');
        let divTitle = document.createElement("div");
        let divSinopse = document.createElement("div");
        let divPrice = document.createElement("div");
        let divOpcoes = document.createElement("div");
        let spanEditar = document.createElement('span');
        let imgEditar = document.createElement('img');
        let spanExcluir = document.createElement('span');
        let imgExcluir = document.createElement('img');

        // Adiciona os atributos aos elementos
        divDados.setAttribute('id', 'dados');
        divDados.setAttribute('class', 'linha dados');
        imgEditar.setAttribute("src", "./assets/img/editar.png");
        imgEditar.setAttribute('idfilme', filme.id);
        imgExcluir.setAttribute("src", "./assets/img/excluir.png");
        imgExcluir.setAttribute('idfilme', filme.id);

        // Preenche os dados do filme
        divTitle.textContent = filme.nome;
        divSinopse.textContent = filme.sinopse;
        divPrice.textContent = filme.valor;

        // Adiciona os botões de ação
        spanEditar.appendChild(imgEditar);
        spanExcluir.appendChild(imgExcluir);
        divOpcoes.appendChild(spanEditar);
        divOpcoes.appendChild(spanExcluir);

        // Adiciona os elementos à div de dados
        divDados.appendChild(divTitle);
        divDados.appendChild(divSinopse);
        divDados.appendChild(divPrice);
        divDados.appendChild(divOpcoes);

        // Adiciona o novo filme à lista de filmes
        divlistDados.appendChild(divDados);

        imgExcluir.addEventListener("click", function () {
            let resposta = confirm("Deseja deletar esse filme " + filme.nome + "?");

            if (resposta) {
                let id = imgExcluir.getAttribute("idfilme");
                deleteFilme(id);
            }
        });

        imgEditar.addEventListener("click", function () {
            let id = imgEditar.getAttribute("idfilme");
            getBuscarFilme(id);
        });
    });
};


const getBuscarFilme = async function (idfilme) {
    let url = 'https://app-avaliacao-brh0avd2ahegehac.brazilsouth-01.azurewebsites.net/projeto1/fecaf/buscar/filme/' + idfilme;

    let response = await fetch(url);
    let dados = await response.json();

    if (response.status == 200) {
        document.getElementById("tituloFilme").value = dados.filme[0].nome;
        document.getElementById("sinopseFilme").value = dados.filme[0].sinopse;
        document.getElementById("valorFilme").value = dados.filme[0].valor;
        document.getElementById("imgFilme").value = dados.filme[0].image;

        document.getElementById("Salvar").innerText = 'Atualizar';

        sessionStorage.setItem('idfilme', idfilme);
    } else {
        alert("Não foi possível encontrar o registro");
    }
};

botao.addEventListener("click", function () {
    // Verifica se é para salvar um novo filme ou atualizar um filme existente
    if (document.getElementById("Salvar").innerText == 'Salvar') {
        postFilmes();
        let nome = document.getElementById('tituloFilme').value = ''
        let sinopse = document.getElementById('sinopseFilme').value =''
        let foto = document.getElementById('imgFilme').value = ''
        let valor = document.getElementById('valorFilme').value =''

    } else if (document.getElementById("Salvar").innerText == 'Atualizar') {
        putFilmes();
        let nome = document.getElementById('tituloFilme').value = ''
        let sinopse = document.getElementById('sinopseFilme').value =''
        let foto = document.getElementById('imgFilme').value = ''
        let valor = document.getElementById('valorFilme').value =''
    }
});

window.addEventListener('load', function () {
    getFilme();
});
