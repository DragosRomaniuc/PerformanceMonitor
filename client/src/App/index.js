import React, { Component, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loadable from 'react-loadable';
import Loader from './layout/Loader';
import ScrollToTop from './layout/ScrollToTop/ScrollToTop';
import routes from "../routes";
const MainLayout = Loadable({
    loader: () => import('./layout/MainLayout/MainLayout'),
    loading: Loader
})

class App extends Component {
    render(){
        console.log("./APP/App.js LOADED")
        const auth = routes.auth.map((route,index) => {
            return route.component ? <Route
            key={index}
            path={route.path}
            exact={route.exact}
            name={route.name}
            render={props => <route.component {...props}/>}
            /> : null
        })

        // console.log(auth);

        return (
        <ScrollToTop>
            <Suspense fallback={<Loader/>}>
                <Switch>
                    {/* auth routes */}
                    {auth}
                    <Route exact path="/" component={MainLayout} />
                </Switch>
            </Suspense>
        </ScrollToTop>)
    }
}

export default App;