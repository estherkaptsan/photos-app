import React, { useState } from 'react'
import ImgUploader from '../cpm/ImgUploader'

export default function PhotoEdit() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div>
            <form className='edit-form'>
                <input placeholder='title' />
                <select name="category" value={selectedOption}
                    onChange={handleSelectChange}>
                    <option value="">Select an option</option>
                    <option value="work">Work</option>
                    <option value="home">Home</option>
                </select>
                <ImgUploader />
                <button>save</button>
            </form>
        </div>
    )
}
