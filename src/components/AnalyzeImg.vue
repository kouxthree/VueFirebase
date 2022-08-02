<template>
    <div>
        <div class="row">
            <div class="col-8">
                <label class="btn btn-default p-0">
                    <input type="file" accept="image/*" ref="file" @change="selectImage" />
                </label>
            </div>
            <div class="col-4">
<<<<<<< HEAD
                <button class="btn btn-success btn-sm float-right" ref="currentImage" :disabled="!previewImage"
                    @click="learnImage">
=======
                <button class="btn btn-success btn-sm float-right" ref="currentImage" :disabled="!previewImage" @click="learnImage">
>>>>>>> 3ed28d79d5a6ed11aead6877aa9373a98a7c08a0
                    learn
                </button>
            </div>
        </div>
<<<<<<< HEAD
        <div v-if="progress" class="alert alert-secondary" role="alert">
            {{ progress }}
        </div>
        <div>
            <img id="originalimg" v-if="previewImage" class="preview my-3" :src="previewImage" alt="" />
        </div>
        <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
        </div>
        <div>
            <img v-if="analyzedImage" class="preview my-3" :src="analyzedImage" alt="" />
        </div>
        <div>
            <canvas id="canvas"></canvas>
        </div>
        <div v-if="filename" class="alert alert-secondary" role="alert">
            {{ filename }}
        </div>
        <div class="col-4">
            <button class="btn btn-success btn-sm float-right" @click="getresult">
                getresult
            </button>
=======
        <div>
            <img v-if="previewImage" class="preview my-3" :src="previewImage" alt="" />
         </div>
        <div>
            <img v-if="analyzedImage" class="preview my-3" :src="analyzedImage" alt="" />
        </div>
        <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
>>>>>>> 3ed28d79d5a6ed11aead6877aa9373a98a7c08a0
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
<<<<<<< HEAD
import axios from "axios";
import UploadFilesService from "../services/UploadFilesService.vue";
import '@tensorflow/tfjs-backend-webgl';
import * as blazeface from '@tensorflow-models/blazeface';

const file = ref(null);
const message = ref('');
const filename = ref('')
const analyzedImage = ref(undefined);

const progress = ref(0);
const currentImage = ref(undefined);
const previewImage = ref(undefined);
var UploadService = new UploadFilesService();
=======

const file = ref(null);
const message = ref('');
const analyzedImage = ref(undefined);

const currentImage = ref(undefined);
const previewImage = ref(undefined);
>>>>>>> 3ed28d79d5a6ed11aead6877aa9373a98a7c08a0
const selectImage = () => {
    currentImage.value = file.value.files[0];
    if(currentImage.value) {
        previewImage.value = URL.createObjectURL(currentImage.value);
        message.value = currentImage.value.name;
    } else {
        previewImage.value = '';
        message.value = '';
    }
}
const learnImage = () => {
<<<<<<< HEAD
    // if(previewImage.value) {
    //     analyzedImage.value = previewImage.value
    // } else {
    //     analyzedImage.value = '';
    // }

    getMessage();
    uploadAndDetect();
    // detectFace();
}
const getMessage = () => {
    const path = "http://localhost:5000/ping";
    axios
    .get(path)
    .then((res) => {
        message.value = res.data;
    })
    .catch((error) => {
        console.error(error);
    });
}
const uploadAndDetect = () => {
    UploadService.upload(file.value.files[0], (event) => {
        progress.value = Math.round((100 * event.loaded) / event.total);
    }).then((response) => {
        message.value = response.data.message;
    //     // return UploadService.getResult();
    // // }).then((result) => {
    //     var result = response.data.result;
    //     analyzedImage.value = result;
        filename.value = response.data.filename;
        drawResult(message.value);
    }).catch((err) => {
        progress.value = 0;
        message.value = "error: " + err;
        currentImage.value = undefined;
    });
}
const getresult = () => {
    const path = "http://localhost:5000/getresult/" + filename.value;
    axios({
        url: path,
        method: 'GET',
        responseType: 'blob',
    })
    .then((res) => {
        analyzedImage.value = URL.createObjectURL(new Blob([res.data]));
    })
    .catch((error) => {
        console.error(error);
    });    
}
async function drawResult(results) {
    const originalimg = document.querySelector("#originalimg")
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = "rgb(255, 0, 0)";
    let img = new Image();
    img.onload = () => {
        canvas.width = originalimg.width;
        canvas.height = originalimg.height;
        ctx.drawImage(img, 0, 0);
        for (let i = 0; i < results.length; i++) {
            const landmarks = results[i].landmarks;                
            ctx.fillRect(landmarks[0][0], landmarks[0][1], 10, 10);
            ctx.fillRect(landmarks[1][0], landmarks[1][1], 10, 10);
            ctx.fillRect(landmarks[2][0], landmarks[2][1], 10, 10);
            ctx.fillRect(landmarks[3][0], landmarks[3][1], 10, 10);
            ctx.fillRect(landmarks[4][0], landmarks[4][1], 10, 10);
            const bbox = results[i].bbox;
            ctx.strokeRect(bbox[0], bbox[1], bbox[2]-bbox[0], bbox[3]-bbox[1]);
        }
    }
    var filereader = new FileReader();
    filereader.onload = (e) => {
        img.src = e.target.result;
    };
    filereader.readAsDataURL(file.value.files[0]);
}

// const blazeface = require('@tensorflow-models/blazeface');
async function detectFace() {
    // Load the model.
    const model = await blazeface.load();
    // Pass in an image or video to the model. The model returns an array of
    // bounding boxes, probabilities, and landmarks, one for each detected face.
    const returnTensors = false; // Pass in `true` to get tensors back, rather than values.
    //   const predictions = await model.estimateFaces(document.querySelector("img"), returnTensors);
    const originalimg = document.querySelector("#originalimg")
    const predictions = await model.estimateFaces(originalimg, returnTensors);
    if (predictions.length > 0) {
        /*
        `predictions` is an array of objects describing each detected face, for example:
        [
        {
            topLeft: [232.28, 145.26],
            bottomRight: [449.75, 308.36],
            probability: [0.998],
            landmarks: [
            [295.13, 177.64], // right eye
            [382.32, 175.56], // left eye
            [341.18, 205.03], // nose
            [345.12, 250.61], // mouth
            [252.76, 211.37], // right ear
            [431.20, 204.93] // left ear
            ]
        }
        ]
        */
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        let img = new Image();
        img.onload = () => {
            canvas.width = originalimg.width;
            canvas.height = originalimg.height;
            ctx.drawImage(img, 0, 0);
            for (let i = 0; i < predictions.length; i++) {
                // const start = predictions[i].topLeft;
                // const end = predictions[i].bottomRight;
                // const size = [end[0] - start[0], end[1] - start[1]];
                // Render a rectangle over each detected face.
                //ctx.fillRect(start[0], start[1], size[0], size[1]);
                const landmarks = predictions[i].landmarks;                
                ctx.fillRect(landmarks[0][0], landmarks[0][1], 10, 10);
                ctx.fillRect(landmarks[1][0], landmarks[1][1], 10, 10);
                ctx.fillRect(landmarks[2][0], landmarks[2][1], 10, 10);
                ctx.fillRect(landmarks[3][0], landmarks[3][1], 10, 10);
                ctx.fillRect(landmarks[4][0], landmarks[4][1], 10, 10);
            }
        }
        var filereader = new FileReader();
        filereader.onload = (e) => {
            img.src = e.target.result;
        };
        filereader.readAsDataURL(file.value.files[0]);
    }
}


// onMounted(() => {
//     UploadService.getResult().then(response => {
//       analyzedImage.value = response.data;
//     }).catch((err) => {
//         message.value = "Could not get result image! " + err;
//         analyzedImage.value = undefined;
//     });
// })
=======
    if(previewImage.value) {
        analyzedImage.value = previewImage.value
    } else {
        analyzedImage.value = '';
    }
}

>>>>>>> 3ed28d79d5a6ed11aead6877aa9373a98a7c08a0
</script>