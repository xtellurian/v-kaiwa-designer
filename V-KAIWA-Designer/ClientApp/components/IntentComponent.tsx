import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Intent } from '../model/DataModels';

interface IntentEditState {
   // intent: Intent;
    newResponse: string;
}

export class IntentComponent extends React.Component<{intent: Intent, updateIntent: (intent: Intent)=> void }, IntentEditState> {

    constructor(props: any) {
        super();
        this.state = {newResponse: ''};

        this.handleChangeNewResponse.bind(this);
        this.handleSubmitNewResponse.bind(this);
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

    listResponses() {
        return this.props.intent.responses.map((response) => <li key={response}>{response}</li>);
    }

    render(): JSX.Element {
        return (
            <div className='IntentContainer'>
                <h4>{this.props.intent.name} </h4>
                <p>{this.props.intent.responses.length} Responses</p>
                <form className='form-group' onSubmit={(e) => this.handleSubmitNewResponse(e)}>
                <label>
                        New Response:
                <input type="text" value={this.state.newResponse} onChange={(e) => this.handleChangeNewResponse(e)} />
                    </label>
                    <input placeholder='hello' type="submit" value="Add New Response" />
                </form>

                {this.listResponses()}

            </div>
        );
    }
}
