import { useEffect, useRef, useState} from "react/cjs/react.development"

export default function Join (){
    let main = useRef(null);

    //state로 관리할 초기 value값들
    const initVal = {
        userId: '',
        email: '',
        pwd: '',
        pwdCk:''

    }

    //useState로 초기 value값을 state에 담아서 관리 시작
    const [val, setVal] = useState(initVal);

    //input의 인증 실패 시 출력 될 errMsg state 생성
    //use state 빈 객체값으로 설정
    const [err, setErr] = useState({});

    const handleSubmit = e => {
        e.preventDefault();

        //인증함수 호출해서 인증 실패 시 err state객체에 에러문구 추가
        setErr(check(val));
    }

    //id 인증함수
    const check = val => {
        let errs = {};
        //인수로 받은 val이 조건에 부합하면
        if( val.userId.length < 5){

            errs.userId = '아이디를 5글자 이상 입력하세요.'
        }
        if( val.email.length<8 || !/@/ .text(val.email) ){

            errs.email = '이메일 주소는 @를 포함한 8글자 이상 입력하세요';
        }
        

        console.log(errs);
        return errs;
    }

    //id onChange 함수(대입형 함수로 생성)로 
    //가공해서 리턴문에 안에 input id에 대입
    //w?리턴문 안에서 복잡한 함수식을 줄이기 위해
    //  밖에서 미리 설정 후 대입해준다.
    const handleChange = e => {
        //현재 타겟(handleChange)의 input의 name값과 value값을 구조분해 할당으로 가져옴
        const {name,value} = e.target;

        /*
        onChange 실행될 때 마다 기존 val state값을 현재 사용자가 입력하는 값으로 갱신
        setVal({inval의 useId 초기값 복제, [return문의 name의 값인 userId를 가오기]: value(사용자가 화면에 입력하는 값)})
        왜 [name] 변수로 설정하냐? 기능적으로는 이상이 없지만 값을 고정해두면 재활용이 불가능. 
        여러가지 인풋의 네임값을 받기 위해서 변수로 설정해야 재활용이 가능하므로 변수로 설정한다.
        */
        setVal({...val, [name]: value});

        //결과적으로 현재 입력하고 있는 값이 input요소의 value속성에 의해 출력됨
        console.log(val); // {userId: '화면 입력값'}
    }


    useEffect(()=>{
        main.current.classList.add('on');
    },[])

    //err state값이 변경될 때 마다 
    useEffect(()=>{
        console.log(err);
        const len = Object.keys(err).length;

        if(len === 0){
          console.log('모든 인풋요소 인증 통과');
        }else{
          console.error('인증 실패');
        }
    },[err])

    return(
        <main className="content join" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>join</h1>
                <section>
                    {/* submit 제출 시 handleSubmit 함수 호출 */}
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend>회원가입 양식</legend>
                            <table>
                                <caption>회원가입 입력</caption>
                                <tbody>
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="userId">USER ID</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="text"
                                                id="userId"
                                                name="userId"
                                                placeholder="아이디를 입력하세요."
                                                //화면에 입력하는 값을 변수로 설정
                                                value={val.userid}
                                                // onChange 추가해줘야 입력값을 리액트에서 읽기가능하다.
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                        <label htmlFor="email">E-MAIL</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="text" 
                                                id='email'
                                                name='email'
                                                placeholder='이메일 주소를 입력하세요'
                                                value={val.email}
                                                onChange={handleChange}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="pwd">PASSWORD</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="password" 
                                                name="pwd" 
                                                id="pwd"
                                                placeholder="비밀번호를 입력하세요."
                                                value={val.pwd}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <label htmlFor="pwdCk">PASSWORD CK</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="text" 
                                                name="pwdCk"
                                                id="pwdCk"
                                                placeholder="비밀번호를 확인해 주세요."
                                                value={val.pwdCk}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <th colSpan='2'>
                                            <input type="reset" value="CANCLE" />
                                            <input type="submit" value="SEND" />
                                        </th>
                                    </tr>
                                </tbody>
                            </table>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    )
}