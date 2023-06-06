<template>
  <div class="keyboard-search">
    <input
      class="search-input"
      type="text"
      required
      placeholder="검색어를 입력하세요"
      v-model="keyword"
      @keyup.enter="station"
    />
    <div class="order">
      <p @click="bus" :class="{ active: search_active[0] }">노선</p>
      <p @click="station" :class="{ active: search_active[1] }">정류장</p>
    </div>
    <template v-if="search_active[0]">
      <div class="search-result" v-for="data in search_data" :key="data.route_name"><span>{{ data.route_name }}</span></div>
    </template>
    <template v-else>
      <div class="search-result" v-for="data in search_data" :key="data.node_id"><span>{{ data.station_name }}</span></div>
    </template>
  </div>
</template>

<script>
import axios from '@/service/axios.js';

  export default {
    name: 'KeyboardSearchView',
    data() {
      return {
        keyword: "",
        search_active : [false, true],
        search_data: []
      }
    },
    mounted() {
      if(this.$route.params.keyword != 'keyboard') {
        this.keyword = this.$route.params.keyword;
        this.station();
      }
    },
    methods: {
    bus() {
      this.search_active[0] = true;
      this.search_active[1] = false;

      const keyword = this.keyword;
      const url = `/api/pass/route/${keyword}`;

      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.search_data = res.data;
        })
        .catch((error) => {
          console.log("검색 실패" + error.data);
        });
    },
    station() {
      this.search_active[0] = false;
      this.search_active[1] = true;

      const keyword = this.keyword;
      const url = `/api/pass/station/${keyword}`;

      axios
        .get(url)
        .then((res) => {
          console.log(res.data);
          this.search_data = res.data;
        })
        .catch((error) => {
          console.log("검색 실패" + error.data);
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .keyboard-search {
    padding-top: 100px;
    .search-input {
      height: 98px;
      width: calc(100vw - 52px);
      border-radius: 10px;
      background-color: $lightGray;
      border: none;
      font-weight: 700;
      font-size: 28px;
      line-height: 34.16px;
      margin-bottom: 31px;
      text-align: left;
      padding-left: 20px;
    }

    .search-result {
      background-color: $lightGray;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
      text-align: center;
    }
  }
  .order {
    display: flex;
    align-items: center;
    justify-content:end;
    margin-bottom: 20px;
  }

  .order > p {
    padding: 10px 15px;
    border-radius: 10px;
    margin: 0px 5px;
    font-weight: 700;
  }

  .order > p:hover {
    background-color: #7C7C7C;
    color: #fff;
    cursor: pointer;
  }

  .active {
    background-color: #7C7C7C;
    color: #fff;
  }

</style>
