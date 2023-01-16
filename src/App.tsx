import React, { useState } from 'react';
import Input from './components/Input';

export interface Products {
  price1: string;
  weight1: string;
  price2: string;
  weight2: string;
  price3: string;
  weight3: string;
  price4: string;
  weight4: string;
}

const initialState: Products = {
  price1: "",
  weight1: "",
  price2: "",
  weight2: "",
  price3: "",
  weight3: "",
  price4: "",
  weight4: "",
}

const keysOfState = Object.keys(initialState)
const totalSize = keysOfState.length / 2

function App() {
  const [products, setProducts] = useState<Products>(initialState)
  const [bestPrices, setBestPrices] = useState<number[] | null>(null)
  const [bestProduct, setBestProduct] = useState<number | null>(null)

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const name = e.target.name
    setProducts(prevState => ({ ...prevState, [name]: value }))
  }

  const resetHandler = () => {
    setProducts(initialState)
    setBestPrices(null)
    setBestProduct(null)
  }

  const countBest = () => {
    const bestPricesResult: number[] = []
    new Array(totalSize).fill(null).forEach((_product, index) => {
      const productPrice = +products[`price${index + 1}` as keyof Products]
      const productWeight = +products[`weight${index + 1}` as keyof Products]
      const countedPrice = productPrice / productWeight * 1000

      bestPricesResult.push(+countedPrice.toFixed(2))
    })

    setBestPrices(bestPricesResult)

    console.log({ bestPricesResult });

    const minPrice = Math.min.apply(null, bestPricesResult.filter(num => !Number.isNaN(num) && num > 0))
    console.log({ minPrice });

    const indexOfMinPrice = bestPricesResult.indexOf(minPrice) + 1
    console.log({ indexOfMinPrice });

    setBestProduct(indexOfMinPrice)
  }

  console.log("bestProduct", bestProduct);


  return (
    <div className="bg-neutral-500 min-h-screen flex flex-col pt-5 items-center gap-2">
      {/* <h1 className="text-3xl">
        Discount!
      </h1> */}

      {new Array(totalSize).fill(null).map((_product, index) => (
        <section key={index}>
          <p className=''>Product {index + 1}</p>
          <div className="flex gap-2">
            <div className="flex gap-1 items-center">
              <Input name={`weight${index + 1}`} changeHandler={changeHandler} products={products} />
              <span>g</span>
            </div>
            <div className="flex gap-1 items-center">
              <Input name={`price${index + 1}`} changeHandler={changeHandler} products={products} />
              <span>hrn</span>
            </div>
          </div>
        </section>
      ))}
      <section className='flex gap-3 my-4'>
        <button className='bg-green-400 px-2' onClick={countBest}>Count</button>
        <button className='bg-rose-400 px-2' onClick={resetHandler}>Reset</button>
      </section>
      <section>
        {bestPrices && bestPrices.map((price, i) => (
          <div key={i}>
            <span>{i + 1}. {!Number.isNaN(price) ? price : "-"}</span>
          </div>
        ))}
      </section>
      {bestProduct !== null && bestProduct > 0 &&
        <section>
          <p className='text-green-500'>Best price of the product #{bestProduct}</p>
        </section>
      }
    </div>
  );
}

export default App;
