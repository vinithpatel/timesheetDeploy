<template>
    <v-navigation-drawer
        expand-on-hover
        rail
      >
        <router-link to="/profile" class="router-link">
          <v-list-item
            prepend-avatar="https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
            :title="$store.state.employeeName"
            nav
            :active="isLinkActive('profile')"
            color="primary"
          >
          </v-list-item>
        </router-link>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <div class="mb-5">
            <v-list-subheader class="text-subtitle-1">EMPLOYEE</v-list-subheader>
            <router-link to="/submit_timesheet/" class="router-link">     
              <v-list-item :active="isLinkActive('submit_timesheet')" prepend-icon="mdi-file-send" title="Submit Timesheet" value="home"
              color="#6a70eb"
              ></v-list-item>
            </router-link> 
            <router-link to="/" class="router-link">
              <v-list-item :active="isLinkActive('')" prepend-icon="mdi-text-box-search" title="Search Timesheet" value="searchTimesheet"
              color="#6a70eb"
              ></v-list-item>
            </router-link>

            <router-link to="/review_timesheets" class="router-link">
              <v-list-item :active="isLinkActive('review_timesheets')" prepend-icon="mdi-file-check" title="Review Timesheets" value="reviewTimesheets"
              color="#6a70eb"
              ></v-list-item>
            </router-link>

          </div>
          <div v-if="isAdmin">
              <v-list-subheader class="text-subtitle-1">Admin</v-list-subheader>      
              <router-link to="/employee_timesheets" class="router-link">
                <v-list-item :active="isLinkActive('employee_timesheets')" prepend-icon="mdi-account-search" title="Employee Timesheet" value="employeeTimesheet"
                color="#6a70eb"
                ></v-list-item>
              </router-link>

              <router-link to="/employees" class="router-link">
                <v-list-item :active="isLinkActive('employees')" prepend-icon="mdi-account-supervisor" title="Employees" value="employees"
                color="#6a70eb"
                ></v-list-item>
              </router-link>

              <router-link to="/customers" class="router-link">
                <v-list-item :active="isLinkActive('customers')" prepend-icon="mdi-domain" title="Customers" value="customers"
                color="#6a70eb"
                ></v-list-item>
              </router-link>

              <router-link to="/projects" class="router-link">
                  <v-list-item :active="isLinkActive('projects')" prepend-icon="mdi-file-multiple" title="Projects" value="projects"
                  color="#6a70eb"
                  ></v-list-item>
              </router-link>

              <router-link to="/export" class="router-link">
                <v-list-item :active="isLinkActive('export')" prepend-icon="mdi-export" title="Export Timesheet" value="export"
                color="#6a70eb"
                ></v-list-item>
              </router-link>
            </div>
        </v-list>
      </v-navigation-drawer>
</template>

<script>
  //import TimeSheet from './TimeSheet.vue';
  import {mapState} from "vuex"
    export default({
        data(){
            return ({

            })
        },

        components:{
          
        },

        computed:{
        ...mapState(['isAdmin'])
        },

        methods:{
          isLinkActive(path){
            return path === this.$route.path.split('/')[1]
          }
        }

    })
</script>

<style scoped>
  .router-link{
    text-decoration: none;
    color:black;
  }
</style>