
import React from 'react'
import {
    Form,
    Input,
    Button,
    Tooltip,
    Icon,
    Select,
    DatePicker,
    InputNumber,
    Tag
} from 'antd';
import moment, { updateLocale } from 'moment'

const { TextArea } = Input;

const {
  Option
} = Select

function getIfDisabled(mode: string, create: any, update: any) {
  let disabled = false
  if (mode === 'create' && create.editable === false) {
    disabled = true
  }
  if (mode === 'update' && update.editable === false) {
    disabled =true
  }
  return disabled
}

function RegistrationForm(props: any) {  

  const { getFieldDecorator } = props.form;
  const { columns, item={}, mode } = props

  const handleSubmit = (e: any) => {
    e.preventDefault();
    props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (err) {
        return 
      }
      const finalValues: any = {}

      columns.forEach((column: any) => {
        const { label, type, create, update } = column
        const disabled = getIfDisabled(mode, create, update)
        if (disabled === true) {
          return
        }
        if (type === 'date') {
          finalValues[label] = values[label] ? values[label].format("YYYY-MM-DD") : undefined
        } else if(type === 'datetime') {
          finalValues[label] = values[label] ? JSON.stringify(values[label]) : undefined
        } else if(type === 'json') {
          finalValues[label] = values[label] ? JSON.parse(values[label]) : undefined
        } else {
          finalValues[label] = values[label]
        }
      })

      console.log('Received values of form: ', finalValues);
    });
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const formsComp = columns.filter((column: any) => {
    if(mode === 'create'){
      return column.create && column.create.display === true
    }
    if(mode === 'update') {
      return column.update && column.update.display === true
    }
    return true
  }).map((column: any) => {
    const {
      label,
      type,
      enum: enums,
      required,
      create = {},
      update = {}
    } = column
    const rules: any = []
    if (required) {
      rules.push(
        {
          required: true,
          message: 'Field is required',
        }
      )
    }



    const disabled = getIfDisabled(mode, create, update)

    let comp = <Input disabled={disabled} />
    let initialValue = item[label]

    if ((mode === 'create') && (initialValue === undefined) && (create.default !== undefined)) {
      initialValue = create.default
    }

    if (type === 'enum') {
      const options = enums.map((e: string) => {
        return (
          <Option key={e} value={e}>{e}</Option>
        )
      })
      comp = (
        <Select disabled={disabled}>
          {options}
        </Select>
      )
    }
    if (type === 'number') {
      comp = <InputNumber disabled={disabled} style={{width: 300}}/>
    }
    if (type === 'datetime') {
      comp = <DatePicker disabled={disabled} showTime placeholder="Select Date and Time" />
      if (item[label]) {
        initialValue = moment(initialValue)
      }
    }
    if (type === 'date') {
      comp = <DatePicker disabled={disabled} placeholder="Select Date" />
      if (item[label]) {
        initialValue = moment(initialValue)
      }
    }
    if (type === 'text') {
      comp = <TextArea disabled={disabled} />
    }

    // TODO custom json component
    if (type === 'json') {
      comp = <TextArea disabled={disabled} />
      initialValue = JSON.stringify(initialValue, null, 2)
    }

    return (
      <Form.Item key={label} label={(
        <span>
            {/* <Tag>{type}</Tag> */}
            <span style={{marginRight: 4}}>{label}</span>
            <Tooltip title={label}>
              <Icon type="question-circle-o" />
            </Tooltip>
          {/* <span style={{marginRight: 4}}>{label}</span> */}
        </span>
      )}>
        {getFieldDecorator(label, {
          initialValue,
          rules
        })(comp)}
      </Form.Item> 
    )
  })

  return (
    <Form {...formItemLayout} onSubmit={handleSubmit}>
      {formsComp}
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create<any>({ name: 'register' })(RegistrationForm)
