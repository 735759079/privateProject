import React from "react";
import { Divider, Tabs, Layout } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";
import TableContainer from "./file/tableContainer";
import TowMonth from "./file/towMonth";
import OneMonth from "./file/oneMonth";

moment.locale("zh-cn");
const { Content } = Layout;
const { TabPane } = Tabs;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowDate: moment().format("YYYY-MM-DD"),
      data: localStorage.getItem("peopleData")
        ? JSON.parse(localStorage.getItem("peopleData"))
        : []
    };
  }

  renderDataCallback = data => {
    this.setState({
      data: data
    });
  };

  delete = id => {
    console.log(id);
    const data = [].concat(this.state.data);
    let deleteIndex;
    data.forEach((item, index) => {
      if (item.id === id) {
        deleteIndex = index;
      }
    });
    data.splice(deleteIndex, 1);
    this.setState(
      {
        data: [].concat(data)
      },
      () => {
        localStorage.setItem("peopleData", JSON.stringify(this.state.data));
      }
    );
  };

  render() {
    return (
      <div>
        <Layout>
          <Content style={{ height: "800px" }}>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
              今天日期：<span>{this.state.nowDate}</span>
            </h2>
            <Tabs
              defaultActiveKey="1"
              tabPosition="left"
              type="card"
              style={{ backgroundColor: "#fff" }}
            >
              <TabPane tab="两个月" key="1">
                <TowMonth
                  renderDataCallback={this.renderDataCallback}
                  data={this.state.data}
                />
              </TabPane>
              <TabPane tab="一个月" key="2">
                <OneMonth
                  renderDataCallback={this.renderDataCallback}
                  data={this.state.data}
                />
              </TabPane>
            </Tabs>
            <Divider>数据</Divider>
            <TableContainer
              data={this.state.data}
              deleteCallback={this.delete}
            />
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}

export default App;
