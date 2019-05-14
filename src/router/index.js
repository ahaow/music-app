import React from 'react';
import NestedRoute from './NestedRoute';
import Loadable from 'react-loadable';


function MyLoadingComponent() {
    return <div>Loading...</div>;
  }
  

const router = [
    {
        path: '/index',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/index/index'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/login',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/login/login'),
            loading: MyLoadingComponent,
        })
    },
]


export default router;

export {
    NestedRoute
}