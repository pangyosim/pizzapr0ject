

import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../../css/Login.css';
import { Link, useNavigate } from 'react-router-dom';


const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // 회원 정보 상태 변수
  // eslint-disable-next-line
  const [userData, setUserData] = useState(null);
  // eslint-disable-next-line
  const [addre, setAddre] = useState('');
  const [addre1, setAddre1] = useState('');
  const [addre2, setAddre2] = useState('');
  const [addre3, setAddre3] = useState('');
  // eslint-disable-next-line
  const [addre4, setAddre4] = useState('');
  
  const handleChange = (e) => {
    console.log('test')
    console.log(e.target.value)
  };

  useEffect(() => {
    // Daum Postcode API 스크립트를 로드
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const onSubmit = async (data) => {
    try {
      data.addr1 = addre1
      data.addr2 = addre2
      data.addr3 = addre3
      //data.addr4 = progressFrame.document.getElementById("add4").value

      console.log(data)
      // 회원 정보 저장
      setUserData(data);
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (response.ok) {
        console.log('회원가입이 완료되었습니다.');
        alert('환영합니다.');
        navigate('/login');
      } else {
        console.error('회원가입 실패:', responseData.message);
      }
    } catch (error) {
      console.error('API 호출 중 오류:', error);
    } 

  };

  // 주소
  const checkAddress = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let address = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          address = data.roadAddress;
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }

          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }

          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        } else {
          address = data.jibunAddress;
        }

        setAddre(data.zonecode);
        setAddre1(address);
        setAddre2(data.buildingName || '');
        setAddre3(extraAddr);
        setAddre4('');
      },
    }).open();
}

  return (
    <>
    <div className="input-box">
    
        <h2><Link to="/">Bang</Link></h2>
        <h2>회원가입</h2><br/>
        <div className="input-group">
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <input type="text" id="userid" placeholder='아이디'{...register('id', { required: '아이디를 입력해주세요.' })} />
        {errors.id && <span style={{ fontSize: 'small', color: 'red' }}>{errors.id.message}</span>}
        <br/>

        <input type="text" id="username" placeholder='이름'{...register('name', { required: '이름을 입력해주세요.' })} />
        {errors.name && <span style={{ fontSize: 'small', color: 'red' }}>{errors.name.message}</span>}
        <br/>

        <input type="password" id="password1"placeholder="비밀번호"{...register('password', { required: '비밀번호를 입력해주세요.', minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' } })}/>
        {errors.password && <span style={{ fontSize: 'small', color: 'red' }}>{errors.password.message}</span>}
        <br/>

        <input type="password" id="password2"placeholder="비밀번호확인"{...register('passwordConfirmation', { validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.' })}/>
        {errors.passwordConfirmation && <span style={{ fontSize: 'small', color: 'red' }}>{errors.passwordConfirmation.message}</span>}
        <br/>

        <input type="text" id="year1" name="year1"placeholder="생년(YYMMDD)"{...register('socialnum1', { required: '생년월일을 입력하세요.' })} />
        

        <input type="text" id="year2" name="year2"placeholder="-1" {...register('socialnum2')}/>******
        {errors.year && <span style={{ fontSize: 'small', color: 'red' }}>{errors.year.message}</span>}
        <br/>

        <select id="phon1"{...register('phoneNumber1')}>
              <option value="000">------</option>
              <option value="010">010</option>
              <option value="011">011</option>
              <option value="012">012</option>
              <option value="016">016</option>
          </select> 
        <input type="text" id="phon2" placeholder="휴대폰번호"{...register('phoneNumber2')}/>

        <br/><br/>

        <input type="email" id="emailInput"placeholder="이메일"{...register('email', { required: '이메일을 입력해주세요.', pattern: { value: /^\S+@\S+$/i, message: '올바른 이메일 형식이 아닙니다.' } })} />
        {errors.email && <span style={{ fontSize: 'small', color: 'red' }}>{errors.email.message}</span>}
        <br/>
        <br/>

        <div className="textForm">
          <input type="text" id="add1" placeholder="주소1" onChange={handleChange} {...register('addr1')} value={addre1} />
          <input type="button" value="우편번호찾기" onClick={checkAddress}/><br/>

          <input type="text" id="add2" placeholder="주소2"   {...register('addr2')} value={addre2}  />
          <input type="text" id="add3" placeholder="주소3"  {...register('addr3')} value={addre3}  /><br/>
          <input type="text" id="add4" placeholder="상세주소" {...register('addr4')} />
        </div><br/>

        <button className="signup" type="submit" >가입하기</button>
      </form>
      </div>
      </div>

      
    </>
  );
}

export default SignupForm;