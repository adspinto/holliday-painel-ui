import React from 'react'
import { api, dev_api } from '../config/config'
import './revisao.css'


export default class Revisao extends React.Component {
    constructor() {
        super()
        this.state = {
            isLoading: false,
            aval_read: '',
            aval_class: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e) {

    }

    handleSubmit(id, allow, index) {
        let _this = this
        let test_url = window.location.href
        let aval_update_api = (api.LOCATION_URL == test_url ? api.AVAL_UPDATE : dev_api.DEV_AVAL_UPDATE);
        let allowObj = {
            id: id,
            allow: allow
        }
        fetch(aval_update_api, {
            method: 'POST',
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(allowObj)
        })
            .then(response => {
                if (!response.ok) {
                    console.log("Fetch failed", response.status, response.statusText)
                } else {
                    console.log("Fetch Success", response.status, response.statusText)
                }

            })
            .then(response => {
                let classlist = [..._this.state.aval_class]
                if (allow == 0) {
                    classlist[index].className = "not-allowed"
                    this.setState({ aval_class: classlist })
                } else {
                    classlist[index].className = "allowed"
                    this.setState({ aval_class: classlist })
                }

            })
            .catch(err => console.log(err))
    }

    componentDidMount() {
        this._isMounted = true

        let _this = this
        let test_url = window.location.href
        let aval_read_api = (api.LOCATION_URL == test_url ? api.AVAL_READ : dev_api.DEV_AVAL_READ);
        let painel_read_api = (api.LOCATION_URL == test_url ? api.CAROU_READ : dev_api.DEV_CAROU_READ);

        fetch(aval_read_api)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response
                }
            })
            .then(response => response.json())
            .then(response => {
                if (this._isMounted) {

                    this.setState({
                        aval_read: response.records,
                        isLoading: false
                    }, () => {
                        for (let key in this.state.aval_read) {
                            let avalClass
                            if (this.state.aval_read[key].allow == 0) {
                                avalClass = {
                                    className: 'not-allowed'
                                }

                            } else {
                                avalClass = {
                                    className: 'allowed'
                                }
                            }

                            this.setState(prevState => {
                                return {
                                    aval_class: [...prevState.aval_class, avalClass]
                                }
                            })
                        }
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    this.setState({
                        isLoading: false
                    })
                    console.log(error)
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    render() {
        let { isLoading, aval_read, aval_class } = this.state

        let revisaoList
        if (aval_read !== '' && aval_read !== undefined && aval_read.length > 0 && aval_class !== undefined && aval_class.length > 0) {
            revisaoList = aval_read.map((aval, index) => {
                let atendimento = +aval.atendimento
                let preco = +aval.preco
                let qualidade = +aval.qualidade
                let variedade = +aval.variedade
                let no_geral = +aval.no_geral
                let total = atendimento + preco + qualidade + variedade + no_geral
                let media = +total / 5
                console.log(aval.allow)
                return (
                    <div className={`rev-list ${aval_class[index].className}`}>
                        <div>
                            <div>
                                <div>Nome: {aval.nome} {aval.sobrenome}</div>
                                <div>Contato: {aval.ddd} {aval.telefone}</div>
                                <div>Localização: {aval.cidade}-{aval.estado.toUpperCase()}</div>
                                <div>data da avaliacao: {aval.created}</div>
                                <div>Disponível: {aval.allow == 0 ? "Não" : "Sim"}</div>
                            </div>
                            <div>

                                <div>Média: {media} </div>

                                <div>
                                    <div>Mensagem</div>
                                    <div>{aval.mensagem}</div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div onClick={() => this.handleSubmit(aval.id, 1, index)}>Adicionar ao Carousel</div>
                            <div onClick={() => this.handleSubmit(aval.id, 0, index)}>Remover do Carousel</div>
                        </div>
                    </div>
                )
            })


        }
        return (
            <div className="revisao-container">
                <div>
                    <h3>Revisão de Avaliações</h3>
                </div>
                <div>
                    {revisaoList}
                </div>
            </div>
        )
    }


}