import React from "react";
import { Input, Table, Tag } from "antd";
import moment from "moment";

const { Column, ColumnGroup } = Table;

export default class TableContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menstrual_id: 0,
      menstrual_min: 0,
      menstrual_max: 0,
      cycle_id: 0,
      cycle_min: 0,
      cycle_max: 0
    };
  }

  changeMenstrualRangeInput = (e, record) => {
    const rangeArr = e.currentTarget.value.split("-");
    this.setState({
      menstrual_min: rangeArr[0],
      menstrual_max: rangeArr[1],
      menstrual_id: record.id
    });
  };

  changeCycleRangeInput = (e, record) => {
    const rangeArr = e.currentTarget.value.split("-");
    this.setState({
      cycle_min: rangeArr[0],
      cycle_max: rangeArr[1],
      cycle_id: record.id
    });
  };

  showTotal = total => {
    return `共${total}条`;
  };

  delete = (e, record) => {
    this.props.deleteCallback(record.id);
  };

  render() {
    return (
      <div className="tableContainer">
        <Table
          dataSource={this.props.data}
          rowKey="id"
          bordered={true}
          scroll={{ x: 1360, y: 800 }}
          className="example"
          pagination={{
            total: this.props.data.length,
            pageSize: 100,
            showTotal: this.showTotal
          }}
        >
          <Column title="序号" dataIndex="id" key="id" width={60} />
          {/* <Column title="姓名" dataIndex="userName" key="age" /> */}
          <Column
            title="周期筛选范围"
            key="cycle_range"
            width={80}
            align="center"
            render={(_text, record) => {
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
            render={(_text, record) => {
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
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[0]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[0] >= this.state.cycle_min &&
                            record.cycleArr[0] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[0]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[0]}</span>
                  );
                }
              }}
            />
            <Column
              title="-2~-1"
              key="cycle_2"
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[1]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[1] >= this.state.cycle_min &&
                            record.cycleArr[1] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[1]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[1]}</span>
                  );
                }
              }}
            />
            <Column
              title="-1~1"
              key="cycle_3"
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[2]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[2] >= this.state.cycle_min &&
                            record.cycleArr[2] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[2]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[2]}</span>
                  );
                }
              }}
            />
            <Column
              title="1~2"
              key="cycle_4"
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[3]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[3] >= this.state.cycle_min &&
                            record.cycleArr[3] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[3]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[3]}</span>
                  );
                }
              }}
            />
            <Column
              title="2~3"
              key="cycle_5"
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[4]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[4] >= this.state.cycle_min &&
                            record.cycleArr[4] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[4]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[4]}</span>
                  );
                }
              }}
            />
            <Column
              title="3~4"
              key="cycle_6"
              width={60}
              align="center"
              render={(_text, record) => {
                if (record.id === this.state.cycle_id && record.cycleArr[5]) {
                  return (
                    <span
                      className={
                        this.state.cycle_min || this.state.cycle_max
                          ? record.cycleArr[5] >= this.state.cycle_min &&
                            record.cycleArr[5] <= this.state.cycle_max
                            ? "cycleNormal"
                            : "cycleAlert"
                          : "cycleNormal"
                      }
                    >
                      {record.cycleArr[5]}
                    </span>
                  );
                } else {
                  return (
                    <span className="cycleNormal">{record.cycleArr[5]}</span>
                  );
                }
              }}
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[0]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[1]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[2]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[3]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[4]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[5]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
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
                      className={
                        this.state.menstrual_min || this.state.menstrual_max
                          ? record.menstrualArr[0] >=
                              this.state.menstrual_min &&
                            record.menstrualArr[0] <= this.state.menstrual_max
                            ? "menstrualNormal"
                            : "menstrualAlert"
                          : "menstrualNormal"
                      }
                    >
                      {record.menstrualArr[6]}
                    </span>
                  );
                } else {
                  return (
                    <span className="menstrualNormal">
                      {record.menstrualArr[6]}
                    </span>
                  );
                }
              }}
            />
          </ColumnGroup>
          <Column
            title="预计月经周期"
            key="next_cycle"
            width={80}
            align="center"
            render={(_text, record) => {
              const data = record.cycleArr.filter(item => {
                return item !== 0;
              });
              let sum = 0;
              data.forEach(item => {
                sum += item;
              });
              return Math.round(sum / data.length) + "天";
            }}
          />
          <Column
            title="预计下次月经时间"
            dataIndex="nextDate"
            key="next_date"
            width={200}
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
                    <Tag color="red" style={{ marginLeft: "20px" }}>
                      已失效
                    </Tag>
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
            render={(_text, record) => {
              return (
                <span
                  className="deleteBtn"
                  onClick={e => this.delete(e, record)}
                >
                  删除
                </span>
              );
            }}
          />
        </Table>
      </div>
    );
  }
}
