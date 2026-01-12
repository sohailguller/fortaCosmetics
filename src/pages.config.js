import Future from './pages/Future';
import VideoUploader from './pages/VideoUploader';
import Home from './pages/Home';
import About from './pages/About';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Future": Future,
    "VideoUploader": VideoUploader,
    "Home": Home,
    "About": About,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};