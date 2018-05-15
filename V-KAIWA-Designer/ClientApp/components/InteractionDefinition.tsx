import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { NpcComponent } from './NpcComponent';
import { NPC, Intent, AvailableNpcs } from '../model/DataModels';

interface InteractionDefinitionState {
    npcList: NPC[];
    newNpcName: string;
}

export class InteractionDefinition extends React.Component<RouteComponentProps<{}>, InteractionDefinitionState> {

    constructor() {
        super();
        this.state = { npcList: [], newNpcName: '' };

        this.handleChangeNewNpcName.bind(this);
        this.handleSubmitNewNpc.bind(this);
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

    listItems() {
        return this.state.npcList.map((n) => <NpcComponent key={n.name} npc={n} />);
    }

    npcList(): JSX.Element {
        let options: JSX.Element[] = AvailableNpcs.map((npc) => {
            return <option value={npc}>{npc}</option>;
        });
        return (<select value={this.state.newNpcName} onChange={(e) => this.handleChangeNewNpcName(e)}>
            <option value=''></option>
            {options}
        </select>);
    }

    render() {
        return (
            <div className='InteractionContainer'>
                <h2> V-KAIWA Interaction Definition</h2>
                <p> Choose an NPC, pick which intents it responds to, and write responses for those intents.</p>
            <form onSubmit={(e) => this.handleSubmitNewNpc(e)}>
                <label>
                        NPC:
                {this.npcList()}
                </label>
                <input type="submit" value="Add NPC" />
                </form>
                
                {this.listItems()}

            </div>
        );
    }
}
