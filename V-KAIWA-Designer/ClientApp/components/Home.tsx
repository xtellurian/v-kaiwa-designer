import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as ReactMarkdown from 'react-markdown';
import { HomeContent } from '../content/home-content';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div>
            <ReactMarkdown source={HomeContent} />
        </div>;
    }
}
