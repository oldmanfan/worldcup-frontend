import { useEffect, useState, useRef } from 'react';
import type { FormInstance } from 'antd/es/form';
import { Modal, Button, Form, Input, Select, DatePicker, message } from 'antd';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import useWallet from '@/hooks/useWallet';
import { CountryOptions } from '@/constant/Countries';
import { getUtcTime, toUtcTime } from '@/utils';
const { RangePicker } = DatePicker;
import { MatchStatus, MatchStatistics, ListItemProps } from '@/hooks/types';
import useQatar from '@/hooks/useQatar';
import { getErrorMsg } from '@/utils';

export interface MatchModalProps {
  visible: boolean;
  record?: ListItemProps;
  onClose: () => void;
  onOk: () => void;
}
export default function MatchModal(props: MatchModalProps) {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const { getQatarContract, waitForTransaction } = useQatar();

  const handleOk = async () => {
    const data = await formRef.current?.validateFields();
    console.log('data=', data);
    // uint256 matchId, -- updateMatch
    // uint256 countryA,
    // uint256 countryB,
    // uint256 matchStartTime,
    // uint256 matchEndTime,
    // uint256 guessStartTime,
    // uint256 guessEndTime,
    // address payToken
    const { countryA, countryB, payToken, matchTime, guessTime } = data;
    const matchStartTime = getUtcTime(matchTime[0]);
    const matchEndTime = getUtcTime(matchTime[1]);
    const guessStartTime = getUtcTime(guessTime[0]);
    const guessEndTime = getUtcTime(guessTime[1]);
    const params = [
      countryA,
      countryB,
      matchStartTime,
      matchEndTime,
      guessStartTime,
      guessEndTime,
      payToken,
    ];

    try {
      setLoading(true);
      const contract = getQatarContract();
      // console.log('contract=', contract);
      if (props.record) {
        console.log('params=', [props.record.matchId.toNumber(), ...params]);
        const tx = await contract.updateMatch(props.record.matchId.toNumber(), ...params);
        console.log('update match, tx=', tx);
        await tx?.wait();
      } else {
        console.log('params=', params);
        const tx = await contract.startMatch(...params);
        console.log('start match, tx=', tx);
        await tx?.wait();
        // await waitForTransaction(tx.hash);
      }
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
    formRef.current?.resetFields();
    if (props.record) {
      formRef.current?.setFieldsValue({
        countryA: props.record.countryA.toNumber(),
        countryB: props.record.countryB.toNumber(),
        matchTime: [
          moment(toUtcTime(props.record.matchStartTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
          moment(toUtcTime(props.record.matchEndTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
        ],
        guessTime: [
          moment(toUtcTime(props.record.guessStartTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
          moment(toUtcTime(props.record.guessEndTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
        ],
        payToken: props.record.payToken,
      });
    }
  }, [props.record]);
  useEffect(() => {
    if (!props.record) {
      formRef.current?.resetFields();
    }
  }, [props.visible]);
  // const navigate = useNavigate();
  // const { add, setAdd } = useState();
  // const { connect } = useWallet();

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      width={850}
      title={props.record ? "更新比赛信息": "新增一场比赛"}
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
        ref={formRef}
        name="control-ref"
      >
        {props.record && <Form.Item label="matchId">
          {props.record.matchId.toNumber()}
        </Form.Item>}
        <Form.Item name="countryA" label="countryA" rules={[{ required: true }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={CountryOptions}
          />
        </Form.Item>
        <Form.Item name="countryB" label="countryB" rules={[{ required: true }]}>
          <Select
            showSearch
            allowClear
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={CountryOptions}
          />
        </Form.Item>
        <Form.Item name="matchTime" label="比赛开始时间" rules={[{ required: true }]}>
          <RangePicker showTime locale={locale} />
        </Form.Item>
        <Form.Item name="guessTime" label="竞猜开始时间" rules={[{ required: true }]}>
          <RangePicker showTime locale={locale} />
        </Form.Item>
        <Form.Item name="payToken" label="payToken" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}
