<template>
    <v-data-table v-bind:headers="headers" :items="prevData" hide-actions class="elevation-1">
            <template slot="items" scope="props">
                <td>{{ props.item.FundName }}</td>
                <td class="text-xs-right">{{ props.item.Amount }}</td>
                <td class="text-xs-right">{{ props.item.DateRequested }}</td>
                <td class="text-xs-right">{{ props.item.Share }}</td>
                <td class="text-xs-right">{{ props.item.CurrentAmount }}</td>

            </template>
        </v-data-table>
</template>

<script>
export default {
    data(){
        return{
            headers: [
                { text: 'FundName', value: 'FundName' },
                { text: 'Date Requested', value: 'Dat Requested' },
                { text: 'Amount', value: 'Amount' },
                { text: 'Share', value: 'Share' },
                { text: 'Current Valuation', value: 'Current Valuation' }
            ]
        }
    },
    props : ['prevData']
}
</script>

<style scoped>

</style>