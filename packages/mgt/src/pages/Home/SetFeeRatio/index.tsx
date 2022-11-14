import { useEffect, useState, useRef } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Modal, Button, Form, InputNumber, message, Space, Switch } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { CountriesById } from '@/constant/Countries';
import { ListItemProps } from '@/hooks/types';
import useQatar from '@/hooks/useQatar';
import { getErrorMsg } from '@/utils';
import { toBN } from '@/utils/bn';
import BigNumber from 'bignumber.js';

export interface SetFeeRatioProps {
  visible: boolean;
  onClose: () => void;
  onOk: () => void;
}

export default function SetFeeRatio(props: SetFeeRatioProps) {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const { getQatarContract } = useQatar();

  const handleOk = async () => {
    const data = await formRef.current?.validateFields();

    const { feeRatio } = data;
    const params = [
      new BigNumber(feeRatio).multipliedBy(1e18).toString(),
    ];

    try {
      setLoading(true);
      const contract = getQatarContract();
      console.log('setFeeRatio, params=', params);
      const tx = await contract.setFeeRatio(...params);
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

  useEffect(() => {
    const queryFeeRatio = async () =>{
      const contract = getQatarContract();
      const result = await contract.feeRatio();
      const feeRatio = toBN(result).div(1e18);
      console.log('queryFeeRatio, feeRatio=', feeRatio);
      formRef.current?.setFieldsValue({
        feeRatio,
      });
    }
    if (props.visible) {
      queryFeeRatio();
    }
  }, [props.visible]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      width={600}
      title="设置手续费率"
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
        <Form.Item name="feeRatio" label="手续费率" rules={[{ required: true }]}>
          <InputNumber style={{ width: 200 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
