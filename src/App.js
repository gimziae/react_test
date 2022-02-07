import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

import Visual from "./components/main/VIsual";
import Info from "./components/main/Info";
import Intro from "./components/main/Intro";

import Department from "./components/sub/Department";
import Community from "./components/sub/Community";
import Gallery from "./components/sub/Gallery";
import Youtube from "./components/sub/Youtube";
import Location from "./components/sub/Location";
import Join from "./components/sub/Join";

import './scss/style.scss';
import {Route} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Header />

      {/* exact : /만 존재할 때 보이게 하는 것 
          만약 /뒤에 다른 경로가 붙으면 exact path에 해당되는 route는 보이지 않는다. */}
      <Route exact path="/">
        <Visual />
        <Intro />
        <Info />        
      </Route>

      {/* 해당 주소(path)일 때 만 불러올 수 있게 지정해주는 것 */}
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

