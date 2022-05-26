import axios from 'axios';
import { produce } from 'immer';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import BookmarkRow from '../components/BookmarkRow';
import { useAuthContext } from '../AuthContext';


const MyBookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [editBookmarks, setEditBookmarks] = useState([]);
    const { user } = useAuthContext();

    const getMyBookmarks = async () => {
        const { data } = await axios.get('/api/bookmark/getmybookmarks');
        setBookmarks(data);
    }

    useEffect(() => {      
        getMyBookmarks();
    }, []);

    const onDeleteClick = async (b) => {
        await axios.post('/api/bookmark/deletebookmark', b);
        await getMyBookmarks();

    }

    const onEditClick = async (id) => {
        setEditBookmarks([...editBookmarks, id]);
    }

    const onCancelClick = async (id) => {
        const newList = editBookmarks.filter(i => i !== id);
        setEditBookmarks(newList);
        await getMyBookmarks();
    }

    const onUpdateClick = async (b) => {
        await axios.post('/api/bookmark/editbookmark', b);
        const newList = editBookmarks.filter(i => i !== b.id);
        setEditBookmarks(newList);
        await getMyBookmarks();
    }

    const onTitleChange = (e, id) => {
        const nextState = produce(bookmarks, draftBookmarks => {
            draftBookmarks.find(b => b.id === id).title = e.target.value;
        });
        setBookmarks(nextState);
    }

    const editClicked = (id) => {
        return editBookmarks.some(i => i === id);
    }

    const { firstName, lastName } = user;
    return (
        <div className='container'>
            <h1>Welcome back {firstName} {lastName}</h1>

            <Link to='/addbookmark'>
                <button className='btn btn-primary btn-block'>Add Bookmark</button>
            </Link>

            <table className='table table-hover table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Url</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map((b) => <BookmarkRow onDeleteClick={() => onDeleteClick(b)}
                        onEditClick={() => onEditClick(b.id)}
                        onTitleChange={(e) => onTitleChange(e, b.id)}
                        onCancelClick={() => onCancelClick(b.id)}
                        onUpdateClick={() => onUpdateClick(b)}
                        editClicked={editClicked(b.id)}
                        bookmark={b} key={b.id} />)}
                </tbody>
            </table>
        </div>
    )
}
export default MyBookmarks;