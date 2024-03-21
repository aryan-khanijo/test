import { Layout, Menu } from "antd";
const { Header } = Layout;
const Mainpage = () => {
  return (
    <Layout className="layout">
      <Header>
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key={1}>
            <a href="/login">{"Login"}</a>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};
export default Mainpage;
