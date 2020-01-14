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
      select: "-3次",
      valueSelect: "01",
      existId: [false, -1]
    };
  }

  submit = () => {
    const {
      getFieldsError,
      getFieldValue,
      validateFields
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
        const index = existData[1];
        const monthIndex = parseInt(getFieldValue("times")) - 1;
        const startTime = getFieldValue("startTime");
        const endTime = getFieldValue("endTime");
        const lastStartTime = getFieldValue("lastStartTime");
        const lastEndTime = getFieldValue("lastEndTime");
        const data = this.props.data;

        if (monthIndex === 6) {
          // 更新经期
          existData[0].menstrualArr[monthIndex] =
            moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;
        } else {
          // 更新周期
          existData[0].cycleArr[monthIndex] = moment(startTime).diff(
            moment(lastStartTime),
            "days"
          );
          // 更新经期
          existData[0].menstrualArr[monthIndex] =
            moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;
          existData[0].menstrualArr[monthIndex + 1] =
            moment(endTime).diff(moment(startTime), "days") + 1;
        }

        existData[0].startTimeArr[monthIndex] = lastStartTime.format(
          "YYYY-MM-DD"
        );
        existData[0].startTimeArr[monthIndex + 1] = startTime.format(
          "YYYY-MM-DD"
        );
        existData[0].endTimeArr[monthIndex] = lastEndTime.format("YYYY-MM-DD");
        existData[0].endTimeArr[monthIndex + 1] = endTime.format("YYYY-MM-DD");

        existData[0].nextDate = moment(startTime)
          .add(existData[0].cycleArr[monthIndex], "days")
          .format("YYYY-MM-DD");
        data[index] = existData[0];

        const newData = [].concat(data);

        this.props.renderDataCallback(newData);
        localStorage.setItem("peopleData", JSON.stringify(newData));
      } else {
        const cycleArr = [0, 0, 0, 0, 0, 0];
        const menstrualArr = [0, 0, 0, 0, 0, 0, 0];
        const startTimeArr = [0, 0, 0, 0, 0, 0, 0, 0];
        const endTimeArr = [0, 0, 0, 0, 0, 0, 0, 0];
        const monthIndex = parseInt(getFieldValue("times")) - 1;

        const startTime = getFieldValue("startTime");
        const endTime = getFieldValue("endTime");
        const lastStartTime = getFieldValue("lastStartTime");
        const lastEndTime = getFieldValue("lastEndTime");

        if (monthIndex === 6) {
          // 存储经期
          menstrualArr[monthIndex] =
            moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;
        } else {
          // 存储周期
          cycleArr[monthIndex] = moment(startTime).diff(
            moment(lastStartTime),
            "days"
          );
          // 存储经期
          menstrualArr[monthIndex] =
            moment(lastEndTime).diff(moment(lastStartTime), "days") + 1;
          menstrualArr[monthIndex + 1] =
            moment(endTime).diff(moment(startTime), "days") + 1;
        }

        // 存储每次输入的时间
        startTimeArr[monthIndex] = lastStartTime.format("YYYY-MM-DD");
        startTimeArr[monthIndex + 1] = startTime.format("YYYY-MM-DD");

        endTimeArr[monthIndex] = lastEndTime.format("YYYY-MM-DD");
        endTimeArr[monthIndex + 1] = endTime.format("YYYY-MM-DD");

        const newData = this.props.data.concat([
          {
            id: getFieldValue("id"),
            userName: getFieldValue("userName"),
            cycleArr: cycleArr,
            menstrualArr: menstrualArr,
            nextDate: moment(startTime)
              .add(cycleArr[monthIndex], "days")
              .format("YYYY-MM-DD"),
            startTimeArr: startTimeArr,
            endTimeArr: endTimeArr
          }
        ]);

        this.props.renderDataCallback(newData);
        localStorage.setItem("peopleData", JSON.stringify(newData));
      }
    }
  };

  reset = () => {
    const { setFieldsValue } = this.props.form;
    setFieldsValue({
      id: "",
      lastStartTime: null,
      lastEndTime: null,
      startTime: null,
      endTime: null
    });
  };

  change = (value, option) => {
    this.setState({
      select: option.props.children,
      valueSelect: value
    });
  };

  queryId = () => {
    const { getFieldValue } = this.props.form;
    const existId = [];
    this.props.data.forEach((item, index) => {
      if (item.id === getFieldValue("id")) {
        existId[0] = true;
        existId[1] = index;
      }
    });
    this.setState({
      existId: [].concat(existId)
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
          style={{ display: "flex", flexDirection: "row", marginTop: "20px" }}
        >
          <div style={{ width: "33%" }}>
            <Form.Item label="序号">
              {getFieldDecorator("id", {
                rules: [{ required: true, message: "Please input your id!" }]
              })(
                <Input
                  placeholder="请输入序号"
                  style={{ width: "200px" }}
                  onBlur={this.queryId}
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
            <Form.Item label="次数">
              {getFieldDecorator("times", {
                rules: [
                  {
                    required: true,
                    message: "Please select the times!"
                  }
                ],
                initialValue: this.state.valueSelect
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
                ],
                initialValue: this.state.existId[0]
                  ? this.props.data[this.state.existId[1]].startTimeArr[
                      parseInt(this.state.valueSelect) - 1
                    ]
                    ? moment(
                        this.props.data[this.state.existId[1]].startTimeArr[
                          parseInt(this.state.valueSelect) - 1
                        ]
                      )
                    : null
                  : null
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
            </Form.Item>
            <Form.Item label={`${this.state.select}月经结束时间`}>
              {getFieldDecorator("lastEndTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the end time of last month!"
                  }
                ],
                initialValue: this.state.existId[0]
                  ? this.props.data[this.state.existId[1]].endTimeArr[
                      parseInt(this.state.valueSelect) - 1
                    ]
                    ? moment(
                        this.props.data[this.state.existId[1]].endTimeArr[
                          parseInt(this.state.valueSelect) - 1
                        ]
                      )
                    : null
                  : null
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
                ],
                initialValue: this.state.existId[0]
                  ? this.props.data[this.state.existId[1]].startTimeArr[
                      parseInt(this.state.valueSelect)
                    ]
                    ? moment(
                        this.props.data[this.state.existId[1]].startTimeArr[
                          parseInt(this.state.valueSelect)
                        ]
                      )
                    : null
                  : null
              })(<DatePicker format={dateFormat} style={{ width: "250px" }} />)}
            </Form.Item>
            <Form.Item label="下次月经结束时间">
              {getFieldDecorator("endTime", {
                rules: [
                  {
                    required: true,
                    message: "Please select the end time of this month!"
                  }
                ],
                initialValue: this.state.existId[0]
                  ? this.props.data[this.state.existId[1]].endTimeArr[
                      parseInt(this.state.valueSelect)
                    ]
                    ? moment(
                        this.props.data[this.state.existId[1]].endTimeArr[
                          parseInt(this.state.valueSelect)
                        ]
                      )
                    : null
                  : null
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
