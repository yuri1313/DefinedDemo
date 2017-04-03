import * as React from 'react';
import 'isomorphic-fetch';

export class ViewerControl extends React.Component<any, void> {
    public render() {
        let imgSrc = "/api/Image/" + this.props.currentItem;
        let content = null;

        if (this.props.currentItem !== "") {
            content = (<div>
                    <h2>Current Image</h2>
                    <img src={imgSrc} />
                </div>);
        }

        return <div>
            {content}
        </div>;
    }
}