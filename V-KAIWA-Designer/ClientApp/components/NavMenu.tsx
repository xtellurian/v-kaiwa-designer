import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {version: string}> {

    constructor() {
        super();

        this.state ={ version: '...' };

        fetch('api/version')
            .then(response => response.text() as Promise<string>)
            .then(data => {
                this.setState({ version: data });
            });
    }

    public render() {
        console.log(this.state);
        let version =  this.state.version;
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>V-KAIWA Designer</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={'/interactiondefinition'} activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Conversation Designer
                            </NavLink>
                        </li>
                    </ul>
                    <div className='version-info'>
                        <p>V:{version}</p>
                    </div>
                </div>
            </div>
        </div>;
    }
}
