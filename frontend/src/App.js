import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  
  function reformat(obj){
    if(! (typeof obj === 'object' && obj !== null ) ){
      return obj
    }
    const keys = Object.keys(obj);
    var output ='{'
    for(var i = 0;i<keys.length;i++){
      output+= '\n\n\t\t'
      output += keys[i] + ' : '
      output += reformat(obj[keys[i]])
      output += ','
    }
    if(output.length > 1){
      output = output.slice(0,output.length-1)
    }
    output+= '\n\n\t\t}'
    return output
  }

  
  const backendUrl = 'http://localhost:8080/check-info/'
  const [bin,setBin ] = useState('');
  const [info,setInfo] = useState('');
  const getCardinfo = async () =>{
    const data = {
      visa : bin
    }
    
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const cardinfo = await response.json();
    setInfo(reformat(cardinfo));
  }
  
  return (
    <div className="App">
      <div className='row'>
        <input val={bin} onChange={(e)=>setBin(e.target.value)} type='text' placeholder="Enter the bin number" />
        <button onClick={getCardinfo}>get card info</button>
      </div>
      <p className='display'>
        {info}
      </p>
    </div>
  );
}

export default App;
