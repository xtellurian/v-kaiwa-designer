import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IntentComponent } from './IntentComponent';
import { NPC, Intent } from '../model/DataModels';

interface NpcEditState {
    newIntentName: string;
    intents: string[];
    loading: boolean;
}

export class NpcComponent extends React.Component<{npc: NPC, updateNpc: (npc:NPC) => void, destroy: ()=>void}, NpcEditState> {

    constructor(props: any) {
        super();
        this.state = { newIntentName: '', intents: [], loading: true};
        this.handleChangeNewIntentName.bind(this);
        this.handleSubmitNewIntent.bind(this);
        this.handleChildIntentUpdated.bind(this);
        fetch(`api/intent/names/${props.npc.name}`)
            .then(response => response.json() as Promise<string[]>)
            .then(data => {
                this.setState({ intents: data, loading: false });
            });
    }

    handleChangeNewIntentName(event: any) {
        this.setState({ newIntentName: event.target.value });
    }

    handleSubmitNewIntent(event: any) {
        if (this.state.newIntentName && !this.props.npc.respondsTo.some(r => r.name === this.state.newIntentName)) {
            console.log(`Adding Intent [${this.state.newIntentName}] to NPC [${this.props.npc.name}]`);
            let intentName = this.state.newIntentName;
            this.setState({ newIntentName: '' });
            let newNpc = this.props.npc;
            newNpc.respondsTo = [...this.props.npc.respondsTo, { name: intentName, responses: [] }];
        }
        event.preventDefault();
    }

    handleChildIntentUpdated(updatedIntent: Intent) {
        if (this.props.npc.respondsTo.some(x => x.name === updatedIntent.name)) {
            // the intent already exists in our list of intents
            // this.state.npc.respondsTo.
            let pos = this.props.npc.respondsTo.map((e) => e.name).indexOf(updatedIntent.name); // get pos of intent in array
            if (pos > -1) {
                let newNpc = this.props.npc;
                newNpc.respondsTo[pos] = updatedIntent;
                this.setState(s => ({ npc: newNpc }));
            }
        }
    }

    listIntents() {
        let intents = this.props.npc.respondsTo;
        return intents.map((i) => <IntentComponent key={i.name} intent={i} updateIntent={
            (updatedIntent) => this.handleChildIntentUpdated(updatedIntent)}
        />);
    }

    availableIntents(): JSX.Element {
        let options: JSX.Element[] = this.state.intents.map((intent) => {
            return <option key={intent} value={intent}>{intent}</option>;
        });
        return (<select value={this.state.newIntentName} onChange={(e) => this.handleChangeNewIntentName(e)}>
            <option key='' value=''></option>
            {options}
        </select>);
    }

    render(): JSX.Element { 
        return (
            <div className='NpcContainer'>
                <button className='destroy-button' onClick={() => this.props.destroy()}> X </button>
                <h3>{this.props.npc.name}</h3> 
                <p>{this.props.npc.respondsTo.length} Intents</p>
                <form className='form-group' onSubmit={(e) => this.handleSubmitNewIntent(e)}>
                <label>
                        New intent:
                        {this.availableIntents()}
                    </label>
                    <input type="submit" value="Add New Intent" />
                </form>

                {this.listIntents()}
                
            </div>
        );
    }
}
