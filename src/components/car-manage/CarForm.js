import React, { forwardRef, useState, useEffect } from 'react';
import { Form, Input, DatePicker, InputNumber, Select } from 'antd';
import moment from 'moment';

const { YearPicker } = DatePicker;

const CarForm = forwardRef((props, ref) => {
    const [isDisabled, setisDisabled] = useState(false)
    const currentYear = new Date().getFullYear();

    useEffect(()=>{
      setisDisabled(props.isUpdateDisabled)
    },[props.isUpdateDisabled])

    function disabledDate(current) {
        return current && current.year() > currentYear;
    }

    let initialYear = moment(new Date(), 'YYYY'); // 默认值为当前年份的 moment 对象

    // if (props.initialValues && props.initialValues.year) {
    //     console.log(12121212);
    //     if (typeof props.initialValues.year === 'string' || typeof props.initialValues.year === 'number') {
    //         console.log(133333333);
    //         initialYear = moment(props.initialValues.year, 'YYYY'); 
    //         console.log(1111111111, initialYear);
    //     } else if (moment.isMoment(props.initialValues.year)) {
    //     initialYear = props.initialValues.year; 
    //     }
    // }

    return (
        <Form layout="vertical" ref={ref} initialValues={props.initialValues}>
        <Form.Item
          label="Make"
          name="Make"
          rules={[{ required: true, message: 'Please enter make' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
      
        <Form.Item
          label="Model"
          name="Model"
          rules={[{ required: true, message: 'Please enter model' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
      
        <Form.Item
          label="Year"
          name="Year"
          rules={[{ required: true, message: 'Please select year' }]}
        >
        <YearPicker
          picker="year"
          style={{ width: '100%' }}
          disabledDate={disabledDate}
          // defaultValue={initialYear}
        />
        </Form.Item>
      
        <Form.Item
          label="Mileage"
          name="Mileage"
          rules={[{ required: true, message: 'Please enter mileage' }]}
        >
          <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={1000}
            precision={2}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
        </Form.Item>
      
        <Form.Item
          label="Available Now"
          name="Available_Now"
          valuePropName="checked"
          rules={[{ required: true, message: 'Please select available now' }]}
        >
          <Select style={{ width: '100%' }} defaultValue={props.initialValues?.Available_Now !== undefined ? props.initialValues.Available_Now : undefined}>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>
      
        <Form.Item
          label="Image"
          name="Url"
          rules={[{ required: true, message: 'Please enter image url' }]}
        >
          <Input style={{ width: '100%' }} />
        </Form.Item>
      
        <Form.Item
        label="Price Per Day"
        name="Price_Per_Day"
        rules={[
            { required: true, message: 'Please enter price per day' },
            { pattern: /^[0-9]+$/, message: 'Please enter valid number' } // 正则表达式限制输入数字
        ]}
        >
        <InputNumber
            style={{ width: '100%' }}
            min={0}
            step={1}
            precision={2}
            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
        </Form.Item>
      </Form>      
    );
});

export default CarForm;
