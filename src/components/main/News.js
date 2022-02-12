import { useState, useEffect } from "react";

export default function News(){
    //초기 로딩 시 사용자컴퓨터에 LocalStorage에 데이처가 없을 시 임의로 보여줄 초기 데이터
    const defaultData = [
        {title: 'Hello', content:'here coms description in detail.'},
        {title: 'Hello', content:'here coms description in detail.'},
        {title: 'Hello', content:'here coms description in detail.'},
        {title: 'Hello', content:'here coms description in detail.'},
        {title: 'Hello', content:'here coms description in detail.'},
        {title: 'Hello', content:'here coms description in detail.'}
    ]

    //로컬스토리지의 값을 받아오는 함수
    const getLocalItems = () => {

        //로컬에서 키 posts의 값을 data 라는 변수로 저장 
        let data = localStorage.getItem('posts');

        //불러온 데이터 값(문자)을 객체 형태로 변환(parse)시킨다. 
        if(data){
            return JSON.parse(data);
        }else{return defaultData;}
    }

    //posts값을 getLocalItems로 치환(useState)
    const [posts] = useState(getLocalItems);

    //posts에 초기 데이터값이 담기자마자 localStorage에도 데이터 저장
    useEffect(()=>{
        localStorage.setItem('posts', JSON.stringify(posts))
    },[])

    return(
        <section id="news">
            <div className="inner">
                <h1>Recent Post</h1>
                <ul>
                {/* getLocalItems 값을 가져온 posts배열을 반복으로 돌면서 */}
                    {posts.map((post, idx)=>{
                            //최신글 4개만 출력
                            if(idx<4){ 
                                return(
                                    // post의 idx번째의
                                    <li key={idx}>
                                        {/* title값*/}
                                        <h2>{post.title}</h2>
                                        {/* content 값*/}
                                        <p>{post.content}</p>
                                    </li>
                                )
                            }   
                        })
                    }                    
                </ul>
            </div>
        </section>
    )
}