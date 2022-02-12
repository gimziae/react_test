import Main from "./components/main/Main";

import Header from "./components/common/Header";

import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";

import Footer from "./components/common/Footer";

// sass 연결 (npm install sass --save)
import './scss/style.scss';
// index에서 BrowserRouter 처리 한 뒤 여기서 Route 처리 하기
import {Route, Switch} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      {/* 처음에 다 import 해온 파일들 배치하기 */}
      {/* exact : /(메인페이지) 경로일 때만 존재할 때 보이게 하는 것 
          만약 /뒤에 다른 경로가 붙으면 exact path에 해당되는 route는 보이지 않는다. */}
      {/* Switch : 각 라우터를 Switch로 컴포넌트를 감싸놓으면 중첩되는 경로가 있을 때 
          첫번째 경로만 적용하고 그 이후는 무시
          Switch를 활용할 때에는 중첩되는 url경로 중 디테일한 요소를 보통 위쪽에 배치해서 Route를 세분화
          공통적인 ui인데 메인페이지만 따로 헤더를 주고싶을 때 사용한다!
       */}
      <Switch>
        {/* 메인페이지(/빈경로)에서의 레이아웃 구조 */}
        {/* Main.js 컴포넌트 추가해서 따로 빼준다 */}
        <Route exact path="/" component={Main}></Route>
  
       {/* 서브페이지(/~~ 붙었을 경우)의 헤더 영역 따로 줄거기 때문에 한번 더 헤더 빼주기*/}
        <Route path="/"><Header type={"sub"} /></Route>
      </Switch>

      {/* 해당 경로(path)일 때 만 불러올 수 있게 지정해주는 것 */}
      <Route path="/department" component={Department}></Route>
      <Route path="/community" component={Community}></Route>
      <Route path="/gallery" component={Gallery}></Route>
      <Route path="/youtube" component={Youtube}></Route>
      <Route path="/location" component={Location}></Route>
      <Route path="/join" component={Join}></Route>
      {/* <Department />
      <Community />
      <Gallery />
      <Youtube />
      <Location />
      <Join /> */}

      <Footer />
    </div>
  );
}

