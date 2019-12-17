import React from 'react'
import { useStaticRendering } from 'mobx-react'
import { Layout } from 'antd';
import FlexView from 'react-flexview'

import EntityTable from '~/containers/EntityTable'
import ItemsTable from '~/containers/ItemsTable'
// import ItemFrom from '~/containers/EntityTable/components/ItemForm'



const { Header, Footer, Content } = Layout

const isServer = typeof window === 'undefined'
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer)

export default class Counter extends React.Component<any, any> {

  // componentWillMount() {
  //   this.setState({
  //     show: true
  //   })
  // }

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({
  //       show: false
  //     })
  //   }, 3000)
  // }

  render() {
    return (
        <Layout>
          <Header>Header</Header>
            <Content style={{minHeight: '800px', backgroundColor: 'white', padding: '24px'}}>
              <FlexView>
                <EntityTable />
                <ItemsTable />
              </FlexView>
             {/* <ItemFrom/> */}
            </Content>
            <Footer>
              Footer
            </Footer>
        </Layout>
    )
  }
}
