<template>
  <q-page class="constrain q-pa-md">

    <div class="row q-col-gutter-md">
      <div class="col-12 col-sm-8" >      

        <q-card
          v-for="post in dataPosts"
          :key="post.id"
          class="card-post q-mb-md" >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.pixabay.com/photo/2016/04/01/11/25/avatar-1300331__340.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label 
                class="text-bold">
                  {{post.name}}</q-item-label>
              <q-item-label caption>
                {{post.location}}
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <q-img :src="post.imageUrl"/>

          <q-card-section >
            <div>{{post.caption}}</div>
            <div class="text-caption text-grey-6">{{post.date | niceDate}}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{loremm}}
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
          
        </q-card>
      </div>
    </div>

  </q-page>
</template>

<script>
  import { date } from 'quasar'

  export default {
    name: 'PageHome',
    data() {
      return {
        loremm:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here'.",
        dataPosts: [
          {
            id: 1,
            name: 'Rahadian Arief',
            caption: 'Our Changing Planet',
            date: 1614583209115,
            location: 'Cimahi, JawaBarat',
            imageUrl: 'https://cdn.quasar.dev/img/mountains.jpg'
          },
          {
            id: 2,
            name: 'Rahadian Arief',
            caption: 'The Elite Global',
            date: 1614583209115,
            location: 'Cimahi, JawaBarat',
            imageUrl: 'https://dl.kaskus.id/www.melinweb.com/wp-content/uploads/2016/09/hutang-pada-elite-global.jpeg'
          },
          {
            id: 3,
            name: 'Rahadian Arief',
            caption: 'The Flat Planet',
            date: 1614583209115,
            location: 'Cimahi, JawaBarat',
            imageUrl: 'https://res-4.cloudinary.com/the-university-of-melbourne/image/upload/s--5fjnM8a---/c_limit,f_auto,q_75,w_892/v1/pursuit-uploads/1d5/bfb/c0e/1d5bfbc0eb7da3c546ea90681ca07cfbe0cf7195361c069b298d87e2f36a.jpg'
          },
          {
            id: 4,
            name: 'Rahadian Arief',
            caption: 'The Dark Days',
            date: 1614583209115,
            location: 'Cimahi, JawaBarat',
            imageUrl: 'https://i.guim.co.uk/img/media/f4680b042e212bbbb7db357144ae2de3c737240c/0_214_4524_2714/master/4524.jpg?width=300&quality=85&auto=format&fit=max&s=9e695f5dec6ca720a5d3024fe0b7c8e4'
          },
        ],
      }
    },
    filters: {
      niceDate(value) {
        return date.formatDate(value, 'YYYY MMMM DD, H.m A')
      }
    }
  }
</script>

<style lang="sass">
  .card-post
    .q-img
      min-height:200px
</style>
