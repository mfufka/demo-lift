import React from 'react';
import './App.css';
import {store} from "./index";

class App extends React.Component {
    constructor() {
        super();
        let evtSource = new EventSource("http://localhost:8080/stream");
        evtSource.onmessage = (event) => {
            let state = {...this.state};
            let data = JSON.parse(event.data);
            state.elevators = state.elevators.map((elevator)=> elevator.id === data.id? data:elevator);
            this.setState(state);
        }
        this.state = {
            building: {},
            elevators: [
                {
                    "floor": 0,
                    "id": "elv0",
                    "state": "stopped"
                },
                {
                    "floor": 0,
                    "id": "elv1",
                    "state": "stopped"
                },
                {
                    "floor": 0,
                    "id": "elv2",
                    "state": "stopped"
                }
            ]
        };
    }

    floors = Array(10).fill(0);

    callLiftToFloor = (floor) => {
        store.dispatch({type: 'CALL_LIFT_REQUESTED', payload: floor});
    }
    renderBuilding = () => {
        return this.floors.map((value, floor) =>
            (
                <div className="panel" key={floor}>
                    <div>lift panel for floor:{floor}</div>
                    <button onClick={() => this.callLiftToFloor(floor)}>Call lift</button>
                </div>
            ));
    }
    renderElevators = () => {
        return this.state.elevators.map((elevator) => (
            <div key={elevator.id} className="elevator">Floor: {elevator.floor}</div>))
    }
    render = () => {
        return (
            <div>

                <div> Elevators:</div>
                <div>
                    {this.renderElevators()}
                </div>
                {
                    this.renderBuilding()
                }
            </div>
        );
    }

}

export default App;
