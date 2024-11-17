import { useState } from 'react'
import useCurrencyInfo from './hooks/useCurrenyInfo';
import Inputbox from './components/Inputbox.jsx';
//https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('usd');
  const [to, setTo] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currenyInfo = useCurrencyInfo(from)
  const options = Object.keys(currenyInfo)

  const convert = () => {
    setConvertedAmount(amount * currenyInfo[to])
  }

  const swap = () => {
    setFrom(to)
    setTo(from)
    setConvertedAmount(amount)
    setAmount(convertedAmount)
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center bg-cover bg-no-repeat' 
          style={{backgroundImage: 'url("https://images.pexels.com/photos/210574/pexels-photo-210574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', 
          backgroundPosition: 'center' }}>

        <div className='w-full'>
            <div className='w-full max-w-md mx-auto border border-gray-600 rounded-lg p-5 backdrop-blur-sm bg-white/30'>
              <form onSubmit={(e) => {
                e.preventDefault()
                convert()
              }}>
                  <div className='w-full mb-1'>
                      <Inputbox 
                        label={from.toUpperCase()}
                        amount={amount}
                        currencyOptions={options}
                        onCurrencyChange={(curreny) => setFrom(curreny)}
                        onAmountChange={(amount) => setAmount(amount)}
                        selectedCurrency={from}

                      />
                  </div>

                  <div className='relative w-full h-0.5'>
                      <button
                      type="button"
                      className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-lg'
                      onClick={swap}
                      >
                        swap
                      </button>
                  </div>

                  <div className='w-full mb-1'>
                      <Inputbox 
                        label={to.toUpperCase()}
                        amount={convertedAmount}
                        currencyOptions={options}
                        amountDisabled={true}

                        onCurrencyChange={(curreny) => setTo(curreny)}
                        onAmountChange={(amount) => setAmount(amount)}
                        selectedCurrency={to}

                      />
                  </div>

                  <div className='w-full text-center'>
                      <button 
                        type='submit'
                      className='bg-black text-white w-full rounded-lg px-4 py-3 '>
                        Convert
                      </button>
                  </div>
              </form>
            </div>
        </div>
      
    </div>
  )
}

export default App
