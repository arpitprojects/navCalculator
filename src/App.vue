<template>
  <v-app id="example-2" toolbar>
    <v-navigation-drawer absolute persistent light :mini-variant.sync="mini" v-model="drawer" overflow>
      <v-toolbar flat class="transparent">
        <v-list class="pa-0">
          <v-list-tile avatar>
            <v-list-tile-avatar>
              <img src="http://placehold.it/400x400" />
              <!--Axis bank logo-->
            </v-list-tile-avatar>
            <v-list-tile-content>
              <v-list-tile-title></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click.native.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list class="pt-0" dense>
        <v-divider></v-divider>
        <router-link to="/">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>dashboard</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Home</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
        <router-link to="/example">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon>question_answer</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Example</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar fixed class="blue darken-2" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <!--Nav Calculator-->
      </v-toolbar-title>
    </v-toolbar>
    <main>
      <v-container fluid>
        <transition name="fade" transition-mode="out-in" class="animated">
          <router-view>
          </router-view>

        </transition>
      </v-container>
      <footer-bar></footer-bar>
    </main>
  </v-app>
</template>

<script> 
import FooterBar from './components/Footer.vue';

export default {
  components: {
    FooterBar
  },
  data() {
    return {
      drawer: true,
      mini: false,
      right: null,
      items: [
        { title: 'Home', icon: 'dashboard', url: '/' },
        { title: 'About', icon: 'question_answer', url: '/example' }
      ]
    };
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>