import React, { useState } from 'react';
import './App.css';

var MAX_SIZE = 3;

// Map data structure
// The Map object holds key-value pairs and remembers the original insertion order of the keys.
//  Any value (both objects and primitive values) may be used as either a key or a value.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map

function App() {
  const [key, setKey]= useState('');
  const [value, setValue]= useState('');
  const [myMap, setMyMap] = useState(new Map([['1','one'],['2', 'two'], ['3', 'three']]));
  const [keyToGet, setKeytToGet]= useState('');
  const [valueToGet, setValueToGet]= useState('');
  function renderMapValue(myMap) {
    let mapToArray = Array.from(myMap.keys());
    debugger;
    return (
      <ul>
          <li>Key --- Value</li>
          {mapToArray.map((key, idx) => <li key={idx}>{key} ---- {myMap.get(key)}</li>)}
      </ul>
    );
  }
  function put(key, value) {
    const updatedMap = new Map(myMap);
    if(updatedMap.has(key)){
      updatedMap.delete(key);
    }
    if(updatedMap.size === MAX_SIZE) {
      const firstKey =  Array.from(myMap.keys())[0];
      updatedMap.delete(firstKey);
    }
    updatedMap.set(key, value);
    
    setMyMap(updatedMap);
  }
  
  function get(key) {
    const updatedMap = new Map(myMap);
    const mapValue = updatedMap.get(key);
    if(updatedMap.has(key)){
      updatedMap.delete(key);
      updatedMap.set(key, mapValue)
      setMyMap(updatedMap);
    }
    setValueToGet(mapValue);
    return mapValue;
  }
  return (
    <div className="App">
      <div>
        <h2 style={{textAlign: 'center'}}>LRU Cache System</h2>
      </div>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'row' }}>
      <div className="Input-form">
        <div className="Form-group">
          <label >
            Key
          </label>
          <input type="text" value={key} onChange={(event) => setKey(event.target.value)} />
        </div>
        <div className="Form-group">
          <label  style={{width: 100, textAlign: 'right',  paddingRight: 10}}>
            Value
          </label>
          <input type="text" value={value} onChange={(event) => setValue(event.target.value)} />     
        </div>
        <div className="Action-btn">
          <button  onClick={() => { put(key, value);}}> Put</button>
        </div>
        <div className="Form-group">
          <label >
            Fill out Key to get value
          </label>
          <input type="text" value={keyToGet} onChange={(event) => setKeytToGet(event.target.value)} />
        </div>
        {
          valueToGet &&  <div className="Form-group">
          <label>
              value of key {keyToGet} :
          </label>
          <label> {valueToGet}</label>
         </div>
        }
       
        <div className="Action-btn">
          <button onClick={() => { get(keyToGet);}}> Get</button>
        </div>
      </div>
      <div className="List-value">
        <p> Max size: 3</p>
        <p> Current list values</p>
        {renderMapValue(myMap)}
      </div>

      </div>
    </div>
  );
}

export default App;
