import React from 'react';
import ModalComponent from './components/ModalComponent'
import './App.css';

function App() {
  return (
    <div className="App">
      <ModalComponent
        beforeClose={() => console.log("Before Close function")}
        renderTrigger={(open, close) => <button onClick={open}>Open Modal</button>}>
        <div>
          <ul>
            <ol>Children usage</ol>
            <ol>Children usage</ol>
            <ol>Children usage</ol>
          </ul>
        </div>
      </ModalComponent>

      <ModalComponent
        renderTrigger={(open, close) => <button onClick={open}>Open Modal</button>}>
        {(props, close) => (
          <div>Function Usage</div>  
        )}
      </ModalComponent>
    </div>
  );
}

export default App;


export const Some = () => <div>SSSS</div>