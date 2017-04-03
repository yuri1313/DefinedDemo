import * as React from 'react';
import 'isomorphic-fetch';

export class ImageCarouselItem extends React.Component<any, void> {

    constructor() {
        super();
        this.onItemChange = this.onItemChange.bind(this);
    }

    private onItemChange() {
        this.props.onItemChange(this.props.currentItem.imageId);
    }

    public render() {
        let imgSrc = "/api/Image/" + this.props.currentItem.imageId + "/Thumbnail";
        let content = null;

        if (this.props.currentItem !== "") {
            content = (<div>
                <img src={imgSrc} onClick={this.onItemChange} />
                <br />
                <div className="item-title">
                    {this.props.currentItem.uploadTimestamp}
                </div>
            </div>);
        }

        return <div className="item-container">
            {content}
        </div>;
    }
}