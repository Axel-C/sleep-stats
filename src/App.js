import React , {useState} from 'react';
import './App.css';
import LineChart from './LineChart';
import MixedChart from './MixedChart';

function generateRandomData(size){
  return Array(size).fill().map(() => Math.round(Math.random() * 40))
}

function App() {
  let [start , setStart] = useState(0);
  let [zoomLevel , setZoomLevel] = useState(1);
  let [mixed , setMixed] = useState(0);
  let [data , setData] = useState(null);

  fetch("http://localhost:3001/data").then(function(response){
    response.json().then(function(data){
      setData(data)
    })
  })

  let handleKeyPress = (event) => {
    if(event.key === '+' && zoomLevel < 6){
      setZoomLevel(zoomLevel + 1) 
    }else if(event.key === '-' && zoomLevel > 1){
      setZoomLevel(zoomLevel - 1)
    }else if(event.key === 'ArrowRight'){
      setStart(start + zoomLevel * 30)
    }else if(event.key === 'ArrowLeft'){
      setStart(start - zoomLevel * 30)
    }
  }

  let charts ;
  if(data == null){
    charts = <div>Loading ...</div>
  }
  else if(mixed === 0){
    charts = <div id="charts" key={start + zoomLevel} >
    <LineChart start={start} data={data[0].slice(start , start + zoomLevel * 30)} color="red"></LineChart>
<LineChart start={start} data={data[1].slice(start , start + zoomLevel * 30)} color="blue"></LineChart>
<LineChart start={start} data={data[2].slice(start , start + zoomLevel * 30)} color="orange"></LineChart></div>
  }else{
    charts = <div key={start + zoomLevel}><MixedChart start={start} data={[data[0].slice(start , start + zoomLevel * 30) , data[1].slice(start , start + zoomLevel * 30) , data[2].slice(start , start + zoomLevel * 30)] } color="orange"></MixedChart></div>
  }

  return (
    <div  tabIndex="0" className="App" onKeyDown={(e) => handleKeyPress(e)}  >
      <header ><h1>Sleep statistics</h1> <div id="controls" > 
      <label htmlFor="time" >Time : </label> <input name="time" type="range" min="0" max="6000" step="30" value={start} className="slider" onChange={(u) => setStart(parseInt(u.target.value))}/>
      <label htmlFor="zoom" >Zoom : </label> <input name="zoom" type="range" min="1" max="6" value={zoomLevel} className="slider" onChange={(e) => setZoomLevel(e.target.value)}/>

      
 <select value={mixed} onChange={(e) => setMixed(parseInt(e.target.value))}>
   <option value="0">Split</option>
   <option value="1">Mix</option>
   </select></div> </header>
      {charts}
    </div>
  );
}

export default App;
