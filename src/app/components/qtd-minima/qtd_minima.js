import React from 'react'
import "./qtd-minima.css"


export default class QuantidadeMinima extends React.Component {
    constructor(){
        super()
        this.state = {
            active:true,
            quantidade:'',
            msg: {},
            msgCls: '',
            control: false

        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        if(e.target.type == "checkbox"){
            this.setState({
                active: !this.state.active
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value
            }) 
        }
        

    }

    handleSubmit(e){
        e.preventDefault();
        let _this = this
        
        let api = 'https://www.hollidaystore.com.br/hollidaystore/painel/api/quantidade/update.php'

        let objectToUpdate = {
            active: this.state.active ? "1" : "0",
            quantidade: this.state.quantidade,
            msg: this.state.msg
        }
        console.log(objectToUpdate)
        fetch(api, {
            method: 'POST',
            mode: "cors", // no-cors, cors, *same-origin
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(objectToUpdate)
        })
        .then( function(response){
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
    
    componentDidMount(){
        this.setState({
            control: false
        })
    }
    render() {
      

        return (
            <div>
                <h4>Quantidade Mínima de Produtos</h4>
                {this.state.control ? 
                    ( 
                    this.state.msgCls == 'success' ? 
                    <div className={`${this.state.msgCls}`}>Quantidade Mínima Atualizada.</div> 
                    :
                    <div className={`qtd-danger`}>Falha ao atualizar</div>
                    ) : ''                   
                }
               <form onSubmit={this.handleSubmit}>

                   <div className='form-controle'>
                       <label htmlFor='active'>Ativar</label>
                       <input name='active' checked={this.state.active} onChange={this.handleChange}  type='checkbox'/>
                   </div>
                   <div className='form-controle'>
                       <label>Quantidade Mínima</label>
                       <input className='quantidade' name='quantidade' min='0' value={this.state.quantidade} onChange={this.handleChange} type='number'/>
                   </div>

                   <div className='form-group'>
                       <input  className='qtd-botao' type='submit' value='Enviar'/>
                   </div>
               </form>
            </div>
        )
    }
}