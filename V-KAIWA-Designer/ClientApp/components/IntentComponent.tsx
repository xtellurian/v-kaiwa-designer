import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Intent } from '../model/DataModels';

interface IntentEditState {
    intent: Intent;
    newResponse: string;
}

export class IntentComponent extends React.Component<{intent: Intent}, IntentEditState> {

    constructor(props: any) {
        super();
        this.state = {intent: props.intent, newResponse: ''};

        this.handleChangeNewResponse.bind(this);
        this.handleSubmitNewResponse.bind(this);
    }

    handleChangeNewResponse(event: any) {
        this.setState({ newResponse: event.target.value });
    }

    handleSubmitNewResponse(event: any) {
        if (this.state.newResponse && !this.state.intent.responses.some(r => r === this.state.newResponse)) {
            let intentName = this.state.newResponse;
            console.log(intentName);
            this.setState(s => ({
                intent: { name: s.intent.name, responses: [...s.intent.responses, this.state.newResponse] }
            }));
            this.setState({ newResponse: '' });
        }
        event.preventDefault();
    }

    listResponses() {
        return this.state.intent.responses.map((response) => <li key={response} >{response}</li>);
    }

    render(): JSX.Element {
        return (
            <div className='IntentContainer'>
                <h4>{this.state.intent.name} </h4>
                <p> Number of Responses: {this.state.intent.responses.length}</p>
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
