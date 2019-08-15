import Home from './Home';
import About from './About';
import Settings from './Settings';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';

export default [
  {
    path: "/",
    title: 'Home',
    component: Home,
    exact: true
  },
  {
    path: "/posts",
    title: 'Posts',
    component: Posts,
    exact: true
  },
  {
    path: "/posts/:id",
    title: 'PostDetail',
    component: PostDetail,
    exact: true
  },
  {
    path: "/about",
    title: 'About',
    component: About,
    exact: true
  },
  {
    path: "/settings",
    title: 'Settings',
    component: Settings,
    exact: true
  }
];
