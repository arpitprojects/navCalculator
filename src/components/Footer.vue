<template>
    <div id="app">

        <v-footer class="pa-3">
            &copy; {{ new Date().getFullYear() }} {{footer}}
        </v-footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            footer: 'Copyright Arpit Anand'
        }
    }
}
</script>

<style scoped>

</style>