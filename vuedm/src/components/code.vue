<template>
  <div>
    <p>{{ activity_name }}</p>
    <div>
      <img :src="srbase" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      activity_name: "",
      srbase: "",
      validity:0
    };
  },
  methods: {
    getData() {
      axios
        .get("/api/admin/signed/getQRCode", {
          params: { token: this.$route.query.token }
        })
        .then(response => {
          console.log(response.data);
          this.validity = response.data.validity;
          this.srbase = "data:image/jpeg;base64," + response.data.qr_code;
          
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