import About from './pages/About';
import Future from './pages/Future';
import Home from './pages/Home';
import VideoUploader from './pages/VideoUploader';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "Future": Future,
    "Home": Home,
    "VideoUploader": VideoUploader,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};