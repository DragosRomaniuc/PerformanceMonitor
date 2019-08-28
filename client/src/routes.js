import React from 'react';

// const SignUp = React.lazy(() => import('./Demo/Authentication/SignUp/SignUp1'));
// const Signin = React.lazy(() => import('./Demo/Authentication/SignIn/SignIn1'));

const authRoutes = {
    SignUp: React.lazy(() => import('./App/layout/Auth/Signup')),
    SignIn: React.lazy(() => import('./App/layout/Auth/Signup'))
}

const mainLayoutRoutes = {
    DashboardDefault: React.lazy(() => import('./App/layout/MainLayout/MainLayout'))
}

// const allRoutes = {
//     // LearnBootstrap: React.lazy(()=>import('./App/layout/LearnBootstrap/LearnBootstrap'))
// }


// To Export
const routes = {
    auth: [
        { path: '/auth/signup', exact: true, name: 'Signup', component: authRoutes.SignUp},
        { path: '/auth/signin', exact: true, name: 'Signin', component: authRoutes.SignIn}
    ],
    mainLayout: [
        { path: '/', exact: true, name: 'Default', component: mainLayoutRoutes.DashboardDefault }
    ]
    // learnBootstrap: [
    //     { path: '/', exact: true, name: 'Default', component: allRoutes.LearnBootstrap }
    // ]
}

export default routes;