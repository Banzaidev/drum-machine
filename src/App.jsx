import React from "react";
import './App.css'
//The use of Class Component is intended, and used just for educational purposes 
class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      displayName : 'Click one of the buttons'
    }

    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleClick = this.handleClick.bind(this)
    //this.playSound = this.playSound.bind(this) To get all test done 

  }

  componentDidMount(){
    document.addEventListener('keypress', this.handleKeyPress)
    document.addEventListener('keyup',  this.handleKeyUp)
  }
  
  componentWillUnmount(){
    document.removeEventListener('keypress', this.handleKeyPress)
    document.removeEventListener('keyup', this.handleKeyUp)
  }
  
  handleKeyUp(event){
    const keyPressedDrumPad = Object.values(event.target.getElementsByClassName('drum-pad')).filter((drumPad) => drumPad.value == event.key.toUpperCase())[0]    
    if(keyPressedDrumPad != undefined && keyPressedDrumPad.classList.contains('click')){
      keyPressedDrumPad.classList.remove('click')
    }
    

  }

  handleKeyPress(event){
    const keyPressedDrumPad = Object.values(event.target.getElementsByClassName('drum-pad')).filter((drumPad) => drumPad.value == event.key.toUpperCase())[0]
    if(event.key == 'Tab'){
      event.preventDefault()
    }
    if(keyPressedDrumPad != undefined){
      this.playAudioKeyPress(keyPressedDrumPad)
    }
    
    //this.playSound(event.key.toUpperCase()) To get all test done 
  }


  /* 
  //To get all test done 

  playSound = (key)=>{
    const audio = document.getElementById(key)
    const parentButton = audio.parentElement

    const playPromise = audio.play()
    if(playPromise != undefined){
      playPromise.then((_) => {
        audio.currentTime = 0;
        this.setState({displayName: parentButton.id})
        parentButton.classList.add('click')
      }).catch((error) => {
        console.log(error)
      })
    }
    
  } 
  
  */
  
  playAudioKeyPress(keyPressed){
    const audio = new Audio(keyPressed.children[0].src)
    const audioPromise = audio.play()
    if(audioPromise != undefined){
      audioPromise.then((_)=>{
        audio.currentTime = 0;
        keyPressed.classList.add('click')
        this.setState({displayName: keyPressed.id})

      }).catch(error => {
        console.log(`myError: ${error}`)
      })
    }

  } 

  handleClick(event){
    const audio = event.target.children[0]
    audio.currentTime = 0;
    audio.play()
    event.target.blur() // remove the focus
    this.setState({displayName: event.target.id})
    
  }

  render(){
    return(
      <div id='drum-machine' >
        <h1 id='title'>Drum Machine</h1>
        <div id='pads-display'>
          <div id="drum-pads">
            {
              this.props.audio.map(file => {
                return(
                  <button value={file.key} onClick={(e) => this.handleClick(e)} key={file.displayName} id={file.displayName} className="drum-pad">{file.key}<audio preload="auto" src={file.link} className="clip" id={file.key}></audio></button>
                )
              })
            }
          </div>
          <div id='display'>{this.state.displayName}</div>
        </div>
        <h3>by <a href="https://github.com/Banzaidev">banzaidev</a></h3> 
      </div>
    )
  }
}

export default App;