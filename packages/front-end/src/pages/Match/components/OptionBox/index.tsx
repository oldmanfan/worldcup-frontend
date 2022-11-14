export default function OptionBox() {
  return (
    <div>
      <div className={styles.formItem}>
        <label>
          {' '}
          {props.type === 1
            ? $t('{#當前%s總參投金額#}').replace('%s', selectedLabel)
            : $t('{#當前%s參投金額#}').replace('%s', selectedLabel)}
          :
        </label>
        {eachDeposited.length > 0 && (
          <div>
            ${' '}
            {props.type === 1
              ? toFixed(
                  toBN(eachDeposited[Number(winLoss) - 27])
                    .div(1e18)
                    .toString(),
                )
              : toFixed(
                  toBN(eachDeposited[Number(score) - 1])
                    .div(1e18)
                    .toString(),
                )}
          </div>
        )}
      </div>
      <div className={styles.formItem}>
        <label>{$t('{#回報率#}')}:</label>
        <div>
          {props.type === 1
            ? toFixed(
                toBN(currentMatch.winlosePool.odds[Number(winLoss) - 27])
                  .div(1e18)
                  .toString(),
              )
            : toFixed(
                toBN(currentMatch.scoreGuessPool.odds[score - 1])
                  .div(1e18)
                  .toString(),
              )}
        </div>
      </div>
      <div className={styles.split} />
      <div className={styles.input}>
        <div>
          <i />
        </div>
        <input
          type="text"
          placeholder={$t('{#輸入TT參與競猜#}')}
          value={inputValue}
          onChange={(value) => handleInput(value.target.value)}
        />
        <button onClick={handleAll}>ALL</button>
      </div>
      <div className={styles.balance}>
        {toFixed(ttBalance.div(1e18).toString())} {token?.name}
      </div>
      {/* <div className={styles.error}>
    <ExclamationCircleFilled />
    <span>当前余额不足，去充值</span>
    <RightOutlined />
  </div> */}
      <div className={styles.formItem}>
        <label>{$t('{#預盈可得#}')}</label>
        <div className={styles.primary}>
          {toFixed(reward.toString())} {token?.name}
        </div>
      </div>
      <div className={styles.formItem}>
        <label>{$t('{#手續費#}')}</label>
        <div className={styles.grey}>
          {' '}
          {toFixed(fee)} {token?.name}
        </div>
      </div>
      {showLeftTime ? (
        <Button
          disabled
          type="primary"
          className={styles.btn}
          onClick={handleGuess}
        >
          <LeftTime
            time={currentMatch.matchEndTime.toNumber()}
            onEnd={() => setShowLeftTime(false)}
          />
        </Button>
      ) : (
        <Button
          loading={loading}
          type="primary"
          className={styles.btn}
          onClick={handleGuess}
        >
          {$t('{#參與競猜#}')}
        </Button>
      )}
    </div>
  );
}
