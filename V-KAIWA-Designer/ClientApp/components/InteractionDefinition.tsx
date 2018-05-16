import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NpcComponent } from './NpcComponent';
import { NPC, Intent } from '../model/DataModels';

interface InteractionDefinitionState {
    npcList: NPC[];
    newNpcName: string;
    npcNames: string[];
    loading: boolean;
}

export class InteractionDefinition extends React.Component<RouteComponentProps<{}>, InteractionDefinitionState> {

    constructor() {
        super();
        this.state = { npcList: [], newNpcName: '', loading: true, npcNames: []};

        this.handleChangeNewNpcName.bind(this);
        this.handleSubmitNewNpc.bind(this);

        fetch('api/npc/names')
            .then(response => response.json() as Promise<string[]>)
            .then(data => {
                console.log(`Downloaded ${data.length} NPC Names`);
                this.setState({ npcNames: data, loading: false });
            });
    }

    handleChangeNewNpcName(event: any) {
        this.setState({ newNpcName: event.target.value });
    }

    handleSubmitNewNpc(event: any) {
        if (this.state.newNpcName && !this.state.npcList.some(npc => npc.name === this.state.newNpcName)) {
            let newNpc: NPC = { name: this.state.newNpcName, respondsTo: [] };

            this.setState(s => ({
                npcList: [...s.npcList, newNpc]
            }));
            this.setState({ newNpcName: '' });
        }
        event.preventDefault();
    }

    downloadDataAsJson() {
        var data = new Blob([JSON.stringify({ npcs: this.state.npcList })], { type: 'application/json' });
        var csvURL = window.URL.createObjectURL(data);

        let tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'conversation-definition.json');
        tempLink.click();
    }

    listItems() {
        return this.state.npcList.map((n) => <NpcComponent key={n.name} npc={n} updateNpc={
            (newNpc) => this.setState(s => ({ npcList: [...s.npcList, newNpc] }))
        } />);
    }

    npcList(): JSX.Element {
        let options: JSX.Element[] = this.state.npcNames.map((npc) => {
            return <option key={npc} value={npc}>{npc}</option>;
        });
        return (<select value={this.state.newNpcName} onChange={(e) => this.handleChangeNewNpcName(e)}>
            <option key='' value=''></option>
            {options}
        </select>);
    }

    render() {
        return (
            <div className='InteractionContainer'>
                <h2> V-KAIWA Interaction Definition</h2>
                <p> Choose an NPC, pick which intents it responds to, and write responses for those intents.</p>
                <form className='form-style' onSubmit={(e) => this.handleSubmitNewNpc(e)}>
                    <label>
                        NPC:
                        {this.npcList()}
                    </label>
                <input type="submit" value="Add NPC" />
                </form>
                
                {this.listItems()}
                <button onClick={() => this.downloadDataAsJson()}> Download as JSON </button>
                <br/>
            </div>
        );
    }
}
