import React, { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './currencyRow';


const BASE_URL = 'https://v6.exchangerate-api.com/v6/d287e331c2fc117f394d2c5e/latest/USD'

function App() {

  const [currencyOption, setCurrencyOption] = useState([])

  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [exchangeRate , setExchangeRate] = useState()
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)

let toAmount , fromAmount 

if(amountInFromCurrency){
  fromAmount=amount
  toAmount=amount * exchangeRate
} else{
  toAmount = amount
  fromAmount = amount / exchangeRate
}

  // console.log(currencyOption)

  useEffect(()=> {

    fetch(BASE_URL) 
    .then((response)=> response.json())
    .then((data) =>{

      const firstCurrency = Object.keys(data.conversion_rates)[1]
        setCurrencyOption([data.base_code,...Object.keys( data.conversion_rates)])

        setFromCurrency(data.base_code)

        setToCurrency(firstCurrency)

        setExchangeRate(data.conversion_rates[firstCurrency])

    })

  }, [])

  useEffect (() => {

    if (fromCurrency != null && toCurrency !=null) {

      fetch(`${BASE_URL}?base_code=${fromCurrency}&symbols=${toCurrency}`)

    .then ((response)=>response.json)
    .then (data =>setExchangeRate(data.conversion_rates[fromCurrency,toCurrency] ))
      
    }

  }, [fromCurrency, toCurrency])

  function handleFromAmountChange (e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handleToAmountChange (e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return (
    <div>
        <h1>Convert</h1>
   <CurrencyRow 
      currencyOption={currencyOption}
      selectCurrency ={fromCurrency}
      onChangecurrency = {e => setFromCurrency(e.target.value)}
      onChangeAmount={handleFromAmountChange}
      amount={fromAmount}
   />

   <div className='equals'>
    =
   </div>

   <CurrencyRow 
    currencyOption={currencyOption}
    selectCurrency ={toCurrency}
    onChangecurrency = {e => setToCurrency(e.target.value)}
    onChangeAmount={handleToAmountChange}
    amount={toAmount}
   />
    </div>
   
  );
}

export default App;
