import { useState } from "react";

export function Button(){
    const [counter, setCounter] = useState(0); //Cria estado passando o valor inicial, [] entre colchetes para desestruturação js, pois está recebendo dois valores, um valor inicial, e uma função para mudá-lo

    function increment(){
        setCounter(counter + 1);
        console.log(counter);
    }
    
    return (
        <button onClick={increment}>{counter}</button> //Caso não haja propriedade retorne string Default
    );
}