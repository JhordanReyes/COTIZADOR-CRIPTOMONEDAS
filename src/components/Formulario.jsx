import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import useSelectMonedas from '../hooks/useSelectMonedas'
import monedas from "../data/monedas.js"
import Error from './Error'

const InputSubmit = styled.input`
    background-color: #9497FF;
    border: none;
    width: 100%;
    padding: 10px;
    color: #FFF;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: 0.3s ease;
    margin-top: 30px;
    
    &:hover{
        background-color: #7A7DFE;
        cursor: pointer;
    }
`

const Formulario = ({setMonedas}) => {

    const [error, setError] = useState(false)
    const [criptos, setCriptos] = useState([]);
    const [moneda, SelectMonedas] = useSelectMonedas("Elige tu moneda", monedas);
    const [criptomoneda, SelectCriptomoneda] = useSelectMonedas("Elige tu criptomoneda", criptos);

    useEffect(() => {
        const consultarApi = async () => {
            const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD";
            const respuesta = await fetch(url);
            const data = await respuesta.json();
            const arrayCriptos = data.Data.map((cripto) => {
                return {
                    id: cripto.CoinInfo.Name,
                    nombre: cripto.CoinInfo.FullName,
                }
            })
            setCriptos(arrayCriptos)
        }
        consultarApi();
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        if ([moneda, criptomoneda].includes("")) {
            setError(true);
            return
        }
        setError(false)
        setMonedas({
            moneda,
            criptomoneda,
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son obligatorios.</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectMonedas />
                <SelectCriptomoneda />
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    )
}

export default Formulario