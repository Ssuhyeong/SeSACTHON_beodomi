<template>
  <div>
    <NavComp :content="wholeText" title="버스 노선 검색" />
    <div id="title">'{{ this.$route.params.keyword }}' 검색결과</div>
    <div class="order">
      <p @click="bus" class="bus_text">노 선</p>
      <p @click="station" class="dist_text">정류장</p>
    </div>
    <template v-if="station_color == '#ffdb1d'">
      <div id="route_container" v-for="data in search_data" :key="data.node_id">
        <div id="route_info">
          <div style="font-weight: 700">{{ data.station_name }}</div>
          <div>{{ (data.distance * 1000).toFixed(0) }} m</div>
        </div>
        <img src="@/assets/img/busIcon.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="31" />
      </div>
    </template>
    <template v-else>
      <div id="route_container" v-for="data in search_data" :key="data.route_name">
        <div id="route_info">
          <div style="font-weight: 700">{{ data.route_name }}</div>
        </div>
        <div style="color: #fff">자유공원행</div>
        <img src="@/assets/img/markerIcon.png" alt="역에서 탑승가능한 버스를 보는 버튼" width="20" />
      </div>
    </template>
  </div>
</template>

<script>
  import axios from '@/service/axios.js';
  import NavComp from '@/components/NavComp.vue';

  export default {
    name: 'KeyboardSearchView',
    components: {NavComp},
    data() {
      return {
        keyword: '',
        route_color: '#fff',
        station_color: '#ffdb1d',
        search_data: [],
        wholeText: '',
      };
    },
    mounted() {
      console.log(this.$route.params.keyword);
      this.keyword = this.$route.params.keyword;
      this.wholeText = `${this.$route.params.keyword} 검색 결과`;
      this.station();
    },
    methods: {
      bus() {
        this.route_color = '#ffdb1d';
        this.station_color = '#fff';

        const keyword = this.keyword;
        const url = `/api/pass/route/${keyword}`;

        axios
          .get(url)
          .then(res => {
            console.log(res.data);
            this.search_data = res.data;
            console.log(res.data);
          })
          .catch(error => {
            console.log('검색 실패' + error.data);
          });
      },
      station() {
        this.station_color = '#ffdb1d';
        this.route_color = '#fff';

        const keyword = this.keyword;
        const url = `/api/pass/station`;
        const data = {
          station_name: '종로',
          x: 126.9876131,
          y: 37.56857927,
        };

        axios
          .post(url, data)
          .then(res => {
            this.search_data = res.data;
            console.log(res.data);
          })
          .catch(error => {
            console.log('검색 실패' + error.data);
          });
      },
    },
  };
</script>

<style lang="scss" scoped>
  #title {
    margin-top: 40px;
    color: $secondary;
    font-weight: 700;
    font-size: 22px;
    line-height: 24px;
  }

  #route_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    margin: 10px;
    border-bottom: solid 0.1px #fff;
  }

  #route_info > div {
    text-align: left;
    color: #fff;
    margin: 10px;
  }

  .order {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  .order > .bus_text {
    padding: 10px 65px;
    margin: 0px 10px;
    font-weight: 700;
    border-bottom: solid 2px v-bind(route_color);
    color: v-bind(route_color);
  }

  .order > .dist_text {
    padding: 10px 65px;
    margin: 0px 10px;
    font-weight: 700;
    border-bottom: solid 2px v-bind(station_color);
    color: v-bind(station_color);
  }

  .order > p:hover {
    cursor: pointer;
    border-bottom: solid 2px $secondary;
    color: $secondary;
  }
</style>
