import AppContainer from '../containers/AppContainer.jsx'
import HomeContainer from '../containers/HomeContainer.jsx'
import MovieContainer from '../containers/MovieContainer.jsx'
import AboutContainer from '../containers/AboutContainer.jsx'
import MovieListContainer from '../containers/MovieListContainer.jsx'
import MovieDetailContainer from '../containers/MovieDetailContainer.jsx'
import MovieSearchContainer from '../containers/MovieSearchContainer.jsx'

const routeConfig = [{
    path: '/',
    component: AppContainer,
    indexRoute: {
        component: HomeContainer
    },
    childRoutes: [{
        path: 'home',
        component: HomeContainer
    }, {
        path: 'movie',
        component: MovieContainer,
        indexRoute: {
            component: MovieListContainer
        },
        childRoutes: [{
            path: '/movieList',
            component: MovieListContainer
        }, {
            path: '/movieDetail',
            component: MovieDetailContainer
        }, {
            path: '/movieSearch',
            component: MovieSearchContainer
        }, {
            path: 'movieList',
            onEnter: function (nextState, replaceState) {
                replaceState(null, '/movieList')
            }
        }, {
            path: 'movieDetail',
            onEnter: function (nextState, replaceState) {
                replaceState(null, '/movieDetail')
            }
        }, {
            path: 'movieSearch',
            onEnter: function (nextState, replaceState) {
                replaceState(null, '/movieSearch')
            }
        }]
    }, {
        path: 'about',
        component: AboutContainer
    }]
}]

export default routeConfig
