import React from 'react'
import './Block.css'

const defaultCurrencies = ['UAH', 'USD', 'EUR']

export const Block = ({ value, currency, onChangeAmount, onChangeCurrency }) => (
  <div className='block'>
    <ul className='currencies'>
      {defaultCurrencies.map((item) => (
        <li
          onClick={() => onChangeCurrency(item)}
          className={currency === item ? 'active' : ''}
          key={item}>
          {item}
        </li>
      ))}
    </ul>
    <input
      onChange={(event) => onChangeAmount(event.target.value)}
      value={value}
      placeholder={0}>
    </input>
  </div>
)