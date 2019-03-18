import React from 'react'
import "./qtd-minima.css"
import { api, dev_api } from '../config/config'


export default class QuantidadeMinima extends React.Component {
    constructor() {
        super()
        this.state = {
            active: true,
            quantidade: '',
            msg: {},
            msgCls: '',
            control: false,
            qtd_read: ''

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.type == "checkbox") {
            this.setState({
                active: !this.state.active
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            })
        }


    }

    handleSubmit(e) {
        e.preventDefault();
        let _this = this

        let api = 'https://www.hollidaystore.com/hollidaystore/painel/api/quantidade/update.php'
        let test_url = window.location.href
        let quantidade_update_api = (api.LOCATION_URL == test_url ? api.QTD_UPDATE : dev_api.QTD_UPDATE);

        let objectToUpdate = {
            active: this.state.active ? "1" : "0",
            quantidade: this.state.quantidade,
            msg: this.state.msg
        }
        console.log(objectToUpdate)
        fetch(quantidade_update_api, {
            method: 'POST',
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(objectToUpdate)
        })
            .then(function (response) {
                switch (response.status) {
                    case 200:
                        _this.setState({
                            msgCls: 'success'
                        })
                        break;
                    case 400:
                        _this.setState({
                            msgCls: 'danger'
                        })
                        break;
                    default:
                        _this.setState({
                            msgCls: 'danger'
                        })
                        break;
                }
                console.log(response)
            })
            .then(response => {
                this.setState({
                    control: true
                })
            })
            .catch(error => console.log(error))
    }

    componentDidMount() {
        this._isMounted = true
        this.setState({
            control: false
        })
        let _this = this

        let test_url = window.location.href
        let qtd_read_api = (api.LOCATION_URL == test_url ? api.QTD_READ : dev_api.DEV_QTD_READ);
        fetch(qtd_read_api)
            .then(response => {
                if (!response.ok) {
                    throw Error(response.statusText)
                } else {
                    return response
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if (this._isMounted) {
                    _this.setState({
                        qtd_read: response,
                    })
                }
            })
            .catch(error => {
                if (this._isMounted) {
                    console.log(error)
                }
            })
    }

    componentWillUnmount() {
        this._isMounted = false
    }


    render() {
        let { qtd_read, quantidade, active } = this.state

        return (
            <div>
                <h4 className="title-center">Quantidade Mínima de Produtos</h4>
                {this.state.control ?
                    (
                        this.state.msgCls == 'success' ?
                            <div className={`${this.state.msgCls}`}>Quantidade Mínima Atualizada.</div>
                            :
                            <div className={`qtd-danger`}>Falha ao atualizar</div>
                    ) : ''
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="car-container">
                        <div >
                            <div className='form-controle'>
                                <label htmlFor='active'>Ativar</label>
                                <input name='active' checked={active} onChange={this.handleChange} type='checkbox' />
                            </div>
                            <div className='form-controle'>
                                <label>Quantidade Mínima</label>
                                <input className='quantidade' name='quantidade' min='0' value={quantidade} onChange={this.handleChange} type='number' />
                            </div>

                            <div className='form-group'>
                                <input className='qtd-botao' type='submit' value='Enviar' />
                            </div>
                        </div>

                        <div>
                            <h5>Opções atuais</h5>
                            <div>
                                <div >Quantidade Mínima Ativada: <strong>{qtd_read.active ? qtd_read.active == 1 ? "Sim" : "Não" : ''}</strong></div>
                            </div>

                            <div>
                                <div >Quantidade Atual: <strong>{qtd_read.quantidade ? qtd_read.quantidade : ''}</strong></div>
                            </div>

                        </div>
                    </div>

                </form>
            </div>
        )
    }
}