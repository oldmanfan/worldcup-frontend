import { useEffect, useState, useRef } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Modal, Button, Form, Input, message, Space, Switch } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { CountriesById } from '@/constant/Countries';
import { ListItemProps } from '@/hooks/types';
import useQatar from '@/hooks/useQatar';
import { getErrorMsg } from '@/utils'

export interface MatchModalProps {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
}

export default function MatchModal(props: MatchModalProps) {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const { getQatarContract } = useQatar();

  const handleOk = async () => {
    const data = await formRef.current?.validateFields();

    console.log('data=', data);
    // address role,
    // bool toGrant,
    const { role, toGrant } = data;
    const params = [
      role,
      toGrant,
    ];

    try {
      setLoading(true);
      const contract = getQatarContract();
      console.log('setScores, params=', params);
      const tx = await contract.setSettingRole(...params);
      await tx?.wait();
      props.onOk();
    } catch (e: any) {
      console.error('err=', e);
      const msg = getErrorMsg(e);
      message.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      width={850}
      title="设置操作员角色"
      open={props.visible}
      onOk={handleOk}
      onCancel={props.onClose}
      footer={[
        <Button key="back" onClick={props.onClose}>
          取消
        </Button>,
        <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <Form
        {...layout}
        ref={formRef as any}
        name="control-ref"
      >
        <Form.Item name="role" label="address" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="toGrant" label="授权">
          <Switch />
        </Form.Item>
      </Form>
    </Modal>
  );
}
