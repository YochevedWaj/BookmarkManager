import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Home = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const getTopFive = async () => {
            const { data } = await axios.get('/api/bookmark/gettopfive');
            setBookmarks(data);
        }
        getTopFive();
    }, []);
    return (
        <div className='container'>
            <h1>Welcome to the React Bookmark Application.</h1>
            <h3>Top 5 most bookmarked links:</h3>
            <table className='table table-hover table-bordered table-striped'>
                <thead>
                    <tr>
                        <th>Url</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    {bookmarks.map(({url, count}) => <tr>
                        <td>
                            <Link to={{ pathname: url }} target="_blank">{url}</Link>
                        </td>
                        <td>{count}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    )
}
export default Home;