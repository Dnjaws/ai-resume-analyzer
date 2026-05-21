import React, {useCallback, useState} from 'react';
import {useDropzone} from "react-dropzone";
import {formatSIze} from "../../lib/utils";

interface FileUploaderProps {
    onFileSelect ? : (file: File | null) => void;
}

const Fileuploader = ({onFileSelect} : FileUploaderProps) => {

    const onDrop = useCallback((acceptedFiles : File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect ?. (file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024;
    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple : false,
        accept : {'application/pdf' : ['.pdf']},
        maxSize : maxFileSize,
    })

    const file = acceptedFiles[0] || null;


    return (
        <div className="w-full gradient-border">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="space-y-4 cursor-pointer">
                    {file ? (
                        <div className="uploader-selected-file" onClick={(e) => e.stopPropagation()}>
                            <img src="/images/pdf.png" alt="pdf" className="size-10"/>
                            <div className="text-center">
                                <div>
                                    <p className="text-sm truncate max-w-xs text-gray-700 font-medium">
                                        {file.name}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {formatSIze(file.size)}
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 cursor-pointer" onClick={
                                (e) => {
                                    onFileSelect ?.(null)
                                }
                            }>
                                <img src="/icons/cross.svg" className="h-4 w-4"/>
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="mx-auto w-16 h-16 flex items-center justify-center mb-4">
                                <img src="/icons/info.svg" alt="upload" className="size-20"/>
                            </div>
                            <p className="text-lg text-gray-500">
                                <span className="font-semibold">
                                    Click to upload
                                </span> or drag and drop
                            </p>
                            <p className="text-lg text-gray-400">PDF (max {formatSIze(maxFileSize)})</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Fileuploader;