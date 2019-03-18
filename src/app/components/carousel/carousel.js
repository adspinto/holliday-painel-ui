import React from 'react'
import "./carousel.css"
import { api, dev_api } from '../config/config'


export default class CarouselControle extends React.Component {
    constructor() {
        super()
        this.state = {
            active: true,
            main_class: '',
            slide_interval: '',
            slide_transition: '',
            slide_autoplay: '',
            carousel_read: '',
            msg: {},
            msgCls: '',
            control: false

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        if (e.target.type == "checkbox") {
            this.setState({
                [e.target.name]: e.target.checked
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

        let test_url = window.location.href
        let carousel_update_api = (api.LOCATION_URL == test_url ? api.CAROU_UPDATE : dev_api.DEV_CAROU_UPDATE);

        let objectToUpdate = {
            active: this.state.active ? "1" : "0",
            main_class: this.state.main_class,
            slide_interval: this.state.slide_interval,
            slide_transition: this.state.slide_transition,
            slide_autoplay: this.state.slide_autoplay,
            msg: this.state.msg
        }
        console.log(objectToUpdate)
        fetch(carousel_update_api, {
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
        let carousel_read_api = (api.LOCATION_URL == test_url ? api.CAROU_READ : dev_api.DEV_CAROU_READ);
        fetch(carousel_read_api)
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
                        carousel_read: response,
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
        let { msgCls, control, carousel_read, active, main_class, slide_interval, slide_transition, slide_autoplay } = this.state;


        return (
            <div>
                <h4 className="title-center">Carousel de Avaliações</h4>
                {control ?
                    (
                        msgCls == 'success' ?
                            <div className={`${msgCls}`}>Carousel Atualizado.</div>
                            :
                            <div className={`qtd-danger`}>Falha ao atualizar.</div>
                    ) : ''
                }
                <form onSubmit={this.handleSubmit}>
                    <div className="car-container">
                        <div>
                            <div className='car-controle'>
                                <label htmlFor='active'>Ativar</label>
                                <input name='active' checked={active} onChange={this.handleChange} type='checkbox' />
                            </div>

                            <div className='car-controle'>
                                <label>Classe CSS Principal</label>
                                <input className='main_class' name='main_class' min='0' value={main_class} onChange={this.handleChange} type='text' placeholder="carousel-container ou carousel-container-grey" />
                            </div>

                            <div className='car-controle'>
                                <label>Intervalo entre Slides</label>
                                <input className='slide_interval' name='slide_interval' min='0' value={slide_interval} onChange={this.handleChange} type='number' placeholder="tempo em milisegundos entre slides" />
                            </div>

                            <div className='car-controle'>
                                <label>Tipo de Transição do Slide</label>
                                <input className='slide_transition' name='slide_transition' min='0' value={slide_transition} onChange={this.handleChange} type='text' placeholder="transição slide ou fade" />
                            </div>

                            <div className='car-controle'>
                                <label htmlFor='slide_autoplay'>Ativar Autoplay</label>
                                <input name='slide_autoplay' checked={slide_autoplay} onChange={this.handleChange} type='checkbox' />
                            </div>

                            <div className='car-group'>
                                <input className='qtd-botao' type='submit' value='Enviar' />
                            </div>

                        </div>
                        <div>
                            <h5>Opções atuais</h5>
                            <div>
                                <div >Ativar Carousel: <strong>{carousel_read.active ? carousel_read.active == 1 ? "Sim" : "Não" : ''}</strong></div>
                            </div>

                            <div>
                                <div >Classe CSS Principal: <strong>{carousel_read.main_class ? carousel_read.main_class : ''}</strong></div>
                            </div>
                            <div>
                                <div >Intervalo entre Slides: <strong>{carousel_read.slide_interval ? carousel_read.slide_interval : ''}</strong></div>
                            </div>
                            <div>
                                <div >Tipo de Transição do Slide: <strong>{carousel_read.slide_transition ? carousel_read.slide_transition : ''}</strong></div>
                            </div>
                            <div>
                                <div >Ativar Autoplay: <strong>{carousel_read.slide_autoplay ? carousel_read.slide_autoplay == 1 ? "Sim" : "Não" : ''}</strong></div>
                            </div>
                        </div>
                    </div>


                </form>




            </div>
        )
    }
}