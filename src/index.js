import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";

let painelLocation = window.location
let supposedPainelLocation = "https://atacado.hollidaystore.com.br/pagina/painel-administrador.html"



if (painelLocation.href == "http://localhost:8080/") {
    ReactDOM.render(<App />, document.getElementById('control-panel'));
} else {
    let emailPermitedAndre = 'linkcreative.dev@gmail.com';
    let emailPermitedHeitor = 'heitormachadoleal@gmail.com';
    let dataLayerEmail = dataLayer[0].email;
    let testa = document.querySelector('.span4.links-rodape.links-rodape-paginas')
    let testei = testa.getElementsByTagName('li')
    if (dataLayerEmail !== emailPermitedAndre || dataLayerEmail !== emailPermitedHeitor) {
        for (let i = 0; i < testei.length - 1; i++) {
            if (testei[i].children[0].innerText == "Painel Administrador") {
                testei[i].style.display = "none"
            }
        }
    }
    ReactDOM.render(<App />, document.getElementById('control-panel'));
}

