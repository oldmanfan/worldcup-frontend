import { useEffect, useState, useRef } from "react";
import type { FormInstance } from "antd/es/form";
import { Modal, Button, Form, InputNumber, message, Space } from "antd";
import locale from "antd/es/date-picker/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import { CountriesById } from "@/constant/Countries";
import { ListItemProps } from "@/hooks/types";
import useQatar from "@/hooks/useQatar";
import { toUtcTime } from "@/utils";
import { getErrorMsg } from "@/utils";

export interface MatchModalProps {
  visible: boolean;
  record: ListItemProps;
  onClose: () => void;
  onOk: () => void;
}

export default function MatchModal(props: MatchModalProps) {
  const formRef = useRef<FormInstance>();
  const [loading, setLoading] = useState(false);
  const { getQatarContract } = useQatar();

  const handleOk = async () => {
    const data = await formRef.current?.validateFields();

    console.log("data=", data);
    // uint256 matchId,
    // uint256 scoreA,
    // uint256 scoreB,
    const { scoreA, scoreB } = data;
    const params = [props.record.matchId, scoreA, scoreB];

    try {
      setLoading(true);
      const contract = getQatarContract();
      console.log("setScores, params=", params);
      const tx = await contract?.setScores(...params);
      // console.log('setScores, tx=', tx);
      await tx?.wait();
      props.onOk();
    } catch (e: any) {
      console.error("err=", e);
      const msg = getErrorMsg(e);
      message.error(msg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (props.record) {
      formRef.current?.resetFields();
      // formRef.current?.setFieldsValue({
      //   countryA: props.record.countryA.toNumber(),
      //   countryB: props.record.countryB.toNumber(),
      //   // matchTime: [
      //   //   moment(toUtcTime(props.record.matchStartTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
      //   //   moment(toUtcTime(props.record.matchEndTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
      //   // ],
      //   // guessTime: [
      //   //   moment(toUtcTime(props.record.guessStartTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
      //   //   moment(toUtcTime(props.record.guessEndTime.toNumber()), 'YYYY-MM-dd HH:mm:ss'),
      //   // ],
      //   // payToken: props.record.payToken,
      // });
    }
  }, [props.record]);

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      width={850}
      title="设置比分"
      open={props.visible}
      onOk={handleOk}
      onCancel={props.onClose}
      footer={[
        <Button key="back" onClick={props.onClose}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          确定
        </Button>,
      ]}
    >
      <Form {...layout} ref={formRef as any} name="control-ref">
        {props.record && (
          <>
            <Form.Item label="matchId">
              {props.record?.matchId.toNumber()}
            </Form.Item>
            <Form.Item label="比赛时间">
              <Space>
                <span>{toUtcTime(props.record.matchStartTime.toNumber())}</span>
                <span>~</span>
                <span>{toUtcTime(props.record.matchEndTime.toNumber())}</span>
              </Space>
            </Form.Item>
            <Form.Item label="竞猜时间">
              <Space>
                <span>{toUtcTime(props.record.guessStartTime.toNumber())}</span>
                <span>~</span>
                <span>{toUtcTime(props.record.guessEndTime.toNumber())}</span>
              </Space>
            </Form.Item>
            <Form.Item label="countryA">
              {CountriesById[props.record?.countryA.toNumber()].zhName}
            </Form.Item>
            <Form.Item label="countryB">
              {CountriesById[props.record?.countryB.toNumber()].zhName}
            </Form.Item>
          </>
        )}
        <Form.Item name="scoreA" label="scoreA" rules={[{ required: true }]}>
          <InputNumber width={200} />
        </Form.Item>
        <Form.Item name="scoreB" label="scoreB" rules={[{ required: true }]}>
          <InputNumber width={200} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
