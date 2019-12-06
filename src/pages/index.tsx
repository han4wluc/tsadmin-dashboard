import React from 'react'
import { Layout } from 'antd';
import EntityTable from '../containers/EntityTable'

import { useStaticRendering } from 'mobx-react'


const { Header, Footer, Content } = Layout

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export default class Counter extends React.Component<any, any> {

  componentWillMount() {
    this.setState({
      show: true
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        show: false
      })
    }, 3000)
  }

  render() {
    return (
        <Layout>
          <Header>Header</Header>
            <Content style={{minHeight: '800px', backgroundColor: 'white', padding: '24px'}}>
              <EntityTable />
            </Content>
            <Footer>
              Footer
            </Footer>
        </Layout>
    )
  }
}
