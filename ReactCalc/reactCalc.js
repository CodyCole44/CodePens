class App extends React.Component{
    render(){
      return(
      <div className="app">
          <Calculator />
      </div>
      )
    }
  }
  
  class Calculator extends React.Component{
      state={
        currentValue: null,
        storedValue: null,
        operator: null,
        outputHistory:""
      }
    
    resetValues = () =>{
      this.setState(() => (
        {currentValue:null,
         storedValue:null,
         outputHistory:""
        }))
    }
    
    recieveOperator = (operator) => {
     (this.state.currentValue === null)
      ?
       this.setState((prevState) => ({
        operator: operator,
        currentValue: prevState.storedValue,
        storedValue: null,
        outputHistory: ` ${String(prevState.outputHistory)}  ${operator}`
      }))
      :
      this.setState((prevState) => ({
        operator: operator,
        outputHistory: ` ${String(prevState.outputHistory)}  ${operator}`
      }))
    } 
    
    recieveStoredNumber = (newVal) =>{
      (this.state.storedValue === null)
        ? this.setState(() => ({
        storedValue:newVal,
        outputHistory:newVal}))
        : this.setState((prevValue)=>({
        storedValue: prevValue.storedValue + newVal,
        outputHistory:  prevValue.outputHistory + newVal
      }))
    }
    
    compute = () => {
      const {operator, currentValue, storedValue} = this.state;
      let newVal = 0;
      
      if(operator == "+") {newVal = Number(currentValue) + Number(storedValue)}
      else if(operator == "-") {newVal = Number(currentValue) - Number(storedValue)}
      else if(operator == "x") {newVal = Number(currentValue) * Number(storedValue)}
      else if(operator == "/") {newVal = Number(currentValue) / Number(storedValue)}
      
      this.setState(() =>({
        currentValue : newVal,
        storedValue : null,
        operator:null
      }))
    }
    
    render(){
      return(
      <div className ="calcualtorContainer">
          <div className="output">
            <Output history = {this.state.outputHistory} selectedNum ={this.state.selectedNum} currentNum ={this.state.currentValue}/>
          </div>
          <div className="buttonRow">
            <NumButton value={"AC"}onSelect={this.resetValues} style="resetButton"/>
            <NumButton value={"/"} onSelect={this.recieveOperator} style="operatorButton" />
            <NumButton value={"x"} onSelect={this.recieveOperator} style="operatorButton" />
            
          </div>
          <div className="buttonRow">
            <NumButton value={7} onSelect={this.recieveStoredNumber} style="numButton" />
            <NumButton value={8} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={9} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={"-"} onSelect={this.recieveOperator} style="operatorButton" />
          </div>
          <div className="buttonRow">
            <NumButton value={4} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={5} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={6} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={"+"} onSelect={this.recieveOperator} style="operatorButton" />
          </div>
          <div className="buttonRow"> 
            <NumButton value={1} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={2} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={3} onSelect={this.recieveStoredNumber} style="numButton"/>
            <NumButton value={"="} onSelect={this.compute} style="equals" />
          </div>
          <div className = "buttonRow">
             <NumButton value={0} onSelect={this.recieveStoredNumber} style="numButton zero"/>
            <NumButton value={"."} onSelect={this.recieveStoredNumber} style="numButton"/>
          </div>
      </div>
      )
    }
  }
  
  function Output({history, selectedNum,currentNum}){
      return(
        <div className="outputContainer">
          <div className="calcHistory">
              {currentNum == null ? "0" : history}
          </div>
          <div className="calculatedValue">
            {currentNum == null ? "0" : currentNum}
          </div>
        </div>
      )
    }
  
  function NumButton({value, onSelect, style}){
      return(
      <div>
          <button className={style} onClick={() => onSelect(String(value))}>{value}</button>
      </div>
      )
    }
  
  
  
  ReactDOM.render(<App />,document.getElementById('root'))