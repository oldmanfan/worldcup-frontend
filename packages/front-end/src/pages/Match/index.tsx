import { useEffect, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';
import { useNavigate, NavLink, useParams, redirect } from 'react-router-dom';
import { useMatchStore } from '@/models';
import { useMatches } from '@/hooks/useLens';
import Banner from '@/components/Banner';
import Info from './components/Info';
import Guess from './components/Guess';
import Record from './components/Record';
import Share from './components/Share';
import styles from './index.module.less';

export default function Match() {
  const { $t } = useTranslation();
  const navigate = useNavigate();
  const { getAllMatches } = useMatches();
  const [active, setActive] = useState(1);
  const { setMatch, matchMap } = useMatchStore();
  const params = useParams();
  if (!params.matchId) {
    redirect('/');
    return null;
  }

  useEffect(() => {
    getAllMatches();
  }, []);
  useEffect(() => {
    const getData = async () => {
      if (matchMap && params.matchId) {
        const currentMatch = matchMap[Number(params.matchId)];
        setMatch(currentMatch);
      }
    };
    getData();
  }, [matchMap]);

  return (
    <div className={styles.match}>
      <Banner rule />
      <div className={styles.content}>
        <Info active={active} onChange={(key) => setActive(key)} />
        <Guess type={active} />
        <Record active={active} />
        <div className={styles.textCenter}>
          <NavLink to="/" className={styles.btn}>
            {$t('{#查看更多賽事#}')}
          </NavLink>
        </div>
        <Share />
      </div>
    </div>
  );
}
