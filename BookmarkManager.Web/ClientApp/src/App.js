import React from 'react';
import { Route } from 'react-router';
import Layout from './Layout';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import Signup from './Pages/Signup';
import AddBookmark from './Pages/AddBookmark';
import MyBookmarks from './Pages/MyBookmarks';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';


export default function App() {
    return (
        <AuthContextComponent>
            <Layout>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={Signup} />
                <PrivateRoute exact path='/mybookmarks' component={MyBookmarks} />
                <PrivateRoute exact path='/addbookmark' component={AddBookmark} />
                <PrivateRoute exact path='/logout' component={Logout} />
            </Layout>
        </AuthContextComponent>
    )
}