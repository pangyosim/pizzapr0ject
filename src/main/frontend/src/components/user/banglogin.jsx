// src/pages/Login.jsx
import React ,{useState}from 'react';
import { Link } from 'react-router-dom'; // useHistory 추가 
import '../../css/Login.css';
// import kakao from '../../img/kakaologin.png';
import axios from 'axios';
import Header from '../../pages/Header';
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
      setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
      setPassword(e.target.value);
  };

  const handleLogin = async () => {
      try {
          const response = await axios.post('/api/login', {
              id:username,
              password:password,
          });
          console.log(response.status)
          if (response.status === 200 || response.status === 201 || response.status === 204) { // 로그인 성공 여부를 더 정확하게 판단
            console.log('로그인 성공');
            localStorage.setItem('isLoggedIn', true); // 로그인 상태를 localStorage에 저장
            localStorage.setItem('userData', JSON.stringify(response.data)); // 사용자 데이터를 localStorage에 저장
            alert('환영합니다.');
            window.location.href = "/"; 
          } else {
              console.error('로그인 실패:', response.status);
              alert('로그인에 실패하였습니다.');
          }
      } catch (error) {
          console.error('API 호출 중 오류:', error);
          alert('아이디 또는 비밀번호가 틀립니다..');
      }
  };

  // const KakaoLogin = () => {
  //   const kakaoLogin = () => {
  //     window.Kakao.Auth.login({
  //       success: (response) => {
  //         window.Kakao.API.request({
  //           url: '/v2/user/me',
  //           success: (response) => {
  //             localStorage.setItem('isLoggedIn', true);
  //             localStorage.setItem('userData', JSON.stringify(response)); // 카카오 로그인 성공 후 사용자 데이터를 localStorage에 저장
  //             window.location.href = '/';
  //           },
  //           fail: (error) => {
  //             console.error(error);
  //           },
  //         });
  //       },
  //       fail: (error) => {
  //         console.error(error);
  //       },
  //     });
  //   };


  //   useEffect(() => {
  //     const script = document.createElement('script');
  //     script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
  //     script.async = true;
  //     document.body.appendChild(script);

  //     script.onload = () => {
  //       window.Kakao.init('884e837a1529247a640be6eeb13c9982');
  //     };

  //     return () => {
  //       document.body.removeChild(script);
  //     };
  //   }, []);

  //   return (
  //     <div className="kakaologin">
  //       <button id="kakao-login-btn" onClick={kakaoLogin} >
  //         <img src={kakao} style={{ width: '13px', height: '13px' }} alt="Kakao login" />
  //         &nbsp; 카카오 로그인
          
  //       </button>
        
  //     </div>
  //   );
  // };

  return (
    <>
      <Header/>
      <div className="login-box">
        <h2>DWBB</h2><br/>

        <input type="text" id="loginid" placeholder="ID" value={username} onChange={handleUsernameChange} />
        <br />
        <input type="password" id="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
        <br />
        <button className="login" onClick={handleLogin}>로그인</button>
        {/* <KakaoLogin /> */}

        <Link className="loginLink" to="singup">회원가입</Link> 
      </div>
    </>
  );
};

export default Login;