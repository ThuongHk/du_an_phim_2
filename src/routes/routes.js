import { Fragment, lazy, Suspense } from "react";
import Detail from "../pages/detail/Detail"
import Home from "../pages/home/Home"
import Contact from "../pages/contact/Contact";
import News from "../pages/news/News";
import Profile from "../pages/profile/Profile";
import Phim from "../template/templateAdmin/phim/Phim";
import AddNew from "../template/templateAdmin/phim/AddNew";
import Edit from "../template/templateAdmin/phim/Edit";
import ShowTime from "../template/templateAdmin/showTime/ShowTime";








const Register = lazy(()=> import("../pages/register/Register"))
const UserLogin = lazy(()=> import("../template/userLoginTemplate/UserLogin"))
const CheckoutTemplate = lazy(()=> import("../template/checkoutTemplate/CheckoutTemplate"))
const TemplateAdmin = lazy(()=> import("../template/templateAdmin/TemplateAdmin"))



export const publicRoutes = [
    {path: '/', component: Home},
    {path: '/contact', component: Contact},
    {path: '/news', component: News},
    {path: '/detail/:id', component: Detail}, 
    {path: '/register', component: Register, layout: Register},
    {path: '/profile', component: Profile, layout: Profile},     
    {path: '/login', component: UserLogin, layout: UserLogin},
    {path: '/checkout/:id', component: CheckoutTemplate, layout: CheckoutTemplate},
    {path: '/admin', component: TemplateAdmin, layout: TemplateAdmin},
    {path: '/admin/phim', component: Phim, layout: TemplateAdmin},
    {path: '/admin/addnew', component: AddNew, layout: TemplateAdmin},
    {path: '/admin/edit/:id', component: Edit, layout: TemplateAdmin}, 
    {path: '/admin/showtime/:id', component: ShowTime, layout: TemplateAdmin},

]