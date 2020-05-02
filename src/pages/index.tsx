import React from 'react';
import { useStaticRendering } from 'mobx-react';
import { Layout } from 'antd';
import FlexView from 'react-flexview';

import EntityTable from '~/containers/EntityTable';
import ItemsTable from '~/containers/ItemsTable';
import Settings from '~/containers/Settings';

import 'antd/dist/antd.css';

const { Header, Footer, Content } = Layout;

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

export default class Counter extends React.Component<any, any> {
  render(): any {
    return (
      <Layout>
        <Header>Header</Header>
        <Content
          style={{
            minHeight: '800px',
            backgroundColor: 'white',
            padding: '24px',
          }}
        >
          <FlexView>
            <EntityTable />
            <FlexView width={48} />
            <FlexView column>
              <FlexView hAlignContent="right">
                <Settings />
              </FlexView>
              <ItemsTable />
            </FlexView>
          </FlexView>
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}
