import React from 'react'
const typesElement = {
    One:function One(props) {
        return <p>one {true.toString()}</p>
    },
    Two:function Two(props) {
        return <p>two</p>
    }
};
function MyButton(props) {
    const Com = typesElement[props.type];
    return <Com/>
}
function Jsx(props) {
    return <MyButton type='One'/>
}
export default Jsx;