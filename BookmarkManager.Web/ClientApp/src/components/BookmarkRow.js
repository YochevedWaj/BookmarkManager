import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const BookmarkRow = ({ bookmark, onDeleteClick, onEditClick, editClicked, onCancelClick, onUpdateClick, onTitleChange }) => {
    const { title, url } = bookmark;
    return (<tr>
        <td>{editClicked ? <input type='text' className='form-control' value={title}
            onChange={onTitleChange} placeholder='Title' /> : title}
        </td>
        <td>
            <Link to={{ pathname: url }} target="_blank">{url}</Link>
        </td>
        <td>
            <div className='row'>
                {!editClicked && <div className='col-md-3'>
                    <button className='btn btn-success' onClick={onEditClick}>Edit</button>
                </div>}
                {editClicked && <> <button className='btn btn-success' onClick={onUpdateClick}>Update</button>
                    <button className='btn btn-info' onClick={onCancelClick}>Cancel</button> </>}
                
                <div className='col-md-3'>
                    <button className='btn btn-danger' onClick={onDeleteClick}>Delete</button>
                </div>
            </div>
        </td>
    </tr>)
}
export default BookmarkRow;