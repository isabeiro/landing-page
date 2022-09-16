
/*********************
 * PRODUCTS LIST
 ********************/


const list = document.querySelector("#productsDescription")
const buttonProduct = document.querySelector("#moreButton")


let products = ""

function turnInJson(response) {
    return response.json()
}

function productList(response) {

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
let submit = document.querySelector("#submit")
const checkboxM = document.querySelector("#checkboxM")
const checkboxF = document.querySelector("#checkboxF")


let temErro = false

checkboxM.addEventListener("click", function() {
    if (checkboxM.classList.contains('checked')) {
        checkboxM.classList.remove('checked')

    } else {
        checkboxF.classList.remove('checked')
        checkboxM.classList.add('checked')
        temErro = false
    }
})

checkboxF.addEventListener("click", function() {
    if (checkboxF.classList.contains('checked')) {
        checkboxF.classList.remove('checked')


    } else {
        checkboxM.classList.remove('checked')
        checkboxF.classList.add('checked')
        temErro = false
    }
})


subForm.onsubmit = function(event) {
    
    event.preventDefault() 

    if(!subForm.name.value){   
        temErro = true
        subForm.name.classList.add('inputError')
        subForm.name.placeholder= ' Digite o nome'
    } else {
        subForm.name.classList.remove('inputError')
        subForm.name.placeholder= ''
    }

    if(!subForm.email.value){   
        temErro = true
        subForm.email.classList.add('inputError')
        subForm.email.placeholder= ' Digite o e-mail'
    } else {
        subForm.email.classList.remove('inputError')
        subForm.email.placeholder= ''
    }

    if(!subForm.cpf.value){   
        temErro = true
        subForm.cpf.classList.add('inputError')
        subForm.cpf.placeholder= ' Digite o CPF'
    } else {
        subForm.cpf.classList.remove('inputError')
        subForm.cpf.placeholder= ''
    }

    
    if (!temErro){
        subForm.classList.add('thankyou')

        subForm.innerHTML = `
        Obrigado por se inscrever!
        `
        
    }
}

/*********************
 *    FORM SHARE
 ********************/

const shareForm = document.querySelector("#shareForm")
const friendName = document.querySelector("#friendName")
const friendEmail = document.querySelector("#friendEmail")
const secSubmit = document.querySelector("#secondSubmit")


secondSubmit.addEventListener("click", function() {

    shareForm.onsubmit = function(e) {
        console.log('ok')

    
        e.preventDefault()

        let temErro = false
        
    
    
        if (!shareForm.friendName.value) {
            temErro = true
            shareForm.friendName.classList.add('inputError')
            shareForm.friendName.placeholder = ' Digite o nome'
        } else {
            shareForm.friendName.classList.remove('inputError')
            shareForm.friendName.placeholder = ''
        }
    
        if (!shareForm.friendEmail.value) {
            temErro = true
            shareForm.friendEmail.classList.add('inputError')
            shareForm.friendEmail.placeholder = ' Digite o e-mail'
        } else {
            shareForm.friendEmail.classList.remove('inputError')
            shareForm.friendEmail.placeholder = ''
        }
    
    
        if (!temErro) {
            shareForm.classList.add('thankyou')
    
            shareForm.innerHTML = `
            Obrigado por compartilhar!
            `
        }
    }

})


