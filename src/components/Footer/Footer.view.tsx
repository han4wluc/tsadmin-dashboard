import React from 'react';
import { Layout } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import FlexView from 'react-flexview';

const { Footer: AntdFooter } = Layout;

function Footer() {
  return (
    <AntdFooter>
      <a
        href="https://github.com/han4wluc/tsadmin-dashboard"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          textDecoration: 'none',
          color: 'rgba(0, 0, 0, 0.65)',
        }}
      >
        <FlexView hAlignContent="center" vAlignContent="center">
          <GithubOutlined />
          <div style={{ marginLeft: 8 }}>Github</div>
          <div style={{ marginLeft: 8 }}>han4wluc/tsadmin-dashboard</div>
        </FlexView>
      </a>
    </AntdFooter>
  );
}

export default Footer;
