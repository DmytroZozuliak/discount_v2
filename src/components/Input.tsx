import React from 'react'
import { Products } from '../App'

interface Props {
  name: string;
  // name: keyof Products;
  products: Products;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({ products, changeHandler, name }: Props) => {
  return (
    <input className='w-24 p-1 outline-none' type="number" placeholder={name + "..."}
      value={products[name as keyof Products]}
      name={name}
      onChange={changeHandler}
    />
  )
}

export default Input
