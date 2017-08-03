import React from 'react'
import PropTypes from 'prop-types'
import { message as Message, Form, Input, Tooltip, Icon, Select, Button } from 'antd'
import service from '../services/aboutService.js'

import '../styles/about.scss'
import 'antd/dist/antd.css'

const FormItem = Form.Item
const Option = Select.Option

class AboutContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  static propTypes = {
    form: PropTypes.object
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err)
        return
      }
      this.sendFeedback(values)
      // if (!err) {
      //   console.log('Received values of form: ', values)
      // }
    })
  }
  // 重置反馈表单
  handleReset = () => {
    this.props.form.resetFields()
  }
  // 发送反馈意见
  sendFeedback = (message) => {
    const messageObj = JSON.stringify(message)
    const promise = service.sendFeedback(messageObj)
    promise.then(
      data => {
        if (data.status === 'OK') {
          this.handleReset()
          Message.success('您的意见反馈我们已经收到, 请耐心等待问题的解决!')
        }
      }
    ).catch(
      err => {
        console.error(err)
      }
    )
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    }
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select style={{ width: 60 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    )
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              反馈信息&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('feedback', {
            rules: [{ required: true, message: 'Please input your feedback!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系电话"
        >
          {getFieldDecorator('phone', {
            rules: [{ pattern: /^[0-9]{11}$/, required: true, message: 'Please input your phone number!' }],
          })(
            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
              联系姓名&nbsp;
              <Tooltip title="What do you want other to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          )}
          hasFeedback
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">Register</Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(AboutContainer)
