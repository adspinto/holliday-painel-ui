import React from 'react'
import QuantidadeMinima from './qtd-minima/qtd_minima';

export default class Painel extends React.Component {
    constructor(){
        super()
        this.state ={
            componentIndex: 0
        }
    }
    componentDidMount(){

    }

    render() {
        let testArr = ['component 1', 'component 2', 'component 3']
        let testMap = testArr.map(data => {
            return (
                <React.Fragment>
                    {data}
                </React.Fragment>
            )
        })


        return (
            <div>
               <div>
                   <div>
                       <QuantidadeMinima/>
                   </div>
               </div>
            </div>
        )
    }
}