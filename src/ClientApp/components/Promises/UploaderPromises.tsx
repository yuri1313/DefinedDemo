import * as React from 'react';
import 'isomorphic-fetch';

export interface ImageUploadResult {
    uploadTimestamp: string;
    imageId: string;
    uploadSuccessful: boolean;
    uploadErrorMessage: string;
}