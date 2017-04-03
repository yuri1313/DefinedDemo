import * as React from 'react';
import 'isomorphic-fetch';
import { ImageCarouselItem } from "./ImageCarouselItem";

export class ImageCarousel extends React.Component<any, void> {
    public render() {
        let content = null;
        let items = this.props.items.map((imageItem) =>
            <ImageCarouselItem key={imageItem.imageId} onItemChange={this.props.onItemChange} currentItem={imageItem} />
        );

        if (items.length > 0) {
            content = (<div>
                <h2>Image Library</h2>
                <div className="inline-list">
                    {items}
                </div>
            </div>);
        }

        return <div>
            {content}
        </div>;
    }
}