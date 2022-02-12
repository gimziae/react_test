import { useRef, useState, useEffect } from "react";

export default function Community(){
    const main = useRef(null); //main에 모션걸려고 만든 useRef

    const input = useRef(null); //inputBox의 input에 입력되는 값 useRef
    const textarea = useRef(null); //inputBox의 textarea에 입력되는 값 useRef

    const showbox = useRef(null); //showList 내용 useRef

    const updateInput = useRef(null); //수정된 title(input)useRef
    const updateTextarea = useRef(null); //수정된 content(textarea)useRef

    // data저장관리 변수&함수
    const getLocalItems = () => {
        let data = localStorage.getItem("posts");

        if(data){
            //문자를 > 객체로 변경(parse)하는 함수
            return JSON.parse(data);
        }else{
            //로컬스토리지에 데이터가 없을 때(해당 컴포넌트가 처음 로딩시)
            return [];
        }
    }

    //getLocalItems의 리턴값에 따라 post의 값이 할당 됨
    //포스트값을 새로 생성된 setPosts값으로 state 반환
    const [posts, setPosts] = useState(getLocalItems);

    //게시글 생성 함수
    const createPost = () => {
        const inputVal = input.current.value.trim();
        const textareaVal = textarea.current.value.trim();
        if( !inputVal || !textareaVal || inputVal==' ' || textareaVal==' '){
            alert('제목과 본문을 입력해주세요.')

            return;
        }
        setPosts([
            //새로생성되는 값을 위로
            {
                title : input.current.value,
                content: textarea.current.value
            },
            ...posts//기존값을 아래로
        ])

        //등록하고 나면 남아있는 값 비워지게 새로 등록
        input.current.value = '';
        textarea.current.value = '';
    }

    //게시글 삭제 함수
    const deletePost = index => {
        setPosts(
            //기존 배열을 받아서 조건식을 통해 특정 조건이 성립하는 데이터만 필터링해서 다시 새롭게 반환하는 함수
            posts.filter((_,idx)=> idx !== index)
        )
    }

    //게시글 수정 함수 (클릭 시 수정모드로 변경)
    const enableUpdate = index => {
        setPosts(
            //map : 기존의 배열을 돌면서 새로운 배열로 리턴해주는 것
            posts.map((post, idx)=>{
                if(idx === index) post.enableUpdate = true;
                return post;
            })
        )
        console.log(posts);
    }

    //수정모드 시 초기화면으로 돌아가는 함수
    const disableUpdate = index => {
        setPosts(
            //map : 기존의 배열을 돌면서 새로운 배열로 리턴해주는 것
            posts.map((post, idx)=>{
                if(idx === index) post.enableUpdate = false;
                return post;
            })
        )
    }    

    //수정모드 시 수정사항 저장 함수
    const updatePost = index => {
        const inputVal2 = updateInput.current.value.trim();
        const textareaVal2 = updateTextarea.current.value.trim();

        if( !inputVal2 || !textareaVal2 || inputVal2==' ' || textareaVal2==' '){
            alert('제목과 본문을 입력해주세요.')
            return;
        }
        setPosts(
            posts.map((post, idx)=>{
              if(idx===index){
                post.title = updateInput.current.value;
                post.content = updateTextarea.current.value;
                  // == 
                    // const article = showbox.current.children[index];
                    // const input = article.querySelector('input');
                    // const textarea = article.querySelector('textarea');
                    // post.title = input.value;
                    // post.content = textarea.value;

                post.enableUpdate = false;
              }
              return post;
            })
        )
    }

    //페이지 첫 실행될 hook
    useEffect(()=>{
        main.current.classList.add('on');
    },[])

    //posts값이 변경될 때마다 실행될 hook
    useEffect(()=>{
        //로컬스토리지에 posts키값으로 기존 데이터(객체를)를 문자형태로 변환(stingify)해서 저장
        localStorage.setItem("posts", JSON.stringify(posts))
    },[posts])

    return(
        <main className="content community" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>community</h1>
                <section>
                    <div className="inputBox">
                        <input 
                            type="text" 
                            placeholder="제목을 입력하세요."
                            ref={input}
                        /> <br />
                        <textarea 
                            cols="30" rows="10"
                            placeholder="내용을 입력하세요"
                            ref={textarea}
                        ></textarea> <br />
    
                        <button onClick={()=>{
                            //cancle버튼 클릭 시 내용 없어지게 하는 것
                            input.current.value ='';
                            textarea.current.value = '';
                        }}>cancle</button>
                        <button onClick={createPost}>create</button>
                    </div>
    
                    <div className="showList" ref={showbox}>
                        {posts.map((post, index)=>{
                            return (
                                <article key={index}>
                                    {
                                        // 만약에 클래스명에 enableUpdate가 붙었다면
                                        post.enableUpdate
                                        ?
                                        <>
                                        {/* 수정화면 생성 */}
                                            <div className="post">
                                                <input 
                                                    type="text" 
                                                    defaultValue={post.title}
                                                    ref={updateInput}
                                                /><br />
                                                <textarea 
                                                    defaultValue={post.content}
                                                    ref={updateTextarea}
                                                ></textarea>
                                            </div>
                                            
                                            <div className="btns">
                                                <button onClick={()=>updatePost(index)}>update</button>
                                                <button onClick={()=>disableUpdate(index)}>cancle</button>
                                            </div>
                                        </>
                                        // 클래스명이 없을 때
                                        :
                                        <>
                                        {/* 초기화면 */}
                                            <div className="post">
                                                <h2>{post.title}</h2>
                                                <p>{post.content}</p>
                                            </div>
                                            
                                            <div className="btns">
                                                <button onClick={()=>enableUpdate(index)}>modify</button>
                                                <button onClick={()=>deletePost(index)}>delete</button>
                                            </div>
                                        </>
                                    }
                                </article>
                            )
                        })}
                    </div>
                </section>
            </div>
        </main>
    )
}

/*
    useEffect : 해당 컴포넌트의 생성, 상태값 변경, 소멸이라는 생명주기에 따라 특정 구문을 실행할 수 있는 hook

    * useEffect 첫번째 인수로 콜백함수 등록
                두번째 인수로는 의존성을 등록(해당 컴포넌트 처음 생성될 때 한번만 호출 가능)

*/ 