import * as React from 'react';
import 'isomorphic-fetch';

export class ProgressBar extends React.Component<any, void> {

    public render() {
        let innerContent = null;

        let styleProgress = {
            width: this.props.progress + "%",
            minWidth: "2em"
        };

        if (this.props.isVisible) {
            innerContent = (<div className="progress">
                <div className="progress-bar" role="progressbar" style={styleProgress} aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100">{this.props.progress} %</div>
            </div>);
        }

        return (
            <div>
                <br />
                {innerContent}
            </div>
        );
    }
}