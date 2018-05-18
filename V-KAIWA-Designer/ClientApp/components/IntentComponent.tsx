import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as TagsInput from 'react-tagsinput';
import { Intent } from '../model/DataModels';

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

interface IntentEditState {
   // intent: Intent;
    newResponse: string;
    newEntities: string[];
}

export class IntentComponent extends React.Component<{intent: Intent, updateIntent: (intent: Intent)=> void }, IntentEditState> {

    constructor(props: any) {
        super();
        this.state = { newResponse: '', newEntities: [] };

        this.handleChangeNewResponse.bind(this); // maybe can remove this
        this.handleSubmitNewResponse.bind(this); // maybe can remove this
    }

    handleChangeNewResponse(event: any) {
        this.setState({ newResponse: event.target.value });
    }

    handleSubmitNewResponse(event: any) {
        if (this.state.newResponse && !this.props.intent.responses.some(r => r === this.state.newResponse)) {
            let updatedIntent = { name: this.props.intent.name, responses: [...this.props.intent.responses, this.state.newResponse] };
            console.log(`Adding New Response [${this.state.newResponse}] to Intent [name=${this.props.intent.name}]`);
            this.setState({ newResponse: '' });
            this.props.updateIntent(updatedIntent);
        }
        event.preventDefault();
    }

    handleChangeNewEntities(entities: any) {
        this.setState({ newEntities: entities });
    }

    listResponses() {
        return this.props.intent.responses.map((response) => <li key={response}>{response}</li>);
    }

    render(): JSX.Element {
        return (
            <div className='IntentContainer'>
                <h4>{this.props.intent.name} </h4>
                <p> Required Entities (nouns)
                <TagsInput value={this.state.newEntities} onChange={(e) => this.handleChangeNewEntities(e)} /> </p>
                <p>{this.props.intent.responses.length} Responses</p>
                <form className='form-group' onSubmit={(e) => this.handleSubmitNewResponse(e)}>
                    <label>
                        New Response:
                        <input type="text" value={this.state.newResponse} onChange={(e) => this.handleChangeNewResponse(e)} />
                    </label>
                    <input type="submit" value="Add New Response" />
                </form>

                {this.listResponses()}

            </div>
        );
    }
}
