import { useEffect, useRef, useState} from "react"

export default function Join (){
    let main = useRef(null);

    //state로 관리할 초기 value값들
    const initVal = {
        userId: '',
        pwd: '',
        repwd:'',
        email: '',
        gender: false,
        interest: false,
        edu: false,
        comments: ''
    }

    //useState로 초기 value값을 state에 담아서 관리 시작
    const [val, setVal] = useState(initVal);
    //input의 인증 실패 시 출력 될 errMsg state 생성
    const [err, setErr] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = e => {
        e.preventDefault();

        setIsSubmit(true);
        //인증함수 호출해서 인증 실패 시 err state객체에 에러문구 추가
        setErr(check(val));
    }

    //id onChange 함수(대입형 함수로 생성)
    const handleChange = e => {
        //현재 타겟(handleChange)의 input의 name값과 value값을 구조분해 할당으로 가져옴
        const {name,value} = e.target;

        setVal({...val, [name]: value});

        //결과적으로 현재 입력하고 있는 값이 input요소의 value속성에 의해 출력됨
        console.log(val); // {userId: '화면 입력값'}
    }

    // check 함수
    const handleCheck = e => {
        let isChecked = false;
        const {name} = e.target;
        const inputs = e.target.parentElement.querySelectorAll('input');
        inputs.forEach(el=>{
          if(el.checked) isChecked=true;
        });         
        setVal({...val, [name]: isChecked});    
    }

    // radio 함수
    const handleRadio = e => {
        const {name} = e.target;
        const isCheck = e.target.checked;
        setVal({...val, [name]: isCheck});
    }

    // select 함수
    const handleSelect = e => {
        const{name} = e.target;
        //현재 타켓의 옵션값의 밸류
        const isSelect = e.target.options[e.target.selectedIndex].value;
        setVal({...val, [name]: isSelect});

    }

    //id 인증함수
    const check = val => {
        let errs = {};
        const eng = /[a-zA_Z]/;
        const num = /[0-9]/;
        const spc = /[~!@#$%^&*()_+=-]/;


        //인수로 받은 val이 조건에 부합하면 실행
        if( val.userId.length < 5){

            errs.userId = '아이디를 5글자 이상 입력하세요.'
        }

        if( val.pwd.length < 8 || !eng.test(val.pwd) || !num.test(val.pwd) || !spc.test(val.pwd)){

            errs.pwd = '비밀번호는 문자, 숫자, 특수문자를 포함한 8글자 이상 입력해 주세요.';
        }
        if( val.pwd !== val.repwd){

            errs.repwd = '비밀번호를 동일하게 입력해 주세요.';
        }        
        if( val.email.length < 8 || !/@/.test(val.email) ){

            errs.email = '이메일 주소는 @를 포함한 8글자 이상 입력해 주세요.';
          }
        if( !val.gender){

            errs.gender = '성별을 선택해 주세요.';
        }
        if( !val.interest){

            errs.interest = '취미를 하나 이상 선택해주세요.';
        }
        if( !val.edu ){

            errs.edu = '학력을 선택해 주세요';
        }
        if( val.comments.length < 10){

            errs.comments = '남기는 말을 10글자 이상 입력하세요';
        }
        

        console.log(errs);
        return errs;
    }


    useEffect(()=>{
        main.current.classList.add('on');
    },[])

    //err state값이 변경될 때 마다 
    useEffect(()=>{
        console.log(err);
        const len = Object.keys(err).length;

        if(len === 0 && isSubmit){
          setSuccess(true);
        }else{
          setSuccess(false);
        }
    },[err])

    return(
        <main className="content join" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>join</h1>
                <section>
                    { success ? <div className="success">회원가입을 축하합니다.</div> : null}
                    {/* submit 제출 시 handleSubmit 함수 호출 */}
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <legend className="hidden">회원가입 양식</legend>
                            <table>
                                <caption className="hidden">회원가입 입력</caption>
                                <tbody>
                                    {/* userid */}
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
                                                value={val.userId}
                                                // onChange 추가해줘야 입력값을 리액트에서 읽기가능하다.
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.userId}</span>
                                        </td>
                                    </tr>
                                    {/* password */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="pwd">PASSWORD</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="password" 
                                                name="pwd" 
                                                id="pwd"
                                                placeholder="비밀번호를 입력하세요."
                                                value={val.pwd}
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.pwd}</span>
                                        </td>
                                    </tr>

                                    {/* password ck */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="repwd">PASSWORD CK</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="password" 
                                                name="repwd"
                                                id="repwd"
                                                placeholder="비밀번호를 확인해 주세요."
                                                value={val.repwd}
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.repwd}</span>
                                        </td>
                                    </tr>

                                    {/* email */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="email">E-MAIL</label>
                                        </th>
                                        <td>
                                            <input 
                                                type="email" 
                                                id="email"
                                                name="email"
                                                placeholder="이메일 주소를 입력하세요."
                                                value={val.email}
                                                onChange={handleChange}
                                            />
                                            <span className="err">{err.email}</span>
                                        </td>
                                    </tr>
                                    
                                    {/* gender */}
                                    <tr>
                                        <th scope="row"> GENDER</th>
                                        <td>
                                            <label htmlFor="male">Male</label>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                id="female" 
                                                onChange={handleRadio} 
                                            />
                                            <label htmlFor="female">Female</label>
                                            <input 
                                                type="radio" 
                                                name="gender" 
                                                id="female" 
                                                onChange={handleRadio} 
                                            />                               
                                            <span className="err">{err.gender}</span>
                                        </td>
                                    </tr>

                                    {/* interest */}
                                    <tr>
                                        <th scope="row">INTEREST</th>
                                        <td>
                                            <label htmlFor="sports">Sports</label>
                                            <input 
                                                type="checkbox" 
                                                name="interest" 
                                                id="sports" 
                                                onChange={handleCheck}
                                            />
                                            <label htmlFor="cooking">Cooking</label>
                                            <input 
                                                type="checkbox" 
                                                name="interest" 
                                                id="cooking" 
                                                onChange={handleCheck}
                                            />
                                            <label htmlFor="music">Music</label>
                                            <input 
                                                type="checkbox" 
                                                name="interest" 
                                                id="music" 
                                                onChange={handleCheck}
                                            />
                                            <span className="err">{err.interest}</span>
                                        </td>
                                    </tr>

                                    {/* edu */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="edu">EDUCATION</label>
                                        </th>
                                        <td>
                                            <select 
                                                name="edu" 
                                                id="edu"
                                                onChange={handleSelect}>
                                                <option value="">학력을 선택하세요.</option>
                                                <option value="elementary">초등학교 졸업</option>
                                                <option value="middle">중학교 졸업</option>
                                                <option value="high">고등학교 졸업</option>
                                                <option value="college">대학교 졸업</option>
                                            </select>
                                            <span className="err">{err.edu}</span>
                                        </td>
                                    </tr>

                                    {/* comments */}
                                    <tr>
                                        <th scope="row">
                                            <label htmlFor="comments">LEAVE COMMNETS</label>
                                        </th>
                                        <td>
                                            <textarea 
                                                name="comments" 
                                                id="comments" 
                                                value={val.comments}
                                                onChange={handleChange}
                                                cols="30" rows="10"
                                                placeholder="남기는 말"
                                            ></textarea>
                                            <span className="err">{err.comments}</span>
                                        </td>
                                    </tr>

                                    {/* 취소 제출 버튼 */}
                                    <tr>
                                        <th colSpan='2' className="btnSet">
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