import { useState } from 'react';

const ImageDisplay = ({ image }) => {

    const [values, setValues] = useState({
        imagePreviewUrl: '',
        picFile: null
    })
    let fileInput = React.createRef();

    const editProfilePic = () => {
        fileInput.current.click();
    }

    const handleImageChange = event => {
        event.preventDefault();

        let reader = new FileReader();
        let inFile = event.target.files[0];
        reader.onloadend = () => {
            setValues({
                ...values,
                picFile: inFile,
                imagePreviewUrl: reader.result
            })
        };

        reader.readAsDataURL(inFile);
    };
}