import styles from './index.module.less';
import useTranslation from '@/hooks/useTranslation';
// import useTranslation from '../../hooks/useTranslation';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function TestPage() {
  const { $t, changeLocale } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // console.log('searchParams=', searchParams.get('id'));
  return (
    <div className={styles.homePage}>
      <button onClick={() => changeLocale('en-us')}>切换英语</button>
      <button onClick={() => changeLocale('zh-hk')}>切换中文</button>
      <h3>国际化测试: {$t('title')}</h3>
      <button onClick={() => { navigate('/') }}>跳转首页</button>
      <h3>路由参数: {searchParams.get('id')}</h3>
      <button onClick={() => { setSearchParams({ id: '0x12313123123' }) }}>路由添加参数</button>
    </div>
  );
}
