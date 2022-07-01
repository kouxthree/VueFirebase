<script lang="ts">
import axios from "axios";
// import Vue from "vue-class-component";
// import Component from "vue-class-component";
// import Options from "vue-class-component";

const http = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    "Content-type": "application/json"
  }
});

// @Options
export default class UploadFilesService {
  upload(file: any, onUploadProgress: any) {
    let formData = new FormData();
    formData.append("image", file);
    // formData.append('image', file, 'file');
    return http.post("/learn", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      onUploadProgress
    });
  }
  // getResult() {
  //   return http.get("/result");
  // }
}
</script>