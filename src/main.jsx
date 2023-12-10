
import { render } from 'react-dom'
import App from './App.jsx'
import AUDIO_FILES from './audioObj.js'

render(<App audio={AUDIO_FILES}></App>, document.getElementById('root'))
