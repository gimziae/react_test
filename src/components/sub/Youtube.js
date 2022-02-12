import axios from "axios";
import { useEffect, useRef, useState } from "react/cjs/react.development";

export default function Youtube(){
    let main = useRef(null);
    const [items, setItems] = useState([]);
    const [pop, setPop] = useState(false);
    const [index, setIndex] = useState(0);
    
    const api_key = 'AIzaSyBLmcoTvbceDJAzuKFsH7ks2aR4MwwJqn4';
    const play_list = 'PLYOPkdUKSFgX5CgKf68RJzJHec0XEdBNd';
    const num = 6;
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${api_key}&playlistId=${play_list}&maxResults=${num}`;

    useEffect(()=>{
        main.current.classList.add('on');

        axios
        .get(url)
        .then(json=>{
            console.log(json.data.items);
            setItems(json.data.items);
        })
    },[])
    return(
        <>
        <main className="content youtube" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>youtube</h1>
                <section>
                    {items.map((item,index)=>{
                        // return문 밖에서 데이터 변수 설정!
                        let tit = item.snippet.title;
                        let tit_len = tit.length;

                        let desc = item.snippet.description;
                        let desc_len = desc.length;


                        return(
                            <article key={index}>
                                <div className="wrap">
                                    <div className="pic" onClick={()=>{
                                        setPop(true);
                                        setIndex(index);
                                    }}>
                                        <img src={item.snippet.thumbnails.standard.url}/>
                                    </div>
                                    <div className="con">
                                        <h2>{ tit_len>40 ? tit.substr(0, 40) + "...": tit }</h2>
                                        <p>{ desc_len>200 ? desc.substr(0,200) + "..." : desc }</p>                                        
                                    </div>

                                </div>
                            </article>
                        )
                    })}
                </section>
            </div>
        </main>

        { pop ? <Popup /> : null }
        </>
    )

    function Popup(){
        useEffect(()=>{
            document.body.style.overflow = 'hidden';
            return ()=> document.body.style.overflow = 'auto';
        })
        return(
            <aside className="popup">
                <iframe 
                src={"https://www.youtube.com/embed/"+items[index].snippet.resourceId.videoId}  
                width='100%' 
                height='100%' 
                allowFullScreen
                frameborder="0"
                ></iframe>
                <span onClick={()=>{setPop(false);}}>close</span>
            </aside>
        )
    }
}