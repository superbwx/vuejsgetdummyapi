<template>

  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8" > 
        <q-card 
          v-for="post in dataFromJson" 
          :key="post.id"
          class="card-post q-mb-md">

          <q-item>
            

            <q-item-section>
              <q-item-label 
                class="text-bold">
                  {{post.lastName}} {{post.firstName}}</q-item-label>
              <q-item-label caption>
                {{post.email}}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.picture"/>

          <q-card-section >          
            <div >
              <q-btn color="primary" @click="showLoading" label="Show Loading" />
            </div> 
            <div >
              <router-link :to="`/allpost?iduser=${post.id}`">See Posting</router-link>
            </div>            
          </q-card-section>

        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-card class="card-post q-mb-md fixed">
          <q-item>

            <q-item-section>
              <q-item-label 
                class="text-bold">
                  My Profile.</q-item-label>
            </q-item-section>
          </q-item>
          
          <q-separator />

          <q-item>
            <q-item-section avatar>
              <q-avatar size="56px">
                <img src="https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331__340.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label 
                class="text-bold">
                  Rahadian Arief</q-item-label>
              <q-item-label caption>
                Cilegon - Banten, Indonesia
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img src="https://image.freepik.com/free-vector/mysterious-mafia-man-smoking-cigarette_52683-34828.jpg"/>
          
          <q-separator />

          <q-item>
            <q-item-section>
              <q-item-label>
                  Rahadian Arief</q-item-label>
              <q-item-label>
                Cilegon - Banten, Indonesia
              </q-item-label>
            </q-item-section>
          </q-item>

        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { store } from 'quasar/wrappers'
import { Loading } from 'quasar'

export default {
  name: 'UserList',
  data() {
    return {
      dataFromJson: []
    }
  },

  methods: {
    showLoading () {
      this.$q.loading.show()

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide()
        this.timer = void 0
      }, 2000)
    },

    getPostDataJson() {
      let apiUrl = 'https://dummyapi.io/data/api/'
      this.$axios.get(
        apiUrl += 'user', 
        { headers: { 'app-id':'603d33cc4c7816a0b4342d83' } }
      ).then(result => {
        this.getPostDataJsonSuccess(result)
      }).catch(err => {console.log('kok error respons')})
    },

    getPostDataJsonSuccess(result) {
      this.dataFromJson = result.data.data
      //console.log('dataAkhir:', this.dataFromJson)
    },

    seeProfile(id) {
      let profileLink = id
      this.$router.push(profileLink)
    },

  },

  mounted() {
    this.getPostDataJson()}

}
</script>
