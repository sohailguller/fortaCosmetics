import About from './pages/About';
import VideoUploader from './pages/VideoUploader';
import Home from './pages/Home';
import __Layout from './Layout.jsx';


export const PAGES = {
    "About": About,
    "VideoUploader": VideoUploader,
    "Home": Home,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};