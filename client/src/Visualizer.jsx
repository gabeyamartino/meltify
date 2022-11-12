import React, {useState, useEffect} from 'react';

const Visualizer = () => {

  const [val, setVal] = useState(15);

  return (
    <div>
          <div id="mainWrapper">
      <div id="root"></div>
      <div id="audioSelectWrapper">
        <div id="localFileBut">
          <span>Load local files</span>
        </div>
        <div id="micSelect">
          <span>Use Mic</span>
        </div>
      </div>
      <div id="presetControls">
        <div>Preset: <select id="presetSelect"></select></div>
        <div>Cycle: <input type="checkbox" id="presetCycle"  ></input>
                    <input onChange={()=>{}} type="number" id="presetCycleLength" step="1" value="10" min="1"></input></div>
        <div>Random: <input type="checkbox" id="presetRandom" ></input></div>
      </div>
      <canvas id='canvas' width='800' height='600'>
      </canvas>
    </div>
    </div>
  )
}

export default Visualizer;