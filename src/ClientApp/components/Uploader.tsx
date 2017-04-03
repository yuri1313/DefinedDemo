import * as React from 'react';
import 'isomorphic-fetch';
import { UploaderControl } from './Controls/UploaderControl';

export class Uploader extends React.Component<any, void> {
        public render() {
        
        return <div>
            <h1>Uploader</h1>
            <p>Upload new images</p>
            <UploaderControl />
            // TODO: add viewer and caroussel (With state) - use redux for this
        </div>;
    }
}