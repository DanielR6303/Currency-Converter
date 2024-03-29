import React from 'react'

export default function CurrencyRow(props) {

    const {
        currencyOption,
        selectCurrency,
        onChangecurrency,
        onChangeAmount,
        amount
    } = props



  return (
    <div>
        <input type="number"  className='input' value={amount} onChange={onChangeAmount}/>
        <select value={selectCurrency} onChange={onChangecurrency}>

            {currencyOption.map(option=>(<option key={option} value={option}>{option}</option>))}
            
        </select>
    </div>
  )
}
