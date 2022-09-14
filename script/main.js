
const list = document.querySelector("#productsDescription")
const buttonProduct = document.querySelector("#moreButton")


let products = ""

function turnInJson(response) {
    return response.json()
}

function productList(response) {
    console.log(response)

    response.products.forEach(product => {

        products += `
            <div class="product">
                <div class="img">
                    <img src="${product.image}" alt="${product.name}" />
                </div>
                <div class="description">
                    <span class="nomeDoProduto">
                        ${product.name} 
                    </span>
                    <p>
                        ${product.description}
                    </p>
                    <span class="prevPrice">
                        De: R$${product.oldPrice}
                    </span>
                    <span class="price">
                        Por: R$${product.oldPrice}
                    </span>
                    <span class="opPrice">
                        ou ${product.installments.count}x de R$${product.installments.value}
                    </span>
                    <button>Comprar</button>
                </div>
            </div>
        `;
        
    })
    
    const nextPage = response.nextPage
    
    buttonProduct.addEventListener("click", function() {
        
        fetch(`https://${nextPage}`)
        .then(turnInJson)
        .then(productList)
        .then(putItOnScreen)
        .catch(exibirErro)
    })

    return products;
}

function putItOnScreen() {
    list.innerHTML = products
}

function exibirErro() {
    console.log('Deu erro!')
}


fetch('https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=1')
.then(turnInJson)
.then(productList)
.then(putItOnScreen)
.catch(exibirErro)

/*********************
 * FORM SUBSCRIPTION
 ********************/


const subForm = document.querySelector("#subForm")
const name = document.querySelector("#name")
const email = document.querySelector("#email")
const cpf = document.querySelector("#cpf")

subForm.onsubmit = function(evento) {
    
    evento.preventDefault() 

}