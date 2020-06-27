import Router from 'next/router'

export default()=>(
    <div onClick={()=>{Router.push('/')}}>Go back</div>
)