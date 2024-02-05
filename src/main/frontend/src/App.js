import {Route, Routes} from 'react-router-dom';
import MapPage from './pages/MapPage';
import Main from './pages/Main';
const App = () => {
  return(
    <Routes>
      <Route path="/" element={<Main/>}/>
      <Route path='/map' element={<MapPage/>}></Route>
      {/* <Route path='/:category' element={<NewsPage/>}/> */}
    </Routes>
  )
}

export default App;