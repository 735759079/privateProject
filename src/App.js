import React from "react";
import { DatePicker, Button, Layout, Input, Form, Table, Select } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";

moment.locale("zh-cn");
const dateFormat = "YYYY/MM/DD";
const { Content } = Layout;
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nowDate: moment().format("YYYY-MM-DD"),
      data: localStorage.getItem("peopleData")
        ? JSON.parse(localStorage.getItem("peopleData"))
        : [],
      select: "-3次",
      menstrual_id: 0,
      menstrual_min: 0,
      menstrual_max: 0,
      cycle_id: 0,
      cycle_min: 0,
      cycle_max: 0
    };
  }

  submit = () => {
    const {
      getFieldsError,
      getFieldValue,
      getFieldsValue,
      validateFields,
      setFieldsValue
    } = this.props.form;
    validateFields();
    if (
      !Object.values(getFieldsError()).filter(item => {
        return item !== undefined;
      }).length
    ) {
      const existData = [];
      this.state.data.forEach((item, index) => {
        if (item.id === getFieldValue("id")) {
          existData.push(item, index);
        }
      });

      if (existData.length) {
        const monthIndex = parseInt(getFieldValue("times")) - 1;
        const startTime = getFieldValue("startTime");
        const endTime = getFieldValue("endTime");
        const lastStartTime = getFieldValue("lastStartTime");
        const lastEndTime = getFieldValue("lastEndTime");
        const data = this.state.data;

        existData[0].cycleArr[monthIndex] = moment(startTime).diff(
          moment(lastStartTime),
          "days"
        );
        existData[0].menstrualArr[monthIndex] =
          moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;

        existData[0].nextDate = moment(startTime)
          .add(existData[0].cycleArr[monthIndex], "days")
          .format("YYYY-MM-DD");
        console.log(existData[0]);
        data[existData[1]] = existData[0];
        this.setState(
          {
            data: [].concat(data)
          },
          () => {
            console.log(this.state.data);
            localStorage.setItem("peopleData", JSON.stringify(this.state.data));
            setFieldsValue({
              lastStartTime: startTime,
              lastEndTime: endTime,
              startTime: null,
              endTime: null
            });
          }
        );
      } else {
        console.log(getFieldsValue());
        const cycleArr = [0, 0, 0, 0, 0, 0, 0];
        const menstrualArr = [0, 0, 0, 0, 0, 0, 0];
        const monthIndex = parseInt(getFieldValue("times")) - 1;

        const startTime = getFieldValue("startTime");
        const endTime = getFieldValue("endTime");
        const lastStartTime = getFieldValue("lastStartTime");
        const lastEndTime = getFieldValue("lastEndTime");

        cycleArr[monthIndex] = moment(startTime).diff(
          moment(lastStartTime),
          "days"
        );
        menstrualArr[monthIndex] =
          moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;

        console.log(monthIndex, cycleArr, menstrualArr);
        this.setState(
          {
            data: this.state.data.concat([
              {
                id: getFieldValue("id"),
                userName: getFieldValue("userName"),
                cycleArr: cycleArr,
                menstrualArr: menstrualArr,
                nextDate: moment(startTime)
                  .add(cycleArr[monthIndex], "days")
                  .format("YYYY-MM-DD")
              }
            ])
          },
          () => {
            console.log(this.state.data);
            localStorage.setItem("peopleData", JSON.stringify(this.state.data));
            setFieldsValue({
              lastStartTime: startTime,
              lastEndTime: endTime,
              startTime: null,
              endTime: null
            });
          }
        );
      }
    }
  };
  reset = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      userName: "",
      lastStartTime: null,
      startTime: null,
      endTime: null
    });
  };

  change = (value, option) => {
    console.log(value, option.props.children);
    this.setState({
      select: option.props.children
    });
  };

  changeMenstrualRangeInput = (e, record) => {
    const rangeArr = e.currentTarget.value.split("-");
    this.setState({
      menstrual_min: rangeArr[0],
      menstrual_max: rangeArr[1],
      menstrual_id: record.id
    });
  };

  changeCycleRangeInput=(e, record)=>{

  }

  showTotal = total => {
    return `共${total}条`;
  };

  delete = (e, record) => {
    console.log(e, record);
    const data = [].concat(this.state.data);
    console.log(this.state.data)
    let deleteIndex;
    data.forEach((item,index)=>{
      if(item.id === record.id){
        deleteIndex = index
      }
    })
    data.splice(deleteIndex,1)
    console.log(data)
    this.setState({
      data:[].concat(data)
    },()=>{
      localStorage.setItem("peopleData", JSON.stringify(this.state.data));
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    return (
      <div>
        <Layout>
          {/* <Header style={{ background: "#7dbcea" }}>
            <div style={{ marigin: "0 auto" }}>经期记录</div>
          </Header> */}
          <Content style={{ height: "800px" }}>
            <h2 style={{ textAlign: "center", margin: "20px 0" }}>
              今天日期：<span>{this.state.nowDate}</span>
            </h2>
            <Form
              {...formItemLayout}
              style={{ display: "flex", flexDirection: "row" }}
            >
              <div style={{ width: "33%" }}>
                <Form.Item label="序号">
                  {getFieldDecorator("id", {
                    rules: [
                      { required: true, message: "Please input your id!" }
                    ]
                  })(
                    <Input
                      placeholder="请输入序号"
                      style={{ width: "200px" }}
                    />
                  )}
                </Form.Item>
                {/* <Form.Item label="姓名">
                {getFieldDecorator("userName", {
                  rules: [
                    { required: true, message: "Please input your username!" }
                  ]
                })(
                  <Input
                    prefix={
                      <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                    }
                    placeholder="请输入姓名"
                    style={{ width: "300px" }}
                  />
                )}
              </Form.Item> */}
                <Form.Item label="本月月份">
                  {getFieldDecorator("times", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the times!"
                      }
                    ],
                    initialValue: "01"
                  })(
                    <Select style={{ width: "100px" }} onChange={this.change}>
                      <Option value="01">-3次</Option>
                      <Option value="02">-2次</Option>
                      <Option value="03">-1次</Option>
                      <Option value="04">1次</Option>
                      <Option value="05">2次</Option>
                      <Option value="06">3次</Option>
                      <Option value="07">4次</Option>
                    </Select>
                  )}
                </Form.Item>
              </div>
              {/* <Form.Item label="经期范围">
                {getFieldDecorator("range", {
                  rules: [{ required: true, message: "Please input range!" }]
                })(
                  <Input placeholder="请输入范围" style={{ width: "300px" }} />
                )}
              </Form.Item> */}
              <div style={{ width: "33%" }}>
                <Form.Item label={`${this.state.select}月经开始时间`}>
                  {getFieldDecorator("lastStartTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the start time of last month!"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: "250px" }}
                    />
                  )}
                </Form.Item>
                <Form.Item label={`${this.state.select}月经结束时间`}>
                  {getFieldDecorator("lastEndTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the end time of last month!"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: "250px" }}
                    />
                  )}
                </Form.Item>
              </div>
              <div style={{ width: "33%" }}>
                <Form.Item label="下次月经开始时间">
                  {getFieldDecorator("startTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the start time of this month!"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: "250px" }}
                    />
                  )}
                </Form.Item>
                <Form.Item label="下次月经结束时间">
                  {getFieldDecorator("endTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please select the end time of last month!"
                      }
                    ]
                  })(
                    <DatePicker
                      format={dateFormat}
                      style={{ width: "250px" }}
                    />
                  )}
                </Form.Item>
              </div>
            </Form>

            <div
              style={{
                display: "flex",
                justifyContent: "center ",
                marginBottom: "20px"
              }}
            >
              <Button onClick={this.reset}>清空</Button>
              <Button
                type="primary"
                onClick={this.submit}
                style={{ marginLeft: "50px" }}
              >
                确定
              </Button>
            </div>
            <div className="tableContainer">
              <Table
                dataSource={this.state.data}
                rowKey="id"
                bordered={true}
                scroll={{ x: 1360, y: 800 }}
                className="example"
                pagination={{
                  total: this.state.data.length,
                  pageSize: 100,
                  showTotal: this.showTotal
                }}
              >
                <Column title="序号" dataIndex="id" key="id" width={80} />
                {/* <Column title="姓名" dataIndex="userName" key="age" /> */}
                <Column
                  title="周期筛选范围"
                  key="cycle_range"
                  width={80}
                  align="center"
                  render={(text, record) => {
                    return (
                      <Input
                        placeholder="请输入周期筛选范围"
                        onChange={e => this.changeCycleRangeInput(e, record)}
                      />
                    );
                  }}
                />
                <Column
                  title="经期筛选范围"
                  key="menstrual_range"
                  width={80}
                  align="center"
                  render={(text, record) => {
                    return (
                      <Input
                        placeholder="请输入经期筛选范围"
                        onChange={e => this.changeMenstrualRangeInput(e, record)}
                      />
                    );
                  }}
                />
                <ColumnGroup title="周期">
                  <Column
                    title="-3--2"
                    key="cycle_1"
                    render={(_text, record) => (
                      <span>{record.cycleArr[0]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                  <Column
                    title="-2~-1"
                    key="cycle_2"
                    render={(_text, record) => (
                      <span>{record.cycleArr[1]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                  <Column
                    title="-1~1"
                    key="cycle_3"
                    render={(_text, record) => (
                      <span>{record.cycleArr[2]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                  <Column
                    title="1~2"
                    key="cycle_4"
                    render={(_text, record) => (
                      <span>{record.cycleArr[3]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                  <Column
                    title="2~3"
                    key="cycle_5"
                    render={(_text, record) => (
                      <span>{record.cycleArr[4]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                  <Column
                    title="3~4"
                    key="cycle_6"
                    render={(_text, record) => (
                      <span>{record.cycleArr[5]}</span>
                    )}
                    width={60}
                    align="center"
                  />
                </ColumnGroup>
                <ColumnGroup title="经期">
                  <Column
                    title="-3"
                    width={60}
                    align="center"
                    key="menstrual_1"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[0]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[0] >= this.state.menstrual_min &&
                                  record.menstrualArr[0] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[0]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[0]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="-2"
                    width={60}
                    align="center"
                    key="menstrual_2"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[1]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[1] >= this.state.menstrual_min &&
                                  record.menstrualArr[1] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[1]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[1]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="-1"
                    width={60}
                    align="center"
                    key="menstrual_3"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[2]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[2] >= this.state.menstrual_min &&
                                  record.menstrualArr[2] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[2]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[2]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="1"
                    width={60}
                    align="center"
                    key="menstrual_4"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[3]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[3] >= this.state.menstrual_min &&
                                  record.menstrualArr[3] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[3]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[3]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="2"
                    width={60}
                    align="center"
                    key="menstrual_5"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[4]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[4] >= this.state.menstrual_min &&
                                  record.menstrualArr[4] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[4]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[4]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="3"
                    width={60}
                    align="center"
                    key="menstrual_6"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[5]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[5] >= this.state.menstrual_min &&
                                  record.menstrualArr[5] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[5]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[5]}
                          </span>
                        );
                      }
                    }}
                  />
                  <Column
                    title="4"
                    key="menstrual_7"
                    width={60}
                    align="center"
                    render={(_text, record) => {
                      if (
                        record.id === this.state.menstrual_id &&
                        record.menstrualArr[6]
                      ) {
                        return (
                          <span
                            style={
                              this.state.menstrual_min || this.state.menstrual_max
                                ? record.menstrualArr[6] >= this.state.menstrual_min &&
                                  record.menstrualArr[6] <= this.state.menstrual_max
                                  ? {
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                  : {
                                      backgroundColor: "yellow",
                                      display: "inline-block",
                                      width: "28px",
                                      textAlign: "center"
                                    }
                                : {
                                    display: "inline-block",
                                    width: "28px",
                                    textAlign: "center"
                                  }
                            }
                          >
                            {record.menstrualArr[6]}
                          </span>
                        );
                      } else {
                        return (
                          <span
                            style={{
                              display: "inline-block",
                              width: "28px",
                              textAlign: "center"
                            }}
                          >
                            {record.menstrualArr[6]}
                          </span>
                        );
                      }
                    }}
                  />
                </ColumnGroup>
                <Column
                  title="预计下次月经时间"
                  dataIndex="nextDate"
                  key="next"
                  width={300}
                  render={(text, record) => {
                    if (
                      moment(text).diff(moment(), "days") < 3 &&
                      moment(text).diff(moment(), "days") >= 0
                    ) {
                      return <span style={{ color: "red" }}>{text}</span>;
                    } else if (moment(text).diff(moment(), "days") < 0) {
                      return (
                        <span>
                          {text}
                          <span style={{ color: "red", marginLeft: "20px" }}>
                            请重新预计下个月时间
                          </span>
                        </span>
                      );
                    } else {
                      return <span>{text}</span>;
                    }
                  }}
                />
                <Column
                  title="操作"
                  key="option"
                  align="center"
                  width={80}
                  render={(text, record) => {
                    return (
                      <span
                        style={{
                          color: "blue",
                          cursor: "pointer",
                          textDecoration: "underline"
                        }}
                        onClick={e => this.delete(e, record)}
                      >
                        删除
                      </span>
                    );
                  }}
                />
              </Table>
            </div>
          </Content>
          {/* <Footer>Footer</Footer> */}
        </Layout>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(App);
export default WrappedNormalLoginForm;
