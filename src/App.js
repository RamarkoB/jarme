import './App.css';
import { state } from './main';
window.state = state;

function App() {
    return <div className="row">
    <div className="col-4 side">
      {
        state.regs.slice(1, 33).map((d,i) => <Card key={i} regNum={i + 1} regVal={d}/>)
      }
    </div>
    <div className="col-8"></div>
  </div>

}

function Card(props) {
  return <div className="card">
          <div className="card-top">x{props.regNum}</div>
          <div className="card-bottom">{props.regVal}</div>
        </div>
}

export default App;
