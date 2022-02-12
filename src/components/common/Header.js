// 라우터 처리 한 것 NavLink(active prop 지원) 연결하기 
import {NavLink} from 'react-router-dom';
//fontawsome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


export default function Header(props){
    const active = {color: 'orange'}

    return (
        // app.js에서 type을 main, sub로 나눈것을 header에서 props.type값으로 받는다
        // sass에서 스타일 따로 줌
        <header className={props.type}>
            <div className="inner">
                <h1><NavLink exact to='/'>LOGO</NavLink></h1>

                <ul id="gnb">
                    <li><NavLink activeStyle={active} to='/department'>Department</NavLink></li>
                    <li><NavLink activeStyle={active} to='/community'>Community</NavLink></li>
                    <li><NavLink activeStyle={active} to='/gallery'>Gallery</NavLink></li>
                    <li><NavLink activeStyle={active} to='/youtube'>Youtube</NavLink></li>
                    <li><NavLink activeStyle={active} to='/location'>Location</NavLink></li>
                    <li><NavLink activeStyle={active} to='/join'>Join</NavLink></li>
                </ul>

                <FontAwesomeIcon icon={faBars} />
            </div>
        </header>
    )
}
