import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { uploadProfileImage } from '../../utils/API';
import { Cloudinary } from '@cloudinary/url-gen';

const UploadImage = ({ file }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState('');

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = (e) => {
        e.preventDefault();

        if (!previewSource) return;

        uploadImage(previewSource);
    }

    const uploadImage = async (base64EncodedImage) => {
        try {

            const response = await uploadProfileImage(base64EncodedImage);

            if (!response.ok) {
                throw new Error('Something went wrong...');
            }

            console.log(response.url);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Upload</h1>

            <form onSubmit={handleSubmitFile}>
                <input
                    type='file'
                    name='image'
                    onChange={handleFileInputChange}
                    value={fileInputState}
                />

                <Button type='submit'>Submit</Button>

            </form>

            {previewSource && (
                <img src={previewSource} alt='chosen'
                    style={{ height: '300px' }}
                />
            )}

        </div>
    );
}

export default UploadImage;