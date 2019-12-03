
// import { NextPage } from 'next'

// import { observable } from "mobx"

// // class Todo {
// //     id = Math.random()
// //     @observable title = ""
// //     @observable finished = false
// // }


// const Home: NextPage<{ userAgent: string }> = ({ userAgent }) => (
//     <h1>Hello world! - user agent: {userAgent}</h1>
// )

// Home.getInitialProps = async ({ req }) => {
//     const userAgent = req ? req.headers['user-agent'] || '' : navigator.userAgent;
//     return { userAgent };
// };

// export default Home

import React from 'react'
import Todo from '../components/Todo'

export default class Counter extends React.Component {
  render() {
    return (
        <div>
            <Todo></Todo>
            <Todo></Todo>
        </div>
    )
  }
}
