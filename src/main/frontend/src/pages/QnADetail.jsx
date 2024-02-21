
// QnADetail.jsx

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReplyItem from '../components/ReplyItem';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../pages/Header';

const QnADetail = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null); // 사용자 데이터 상태 추가
    const { qaSeq } = useParams();

    const [QnA, setQnA] = useState({
    qaUserId:'',
    qaTitle:'',
    qaContents:'',
    qaViews:'',
    qaFile:'',
    });

    useEffect(() => {
    fetch("http://localhost:8080/qna/" + qaSeq)
    .then((res) => {
        if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((res) => {
        setQnA(res);
    })
    .catch((error) => {
        console.error('Fetch error:', error);
    });

    const fetchUserData = async () => {
      try {
          // 로그인 후 localStorage에 저장된 사용자 데이터 가져오기
          const user = JSON.parse(localStorage.getItem('userData'));
          if (user) {
              setUserData(user);
              console.log(user.role); // role 값 확인
          }
      } catch (error) {
          console.error('Error fetching user data:', error);
      }
  };

  fetchUserData();
    },[qaSeq]);

    // 게시글 삭제하기 
    const QnADelete = () => {
    fetch('http://localhost:8080/qna/' + qaSeq, {
        method: 'DELETE',
    })
        .then((res) => res.text())
        .then((res) => {
        if (res === 'delete') {
            window.history.replaceState(null, null, '/qna');
            navigate('/qna');
        } else {
            alert('삭제실패');
        }
        });
    };

    // 게시글 수정페이지로 
    const QnAUpdate = () => {
    navigate('/QnAUpdate/' + qaSeq);
    };

    //목록으로 가기 
    const QnAList = () => {
        navigate('/qna');
    };

    // 댓글 리스트 출력
    const [replys, setReplys] = useState([]); 
    
    useEffect(() => {
        fetch('http://localhost:8080/reply/'+ qaSeq)
            .then((res) => res.json())
            .then((res) => {
                setReplys(res);
            });
    }, [qaSeq]);


    // 댓글 쓰기 
    const [reply, setReply] = useState({
        replyUserId:'',
        replyContents:'',
      }); 
      const changeValue = (e) => { 
        setReply({ 
          ...reply,
          replyUserId: userData.id, // 로그인한 사용자의 ID 추가
          qaSeq: qaSeq,
          [e.target.name]: e.target.value, 
        }); 
      }; 
     
      const submitReply = (e) => { 
        e.preventDefault(); 
        fetch('http://localhost:8080/reply', { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json; charset-utf-8', 
          }, 
          body: JSON.stringify(reply), 
        }) 
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          // Catch는 여기서 오류가 나야 실행됨.
          if (res !== null) {
            navigate('/qna/'+ QnA.qaSeq);
            window.location.reload();
          } else {
            alert('댓글 등록에 실패하였습니다.');
          }
        
        });
    };


    // 댓글 수정
    // eslint-disable-next-line
    const [editingReply, setEditingReply] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [isEditing, setIsEditing] = useState(false);
       
    const startEditing = (reply) => {
        setEditingReply(reply);
        setEditedContent(reply.replyContents); 
        setIsEditing(true);
        setIsEditing((prevIsEditing) => ({
            ...prevIsEditing,
            [reply.replySeq]: true,
        }));
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
      };

    const cancelEditing = () => {
        setEditingReply(null);
        setEditedContent('');
        setIsEditing(false);
    };

    const handleReplyUpdate = (reply) => {
        const updatedReply = {
            ...reply,
            replyContents: editedContent,
        };

        fetch('http://localhost:8080/reply/'+ reply.replySeq, { 
          method: 'PUT', 
          headers: { 
            'Content-Type': 'application/json; charset-utf-8', 
          }, 
          body: JSON.stringify(updatedReply), 
        }) 
        .then((res) => {
          if (res.status === 201) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((res) => {
          // Catch는 여기서 오류가 나야 실행됨.
          if (res !== null) {
            navigate('/qna/'+ QnA.qaSeq);
            window.location.reload();
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
            console.error('Error updating reply:', error);
        });
    
        setIsEditing((prevIsEditing) => ({
        ...prevIsEditing,
        [reply.replySeq]: false,
        }));
    };
    

    // 댓글 삭제
    const replyDelete = (reply) => {
        fetch('http://localhost:8080/reply/'+ reply.replySeq, {
          method: 'DELETE',
        })
          .then((res) => res.text())
          .then((res) => {
            if (res === 'delete') {
              navigate('/qna/'+ QnA.qaSeq);
              window.location.reload();
            } else {
              alert('삭제실패');
            }
          });
      };


  return (
    <div>
    <Header/>
        <form>
        <div style={{margin:"7vh auto"}}>
        <h2>QnA 상세보기</h2>
        </div>
        <Table>
            <tbody>
            <Tr>
                <Th>제목</Th>
                <Td>{QnA.qaTitle}</Td>
                <Th>조회수</Th>
                <Td style={{width:"8%"}}>{QnA.qaViews}</Td>
            </Tr>
            <Tr>
                <Th>작성자</Th>
                <Td colSpan={4}>{QnA.qaUserId}</Td>
            </Tr>
            <Tr>
                <Th>내용</Th>
                <Td colSpan={4} height={100}>{QnA.qaContents}</Td>
            </Tr>
            </tbody>
        </Table>
        <Div>
        {userData && ( // 사용자가 로그인되어 있을 때만 버튼 표시
              <>
              {(userData.role === 'ROLE_ADMIN' || userData.id === QnA.qaUserId) && ( // ROLE_ADMIN이거나 본인이 작성한 경우에만 버튼 표시
                  <>
                  <Buttonupdate variant="warning" onClick={QnAUpdate}>
                      수정
                  </Buttonupdate>
                  &nbsp;
                  <Buttondelete variant="danger" onClick={QnADelete}>
                      삭제
                  </Buttondelete>
                  </>
              )}
              </>
          )}
            &nbsp;
            <Buttonlist variant="primary" onClick={QnAList}>
                목록
            </Buttonlist>
        </Div>
        </form>
        {/* 댓글 작성 */}
        <Form onSubmit={submitReply}>
        {userData ? ( // 사용자가 로그인되어 있는지 확인
          <ul>
              <Li>
                  <Textarea
                      as="textarea" 
                      rows={3} 
                      name="replyContents" 
                      onChange={changeValue}
                      value={reply.replyContents}
                  />
                  <Buttonlist type="submit">댓글쓰기</Buttonlist>
              </Li>
          </ul>
        ) : (
          <ul>
              <Li>
                  <Textarea
                      as="textarea" 
                      rows={3} 
                      name="replyContents" 
                      placeholder="로그인후 작성이 가능합니다"
                      readOnly
                  />
              </Li>
          </ul>
        )}
        </Form>
        <br/>
        {/* 댓글 리스트 */}
        <Form style={{paddingBottom:"60px"}}>
            <div>
                <h3>댓글 리스트</h3>
            </div>
            <div>
                {replys.length === 0 ? (
                    // 댓글이 없는 경우
                    <p>댓글이 없습니다.</p>
                ) : (
                    // 댓글이 있는 경우
                    replys.map((reply) => (
                      <div style={{borderTop:"1px solid black", paddingTop: "2vh",paddingBottom:"2vh"}}>
                    <ul key={reply.replySeq}>
                        <ReplyItem reply={reply}/>
                        {/* 수정, 삭제 기능 */}
                        {isEditing[reply.replySeq] ? (
                        // 수정 중인 경우
                        <div>
                            <Textarea
                            rows={2}
                            name="replyContents"
                            onChange={handleContentChange}
                            value={editedContent}
                            />
                            <Buttonupdate onClick={() => handleReplyUpdate(reply)}>완료</Buttonupdate>
                            <Buttondelete style={{marginLeft:"1vh"}} onClick={cancelEditing}>취소</Buttondelete>
                        </div>
                        ) : (
                        // 수정 중이 아닌 경우
                        <div>
                           {userData && ( // 사용자가 로그인되어 있을 때만 버튼 표시
                              <>
                              {(userData.role === 'ROLE_ADMIN' ||  userData.id === reply.replyUserId) && ( // ROLE_ADMIN이거나 본인이 작성한 경우에만 버튼 표시
                                <>
                                    <Buttonupdate style={{marginLeft:"4vh"}} onClick={() => startEditing(reply)}>수정</Buttonupdate>
                                    <Buttondelete style={{marginLeft:"1vh"}}onClick={() => replyDelete(reply)}>삭제</Buttondelete>
                                </>
                            )}
                            </>
                           )}
                        </div>
                        )}
                    </ul>
                    </div>
                    ))
                )}
            </div>
        </Form>
    </div>
  );
};

//==============
// 게시글
//==============
const Table = styled.table`
	width: 1200px;
	padding-bottom: 100px;
	margin: 0 auto; /*가운데 정렬*/
`;
const Tr = styled.tr`
    border: 1px solid rgb(149, 149, 149);
`;
const Th = styled.th`
    border: 1px solid rgb(149, 149, 149);
    text-align: center;
    width: 70px;
`;
const Td = styled.td`
    border: 1px solid rgb(149, 149, 149);
    height: 50px;
    padding-left: 10px;
`;
const Div = styled.div`
    padding-top: 10px;
    text-align: center;
`;

//==============
// 댓글 
//==============

const Form = styled.form`
   	width: 1200px;
    margin: 0 auto; /*가운데 정렬*/
`;

// const ReplyDiv = styled.div`
//     margin: 0 auto; /*가운데 정렬*/
// `;
const Li = styled.li`
    list-style-type: none;
    padding-top: 30px;
`;

const Textarea = styled.textarea`
    width: 1150px;
`;

const Buttonupdate = styled.button`
    width: 10vh;
    height: 5vh;
    border: none;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 17px;
    font-weight: bold;
    font-style: normal;
    color: white;
    cursor: pointer;
    background-color: #219e4a;
    transition: 0.1s linear;
    text-decoration: none;
    &:hover {
        background-color: #23aa4f;
        transform: scale(1.02);
        text-decoration: none;
    }
`
const Buttondelete = styled.button`
    width: 10vh;
    height: 5vh;
    border: none;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 17px;
    font-weight: bold;
    font-style: normal;
    color: white;
    cursor: pointer;
    background-color: #a74a45;
    transition: 0.1s linear;
    text-decoration: none;
    &:hover {
        background-color: #cb5a53;
        transform: scale(1.02);
        text-decoration: none;
    }
`
const Buttonlist = styled.button`
    width: 10vh;
    height: 5vh;
    border: none;
    border-radius: 10px;
    font-family: "Ubuntu", sans-serif;
    font-size: 17px;
    font-weight: bold;
    font-style: normal;
    color: white;
    cursor: pointer;
    background-color: darkblue;
    transition: 0.1s linear;
    text-decoration: none;
    &:hover {
        background-color: #0002ab;
        transform: scale(1.02);
        text-decoration: none;
    }
`
export default QnADetail;

