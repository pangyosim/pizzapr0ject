import {Route, Routes} from 'react-router-dom';
import MapPage from './pages/MapPage';
import Main from './pages/Main';
import QnA from './pages/QnA';
import QnAWrite from './pages/QnAWrite';
import QnADetail from './pages/QnADetail';
import Reply from './pages/Reply';
import ReviewList from './pages/ReviewList';
import ReviewWrite from './pages/ReviewWrite';
import QnAUpdate from './pages/QnAUpdate';
import Board from './pages/Board';
import BoardWrite from './pages/BoardWrite';
import BoardDetail from './pages/BoardDetail';
import BoardUpdate from './pages/BoardUpdate';
import BankfindForm from './pages/BankfindForm';

const App = () => {
  return(
    <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path='/map' element={<MapPage/>}></Route>
        {/* <Route path='/:category' element={<NewsPage/>}/> */}

        {/* 경호올림 */}
        <Route path='/qna' element={<QnA/>}/>
        <Route path='/qnaWrite' element={<QnAWrite/>}/>
        <Route path='/qna/:qaSeq' element={<QnADetail/>}/>
        <Route path='/qnaUpdate/:qaSeq' element={<QnAUpdate/>}/>
        <Route path='/reply' element={<Reply/>}/>
        <Route path='/reviewList' element={<ReviewList/>}/>
        <Route path='/reviewWrite' element={<ReviewWrite/>}/>

        <Route path='/board' element={<Board/>}/>
        <Route path='/boardWrite' element={<BoardWrite/>}/>
        <Route path='/board/:boardSeq' element={<BoardDetail/>}/>
        <Route path='/boardUpdate/:boardSeq' element={<BoardUpdate/>}/>

        <Route path='/bankfindForm' element={<BankfindForm/>}/>
    </Routes>
  )
}

export default App;