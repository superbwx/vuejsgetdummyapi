<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video 
      v-show="!imageCaptured"
      ref="video"
      class="full-width"
      autoplay
      />
      <canvas 
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="230px"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn 
        v-if="hasCameraSupport"
        @click="captureImage"
        size="md"
        round color="grey-10" 
        icon="eva-camera" />
      
      <q-file 
        @input="imageCaptureFallback"
        v-else-if="hasTakeShoot"
        v-model="imageUpload"
        outlined color="grey-10" 
        label="Choose an Image"
        accept="image/*"
      >
          <template v-slot:prepend>
            <q-icon name="eva-attach-outline" />
          </template>
      </q-file>

      <div class="col justify-center q-ma-sm" v-else>
        <q-btn 
          unelevated rounded color="grey-10" 
          label="Re-Take"
          @click="enableCamera" /> OR 
        <q-btn 
          unelevated rounded color="grey-10" 
          label="Pick From File"
          @click="takePicFromFile" />
      </div>
      
        <div class="row justify-center q-ma-md">
          <q-input 
            ref="caption"
            v-model="post.caption" 
            label="Caption" 
            class="col col-sm-8" 
            color="grey-10" 
            dense />
        </div>
        <div class="row justify-center q-ma-md">
          <q-input 
            ref="location"
            v-model="post.location" 
            :loading="locationLoading"
            label="Location" 
            class="col col-sm-8" 
            color="primary" 
            dense >
            <template v-slot:append>
              <q-btn round dense flat 
                v-if="!locationLoading && locatioSupported"
                icon="eva-navigation-2-outline"
                @click="getLocation" />
            </template>
          </q-input>
        </div>
        <div class="col justify-center q-mt-lg">
           <q-btn class="q-mr-sm" size="md" unelevated rounded color="grey-10" label="Post Image" />
        </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from 'quasar'
require('md-gum-polyfill');

export default {
  name: 'PageCamera',
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      },
      imageCaptured: false,
      hasCameraSupport: true,
      hasTakeShoot: true,
      imageUpload: [],
      locationLoading: false,
    }
  },

  computed: {
    locatioSupported() {
      if ('geolocation' in navigator) return true
      return false
    }
  },

  methods: {
    initCamera() {
      navigator.mediaDevices.getUserMedia({
        video: true
      }).then(stream => {
        this.$refs.video.srcObject = stream
      }).catch(error => {
        this.hasCameraSupport = false
      })
    },

    captureImage() {
      let video = this.$refs.video
      let canvas = this.$refs.canvas
      canvas.width = video.getBoundingClientRect().width
      canvas.width = video.getBoundingClientRect().height
      let context = canvas.getContext('2d')
      context.drawImage(video, 0, 0, canvas.width, canvas.height)
      this.imageCaptured = true
      this.post.photo = this.dataURItoBlob(canvas.toDataURL())
      this.disableCamera()
      this.hasTakeShoot = false
      this.hasCameraSupport = false
    },

    imageCaptureFallback(file) {
      this.post.photo = file
      
      let canvas = this.$refs.canvas
      let context = canvas.getContext('2d')

      var reader = new FileReader();
      reader.onload = event => {
        var img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context.drawImage(img,0,0);
          this.imageCaptured = true
        }
        img.src = event.target.result;
      }
      reader.readAsDataURL(file); 
    },

    enableCamera() {
      this.imageCaptured = false
      this.hasTakeShoot = true
      this.hasCameraSupport = true
      this.initCamera()
    },

    disableCamera() {
      this.$refs.video.srcObject.getVideoTracks().forEach(track => {
        track.stop()        
      });
    },

    takePicFromFile() {
      this.imageCaptured = false
      this.hasTakeShoot = true
      this.hasCameraSupport = false
    },

    getLocation() {
      this.locationLoading = true
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityAndCountry(position)
      }, err => {
        this.locationError()
      }, {
        timeout:7000
      })
    },

    getCityAndCountry(position) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`
      this.$axios.get(apiUrl).then(result => {
        this.locationSuccess(result)
      }).catch(err => {this.locationError()})
    },

    locationSuccess(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`
      }
      this.locationLoading = false
    },

    locationError() {
      this.$q.dialog({
        title: 'Error Location',
        message: 'Cannot Find Your Location'
      })
      this.locationLoading = false
    },

    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      var byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      var ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      var ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      var blob = new Blob([ab], {type: mimeString});
      return blob;

    }

  },
  mounted() {
    this.initCamera()
  },

  beforeDestroy() {
    if (this.hasCameraSupport) {this.disableCamera()}
  }
}
</script>

<style lang="sass">
  .camera-frame
    border: 1px solid $grey-10 
    border-radius: 15px
    
</style>
