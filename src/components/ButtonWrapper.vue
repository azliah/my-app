<template>
    <div class="button-wrapper">
        <div class="confirmation-popup" v-if="showConfirmation[bookid]">
            <p class="confirm-text">Are you sure you want to delete this book?</p>
            <button class="btn-style btn-style-dlt mx-2" @click="confirmDelete(bookid)">Confirm Delete</button>
            <button class="btn-style btn-style-ccl mx-2" @click="cancelDelete(bookid)">Cancel</button>
        </div>
        <div class="button-group">
            <button class="btn-style btn-style-clr mx-2" @click="updateBook(bookid)" v-if="!showConfirmation[bookid]">Update</button>
            <!-- <button class="btn-style btn-style-clr mx-2" @click="changeForm(bookid)" v-else-if="!showConfirmation[bookid] && isView">Update</button> -->
            <button class="btn-style btn-style-dlt" @click="toggleConfirmation(bookid)" v-if="!showConfirmation[bookid]">Delete</button>
        </div>
   </div>
</template>

<script>

export default{
 
    data(){
        return{
            showConfirmation: {}
        }
    },

    props: {
        bookid: {
            type: Number,
            required: false
        },
        book: {
            type: Object,
            required: true
        },
        getBook:{
            type: Function,
            required: true
        },
        isView:{
            type: Boolean,
            required: false
        }
    },

    methods:{
        // changeForm(bookid){

        // },

        toggleConfirmation(bookid) {
                this.$set(this.showConfirmation, bookid, !this.showConfirmation[bookid]);
        },
        confirmDelete(bookid) {
                // Delete the book
            fetch(`/api/books/delete/${bookid}`, {
                    method: "DELETE"
            })
            .then((data) => {
                if (data.status == 500) {
                    alert("Fail to delete Book!");
                } else {
                    alert("Book with ID " + bookid + " successfully deleted!");
                }     
                this.getBook();
            })
                
            .finally(() => {
                this.showConfirmation[bookid] = false;
            }); 
        },

        cancelDelete(bookid) {
            this.showConfirmation[bookid] = false;
        },

        updateBook(bookid) {
            this.$router.push({
            name: 'edit',
            params: { bookid, formType: 'edit' }
            });
        }
    }
    }
       
</script>

<style>


</style>
