import { Fragment, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loading from "./pages/loading/Loading";
import { publicRoutes } from "./routes/routes";
import LoadingLazy from "./pages/loading/LoadingLazy";




const HomeTemplate = lazy(()=> import("./template/homeTemplate/HomeTemplate"))

function App() {
  
  

//  const arr = [2,3,4,5]
//  const total = arr.reduce((i, value) =>{
//     return i + value
//  },5)
// const arr1 = [
//   {
//       "maGhe": 47738,
//       "tenGhe": "18",
//       "maRap": 453,
//       "loaiGhe": "Thuong",
//       "stt": "18",
//       "giaVe": 99000,
//       "daDat": false,
//       "taiKhoanNguoiDat": null
//   },
//   {
//       "maGhe": 47740,
//       "tenGhe": "20",
//       "maRap": 453,
//       "loaiGhe": "Thuong",
//       "stt": "20",
//       "giaVe": 99000,
//       "daDat": false,
//       "taiKhoanNguoiDat": null
//   }
// ]
// const total = arr1.reduce((total, ghe, index) => {
//   return total += ghe.giaVe
// },0)
 
  return (
   <>
   <Loading />
    <Routes>
      
      
      {publicRoutes.map((route,index)=>{       
        let Pages = route.component;        
        let Layout = HomeTemplate;       
        if(route.layout){
          Layout = route.layout
        }else if(route.layout === null){
         Layout = Fragment
        }
        return <Route key={index} path={route.path} element={<Suspense fallback={<LoadingLazy/>}><Layout><Pages/></Layout></Suspense> } />
      })}
    </Routes>
    
    </>
  );
}

export default App;
