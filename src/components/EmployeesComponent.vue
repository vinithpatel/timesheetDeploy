<template>
  <v-container fluid  class="w-100" style="height: 100vh;" >
    <v-card class="h-100 overflow-y-auto" variant="elevated" elevation="10" >
        <v-toolbar
        dark
        color="#6a70eb"
        height="50"
        >
        <v-toolbar-title>Employees List</v-toolbar-title>
        </v-toolbar>
        <v-card-title>
          <v-row>
                <v-col cols="12" md="3" >
                    <v-text-field
                      :loading="loading"
                      density="compact"
                      variant="outlined"
                      
                      hide-details
                      placeholder="Search Employee Id"
                      v-model="employeeId"
                      @input="onupdateInput"
                      
                ></v-text-field>
                </v-col> 
                <v-col cols="12" md="3">
                    <v-text-field
                      :loading="loading"
                      density="compact"
                      variant="outlined"
                      
                      hide-details
                      placeholder="Search Name"
                      v-model="employeeName"
                      @input="onupdateInput"
                    ></v-text-field>
                </v-col>   
        </v-row>
        <v-row>
          <NewEmployeePopup @getEmployees="getEmployees"/>
        </v-row>
        </v-card-title>
        <v-card-text>
          <v-list v-if="!loading">
            <v-list-item
            v-for="item in employeesList"
            :key="item.employeeId"
            :title="`${item.employeeId} - ${item.employeeName}`"
            :subtitle="`Position : ${item.positionName}`"
            elevation="4"
            lines="three"
            variant="elevated"
            class="mb-2"
            :rounded="true"
          >
              <v-row justify="end">
                <v-col cols="2">
                  <router-link :to="`project_assignment/${item.employeeId}`"><v-btn color="primary">Assign Projects</v-btn></router-link>
                </v-col>
                <v-col cols="2">
                    <DeleteButton v-slot="{onOpenDialog}" @onRemove="deleteEmployee" v-bind:id="item.employeeId" text="employee">
                      <v-btn color="#ab1e02" @click="onOpenDialog">DELETE EMPLOYEE</v-btn>
                    </DeleteButton> 
                </v-col>
              </v-row>
         </v-list-item>
          </v-list>
          <div v-if="employeesList.length === 0" class="d-flex flex-row justify-center">
              No Data Found
          </div>
        </v-card-text>
        
         
            <div v-if="loading" style="height:400px; width:100%;" class="d-flex flex-row align-center justify-center">
              <v-progress-circular
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
            
    </v-card>
  </v-container>
</template>

<script>
//import ProjectAssignment from './ProjectAssignment.vue'
import NewEmployeePopup from './NewEmployeePopup.vue'
import DeleteButton from "./DeleteButton.vue"
import { mapGetters } from 'vuex'

export default {

  data(){
    return ({
      loading:true,
      employeeId:'',
      employeeName:'',
      employeesList:[],

    })
  },

  components:{
      NewEmployeePopup,DeleteButton//ProjectAssignment
  },

  computed:{
    ...mapGetters(['getHeaders'])
  },

  methods:{
    onupdateInput(){
      this.getEmployees() 
    },

    async getEmployees(){
      this.loading = true ;

      const url = `${this.$store.state.backendDomainUrl}/employees?employeeId=${this.employeeId}&&employeeName=${this.employeeName}`
      const options = {
        method:"GET",
        ...this.getHeaders,
      }

      const response = await fetch(url, options) ;

      if(response.ok){
        const data = await response.json() ;
        this.employeesList = data
        this.loading = false
        console.log(data) ;
      }
    },

    async deleteEmployee(employeeId){
      
      const url = `${this.$store.state.backendDomainUrl}/employee/delete/${employeeId}`

      const options = {
        method:"DELETE",
        ...this.getHeaders,
      }

      const response = await fetch(url, options) ;

      if(response.ok){
        
        this.getEmployees() ;
      }
    }
  },

  mounted(){
      this.getEmployees() ;
  }

}
</script>

<style>

</style>