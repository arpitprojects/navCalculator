<template>
    <div id="root-tag">
        <v-card>
            <v-card-media>
                <v-card-text>
                    <steps-data></steps-data>
                    <br />
                    <fund-name @componentData="parentchild = $event" :secondShow="secondShow" :thirdShow="thirdShow" ></fund-name>
                    <br />
                    <v-layout row wrap>
                        <v-flex xs12 sm12 md5 lg5>
                            <v-dialog persistent v-model="modal" lazy full-width>
                                <v-text-field slot="activator" label="Select a Date" v-model="e3" prepend-icon="event" readonly></v-text-field>
                                <v-date-picker v-model="e3" scrollable>
                                    <template scope="{ save, cancel }">
                                        <v-card-actions>
                                            <v-btn flat primary @click.native="cancel()">Cancel</v-btn>
                                            <v-btn flat primary @click.native="save()">Save</v-btn>
                                        </v-card-actions>
                                    </template>
                                </v-date-picker>
                            </v-dialog>
                        </v-flex>
                        <v-flex lg5 md5 offset-lg1 offset-md1 xs12 sm12>
                            <v-text-field label="Amount" v-model="amount" type="number" required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <br />
                    <v-layout row>
                        <v-flex class="text-xs-center">
                            <v-btn @click="PostData()" outline class="indigo--text" xs12 md6 lg6 sm12>Get Data</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-text>
            </v-card-media>
        </v-card>
        <table-data :prevData="prevData"></table-data>
        <br />
        <!--Get all the searched values-->
    </div>
</template>

<script>
//Services
import InitServices from '../services/initServices';
import DataServices from '../services/dataServices';
//Components
import TableData from '../views/Table.vue';
import StepsData from '../views/Steps.vue';
import FundName from '../views/FundName.vue';
export default {

    components: { TableData, StepsData, FundName },
    data() {

        return {
            secondShow : false,
            thirdShow : false,
            modal: false,
            menu: false,
            stringBuilder: null,
            e3: null,
            amount: 0,
            prevData: [],
            server_field: {},
            server_field_details: {},
            prepareFinal_Object: {},
            parentchild : {}
        }
    },
    mounted: function() {
        this.getPrevData();
    },
    methods: {
        calculate_values() {
            console.log('Are we getting here!');
            let share = ((parseFloat(this.amount)) / parseFloat(this.server_field.FIELD3));
            share = parseFloat(share).toFixed(2);

            let new_val = (this.server_field_details.FIELD3);
            new_val = parseFloat(new_val).toFixed(2);
            //console.log('New' + new_val);
            let new_valuation = parseFloat(share * new_val).toFixed(2);
            //console.log(new_valuation);
            this.prepareFinal_Object = {
                fundName: this.stringBuilder,
                datePrev: this.e3,
                amount: this.amount,
                shareBought: share,
                currentAmountVal: new_valuation
            };
            console.log(this.prepareFinal_Object.fundName);
            this.$http.post('/postFinalObject', this.prepareFinal_Object).then(function(data) {
                console.log('Data posted!');
            }, function(err) {
                console.log(err);
            });
            this.getPrevData();
            // window.location.reload(false);
            this.secondShow = false; this.thirdShow = false;
            this.amount = 0;
            this.e3 = null;
        },
        PostData() {
            this.parentchild = JSON.parse(JSON.stringify(this.parentchild));
            this.stringBuilder = this.parentchild.stringBuilder;
            this.secondShow = this.parentchild.secondShow;
            this.thirdShow = this.parentchild.thirdShow;

            this.amount = parseFloat(this.amount);
            if (this.stringBuilder === null || this.stringBuilder === 'undefined') {
                alert('Component is not reciecing the FUNDANME!');
                return false;
            }
            if (this.amount === "" || this.amount === null || this.amount === 'undefined' || this.amount === 0) {
                alert('Amount should have to be filled!!');
                return false;
            } else if (this.e3 === null) {
                alert('Date should have to be filled!');
                return false;
            } else if (typeof this.amount !== 'number') {
                alert('Amount should be a number');
                return false;
            } else { }
            var dateFormatting = this.e3.split('-');
            let dateYear, dateMonth, dateDay;
            dateYear = dateFormatting[0];
            dateMonth = dateFormatting[1];
            dateDay = dateFormatting[2];
            if (dateMonth == "01") { dateMonth = "Jan"; } else if (dateMonth == "02") {
                dateMonth = "Feb";
            } else if (dateMonth == "03") {
                dateMonth = "Mar";
            } else if (dateMonth == "04") { dateMonth = "Apr"; } else if (dateMonth == "05") {
                dateMonth = "May";
            } else if (dateMonth == "06") {
                dateMonth = "Jun";
            } else if (dateMonth == "07") {
                dateMonth = "Jul";
            } else if (dateMonth == "08") {
                dateMonth = "Aug";
            } else if (dateMonth == "09") {
                dateMonth = "Sep";
            } else if (dateMonth == "10") {
                dateMonth = "Oct";
            } else if (dateMonth == "11") {
                dateMonth = "Nov";
            } else {
                dateMonth = "Dec";
            }
            var dateFormatting = dateDay + "-" + dateMonth + "-" + dateYear;
            let temp_obj = {
                string: this.stringBuilder,
                date: dateFormatting,
                amount: this.amount
            };
            console.log(temp_obj);
            this.$http.post('/postData', temp_obj).then(function(data) {
                if (data.body == null || data.body == "" || data.body == 'undefined') {
                    alert('Our Database has no answers of current combinations! Try again!');
                    this.secondShow = false; this.thirdShow = false;
                    this.amount = 0;
                    this.e3 = null;
                    return false;
                }
                this.server_field = data.body;
                console.log(this.server_field);
                this.$http.post('/postCurrentData', temp_obj).then(function(data) {
                    this.server_field_details = data.body;
                    console.log(this.server_field_details);
                    this.calculate_values();
                }, function(err) {
                    console.log(err);
                });
                
            }, function(err) {
                console.log(err);
            })
        },
        getPrevData() {
            return DataServices.get().then(response => {
                console.log('Check whether we are here or not!');
                console.log(response.data);
                this.prevData = response.data;
            })
        }
    }//methods end
}//export end
</script>


<style scoped>
.btn__content {
    width: 300px !important;
}
</style>