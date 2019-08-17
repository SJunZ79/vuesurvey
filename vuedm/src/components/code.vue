<template>
  <div>
    <p>{{ activity_name }}</p>
    <div><img src="srbase" /></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity_name: "",
      srbase: ""
    };
  },
  methods: {
    getData() {
      axios
        .get("/user/qiandao")
        .then(response => {
          console.log(response.data);
          this.activity_name = response.data.activity_id;
          this.srbase = "data:image/jpeg;base64," + response.data.srbase;

        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
</style>