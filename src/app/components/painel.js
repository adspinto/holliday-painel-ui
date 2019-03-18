import React from 'react'
import QuantidadeMinima from './qtd-minima/qtd_minima';
import CarouselControle from './carousel/carousel';

export default class Painel extends React.Component {
    constructor() {
        super()
        this.state = {
            componentIndex: 0
        }
    }
    componentDidMount() {

    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <QuantidadeMinima />
                        <hr />
                        <CarouselControle />
                    </div>
                </div>
            </div>
        )
    }
}