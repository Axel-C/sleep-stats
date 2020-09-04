import React , {useState} from 'react';
import './App.css';
import LineChart from './LineChart';
import MixedChart from './MixedChart';

function generateRandomData(size){
  return Array(size).fill().map(() => Math.round(Math.random() * 40))
}

let eeg = generateRandomData(6000);
let o2Saturation = generateRandomData(6000);
let data3 = generateRandomData(6000);



function App() {
  let [start , setStart] = useState(0);
  let [zoomLevel , setZoomLevel] = useState(1);
  let [mixed , setMixed] = useState(0);

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
  if(mixed === 0){
    charts = <div id="charts" key={start + zoomLevel} >
    <LineChart start={start} data={eeg.slice(start , start + zoomLevel * 30)} color="red"></LineChart>
<LineChart start={start} data={o2Saturation.slice(start , start + zoomLevel * 30)} color="blue"></LineChart>
<LineChart start={start} data={data3.slice(start , start + zoomLevel * 30)} color="orange"></LineChart></div>
  }else{
    charts = <div key={start + zoomLevel}><MixedChart start={start} data={[eeg.slice(start , start + zoomLevel * 30) , o2Saturation.slice(start , start + zoomLevel * 30) , data3.slice(start , start + zoomLevel * 30)] } color="orange"></MixedChart></div>
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
