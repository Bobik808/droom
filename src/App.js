import './style/App.scss';
import { Drums } from './drums'
import * as Tone from 'tone';
Tone.Transport.bpm.value = 120;
Tone.Transport.swing = 0.08;
let count = 0;
let drumLoop;

function App () {

  function playPause () {
    if (Tone.Transport.state === 'stopped') {
      Tone.Transport.toggle();
      Tone.Transport.scheduleRepeat( nextStep , '16n');
      Tone.start();
    } else {
      Tone.Transport.stop();
      Tone.Transport.cancel();
      count = 0;
    }
  }

  function nextStep (time) {
    drumLoop(time, count);
    count = (count + 1) % 16;
    console.log('count', count);
  }

  function setDrumLoop (cb) {
    drumLoop = cb;
  }

  return (
    <div>
      <button id="playPause" onClick={() => playPause()}>PLAY PATTERN</button>
      <Drums passUpLoop={setDrumLoop} />
    </div>
  );
}

export default App;