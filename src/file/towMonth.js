import React from "react";
import { DatePicker, Button, Input, Form, Select } from "antd";
import moment from "moment";
import "moment/locale/zh-cn";
import "antd/dist/antd.css";

const dateFormat = "YYYY/MM/DD";
const { Option } = Select;

class TabTwoMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select: "-3次"
    };
  }

  submit = () => {
    const {
      getFieldsError,
      getFieldValue,
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
      this.props.data.forEach((item, index) => {
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
        const data = this.props.data;

        existData[0].cycleArr[monthIndex] = moment(startTime).diff(
          moment(lastStartTime),
          "days"
        );
        existData[0].menstrualArr[monthIndex] =
          moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;

        existData[0].nextDate = moment(startTime)
          .add(existData[0].cycleArr[monthIndex], "days")
          .format("YYYY-MM-DD");
        data[existData[1]] = existData[0];

        const newData = [].concat(data);

        this.props.renderDataCallback(newData);
        localStorage.setItem("peopleData", JSON.stringify(newData));
        setFieldsValue({
          lastStartTime: startTime,
          lastEndTime: endTime,
          startTime: null,
          endTime: null
        });
      } else {
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

        const newData = this.props.data.concat([
          {
            id: getFieldValue("id"),
            userName: getFieldValue("userName"),
            cycleArr: cycleArr,
            menstrualArr: menstrualArr,
            nextDate: moment(startTime)
              .add(cycleArr[monthIndex], "days")
              .format("YYYY-MM-DD")
          }
        ]);

        this.props.renderDataCallback(newData);
        localStorage.setItem("peopleData", JSON.stringify(newData));
        setFieldsValue({
          lastStartTime: startTime,
          lastEndTime: endTime,
          startTime: null,
          endTime: null
        });
      }
    }
  };

  reset = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      // userName: "",
      id: '',
      lastStartTime: null,
      lastEndTime: null,
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
        <Form
          {...formItemLayout}
          style={{ display: "flex", flexDirection: "row",marginTop:'20px' }}
        >
          <div style={{ width: "33%" }}>
            <Form.Item label="序号">
              {getFieldDecorator("id", {
                rules: [{ required: true, message: "Please input your id!" }]
              })(<Input placeholder="请输入序号" style={{ width: "200px" }} />)}
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
            <Form.Item label="次数">
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
          <div style={{ width: "33%" }}>
            <Form.Item label={`${this.state.select}月经开始时间`}>
              {getFieldDecorator("lastStartTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the start time of last month!"
                  }
                ]
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
            </Form.Item>
            <Form.Item label={`${this.state.select}月经结束时间`}>
              {getFieldDecorator("lastEndTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the end time of last month!"
                  }
                ]
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
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
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
            </Form.Item>
            <Form.Item label="下次月经结束时间">
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the end time of last month!"
                  }
                ]
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
            </Form.Item>
          </div>
        </Form>

        <div className="tabBtn">
          <Button onClick={this.reset}>清空</Button>
          <Button
            type="primary"
            onClick={this.submit}
            style={{ marginLeft: "50px" }}
          >
            确定
          </Button>
        </div>
      </div>
    );
  }
}

const TabTwoMonthForm = Form.create()(TabTwoMonth);
export default TabTwoMonthForm;
