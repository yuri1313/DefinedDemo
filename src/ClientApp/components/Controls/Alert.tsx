import * as React from 'react';
import 'isomorphic-fetch';

export class Alert extends React.Component<any, void> {
    
    public render() {
        var alertType = this.props.isError ? "alert alert-danger" : "alert alert-success";

        let innerContent = null;

        if (this.props.isVisible) {
            innerContent = (<div className={alertType}>
                {this.props.children}
            </div>);
        }
        
        return (
            <div>
                {innerContent}
            </div>
        );
    }
}