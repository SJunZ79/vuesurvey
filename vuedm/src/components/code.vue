<template>
  <div>
    <p>{{ activity_name }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity_name: ""
    };
  },
  methods: {
    getData() {
      axios
        .get("/user/qiandao")
        .then(response => {
          console.log(response.data);
          this.activity_name = response.data.activity_id;
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