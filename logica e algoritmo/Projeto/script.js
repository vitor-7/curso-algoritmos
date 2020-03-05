//Vetor
let vetor = []

// Ao carregar o documento
window.onload = () => {
    verificarArmazenamentoLocal()
    selecionar()
}

// Cadastrar
cadastrar = () => {

    // Obter dados
    let produto = document.getElementById("produto").value
    let marca = document.getElementById("marca").value
    let valor = document.getElementById("valor").value



    valida(produto, marca, valor)


}
// Limpar campos
limpar = () => {

    document.getElementById("produto").value = ""
    document.getElementById("marca").value = "Marca"
    document.getElementById("valor").value = ""

}

// Mensagem
mensagem = (mensagem, tipo) => {

    // Obter o elemento alerta
    let alerta = document.getElementById("alerta")

    // Removendo todas as classes ativas
    alerta.removeAttribute("class")

    // Exibir mensagem
    alerta.innerText = mensagem

    // Adicionar a classe alert
    alerta.classList.add("alert")

    // Tipo da mensagem
    if (tipo == "ok") {
        alerta.classList.add("alert-success")
    } else if (tipo == "cancelar") {
        alerta.classList.add("alert-warning")
    } else {
        alerta.classList.add("alert-danger")
    }

}

// Validar campos
valida = (produto, marca, valor) => {

    // Condicionail
    if (produto == "") {
        mensagem("Favor preencher o nome do produto", "falha")
    } else if (produtoDuplicado(produto)) {
        mensagem("Esse produto já está cadastrado", "falha")
    } else if (marca == "Marca") {
        mensagem("Favor preencher o marca", "falha")
    } else if (valor == "") {
        mensagem("Favor preencher o valor", "falha")
    } else {
        mensagem("Produto cadastrado com sucesso!", "ok")
        vetor.push({ produto: produto, marca: marca, valor: valor })
        armazenarDadosLocal()
        limpar()
        selecionar()

    }

}

// Selecionar
selecionar = () => {

    // Obter a tabela
    let tabela = document.getElementById("tabela")

    // Limpar tabela
    tabela.innerHTML = ""

    // Laço

    for (let indice = 0; indice < vetor.length; indice++) {

        // Criar linha
        let linha = tabela.insertRow(-1)

        // Colunas
        let colunaCodigo = linha.insertCell(0)
        let colunaProduto = linha.insertCell(1)
        let colunaMarca = linha.insertCell(2)
        let colunaValor = linha.insertCell(3)
        let colunaRemover = linha.insertCell(4)

        // Valores das células

        colunaCodigo.innerHTML = indice + 1
        colunaProduto.innerHTML = vetor[indice].produto
        colunaMarca.innerHTML = vetor[indice].marca
        colunaValor.innerHTML = vetor[indice].valor
        colunaRemover.innerHTML = "<button class='btn-danger' onClick='remover(" + indice + ")'>Remover</button"

    }

}

// Remover
remover = (indice) => {

    // Validar
    let valida = confirm("deseja realmente excluir o produto: " + vetor[indice].produto + "?")

    // Condicional
    if (valida == true) {
        vetor.splice(indice, 1)
        armazenarDadosLocal()
        mensagem("Produto removido com sucesso!", "ok")
        selecionar()
    } else {
        mensagem("Produto não removido", "cancelar")
    }
}

// Armazenar no localStorage
armazenarDadosLocal = () => {

    // Remover produtos armazenados
    localStorage.removeItem("produtos")

    // Adicionar o vetor de produtos
    localStorage.setItem("produtos", JSON.stringify(vetor))


}

// Verificar LocalStorage
verificarArmazenamentoLocal = () => {

    // Adicionar os dados do localStorage no vetor
    if (localStorage.getItem("produtos") != null) {
        vetor = JSON.parse(localStorage.getItem("produtos"))

    }
}

// Verificar o nome do produto (duplicado)
produtoDuplicado = (nome) => {

    // Variável
    let existe = false

    // laço
    for (let indice = 0; indice < vetor.length; indice++) {
        if (nome.toLowerCase() == vetor[indice].produto.toLowerCase()) {
            existe = true
            break
        }
    }

    // Retorno
    return existe
}