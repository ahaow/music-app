import NestedRoute from './NestedRoute';
import Loadable from 'react-loadable';


function MyLoadingComponent() {
    return null;
  }
  

const router = [
    {
        path: '/login',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/login/login'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/index',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/index/index'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/hotsong',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/hotsong/hotsong'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/singer',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/singer/singer'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/singerdetail',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/singerdetail/singerdetail'),
            loading: MyLoadingComponent,
        })
    },
    {
        path: '/search',
        exact: true,
        component:  Loadable({
            loader: () => import('./../pages/search/search'),
            loading: MyLoadingComponent,
        })
    },
]


export default router;

export {
    NestedRoute
}