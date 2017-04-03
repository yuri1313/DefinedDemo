import * as React from 'react';
import 'isomorphic-fetch';
import { UploaderControl } from './Controls/UploaderControl';
import { ImageUploadResult } from "./Promises/UploaderPromises";
import { ViewerControl } from "./Controls/ViewerControl";
import { ImageCarousel } from "./Controls/ImageCarousel";
import { ImageCarouselItem } from "./Controls/ImageCarouselItem";

interface UploaderState {
    currentItemId: string;
    items: ImageUploadResult[];
}

export class Uploader extends React.Component<any, UploaderState> {

    constructor() {
        super();

        this.state = {
            currentItemId: "",
            items: []
        };

        this.handleNewUpload = this.handleNewUpload.bind(this);
        this.handleItemSelection = this.handleItemSelection.bind(this);
    }

    private handleNewUpload(item: ImageUploadResult) {
        this.setState((prevState) => {
            return {
                currentItemId: item.imageId,
                items: prevState.items.concat(item)
            }
        });
    }

    private handleItemSelection(itemId: string) {
        this.setState((prevState) => {
            return {
                currentItemId: itemId,
                items: prevState.items
            }
        });
    }

    public render() {
        return <div>
            <h1>Uploader</h1>
            <p>Upload new images</p>
            <UploaderControl onNewItem={this.handleNewUpload} />
            <ViewerControl currentItem={this.state.currentItemId} />
            <ImageCarousel items={this.state.items} onItemChange={this.handleItemSelection} />
        </div>;
    }
}