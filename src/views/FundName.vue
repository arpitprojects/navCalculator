<template>
    <div id="root-tag">
        <v-layout row justify-space-between wrap>
            <v-flex lg4 md4 xs12 sm12>
                <v-select :items="fundNameVal" v-model="fundSel" @input="getElementNext()" label="Select Fund Name" single-line bottom></v-select>
            </v-flex>
            <v-flex lg3 md3 xs12 sm12 offset-md1 offset-lg1>
                <v-select :items="secondVal" v-if="secondShow" v-model="secondSel" @input="getFinalElement()" label="Select Field" single-line bottom></v-select>
            </v-flex>
            <v-flex lg3 md3 xs12 sm12 offset-md1 offset-lg1>
                <v-select :items="thirdVal" v-model="thirdSel" v-if="thirdShow" @input="prepareCall()" label="Select Field" single-line bottom></v-select>
            </v-flex>
        </v-layout>
    </div>
</template>

<script>
import InitServices from '../services/initServices';

export default {
    props : ['secondShow' ,'thirdShow'],
    data() {
        return {
            results: '',
            fundNameVal: [],
            arrayOfString: [],
            fundSel: null,
            secondSel: null,
            thirdSel: null,
            secondShow: false,
            thirdShow: false,
            secondVal: [],
            thirdVal: [],
            stringBuilder : null
        }
    },
    mounted: function() {
        this.getData();
    },
    methods: {
        getData() {
            return InitServices.get().then(response => {
                this.results = response.data;
                //console.log(this.results);//Get all the string od FIELD2 COOLY!!
                this.nameSplit();
            });

        },
        nameSplit() {
            let schemeName = this.results;
            let i;
            let fundName = [];

            for (i = 0; i < schemeName.length; i++) {

                schemeName[i] = schemeName[i].replace(/Plan/g, 'Plan -');
                schemeName[i] = schemeName[i].replace(/- -/g, '-');

                this.arrayOfString = schemeName[i].split(' - ');

                if (this.arrayOfString.length === 1) {

                    fundName.push(this.arrayOfString[0].trim());
                } else if (this.arrayOfString.length === 2) {


                    fundName.push(this.arrayOfString[0].trim());
                } else if (this.arrayOfString.length === 3) {

                    fundName.push(this.arrayOfString[0].trim());

                } else if (this.arrayOfString.length === 4) {
                    fundName.push(this.arrayOfString[0].trim());
                } else { }

            }
            this.fundNameVal = toObject(cleanArray(fundName.unique()));//Append the fundName to the Select area
        },
        getFinalElement() {
            console.log('Hold on we are reaching here');
            let tem_results = [], other_det = [];
            var thirdName = [];
            let all_result = this.results;
            //console.log(all_result);
            for (var i = 0; i < all_result.length; i++) {
                tem_results = all_result[i].split(' - ');


                if (this.fundSel.text === tem_results[0] && this.secondSel === tem_results[1] && tem_results.length === 3) {
                    console.log(tem_results);
                    thirdName.push(tem_results[2]);
                } else if (this.fundSel.text === tem_results[0] && this.secondSel === tem_results[1] && tem_results.length === 2) {
                    this.prepareCall();
                } else { }
            }
            this.thirdVal = thirdName.unique();
            console.log(this.thirdVal);
            if (this.thirdVal.length > 0) {
                this.thirdShow = true;
            }
        },
        getElementNext() {

            let temp_results = [], other_details = [];
            var secondName = [];
            let all_results = this.results;
            for (var i = 0; i < all_results.length; i++) {
                temp_results = all_results[i].split(' - ');
                if (this.fundSel.text === temp_results[0]) {
                    if (temp_results.length === 1) {
                        this.prepareCall();
                        return false;
                    }
                    console.log(temp_results);
                    secondName.push(temp_results[1]);
                }
            }

            this.secondVal = secondName.unique();

            if (this.secondVal.length > 0) {
                this.secondShow = true;
            }
        },
        prepareCall() {
            console.log('Preparing Call');
            if (this.secondSel === null && this.thirdSel === null && this.fundSel.text !== null) {
                this.stringBuilder = this.fundSel.text;
                console.log(this.stringBuilder);
            } else if (this.secondSel !== null && this.thirdSel === null && this.fundSel.text !== null) {
                this.stringBuilder = this.fundSel.text + " - " + this.secondSel;
                console.log(this.stringBuilder);
            } else if (this.secondSel !== null && this.thirdSel !== null && this.fundSel.text !== null) {
                this.stringBuilder = this.fundSel.text + " - " + this.secondSel + " - " + this.thirdSel;
                console.log(this.stringBuilder);
            } else { }
        this.passData();
        },
        passData(){
            //console.log('String Builder');
            let parentchild = {
                stringBuilder : this.stringBuilder,
                secondShow : this.secondShow,
                thirdShow : this.thirdShow
            }
            this.$emit('componentData' , parentchild);
        }
    }
}
</script>

<style>

</style>