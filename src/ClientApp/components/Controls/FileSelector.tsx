import * as React from 'react';
import 'isomorphic-fetch';

interface IFileSelectorState {
    fileName: string;
}

export class FileSelector extends React.Component<any, IFileSelectorState> {
    constructor() {
        super();
        this.state = { fileName: "" };
        this.onChange = this.onChange.bind(this);
    }

    private onChange(e) {
        e.preventDefault();
        let fileName = e.target.value.split('\\').pop().split('/').pop();
        
        this.props.onChange(e);
        this.setState({
            fileName: fileName
        });
    }

    public render() {
        return (
            <div className="input-group">
                <label className="input-group-btn">
                    <span className="btn btn-primary">
                        Browse&hellip; <input className="nodisplay" type="file" disabled={this.props.isUploading} onChange={this.onChange} />
                    </span>
                </label>
                <input type="text" className="form-control" readOnly={true} value={this.state.fileName} />
            </div>
        );
    }
}