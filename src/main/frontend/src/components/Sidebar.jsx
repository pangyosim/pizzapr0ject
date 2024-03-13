import React, {useEffect, useRef, useState} from "react";
import styles from "../css/sidebar.module.css";
import category from '../img/category.png';

const Sidebar = ({ width=280, children }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(width);
  const side = useRef(0);
  
  // button 클릭 시 토글
  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(width);
      setOpen(false);
    }
  };
  
  // 사이드바 외부 클릭시 닫히는 함수
  const handleClose = async e => {
    let sideArea = side.current;
    let sideCildren = side.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(0); 
      await setOpen(true);
    }
  }

  useEffect(()=> {
    window.addEventListener('click', handleClose);
    return () => {
      window.removeEventListener('click', handleClose);
    };
  })


  return (
    <div className={styles.container}>
      <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
          <button onClick={() => toggleMenu()}
          className={styles.button} >
            {isOpen ? 
                <span style={{fontSize: "30px", fontWeight: "bold"}}>×</span> : <img src={category} alt="contact open button" className={styles.openBtn}/>
            }
          </button>
        
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};


export default Sidebar;