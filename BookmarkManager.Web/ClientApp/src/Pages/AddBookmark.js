import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const AddBookmark = () => {
    const [formData, setFormData] = useState({ title: '', url: ''});
    const history = useHistory();

    const onTextChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSubmitClick = async (e) => {
        e.preventDefault();
        await axios.post('/api/bookmark/addbookmark', formData);
        history.push('/mybookmarks');
    }
    const { title, url } = formData;
    return (< div className="col-md-6 offset-md-3 jumbotron" >
        <h1>Add Bookmark</h1>
        <form onSubmit={onSubmitClick}>
            <input type="text" name='title' onChange={onTextChange} value={title} className="form-control" name="title" placeholder="Title" />
            <br />
            <input type="text" name='url' onChange={onTextChange} value={url} className="form-control" name="url" placeholder="Url" />
            <br />
            <button className="btn btn-primary btn-block btn-lg">Add</button>
        </form>
    </div >
        
        )
}
export default AddBookmark;