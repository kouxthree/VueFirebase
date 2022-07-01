<template>
    <div>
        <div class="row">
            <div class="col-8">
                <label class="btn btn-default p-0">
                    <input type="file" accept="image/*" ref="file" @change="selectImage" />
                </label>
            </div>
            <div class="col-4">
                <button class="btn btn-success btn-sm float-right" ref="currentImage" :disabled="!previewImage" @click="learnImage">
                    learn
                </button>
            </div>
        </div>
        <div>
            <img v-if="previewImage" class="preview my-3" :src="previewImage" alt="" />
         </div>
        <div>
            <img v-if="analyzedImage" class="preview my-3" :src="analyzedImage" alt="" />
        </div>
        <div v-if="message" class="alert alert-secondary" role="alert">
            {{ message }}
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const file = ref(null);
const message = ref('');
const analyzedImage = ref(undefined);

const currentImage = ref(undefined);
const previewImage = ref(undefined);
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
    if(previewImage.value) {
        analyzedImage.value = previewImage.value
    } else {
        analyzedImage.value = '';
    }
}

</script>