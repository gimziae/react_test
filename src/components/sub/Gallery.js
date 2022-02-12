// axios import 시키기
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Gallery(){
    let main = useRef();
    let [items, setItems] = useState([]);
    let [pop, setPop] = useState(false);
    let [index, setIndex] = useState(0);

    const api_key = 'b072a82db9c1f7aa2824864534bfc3a1';
    const method1 = 'flickr.interestingness.getList';
    const num = 5
    const url = `https://www.flickr.com/services/rest/?method=${method1}&per_page=${num}&api_key=${api_key}&format=json&nojsoncallback=1`;

    useEffect(()=>{
        main.current.classList.add('on');

        axios
            .get(url)
            .then(json=>{
                console.log(json.data.photos.photo);
                setItems(json.data.photos.photo);
            })

    },[])

    return(
        <>
        <main className="content gallery" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>gallery</h1>
                <section>
                    {items.map((item, index)=>{
                        return(
                            <article key={index}>
                                <div className="wrap">
                                    {/* pic에다가 클릭 이벤트 걸어주기 'onClick' */}
                                    <div className="pic" onClick={()=>{
                                        // setPop을 true로 변경해서 실행되게 함
                                        setPop(true);
                                        setIndex(index);
                                    }}>
                                        <img src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`} alt="" />
                                    </div>
                                    <h2>{item.title}</h2>
                                    <span>{item.owner}</span>          
                                </div>

                            </article>
                        )
                    })}
                </section>
            </div>
        </main>

        { pop ? <Popup /> : null}
        </>
    )

    function Popup(){
        useEffect(()=>{
            document.body.style.overflow = 'hidden';
            return ()=> document.body.style.overflow = 'auto';
        })
        return(
            <aside className="popup">
                <h1>{items[index].title}</h1>
                <img src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`} alt="" />
                <span onClick={()=>{
                    setPop(false);
                }}>close</span>
            </aside>
        )
    }
}

