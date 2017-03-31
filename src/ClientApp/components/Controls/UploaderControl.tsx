import * as React from 'react';
import 'isomorphic-fetch';
import axios from 'axios';
import { Alert } from './Alert';
import { ProgressBar } from './ProgressBar';
import { FileSelector } from "./FileSelector";

interface UploaderControlState {
    alertMessage: string;
    hasMessage: boolean;
    hasError: boolean;
    isUploading: boolean;
    uploadProgress: number;
    hasValidFile: boolean;
    file: Blob;
}

export class UploaderControl extends React.Component<any, UploaderControlState> {

    constructor() {
        super();
        this.state = {
            hasMessage: false,
            hasError: false,
            alertMessage: "",
            isUploading: false,
            uploadProgress: 0,
            hasValidFile: false,
            file: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    private handleSubmit(e) {
        e.preventDefault();

        this.setState((prevState) => {
            return {
                isUploading: true,
                uploadProgress: prevState.uploadProgress,
                hasValidFile: prevState.hasValidFile,
                file: prevState.file,
                hasMessage: false,
                hasError: false,
                alertMessage: null
            }
        });
        
        let reader = new FileReader();
        reader.onloadend = () => {
            //axios.
            //reader.result
            // TODO: start upload. on success/error process alert stuff
            ////this.setState((prevState) => {
            ////    return {
            ////        isUploading: false,
            ////        uploadProgress: 100,
            ////        hasValidFile: prevState.hasValidFile,
            ////        file: prevState.file,
            ////        hasMessage: true,
            ////        hasError: false,
            ////        alertMessage: "Upload went a-ok!"
            ////    }
            ////});
        };
        reader.onerror = (status) => {
            this.setState((prevState) => {
                return {
                    isUploading: false,
                    uploadProgress: 100,
                    hasValidFile: prevState.hasValidFile,
                    file: prevState.file,
                    hasMessage: false,
                    hasError: true,
                    alertMessage: status.message
                }
            });
        }

        reader.readAsDataURL(this.state.file);
    }

    private handleFileChange(e) {
        e.preventDefault();
        let file = e.target.files[0];
        
        if (file.type === "image/jpeg" ||
            file.type === "image/gif" ||
            file.type === "image/png") {
            this.setState((prevState) => {
                return {
                    isUploading: prevState.isUploading,
                    uploadProgress: prevState.uploadProgress,
                    hasValidFile : true,
                    file: file,
                    hasMessage: false,
                    hasError: false,
                    alertMessage: null
                }
            });
        } else {
            this.setState((prevState) => {
                return {
                    isUploading: prevState.isUploading,
                    uploadProgress: prevState.uploadProgress,
                    hasValidFile: false,
                    file: null,
                    hasMessage: false,
                    hasError: true,
                    alertMessage: "File with invalid Mime Type '" + file.type + "'. Expecting png, jpeg or gif"
                }
            });
        }
    }

    public render() {
        return (
            <div>
                <Alert isVisible={this.state.hasMessage || this.state.hasError} isError={this.state.hasError}>
                    {this.state.alertMessage}
                </Alert>

                <FileSelector disabled={this.state.isUploading} onChange={this.handleFileChange} />
                <br />
                
                <button type="submit"
                    className={this.getSubmitButtonState()}
                    onClick={this.handleSubmit}>Upload Image</button>
                <ProgressBar progress={this.state.uploadProgress} isVisible={this.state.isUploading} />
            </div>
        );
    }

    getSubmitButtonState() { return (!this.state.isUploading && this.state.hasValidFile ? "btn btn-primary active" : "btn btn-primary disabled"); }
}