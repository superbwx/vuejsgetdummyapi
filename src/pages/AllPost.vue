<template>

  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-md">
      <div class="col" >
        <q-card 
          v-for="post in dataFromJson" 
          :key="post.id"
          class="card-post q-mb-md">

          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="post.owner.picture" >
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label 
                class="text-bold">
                  {{post.owner.lastName}} {{post.owner.firstName}}</q-item-label>
              <q-item-label caption>
                {{post.owner.email}}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.image"/>

          <q-card-section >
            <div class="text-caption text-grey-6">{{post.publishDate}}</div>
            <div >{{post.text}}</div>
            <div ><a :href="post.link" target="_blank">{{post.link}}</a></div>
            <div >
              <div ><q-icon name="eva-heart-outline"/>  {{post.likes}}</div>
            </div>
            <div class="row q-mt-sm">
              <div v-for="tag in post.tags" :key="tag.tags">
                <q-btn :to="`/allpost?tag=${tag}`" @click="getPostDataByTagJson(tag)" class="q-mr-sm" size="sm" outline rounded color="grey-10" :label="tag" />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            
          </q-card-section>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { store } from 'quasar/wrappers'

export default {  
  name: 'AllPost',
  data() {
    return {
      dataFromJson: [],
    }
  },

  methods: {
    getUserPostDataJson(iduser) { //For All Post by IdUser
      let apiUrl = `https://dummyapi.io/data/api/user/${iduser}/post/`
      this.$axios.get(
        apiUrl, 
        { headers: { 'app-id':'603d33cc4c7816a0b4342d83' } }
      ).then(result => {
        this.getPostDataJsonSuccess(result)
      }).catch(err => {console.log('kok error iduser')})
    },

    getPostDataByTagJson(tag) { //For All Post by IdUser
      let apiUrl = `https://dummyapi.io/data/api/tag/${tag}/post/`
      this.$axios.get(
        apiUrl, 
        { headers: { 'app-id':'603d33cc4c7816a0b4342d83' } }
      ).then(result => {
        this.getPostDataJsonSuccess(result)
      }).catch(err => {console.log('kok error respons')})
    },

    getPostDataJson(iduser) { //For All Post
      let apiUrl = `https://dummyapi.io/data/api/post/`
      this.$axios.get(
        apiUrl, 
        { headers: { 'app-id':'603d33cc4c7816a0b4342d83' } }
      ).then(result => {
        this.getPostDataJsonSuccess(result)
      }).catch(err => {console.log('kok error respons')})
    },

    getPostDataJsonSuccess(result) {
      this.dataFromJson = result.data.data
      //console.log('dataAkhir:', this.dataFromJson)
    },

  },

  mounted() {
    if (this.$route.query.iduser) {this.getUserPostDataJson(this.$route.query.iduser)}
    else if (this.$route.query.tag) {this.getPostDataByTagJson(this.$route.query.tag)}
    else {this.getPostDataJson()}   
  }

}
</script>
