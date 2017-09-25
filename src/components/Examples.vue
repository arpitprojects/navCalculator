<template>
    <div id="root-tag">
        <div id="app">
            <v-app id="inspire">
                <v-stepper v-model="e6" vertical>
                    <v-stepper-step step="1" v-bind:complete="e6 > 1">
                        Application Flow
                        <small>App will be serving</small>
                    </v-stepper-step>
                    <v-stepper-content step="1">
                        <v-card class="grey lighten-1 mb-2" height="200px"></v-card>
                        <v-btn primary @click.native="e6 = 2">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="2" v-bind:complete="e6 > 2">Insert a Fund Name .</v-stepper-step>
                    <v-stepper-content step="2">
                        <v-card class="grey lighten-1 mb-2" height="200px"></v-card>
                        <v-btn primary @click.native="e6 = 3">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="3" v-bind:complete="e6 > 3">Select the date, amount</v-stepper-step>
                    <v-stepper-content step="3">
                        <v-card class="grey lighten-1 mb-2" height="200px"></v-card>
                        <v-btn primary @click.native="e6 = 4">click on get data</v-btn>
                        <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
                    <v-stepper-step step="4">you will get the values on table.</v-stepper-step>
                    <v-stepper-content step="4">
                        <v-card class="grey lighten-1 mb-2" height="200px"></v-card>
                        <v-btn primary @click.native="e6 = 1">Continue</v-btn>
                        <v-btn flat>Cancel</v-btn>
                    </v-stepper-content>
                </v-stepper>
            </v-app>
        </div>
    </div>
</template>
<script>
export default {

    data() {
        return {

            message: 'This is the examples route!',
            e6:1
        }
    }
}
</script>
<style scoped>

</style>