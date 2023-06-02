import './App.css';

function App() {
    return <div className="row">
    <div className="col-4">
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
    <div className="col-8"></div>
  </div>

}

function Card() {
  return <div className="card">
          <div className="card-top">x1</div>
          <div className="card-bottom">0</div>
        </div>
}

export default App;
