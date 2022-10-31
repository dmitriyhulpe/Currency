import React, { useEffect, useRef, useState } from 'react'
import { Block } from './components/Block';

const App = () => {
  const [fromCurrency, setFromCurrency] = useState('UAH')
  const [intoCurrency, setIntoCurrency] = useState('USD')
  const [fromAmount, setFromAmount] = useState('0')
  const [intoAmount, setIntoAmount] = useState('0')
  const ratesRef = useRef({})

  useEffect(() => {
    fetch('https://cdn.cur.su/api/latest.json')
    .then((res) => res.json())
    .then((json) => {
      ratesRef.current = json.rates
      onChangeIntoAmount('0')
    })
    .catch((error) => {
      console.warn(error)
    })
  }, [])

  const onChangeFromAmount = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[intoCurrency]
    setIntoAmount(result.toFixed(3))
    setFromAmount(value)
  }

  const onChangeIntoAmount = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[intoCurrency]) * value
    setFromAmount(result.toFixed(3))
    setIntoAmount(value)
  }

  useEffect(() => {
    onChangeFromAmount(fromAmount)
  }, [fromCurrency])

  useEffect(() => {
    onChangeIntoAmount(intoAmount)
  }, [intoCurrency])

  return (
    <div className='App'>
      <Block value={fromAmount} currency={fromCurrency} onChangeCurrency={setFromCurrency} onChangeAmount={onChangeFromAmount}></Block>
      <Block value={intoAmount} currency={intoCurrency} onChangeCurrency={setIntoCurrency} onChangeAmount={onChangeIntoAmount}></Block>
    </div>
  )
}

export default App
