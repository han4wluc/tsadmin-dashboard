import { HomeStore } from './Home.store';

import React from 'react';
import { Layout, Spin } from 'antd';
import FlexView from 'react-flexview';

import EntityTable from '~/containers/EntityTable';
import ItemsTable from '~/containers/ItemsTable';
import Settings from '~/containers/Settings';
import Footer from '~/components/Footer';
import ServerConfigurationModal from './components/ServerConfigurationModal';

type Props = {
  store: HomeStore;
};
const { Header, Content } = Layout;
function Home(props: Props): any {
  const { store } = props;

  return (
    <Layout>
      <Header className="header">
        <FlexView vAlignContent="center">
          <h3 style={{ marginBottom: 0 }}>tsadmin-dashboard</h3>
          <FlexView grow />
          <Settings />
        </FlexView>
      </Header>
      <Content className="content">
        {store.applicationIsLoading || !store.applicationServerIsConfigured ? (
          <FlexView hAlignContent="center" marginTop={32}>
            <Spin />
          </FlexView>
        ) : (
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
        )}
      </Content>
      <Footer />
      <ServerConfigurationModal
        visible={store.visible}
        url={store.url}
        onSubmit={store.submit}
        onCancel={store.hide}
      />
      <style jsx global>{`
        .content {
          min-height: 820px;
          background-color: white;
          padding: 24px;
        }
      `}</style>
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

export default Home;
