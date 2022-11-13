import { useEffect, useState } from 'react';
import useTranslation from '@/hooks/useTranslation';
import {
  useNavigate,
  useSearchParams,
  NavLink,
  useParams,
  redirect,
} from 'react-router-dom';
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
  const { getAllMatches, matchMap } = useMatches();
  const [searchParams, setSearchParams] = useSearchParams();
  const [active, setActive] = useState(1);
  const { currentMatch, setMatch } = useMatchStore();
  const params = useParams();
  if (!params.matchId) {
    console.log('no match id');
    redirect('/');
    return;
  }

  useEffect(() => {
    getAllMatches();
  }, []);
  useEffect(() => {
    if (matchMap && params.matchId) {
      const currentMatch = matchMap[params.matchId];
      setMatch(currentMatch);
    }
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
