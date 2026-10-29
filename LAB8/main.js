// A. Estado e variáveis
const divProdutos = document.querySelector("#produtos div")
const divCesto = document.querySelector("#cesto div")
const total = document.querySelector("#total")

if (!localStorage.getItem("produtos-selecionados")) {
  localStorage.setItem("produtos-selecionados", "[]")
}

// B. Funções utilitárias
function criarProduto(produto) {
  const artigo = document.createElement("article")

  const titulo = document.createElement("h3")
  titulo.textContent = produto.title

  const imagem = document.createElement("img")
  imagem.src = produto.image
  imagem.alt = produto.title

  const preco = document.createElement("p")
  preco.textContent = `Custo total: ${produto.price} €`

  const descricao = document.createElement("p")
  descricao.textContent = produto.description
  descricao.classList.add("descricao")

  const botao = document.createElement("button")
  botao.textContent = "+ Adicionar ao Cesto"
  botao.addEventListener("click", () => adicionarAoCesto(produto))

  artigo.append(titulo, imagem, preco, descricao, botao)
  return artigo
}

function criaProdutoCesto(produto, i) {
  const artigo = document.createElement("article")

  const titulo = document.createElement("h3")
  titulo.textContent = produto.title

  const imagem = document.createElement("img")
  imagem.src = produto.image
  imagem.alt = produto.title

  const preco = document.createElement("p")
  preco.textContent = `Custo total: ${produto.price} €`

  const botao = document.createElement("button")
  botao.textContent = "- Remover do Cesto"
  botao.addEventListener("click", () => removerDoCesto(i))

  artigo.append(titulo, imagem, preco, botao)
  return artigo
}

// C. Event handlers
function adicionarAoCesto(produto) {
  const lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
  lista.push(produto)
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista))
  atualizaCesto()
}

function removerDoCesto(i) {
  const lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
  lista.splice(i, 1)
  localStorage.setItem("produtos-selecionados", JSON.stringify(lista))
  atualizaCesto()
}

function atualizaCesto() {
  const lista = JSON.parse(localStorage.getItem("produtos-selecionados")) || []
  divCesto.innerHTML = ""
  lista.forEach((produto, i) => {
    divCesto.append(criaProdutoCesto(produto, i))
  })
  const soma = lista.reduce((acum, produto) => acum + produto.price, 0)
  total.textContent = `Custo total: ${soma.toFixed(2)} €`
}

function renderizarProdutos(produtos) {
  divProdutos.innerHTML = ""
  produtos.forEach(produto => {
    divProdutos.append(criarProduto(produto))
  })
}

function mostrarSecao() {
  document.body.className = location.hash === "#cesto" ? "cesto" : "produtos"
}

// D. Event listeners
window.addEventListener("hashchange", mostrarSecao)

// E. Inicialização
renderizarProdutos(produtos)
atualizaCesto()
mostrarSecao()
