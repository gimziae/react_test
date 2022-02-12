import { useEffect, useRef, useState } from "react";

export default function Location(){
    let main = useRef(null);
    const {kakao} = window; //인덱스.html 에서 가져옴 (비구조할당)
    const container = useRef(null); //지도가 들어갈 공간 참조 (#map)
    const [map, setMap] = useState(null); //지도 생성 참조
    const [index, setIndex] = useState(0); //순서값 참조
    const path = process.env.PUBLIC_URL; //퍼블릭 폴더 절대경로(이미지 참조)

    // 3. kakao 마커 위치정보 및 이미지
    const info =[ 
        {
            title:"본점", 
            latlng : new kakao.maps.LatLng(37.266444, 126.9972137),
            imgSrc : path+'/img/marker.png', 
            imgSize : new kakao.maps.Size(100,100), 
            imgPos : {offset: new kakao.maps.Point(116, 99)},
        },
        {
            title:"지점1", 
            latlng : new kakao.maps.LatLng(33.450701, 126.570667),
            imgSrc : path+'/img/marker.png',  
            imgSize : new kakao.maps.Size(100,100), 
            imgPos : {offset: new kakao.maps.Point(116, 99)},
        },
        {
            title:"지점2", 
            latlng : new kakao.maps.LatLng(37.557527,126.9222836),
            imgSrc : path+'/img/marker.png', 
            imgSize : new kakao.maps.Size(100,100), 
            imgPos : {offset: new kakao.maps.Point(116, 99)}, 
        }
    ]; 
    // info 값을 mapInfo에 담기
    const [mapInfo] = useState(info);

    //처음 컴포넌트 생성 시 한번만 실행
    useEffect(()=>{
        main.current.classList.add('on');        
    },[]) 
        //[] : 의존성 (라이프 사이클 훅) 
            //[ ] 빈 배열 : 컴포넌트 생성 시 나타나게
            //[return] : 컴포넌트 끝날때 나타나게 하는
            //[index] : index번째에 나타나게 하는

    //&&index state값이 변경될 때마다 해당 useEffect를 재실행
    useEffect(()=>{

        // 해당 훅함수가 재호출 될 때 마다 일단 #map 안쪽을 비워둔 다음에 재실행
        // : 설정해두면 지도가 중첩되는걸 막아준다
        container.current.innerHTML = '';

        // 1. 옵션 생성 첫페이지 위치
        const options = {
            center: mapInfo[0].latlng, // 본점 위치
            level: 3
        }

        // 2. 지도 생성하는 코드
        const map = new kakao.maps.Map(container.current, options);
        setMap(map);

        // 4. 마커 생성하는 코드 (const index값 참조)
        new kakao.maps.Marker({
            map: map,
            position: mapInfo[index].latlng,
            title: mapInfo[index].title,
            image: new kakao.maps.MarkerImage(mapInfo[index].imgSrc, mapInfo[index].imgSize, mapInfo[index].imgPos)
        })
        
        // 5. 가운데배치
         // 순서 state값이 변경될 때 마다 맵의 중앙위치를 다시 렌더링(가운데 배치)
        map.setCenter(mapInfo[index].latlng);  

         // mapSet 함수를 변수로 설정
        const mapSet = () => map.setCenter(mapInfo[index].latlng);   

         // 브라우저 리사이즈 시 마커를 중앙에 위치
        window.addEventListener("resize", mapSet);

        // 스카이뷰 생성
        const mapType = new kakao.maps.MapTypeControl();
        map.addControl(mapType, kakao.maps.ControlPosition.TOPRIGHT);

        //휠 이용해 지도 확대 축소 
        map.setZoomable(true);
        //마우스드래그로 지도 위치 옮기기
        map.setDraggable(true);

         // 해당 컴포넌트가 재 랜더링 될 때 마다 기존 window 객체에 등록된 함수를 다시 제거
        return ()=> window.removeEventListener("resize", mapSet);
    },[index]);


    return(
        <main className="content location" ref={main}>
            <figure></figure>
            <div className="inner">
                <h1>location</h1>
                <section>
                    {/* 맵이 들어갈 공간 */}
                    <div id="map" ref={container}></div>

                    {/* 교통정보 버튼 */}
                    <nav className="traffic">
                        <button onClick={()=>{
                            map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                        }}>교통정보 보기</button>
                        <button onClick={()=>{
                            map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
                        }}>교통정보 끄기</button>
                    </nav>

                    {/* 지점 설정 버튼 */}
                    <nav className="branch">
                        {/* <button onClick={()=>{
                            setIndex(0);
                        }}>본점</button>
                        <button onClick={()=>{
                            setIndex(1);
                        }}>지점1</button>
                        <button onClick={()=>{
                            setIndex(2);
                        }}>지점2</button> */}
                        {mapInfo.map((data, index)=>{
                            return(
                               <button key={index} onClick={()=>{
                                   setIndex(index)}}>{data.title}</button>  
                            )
                        })}
                    </nav>
                </section>
            </div>
        </main>
    )
}