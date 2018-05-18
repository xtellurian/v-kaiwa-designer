import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as TagsInput from 'react-tagsinput';
import * as Autosuggest from 'react-autosuggest';
import { Intent } from '../model/DataModels';

import 'react-tagsinput/react-tagsinput.css' // If using WebPack and style-loader.

interface IntentEditState {
   // intent: Intent;
    suggestedEntity: string;
    newResponse: string;
   // newEntities: string[];
    availableEntities: string[];
    loading: boolean;
}

interface TagChange {
    newValue: any;
    method: string;
}

function onlyUnique(value:any, index:number, self:any) {
    return self.indexOf(value) === index;
}

export class IntentComponent extends React.Component<{ intent: Intent, updateIntent: (intent: Intent) => void, destroy: () => void }, IntentEditState> {

    constructor(props: any) {
        super();
        this.state = { newResponse: '', availableEntities: [], loading: true, suggestedEntity:'' };

        this.handleChangeNewResponse.bind(this); // maybe can remove this
        this.handleSubmitNewResponse.bind(this); // maybe can remove this

        fetch('api/entity/names')
            .then(response => response.json() as Promise<string[]>)
            .then(data => {
                console.log(`Downloaded ${data.length} Entity Names`);
                this.setState({ availableEntities: data, loading: false });
            });
    }

    handleChangeNewResponse(event: any) {
        this.setState({ newResponse: event.target.value });
    }

    handleSubmitNewResponse(event: any) {
        if (this.state.newResponse && !this.props.intent.responses.some(r => r === this.state.newResponse)) {
            let updatedIntent = {
                name: this.props.intent.name,
                responses: [...this.props.intent.responses, this.state.newResponse], // only update responses
                requiredEntities: this.props.intent.requiredEntities
            };
            console.log(`Adding New Response [${this.state.newResponse}] to Intent [name=${this.props.intent.name}]`);
            this.setState({ newResponse: '' });
            this.props.updateIntent(updatedIntent);
        }
        event.preventDefault();
    }

    handleChangeNewEntities(entities: any) {
        var onlyValidEntities = entities.filter(onlyUnique).filter((entity: string) => {
            return this.state.availableEntities.some(s => s === entity); // only allowed entites
        });
        let updatedIntent = {
            name: this.props.intent.name,
            responses: this.props.intent.responses, // only update responses
            requiredEntities: onlyValidEntities
        };
        this.props.updateIntent(updatedIntent);

     //   this.setState({ newEntities: onlyValidEntities });

    }

    listResponses() {
        return this.props.intent.responses.map((response) => <li key={response}>{response}</li>);
    }

    render(): JSX.Element {
        let options = this.state.availableEntities;
         
        let autosuggestRenderInput = (props:any) => {
            const handleOnChange = (e: any, newValue: any) => {
                if (newValue.method === 'enter') {
                    e.preventDefault()
                } else {
                    props.onChange(e);
                    this.setState({ suggestedEntity: newValue });
                }
            }

            const inputValue = (props.value && props.value.trim().toLowerCase()) || ''
            const inputLength = inputValue.length

            let suggestions = options.filter((o) => {
                return o.toLowerCase().slice(0, inputLength) === inputValue
            })

            let currentVal = this.state.suggestedEntity;

            return (
                <Autosuggest
                    ref={props.ref}
                    getSuggestionValue={(suggestion: any) => suggestion}
                    shouldRenderSuggestions={(value: any) => value && value.trim().length > 0}
                    inputProps={{ ...props, onChange: handleOnChange, currentVal }}
                    onSuggestionsFetchRequested={() => { }}
                    renderSuggestion={(suggestion: any) => <button>{suggestion}</button>}
                    suggestions={suggestions}
                    onSuggestionSelected={(e: any, info: any) => {
                        console.log('suggestion selected: ' + info.suggestion);
                        props.addTag(info.suggestion);
                    }}
                />
            )
        }
        let placeholder = { placeholder: 'Entity Name' };
        return (
            <div className='IntentContainer'>
                <button className='destroy-button' onClick={() => this.props.destroy()}> X </button>
                <h4>{this.props.intent.name} </h4>
                <p> Required Entities (nouns)
                <TagsInput value={this.props.intent.requiredEntities}
                        onChange={(e) => this.handleChangeNewEntities(e)}
                        renderInput={autosuggestRenderInput}
                        inputProps={placeholder} /> </p>
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
