import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../pages/Header';

const Infoinput = styled.input`
  width: 50vh;
  height: 5vh;
  border: none;
  background: none;
`

const BirthInfoinput = styled.input`
  width: 30vh;
  height: 5vh;
  border: none;
  background: none;
`

const Addrinput = styled.input`
  border-radius: 5px;
  width: 15vh;
  height: 4.5vh;
  border: 1px solid lightgray;
  transition: 0.1s linear;
  margin-left: 2vh;
  &:hover{
    background-color: #f9f9f9;
    transform: scale(1.02);
  }
`

const RegisterButton = styled.button`
    background-color: darkblue;
    border-radius: 10px;
    margin-top: 1vh;
    width: 30vh;
    height: 6vh;
    border: 1px solid lightgray;
    font-weight: bold;
    transition: 0.1s linear;
    margin-left: 20vh;
    &:hover{
      background-color: #0004b6;
      transform: scale(1.02);
    }
`;

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  // 회원 정보 상태 변수
  // eslint-disable-next-line
  const [userData, setUserData] = useState(null);
   // 중복 확인 상태 변수
   const [isCheckId, setIsCheckId] = useState(true);
  // eslint-disable-next-line
  const [addre, setAddre] = useState('');
  const [addre1, setAddre1] = useState('');
  const [addre2, setAddre2] = useState('');
  const [addre3, setAddre3] = useState('');
  // eslint-disable-next-line
  const [addre4, setAddre4] = useState('');
  
  const handleChange = (e) => {
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

  const checkUsernameAvailability = async (id) => {
    const response = await fetch(`/api/register/checkId?id=${id}`);
    const data = await response.text();
    console.log(data); 
    setIsCheckId(response.ok);
  };

  const onSubmit = async (data) => {
     // 중복 확인 후 회원가입 처리
     if (isCheckId) {
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
     } else {
        alert('아이디가 이미 사용 중입니다.');
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
      <Header/>
      <div style={{ height:"90vh", padding:"7vh", width: "100vh",alignItems:"center", margin:"1.5vh auto"}}>
        <h3 style={{marginLeft:"37vh",fontWeight: "bold", color:"darkblue"}}>회원가입</h3><br/>
        <div className="input-group">
      <form onSubmit={handleSubmit(onSubmit)}>
        
        {/* <input type="text" id="userid" style={{marginBottom:"10px"}}  placeholder='아이디'{...register('id', { required: '아이디를 입력해주세요.' })} />
        {errors.id && <span style={{ fontSize: 'small', color: 'red' }}>{errors.id.message}</span>}
        <br/> */}
        <div style={{border:"1px solid gray", width:"70vh"}}>
          <span style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
          <Infoinput
                type="text"
                id="userid"
                placeholder='아이디'
                {...register('id', { 
                  required: '* 아이디를 입력해주세요.',
                  validate: value => checkUsernameAvailability(value)
                })}
              />
        </div>
        
        <div style={{border:"1px solid gray", width:"70vh"}}>
            <span  style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
            <Infoinput type="password" id="password1" placeholder="비밀번호"{...register('password', { required: '* 비밀번호를 입력해주세요.', minLength: { value: 6, message: '비밀번호는 최소 6자 이상이어야 합니다.' } })}/>
            <br/>
        </div>
            <div style={{border:"1px solid gray", width:"70vh"}}>
            <Infoinput type="password" id="password2" style={{marginLeft:"40px"}} placeholder="비밀번호확인"{...register('passwordConfirmation', { validate: value => value === watch('password') || '비밀번호가 일치하지 않습니다.' })}/>
            <br/>
        </div>
        {errors.id && <span style={{ fontSize: 'small', color: 'red'}}> {errors.id.message}<br></br></span>}
        {errors.password && <span style={{ fontSize: 'small', color: 'red' }}> {errors.password.message}</span>}
        {errors.passwordConfirmation && <span style={{ fontSize: 'small', color: 'red' }}> {errors.passwordConfirmation.message}</span>}

        <div style={{border:"1px solid gray", width:"70vh", marginTop:"3vh"}}>
            <span  style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
            <Infoinput type="text" id="username"  placeholder='이름'{...register('name', { required: '* 이름을 입력해주세요.' })} />
            {errors.name && <span style={{ fontSize: 'small', color: 'red' }}> {errors.name.message}</span>}
            <br/>
        </div>

        <div style={{border:"1px solid gray", width:"70vh"}}>
            <span  style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
            <BirthInfoinput type="text" id="year1" name="year1" style={{width:"20vh"}} placeholder="생년(YYMMDD)" {...register('socialnum1', { 
              required: '* 생년월일을 입력하세요.', 
              pattern: { value: /^\d{6}$/, 
              message: '* 유효한 생년월일을 입력해주세요.' } })} 
              maxLength="6"/>
            &nbsp; 
            <strong style={{color:"gray"}}>-</strong>
            &nbsp;
            <BirthInfoinput type="password" id="year2" name="year2"  style={{ marginLeft:"1vh",width:"20vh"}} placeholder="1234567" {...register('socialnum2', { 
                required: '* 뒷자리 7자리를 입력해주세요.', 
                pattern: { 
                  value: /^\d{7}$/, 
                  message: '* 유효한 주민등록번호 뒷자리를 입력해주세요.' 
                } 
              })}  maxLength="7"/>  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp;  &nbsp; {errors.socialnum1 && <span style={{ fontSize: 'small', color: 'red' }}> {errors.socialnum1.message}</span>}
        </div>
        <div style={{border:"1px solid gray", width:"70vh"}}>
            <span  style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
            <select id="phon1"{...register('phoneNumber1')} style={{border:"none",width:"50vh"}}>
                  <option value="000">&nbsp;대한민국 +82</option>
                  <option value="010">010</option>
                  <option value="011">011</option>
                  <option value="012">012</option>
                  <option value="016">016</option>
              </select>
        </div>
        <div style={{border:"1px solid gray", width:"70vh"}}>
              <input
                style={{border:"none", width:"50vh", marginLeft:"5vh"}}
                type="text"
                id="phon2"
                placeholder="휴대폰번호를 입력해주세요."
                {...register('phoneNumber2', { required: '* 번호를 입력해주세요.' ,
                  pattern: { 
                    value: /^\d{7,8}$/, 
                    message:'* 유효한 휴대폰번호를 입력하세요'}})}
                  maxLength="8"
                />
                {errors.phoneNumber2 && <span style={{ fontSize: 'small', color: 'red' }}>{errors.phoneNumber2.message}</span>}
        </div>

        <div style={{border:"1px solid gray", width:"70vh"}}>
            <span  style={{ fontSize: 'small', color:"gray" }}>필수 *</span> &nbsp;
            <Infoinput type="email" id="emailInput"placeholder="이메일(@포함)"{...register('email', { required: '* 이메일을 입력해주세요.', pattern: { value: /^\S+@\S+$/i, message: '올바른 이메일 형식이 아닙니다.' } })} />
            {errors.email && <span style={{ fontSize: 'small', color: 'red' }}>{errors.email.message}</span>}
        </div>

        <div style={{border:"1px solid gray", width:"70vh"}}>
            <Infoinput type="text" id="add1" placeholder="도로명주소" onChange={handleChange} {...register('addr1')} value={addre1} />
            <Addrinput type="button" value="우편번호찾기" onClick={checkAddress}/><br/>
        </div>
            <Infoinput type="text" id="add2" placeholder="주소2" hidden {...register('addr2')} value={addre2}  />
        <div style={{border:"1px solid gray", width:"70vh"}}>
          <Infoinput type="text" id="add3" placeholder="동주소"  {...register('addr3')} value={addre3}  /><br/>
        </div>
        <div style={{border:"1px solid gray", width:"70vh"}}>
            <Infoinput type="text" id="add4" placeholder="상세주소" {...register('addr4')} />
        </div>
        <RegisterButton className="signup" type="submit">가입하기</RegisterButton>
      </form>
      </div>
      </div>
    </>
  );
}

export default SignupForm;