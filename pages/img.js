import React, { useEffect } from "react";
import { useState } from 'react';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import '../node_modules/react-quill/dist/quill.snow.css';
import { server } from 'config';
// import Quill from "quill";
// import { ImageHandler, VideoHandler, AttachmentHandler } from "quill-upload";

// Quill.register("modules/imageHandler", ImageHandler);

class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { editorHtml: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(html) {
        this.setState({ editorHtml: html });
    }

    apiPostNewsImage(formData) {
        fetch(
            `${server}/api/upload`,
            { method: 'POST', body: formData })
        // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
    }

    imageHandler() {
        const input = document.createElement('input');

        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            let data = null;
            const file = input.files ? input.files[0] : null;
            const formData = new FormData();

            formData.append('image', file);
            formData.getAll('image');
            // var options = { content: formData.getAll('image') };
            // console.log(options);
            // formData.append('resource_type', 'raw');

            // Save current cursor state
            const range = this.quill.getSelection(true);

            // Insert temporary loading placeholder image
            this.quill.insertEmbed(range.index, 'image', `${server}/${file.name}`);

            // Move cursor to right side of image (easier to continue typing)
            this.quill.setSelection(range.index + 1);

            // const res = await apiPostNewsImage(formData); // API post, returns image location as string e.g. 'http://www.example.com/images/foo.png'
            console.log(file);

            const res = await fetch(`${server}/api/upload`,{ 
                method: 'POST',
                // headers: { "Content-Type": "application/json" },
                body: formData,
            });
            data = await res.json();
            console.log(data);

            if (data.error) {
                console.error(data.error);
            }

            // Remove placeholder image
            this.quill.deleteText(range.index, 1);

            // Insert uploaded image
            // this.quill.insertEmbed(range.index, 'image', res.body.image);
            this.quill.insertEmbed(range.index, 'image', res);
        };
    }

    render() {
        return (
            <div className="text-editor">
                {JSON.stringify(this.state.editorHtml)}
                <hr />
                <ReactQuill
                    ref={el => {
                        this.quill = el;
                    }}
                    onChange={this.handleChange}
                    placeholder={this.props.placeholder}
                    modules={{
                        toolbar: {
                            container: [
                                [{ header: '1' }, { header: '2' }, { header: [3, 4, 5, 6] }, { font: [] }],
                                [{ size: [] }],
                                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image', 'video'],
                                ['clean'],
                                ['code-block']
                            ],
                            handlers: {
                                image: this.imageHandler
                            }
                        }
                    }}
                />
            </div>
        );
    }
}

export default MyComponent;