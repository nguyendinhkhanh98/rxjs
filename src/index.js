import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { FruitDetail } from './FruitDetail';
import { getFruitsNames, getFruit } from './api';
import { useFruitDetail, useFruitDetailRxjs, blockRequest } from './useFruitDetail';
import './styles.css';

function App() {
  const [fruitNames, setFruitNames] = useState([]);
  const [currentFruit, setCurrentFruit] = useState(null);
  const [isCancel, setIsCancel] = useState(false)

  useEffect(() => {
    getFruitsNames().then(setFruitNames);
  }, []);

  // cancel response
  const fruitDetail = useFruitDetailRxjs(currentFruit, isCancel);

  return (
    <>
    {/* promise */}
    <div className="App">
      <h2>No rxjs</h2>
      <div className='flex'>
        <ul className='w-1/2'>
          {fruitNames.map(fruit => (
            <li key={fruit}>
              <button
                onClick={() => {
                  setCurrentFruit(fruit);
                }}
              >
                {fruit}
              </button>
            </li>
          ))}
        </ul>
        <div className='w-1/2'>
        {currentFruit && !isCancel && <FruitDetail {...fruitDetail} />}
        </div>
      </div>
    </div>

    {/* cancel api */}
    <div className="App mt-10">
      <h2>Cancel api</h2>
      <div className='flex'>
        <ul className='w-1/2'>
          {fruitNames.map(fruit => (
            <li key={fruit}>
              <button
                onClick={() => {
                  setIsCancel(true)
                  setCurrentFruit(fruit);
                }}
              >
                {fruit}
              </button>
            </li>
          ))}
        </ul>
        <div className='w-1/2'>
        {currentFruit && isCancel && <FruitDetail {...fruitDetail} />}
        </div>
      </div>
    </div>


    <div className='mt-10'>
      <div >Input cancel api when api preview </div>
      <input className='border border-black' onChange={(e) => { setCurrentFruit(e.target.value) }}/>
    </div>

    <div className='mt-10'>
      <h2>Block after request</h2>
      <button className='mr-10'>Nomal</button>
      <button onClick={() => { blockRequest() }}>Rxjs</button>
    </div>
    </>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
