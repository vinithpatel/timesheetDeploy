<template>
    <div>
        <slot v-bind:onOpenDialog="onOpenDialog">

        </slot>
        <v-dialog v-model="dialog" width="300px" persistent>
            <v-card>
                <v-card-text>
                    Are you sure want to remove {{text}}
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text="Remove" color="red" @click="onClickRemove" >
                        
                    </v-btn>

                    <v-btn
                    text="Cancel"
                    @click="onCloseDialog"
                    ></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    export default({
        data(){
            return ({
                dialog:false,
            })
        },

        props:[
            'id','text'
        ],

        methods:{
            onOpenDialog(){
                this.dialog = true ; 
            },

            onCloseDialog(){
                this.dialog = false ;
            },

            onClickRemove(){
                this.dialog = false;
                this.$emit('onRemove', this.id)
            }
        }
    })
</script>