import React from 'react';
import { useStaticRendering } from 'mobx-react';
import { Layout } from 'antd';
import FlexView from 'react-flexview';

import EntityTable from '~/containers/EntityTable';
import ItemsTable from '~/containers/ItemsTable';
import Settings from '~/containers/Settings';
import Footer from '~/components/Footer';

import 'antd/dist/antd.css';

const { Header, Content } = Layout;

const isServer = typeof window === 'undefined';
// eslint-disable-next-line react-hooks/rules-of-hooks
useStaticRendering(isServer);

export default class Counter extends React.Component<any, any> {
  render(): any {
    return (
      <Layout>
        <Header className="header">
          <FlexView vAlignContent="center">
            <h3 style={{ marginBottom: 0 }}>tsadmin-dashboard</h3>
            <FlexView grow />
            <Settings />
          </FlexView>
        </Header>
        <Content
          style={{
            minHeight: '800px',
            backgroundColor: 'white',
            padding: '24px',
          }}
        >
          <FlexView>
            <FlexView marginRight={48} width={196}>
              <EntityTable />
            </FlexView>
            <FlexView
              column
              grow
              style={{
                maxWidth: 'calc(100vw - 200px)',
              }}
            >
              <ItemsTable />
            </FlexView>
          </FlexView>
        </Content>
        <Footer />
        <style jsx global>{`
          .header.ant-layout-header {
            background-color: white;
            line-height: 64px;
            height: 64px;
            overflow: scroll;
            box-shadow: 2px 4px 8px 1px #ececec;
          }
        `}</style>
      </Layout>
    );
  }
}
