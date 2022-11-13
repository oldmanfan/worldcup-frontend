

// enum MatchStatus {
//   GUESS_NOT_START,  // 竞猜未开始
//   GUESS_ON_GOING,  // 竞猜进行中
//   GUESS_STOPED,    // 竞猜已停止

//   MATCH_NOT_START, // 比赛未开始
//   MATCH_ON_GOING,  // 比赛进行中
//   MATCH_FINISHED  // 比赛己完成
// }
export const MatchStatusMap: Record<number, string> = {
  0: '竞猜未开始',  // 竞猜未开始
  1: '竞猜进行中',  // 竞猜进行中
  2: '竞猜已停止',    // 竞猜已停止

  3: '比赛未开始', // 比赛未开始
  4: '比赛进行中',  // 比赛进行中
  5: '比赛己完成'  // 比赛己完成
}
