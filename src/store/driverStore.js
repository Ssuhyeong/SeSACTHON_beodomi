import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';
import router from '@/router';

export const useDriverStore = defineStore('driver', () => {
  const loading = ref(false);

  // 시작 - 도움 요청하기
  const helpInfo = ref({
    ridingPass: 2, // 총 탑승인원
    landingPass: 3, // 총 하차 인원
    ridingPassHelp: 2, // 도움이 필요한 승차 인원
    landingPassHelp: 1, // 도움이 필요한 하차 인원
  });

  /** 백엔드로부터 이번 정류장에서 탑승/하차 인원 및 도움 요청 수 가져오기 */
  async function getHelpInfo() {
    const url = `http://localhost:8080/api/driver/${busRouteId.value}/${
      vehId.value
    }/${routeInfo.value[stationIndex.value].station}`;
    console.log('요청:', url);
    const res = await axios.get(url);
    console.log('결과:', res);
    helpInfo.value.ridingPass = res.data[0].riding_pass;
    helpInfo.value.ridingPassHelp = res.data[0].riding_pass_help;
    helpInfo.value.landingPass = res.data[0].landing_pass;
    helpInfo.value.landingPassHelp = res.data[0].landing_pass_help;
  }
  // 끝 - 도움 요청하기

  // 시작 - 이번 정류장 정보 가져오기
  const isLastIndex = ref(false); // 이번 정류장이 마지막 정류장인지 여부
  const stationIndex = ref(-1); // 이번 정류장 인덱스
  const nowStationName = ref(''); // 이번 정류장 이름
  const nextStationName = ref(''); // 다음 정류장 이름

  const busRouteId = ref('100100112');
  const vehId = ref('22');
  const routeInfo = ref([]);

  /** busRouteId로 노선정보 가져오기
   * 1. $reset()으로 초기화
   * 2. axios를 이용해 data.go.kr로부터 노선정보 받아오기
   * 3. busStop()으로 정류장 정보 받아오기 시작.
   */
  async function getRouteInfo() {
    try {
      $reset();
      loading.value = true;
      console.log(process.env.VUE_APP_ROUTE_SERVICE_KEY);
      const BASE_URL =
        'http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute';
      const url = `${BASE_URL}?ServiceKey=${process.env.VUE_APP_ROUTE_SERVICE_KEY}&busRouteId=${busRouteId.value}&resultType=json`;
      console.log('요청URL:', url);
      const res = await axios.get(url);
      console.log('루트 정보 요청 결과: ', res.data);
      routeInfo.value = res.data.msgBody.itemList;
      busStop();
      setTimeout(() => {
        loading.value = false;
      }, 2000);
      // loading.value = false;
    } catch (e) {
      console.log('에러:', e);
      alert('에러가 발생했습니다.');
      router.push({name: 'driverEnter'});
    }
  }

  /** 이번 정류장 및 다음 정류장 정보 가져오기 */
  function busStop() {
    if (!isLastIndex.value) {
      if (++stationIndex.value >= routeInfo.value.length - 1)
        isLastIndex.value = true;
      console.log(stationIndex.value, routeInfo.value[stationIndex.value]);
      nowStationName.value = routeInfo.value[stationIndex.value].stationNm;
      nextStationName.value = isLastIndex.value
        ? '없음'
        : routeInfo.value[stationIndex.value + 1].stationNm;
      getHelpInfo();
    } else {
      router.push({name: 'driverEnter'});
    }
  }

  /** 더미데이터로 초기화 */
  function $reset() {
    isLastIndex.value = false;
    stationIndex.value = -1;
    nowStationName.value = '서부운수기점';
    nextStationName.value = '북가좌2동주민센터';
    routeInfo.value = [
      {
        busRouteId: '100100112',
        busRouteNm: '721',
        busRouteAbrv: '721',
        seq: '1',
        section: '0',
        station: '112000202',
        arsId: '13285',
        stationNm: '서부운수기점',
        gpsX: '126.910257',
        gpsY: '37.581632',
        posX: '192074.09952394388',
        posY: '453573.04151196405',
        fullSectDist: '0',
        direction: '건대입구역',
        stationNo: '13285',
        routeType: '3',
        beginTm: '04:20',
        lastTm: '22:40',
        trnstnid: '104000110',
        sectSpd: '0',
        transYn: 'N',
      },
      {
        busRouteId: '100100112',
        busRouteNm: '721',
        busRouteAbrv: '721',
        seq: '2',
        section: '112603658',
        station: '112000092',
        arsId: '13175',
        stationNm: '북가좌2동주민센터',
        gpsX: '126.9114608746',
        gpsY: '37.5802996548',
        posX: '192180.2836974701',
        posY: '453425.08133000834',
        fullSectDist: '249',
        direction: '건대입구역',
        stationNo: '13175',
        routeType: '3',
        beginTm: '04:19',
        lastTm: '22:40',
        trnstnid: '104000110',
        sectSpd: '84',
        transYn: 'N',
      },
      {
        busRouteId: '100100112',
        busRouteNm: '721',
        busRouteAbrv: '721',
        seq: '3',
        section: '112600583',
        station: '112000100',
        arsId: '13183',
        stationNm: 'DMC래미안e.편한세상2.4단지',
        gpsX: '126.9109918398',
        gpsY: '37.576740896',
        posX: '192138.48467959944',
        posY: '453030.1812722883',
        fullSectDist: '483',
        direction: '건대입구역',
        stationNo: '13183',
        routeType: '3',
        beginTm: '04:19',
        lastTm: '22:40',
        trnstnid: '104000110',
        sectSpd: '28',
        transYn: 'N',
      },
      {
        busRouteId: '100100112',
        busRouteNm: '721',
        busRouteAbrv: '721',
        seq: '4',
        section: '112600584',
        station: '112000102',
        arsId: '13185',
        stationNm: '북가좌삼호.DMC아이파크아파트',
        gpsX: '126.9133099754',
        gpsY: '37.5752684365',
        posX: '192343.07987613053',
        posY: '452866.5812514876',
        fullSectDist: '260',
        direction: '건대입구역',
        stationNo: '13185',
        routeType: '3',
        beginTm: '04:22',
        lastTm: '22:41',
        trnstnid: '104000110',
        sectSpd: '11',
        transYn: 'N',
      },
      {
        busRouteId: '100100112',
        busRouteNm: '721',
        busRouteAbrv: '721',
        seq: '5',
        section: '112602126',
        station: '112000106',
        arsId: '13189',
        stationNm: 'DMC파크뷰자이.별동상가',
        gpsX: '126.916089',
        gpsY: '37.575188',
        posX: '192588.53005767614',
        posY: '452857.4318401604',
        fullSectDist: '305',
        direction: '건대입구역',
        stationNo: '13189',
        routeType: '3',
        beginTm: '04:23',
        lastTm: '22:43',
        trnstnid: '104000110',
        sectSpd: '61',
        transYn: 'N',
      },
    ];
  }

  // 끝 - 이번 정류장 정보 가져오기
  return {
    loading,
    busRouteId,
    vehId,
    getRouteInfo,
    routeInfo,
    helpInfo,
    getHelpInfo,
    isLastIndex,
    nowStationName,
    nextStationName,
    busStop,
    stationIndex,
  };
});
