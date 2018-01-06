export default function (store) {
   const dispatch = store.dispatch;
    this.$http.post('/staff/list').then(res => {
        const resData = res.data || {};
        if(resData.code + '' === '0'){
            dispatch({
                type:'getStaff',
                data:resData.data || []
            });
        }
    });
    this.$http.post('/dept/list').then(res => {
        const resData = res.data || {};
        if(resData.code + '' === '0'){
            dispatch({
                type:'getDept',
                data:resData.data || []
            });
        }
    })
}