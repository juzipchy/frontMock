 const settings = [{
  page: '卡顿-卡顿监控',
  url: '/mqsas/performance/dropFrame/screenAllStatus.do',
  type: 'GET',
  params: {
      },
  desc: '卡顿监控',
  successValue: 'true',
  resultKey: 'data'
},{
  page: '卡顿-卡顿监控',
  url: '/mqsas/performance/dropFrame/avgCaton.do',
  type: 'GET',
  params: {model:'MI3W(cancro)',interval:1},
  desc: '平均卡顿时长',
  successValue: 'true',
  resultKey: 'data'
},{
  page: '卡顿-主页面',
  url: '/mqsas/fluency/getFluencyByVersion.do',
  type: 'GET',
  params: {},
  desc: '流畅度',
  successValue: 'true',
  resultKey: 'data'
},{
  page: '卡顿-主页面',
  url: '/mqsas/performance/getModelFluencyRank.do',
  type: 'GET',
  params: {},
  desc: '机型流畅度排名',
  successValue: 'true',
  resultKey: 'data'
},{
  page: 'ABTEST-结果面',
  url: '/mqsasABTest/compareResult.do',
  type: 'POST',
  params: {"date":"20170327","id":"69#Redmi3S(land)","version":"","specifyDate":"20170326"},
  desc: 'abtest对比结果',
  successValue: 'true',
  resultKey: 'data'
}]
module.exports = settings;