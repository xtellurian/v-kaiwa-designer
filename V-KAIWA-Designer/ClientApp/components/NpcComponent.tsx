import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { IntentComponent } from './IntentComponent';
import { NPC, Intent, AvailableIntents } from '../model/DataModels';

interface NpcEditState {
    npc: NPC;
    newIntentName: string;
}

export class NpcComponent extends React.Component<{npc: NPC}, NpcEditState> {

    constructor(props: any) {
        super();
        this.state = {npc: props.npc, newIntentName: ''};

        this.handleChangeNewIntentName.bind(this);
        this.handleSubmitNewIntent.bind(this);
    }

    handleChangeNewIntentName(event: any) {
        this.setState({ newIntentName: event.target.value });
    }

    handleSubmitNewIntent(event: any) {
        if (this.state.newIntentName && !this.state.npc.respondsTo.some(r => r.name === this.state.newIntentName)) {
            let intentName = this.state.newIntentName;
            console.log(intentName);
            this.setState(s => ({
                npc: { name: s.npc.name, respondsTo: [...s.npc.respondsTo, { name: intentName, responses: [] }] }
            }));
            this.setState({ newIntentName: '' });
        }
        event.preventDefault();
    }

    listIntents() {
        return this.state.npc.respondsTo.map((i) => <IntentComponent key={i.name} intent={i} />);
    }

    intentList(): JSX.Element {
        let options: JSX.Element[] = AvailableIntents.map((intent) => {
            return <option value={intent}>{intent}</option>;
        });
        return (<select value={this.state.newIntentName} onChange={(e) => this.handleChangeNewIntentName(e)}>
            <option value=''></option>
            {options}
        </select>);
    }

    render(): JSX.Element { 
        return (
            <div className='NpcContainer'>
                <h3>{this.state.npc.name} </h3>
                <p> Number of Intents: {this.state.npc.respondsTo.length}</p>
                <form className='form-group' onSubmit={(e) => this.handleSubmitNewIntent(e)}>
                <label>
                        New intent:
                        {this.intentList()}
                    </label>
                    <input type="submit" value="Add New Intent" />
                </form>

                {this.listIntents()}

            </div>
        );
    }
}
