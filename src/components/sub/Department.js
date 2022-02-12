import { useEffect, useRef } from "react/cjs/react.development"
import axios from "axios";
import { useState } from "react";

export default function Department(){
    let main = useRef(null);
    const [members, setMembers] = useState([]);
    const path = process.env.PUBLIC_URL;
    const url = `${path}/db/department.json`;

    useEffect(()=>{
        //해당 컴포넌트가 생성될 때 처음 한번만 실행
        console.log('department 컴포넌트 생성');
        main.current.classList.add('on');

        axios
            .get(url)
            .then(json=>{
                console.log(json.data.data);
                setMembers(json.data.data);
            })
    },[])
    return(
        <main className="content department" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>DEPARTMENT</h1>
                <section>
                    {members.map((data, idx)=>{
                        return(
                            <article key={idx}>
                                <div className="pic">
                                   <img src={`${path}/img/${data.pic}`} />
                                </div>
                                <div className="con">
                                    <h2>{data.name}</h2>
                                    <span>{data.position}</span>                       
                                </div>

                            </article>
                        )
                    })}
                </section>
            </div>
        </main>
    )
}