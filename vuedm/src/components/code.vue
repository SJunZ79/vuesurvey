<template>
  <div class="code">
    <div class="img">
      <p>【签到】{{ activity_name }}</p>
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
      this.activity_name = this.$route.query.activity_name
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
    this.getData()
    setInterval(this.getData,1000)
  }
};
</script>

<style scoped>
.code{
  background-color: #fff;
  background-size: cover;
  height:100%;
  position: fixed;
  width:100%;
}
.img{
  text-align: center;
  margin-top:160px;
  margin-left: 5%;
  
}
</style>