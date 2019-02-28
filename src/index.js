import React from 'react'
import ReactDOM from 'react-dom'
import App from "./app/app";

let painelLocation = window.location
let supposedPainelLocation = "https://www.hollidaystore.com/pagina/painel-administrador.html"
console.log(location)

let emailPermitedAndre = 'linkcreative.dev@gmail.com';
let emailPermitedHeitor = 'linkcreative.dev@gmail.com';
let dataLayerEmail = dataLayer[0].email;

if (painelLocation.href == supposedPainelLocation) {
    if (emailPermitedAndre == dataLayerEmail || emailPermitedHeitor == dataLayerEmail) {
        ReactDOM.render(<App />, document.getElementById('control-panel'));
    }
}
