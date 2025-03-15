import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from '../components/Menu';
import Diagram from '../components/Diagram';
import SettingsPanel from '../components/SettingsPanel';
import NodeDetail from '../components/NodeDetail';
import './main.css';

const MainLayout = () => {
    return (
        <Router>
            <div className="main-layout">
                <Menu />
                <SettingsPanel />
                <Switch>
                    <Route path="/" exact component={Diagram} />
                    <Route path="/node/:id" component={NodeDetail} />
                </Switch>
            </div>
        </Router>
    );
};

export default MainLayout;