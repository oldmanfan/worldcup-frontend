import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Space, Switch, Table, Modal, message } from "antd";
import { ExclamationCircleOutlined, RightOutlined } from "@ant-design/icons";
import useWallet from "@/hooks/useWallet";
import usePlayToken from "@/hooks/usePlayToken";
// import useQatar from '@/hooks/useQatar';
import useLens from "@/hooks/useLens";
import useQatar from "@/hooks/useQatar";
import { CountriesById } from "@/constant/Countries";
import { MatchStatusMap } from "@/constant/MatchStatus";
import { BigNumber } from "ethers";
import { toUtcTime, getErrorMsg } from "@/utils";
import { MatchStatus, MatchStatistics, ListItemProps } from "@/hooks/types";
import MatchModal from "./MatchModal";
import SetScores from "./SetScores";
import SetSettingRole from "./SetSettingRole";
import SetFeeRatio from "./SetFeeRatio";
import { delay } from "@/utils";
import { PayTokenList } from "@/constant";

export default function Home() {
  const { chainId } = useWallet();
  const [showMatch, setShowMatch] = useState(false);
  const [modifyRecord, setModifyRecord] = useState<ListItemProps>(null!);
  // setScores
  const [showScores, setShowScores] = useState(false);
  const [showSettingRole, setShowSettingRole] = useState(false);
  const [showSetFeeRatio, setShowSetFeeRatio] = useState(false);
  const { payTokens, loadData } = usePlayToken();

  const { account, getAllMatches, allMatches } = useLens();
  const { getQatarContract } = useQatar();

  const handleStart = () => {
    setModifyRecord(null!);
    setShowMatch(true);
  };

  const onStartDone = (success: boolean) => {
    setModifyRecord(null!);
    setShowMatch(false);
    if (success) {
      // success refresh data
      getAllMatches();
    }
  };

  const onSetScoresDone = (success: boolean) => {
    setModifyRecord(null!);
    setShowScores(false);
    if (success) {
      // success refresh data
      getAllMatches();
    }
  };

  useEffect(() => {
    if (chainId) {
      loadData();
    }
  }, [chainId]);

  /**
   * 比赛启停开关
   * @param matId 比赛id
   * @param toPause 为true则暂停，否则为开启
   */
  const switchPause = (matId: number, toPause: boolean) => {
    Modal.confirm({
      title: toPause ? "确认要暂停此场比赛" : "确认要开启此场比赛",
      icon: <ExclamationCircleOutlined />,
      content: `此场比赛的matchId=${matId}, 请确认！`,
      onOk() {
        return new Promise(async (resolve, reject) => {
          try {
            // toPause
            const contract = getQatarContract();
            if (!contract) {
              throw new Error("获取合约实例失败，请求正确连接钱包。");
            }
            const tx = await contract.pauseMatch(matId, toPause);
            await tx?.wait();
            await delay(5000);
            getAllMatches();
            resolve(true);
          } catch (e) {
            reject(e);
            const msg = getErrorMsg(e);
            message.error(msg);
          }
        });
      },
      onCancel() {},
    });
  };

  /**
   * 比赛结束
   * @param matId 比赛id
   */
  const finished = (matId: number) => {
    Modal.confirm({
      title: "确认将此场比赛改为结束状态",
      icon: <ExclamationCircleOutlined />,
      content: `此场比赛的matchId=${matId}, 请确认！`,
      onOk() {
        return new Promise(async (resolve, reject) => {
          // toPause
          try {
            const contract = getQatarContract();
            console.log("setMatchFinished matId=", matId);
            const tx = await contract?.setMatchFinished(matId);
            await tx?.wait();
            await delay(5000);
            getAllMatches();
            resolve(true);
          } catch (e) {
            reject(e);
            const msg = getErrorMsg(e);
            message.error(msg);
          }
        });
      },
      onCancel() {},
    });
  };

  console.log("allMatches=account,", account, allMatches);

  const columns = [
    {
      title: "matchId",
      dataIndex: "matchId",
      key: "matchId",
      render: (value: BigNumber) => {
        return value.toNumber() || "--";
      },
    },
    {
      title: "countryA",
      dataIndex: "countryA",
      key: "countryA",
      render: (value: BigNumber) => {
        const id = value?.toNumber();
        return (id && CountriesById[id]?.zhName) || "--";
      },
    },
    {
      title: "countryB",
      dataIndex: "countryB",
      key: "countryB",
      render: (value: BigNumber) => {
        const id = value?.toNumber();
        return (id && CountriesById[id]?.zhName) || "--";
      },
    },
    {
      title: "竞猜开始时间",
      dataIndex: "guessStartTime",
      key: "guessStartTime",
      render: (value: BigNumber) => {
        const time = value?.toNumber();
        return toUtcTime(time);
      },
    },
    {
      title: "竞猜结束时间",
      dataIndex: "guessEndTime",
      key: "guessEndTime",
      render: (value: BigNumber) => {
        const time = value?.toNumber();
        return toUtcTime(time);
      },
    },
    {
      title: "比赛开始时间",
      dataIndex: "matchStartTime",
      key: "matchStartTime",
      render: (value: BigNumber) => {
        const time = value?.toNumber();
        return toUtcTime(time);
      },
    },
    {
      title: "比赛结束时间",
      dataIndex: "matchEndTime",
      key: "matchEndTime",
      render: (value: BigNumber) => {
        const time = value?.toNumber();
        return toUtcTime(time);
      },
    },
    {
      title: "payToken",
      dataIndex: "payToken",
      key: "payToken",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (value: number) => {
        return MatchStatusMap[value] || value || "--";
      },
    },
    {
      title: "启用",
      dataIndex: "isPaused",
      key: "isPaused",
      render: (value: boolean, record: ListItemProps) => {
        return (
          <Switch
            checkedChildren="开启"
            unCheckedChildren="关闭"
            checked={!value}
            disabled={record.status === 5}
            onChange={(checked: boolean) => {
              switchPause(record.matchId.toNumber(), !checked);
            }}
          />
        );
      },
    },
    {
      title: "操作",
      key: "operate",
      render: (_: any, record: ListItemProps) => {
        return (
          <Space>
            <a
              onClick={() => {
                setModifyRecord(record);
                setShowMatch(true);
              }}
            >
              修改
            </a>
            <a
              onClick={() => {
                setModifyRecord(record);
                setShowScores(true);
              }}
            >
              设置比分
            </a>
            <a
              onClick={() => {
                finished(record.matchId.toNumber());
              }}
            >
              结束比赛
            </a>
          </Space>
        );
      },
    },
  ];

  return (
    <div>
      <Space>
        <Button type="primary" onClick={() => handleStart()}>
          开始一场比赛
        </Button>
        <Button onClick={() => setShowSettingRole(true)}>设置操作员角色</Button>
        <Button onClick={() => setShowSetFeeRatio(true)}>设置手续费率</Button>
      </Space>
      <div>
        <Table
          rowKey={(record) => (record.matchId as BigNumber).toNumber()}
          dataSource={allMatches || []}
          columns={columns}
        />
      </div>
      <MatchModal
        payTokens={payTokens}
        record={modifyRecord}
        visible={showMatch}
        onClose={() => onStartDone(false)}
        onOk={() => onStartDone(true)}
      />
      <SetScores
        record={modifyRecord}
        visible={showScores}
        onClose={() => onSetScoresDone(false)}
        onOk={() => onSetScoresDone(true)}
      />
      <SetSettingRole
        visible={showSettingRole}
        onClose={() => setShowSettingRole(false)}
        onOk={() => setShowSettingRole(false)}
      />
      <SetFeeRatio
        visible={showSetFeeRatio}
        onClose={() => setShowSetFeeRatio(false)}
        onOk={() => setShowSetFeeRatio(false)}
      />
    </div>
  );
}
