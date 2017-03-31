import * as React from 'react';
import 'isomorphic-fetch';

export class ProgressBar extends React.Component<any, void> {

    public render() {
        let innerContent = null;

        if (this.props.isVisible) {
            innerContent = (<div className="progress">
                <div className="progress-bar ourbar" role="progressbar" aria-valuenow={this.props.progress} aria-valuemin="0" aria-valuemax="100">{this.props.progress} %</div>
            </div>);
        }

        return (
            <div>
                {innerContent}
            </div>
        );
    }
}