<template>
        <v-card width="1080" max-height="600" variant="elevated" elevation="10">
          <v-toolbar
        dark
        color="#6a70eb"
        height="50"
        >
        <v-toolbar-title>Submit Timesheet</v-toolbar-title>
        
        </v-toolbar>
          <v-card-title >
            <div class="w-100 d-flex flex-row justify-space-between">
              <span class="text-h5">TimeSheet</span>

              <TimesheetStatus v-if="timeSheetObj !== undefined" :status="timeSheetObj.status" />

              <input class="week-calendar-input" type="week" v-model="calendarValue"
                @change="onChangeWeek"
              />
            </div>

            <div v-if="timeSheetObj !== undefined && timeSheetObj.status === 'denied'" class="w-100 mt-5">
              <v-btn color="#a83299" :loading="createSheetLoading" @click="onClickReCreate">
                Re-create Sheet
              </v-btn>
            </div>
            
          </v-card-title>

          <v-card-text>
            
            <div >
              <div v-if="timeSheetObj === undefined" class="create-sheet-card d-flex flex-row align-center justify-center" >
                <v-btn color="#a83299" @click="createSheet" :loading="createSheetLoading">
                  Create Sheet
                </v-btn>
              </div>
            
              <EditableTable v-else-if="timeSheetObj.status === 'open'" v-bind:timeSheetObj="timeSheetObj" @getTimeSheet="getTimeSheet"/>
              <NonEditableTable v-else v-bind:timeSheetObj="timeSheetObj" />
            </div>
          

          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            
          </v-card-actions>
        </v-card>

  </template>

  <script>
  import {mapState, mapGetters} from "vuex" ;
  //import TableVue from './TableVue.vue';
  import EditableTable from "./EditableTable.vue"
  import NonEditableTable from "./NonEditableTable.vue"
  import TimesheetStatus from "./TimesheetStatus.vue"
  import {getWeek} from "date-fns"

    export default {
    name:"TimeSheet",

      data: () => ({
       
        createSheetLoading:false,
        calendarValue:"",
        timeSheetObj:undefined,
      }),

      components:{
        EditableTable,NonEditableTable,TimesheetStatus//TableVue,
      },

      computed:{
        ...mapState([
          'startDate', 'endDate', 'employeeId'
        ]),

        ...mapGetters([
          'getHeaders'
        ]),

        checkWeekDataExist(){
          return this.$store.getters.isWeekDataExist
        }
      },

      methods:{
        
        onChangeWeek(){
          if(this.calendarValue !== ''){
            this.$store.dispatch('updateSelectedWeek', this.calendarValue) ;
            this.getTimeSheet()
          }          
        },

        async getTimeSheet(){
          
            const url = `${this.$store.state.backendDomainUrl}/timesheet/employee/${this.employeeId}?start_date=${this.startDate}&&end_date=${this.endDate}`
          
            const options = {
              method:"GET",
              ...this.getHeaders,
            }

            const response = await fetch(url, options) ;

            if(response.ok){
              const jsonData = await response.json() ;

              this.timeSheetObj = jsonData.data ;
              
            }
        },

        async createSheet(){

          this.createSheetLoading = true ;

          const url = `${this.$store.state.backendDomainUrl}/timesheet/create`
          const body = {
            employeeId:this.employeeId,
            week:this.calendarValue,
            startDate:this.startDate,
            endDate:this.endDate
          }

          const options = {
            method:"POST",
            ...this.getHeaders,
            body:JSON.stringify(body)
          }

          const response = await fetch(url, options) ;
          
          if(response.ok){
            const jsonData = await response.json() ;
            console.log(jsonData.timeSheetId) ;
                        
            this.timeSheetObj = {
              timeSheetId:jsonData.timeSheetId,
              week:this.calendarValue,
              status:'open'
            }

            
          }

          this.createSheetLoading = false;
        },

        async onClickReCreate(){
          this.createSheetLoading = true ;
          const url = `${this.$store.state.backendDomainUrl}/timesheet/recreate/${this.timeSheetObj.timeSheetId}`

          const response = await fetch(url, {method:"POST", ...this.getHeaders,}) ;
          
          if(response.ok){
            const data = await response.json() ;
            console.log(data.message) ;

            this.getTimeSheet() ;
          }

          this.createSheetLoading = false ;

        }
        
      },

      created(){
        

        if(this.$route.query.calendarValue !== undefined){
          this.calendarValue = this.$route.query.calendarValue ;
        }
        else{

          const currentDate = new Date() ;

          // format Value ex:2023-W36

          const weekViewFormat = `${currentDate.getFullYear()}-W${getWeek(currentDate, {weekStartsOn:1, firstWeekContainsDate:2})}` ;
          
          //setting up the calendarValue data property to show current week in calendar
          this.calendarValue = weekViewFormat ;

        }


        // passing weekFormat to store state 
        this.$store.dispatch('updateSelectedWeek', this.calendarValue) ;
        
        //const dataInStringFormat = localStorage.getItem('weeklyData')
        //const weeklyData = JSON.parse(dataInStringFormat) ;       
      },                                                
                                                                                                                                                                                                                                                                                                                                                                                                      
      mounted(){
        this.getTimeSheet()
        this.$store.commit('updateDaysOfWeek')
      },
    }
  </script>

  <style scoped>
    .week-calendar-input{
      width:200px;
      border:1px solid #acadaa;
      padding-left:5px;
      padding-right:5px;
      font-size:15px;
    }

    .create-sheet-card{
      height:200px;
    }

  </style>