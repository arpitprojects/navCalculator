<template>
    <v-stepper value="1">
        <v-stepper-header>
            <v-stepper-step step="1">
                {{stepone}}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">
                {{steptwo}}
            </v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3">
                {{stepthree}}
            </v-stepper-step>
        </v-stepper-header>
    </v-stepper>
</template>

<script>
    export default {
        data() {
            return {
                stepone : "Insert The Data",
                steptwo : "Select the Date",
                stepthree : "Enter Amount and search"
            }
        }
    }
</script>

<style scoped>

</style>