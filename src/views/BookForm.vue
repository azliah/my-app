<template>
    <main>
      <Navbar />
      <div class="my-5">
        <div class="mx-auto w-25" style="max-width: 100%">
          <h2 class="text-center mb-2" v-if="formType === 'edit'">Update Book</h2>
          <h2 class="text-center mb-2" v-else-if="formType === 'add'">Add Book</h2>
          <h2 class="text-center mb-2" v-else-if="formType === 'view'">View Book</h2>
          <form @submit.prevent="handleSubmission">
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="id" class="form-label">ISBN</label>
                <input type="text" name="id" id="id" class="form-control" placeholder="ID" required v-model="book.bookid" :disabled="isDisabled('bookid')" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="title" class="form-label">Title</label>
                <input type="text" name="title" id="title" class="form-control" placeholder="Title" required v-model="book.bookname" :disabled="isDisabled('bookname')" />
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="author" class="form-label">Author</label>
                <input type="text" name="author" ref="author" class="form-control" placeholder="Author" required v-model="book.author" :disabled="isDisabled('author')"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="price" class="form-label">Price</label>
                <input type="text" name="price" id="price" class="form-control" placeholder="Price" required v-model="book.price" :disabled="isDisabled('price')"/>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group mb-3">
              <label for="category" class="form-label">Category</label>
              <select v-model="book.cateid" class="form-control" :disabled="formType === 'view'">
                <option value="" selected disabled v-if="formType === 'add'">Choose one</option>
                <option :value="book.cateid" selected v-if="formType !== 'add'">{{ book.catename }}</option>
                <option v-for="option in options"  :value="option.cateid" :key="option.cateid">{{ option.catename }}</option>
              </select>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 form-group text-center">
                <input type="submit" value="Submit" v-show="showSubmitButton" class="btn-style btn-style-clr" :disabled="isDisabled('submit')" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  </template>
  
  <script>
// import ButtonWrapper from '../components/ButtonWrapper.vue';
  import Navbar from '../components/NavbarMenu.vue';
  
  export default {
    components: {
      Navbar
        // ButtonWrapper
    },

    props: {
      bookid: {
        type: Number,
        required: false
      }
  },

    data() {
      return {
        book: {
          bookid: null,
          bookname: '',
          author: '',
          price: '',
          cateid: null
        },
        showSubmitButton: true,
        options: []
       // selectedCateid: null
      };
    },
      computed: {
        formType() {
          return this.$route.params.formType;
        },
        
      },

      mounted() {
        this.fetchOptions();
      },

    methods: {
      isDisabled(val){
          if(this.formType == 'view'){
            this.showSubmitButton = false;
            return true;
          }else if(this.formType == 'edit' && val == 'bookid'){
            return true;
          }else if(this.formType == 'add'){
            return false;
          }
      },

      

      getBooks() {
        fetch(`/api/books/retrieveWithCategory/${this.$route.params.bookid}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            this.book = data;
            this.selectedCateid = this.book.cateid;
          })
          .catch(error => {
            console.error('Error fetching book:', error);
          });
      },

      fetchOptions() {
        fetch(`/api/books/category`)
          .then(res => res.json())
          .then(data => {
            this.options = data;
            console.log(data);
          })
          .catch(error => {
            console.error('Error fetching category:', error);
          });
      },

      handleSubmission() {
        if(this.formType === 'add'){
          this.addBook();
        }else if(this.formType === 'edit'){
          this.updateBook();
        }
      },

      updateBook(){
            if (this.formType !== 'add' && !this.book.cateid) {
                const selectedOption2 = this.options.find(option => option.catename === this.book.catename);
                if (selectedOption2) {
                  //this.selectedCateid  = selectedOption2.cateid;
                  this.book.cateid = selectedOption2.cateid;
                }
              }
              

            //API Request
            fetch('/api/books/updateWithCategory',{
                method: 'PUT',
                headers: {
                   'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.book)
            })
            .then(data =>{
                if(data.status == 500){
                    alert("Update Fail!");
                }else{
                    alert("Update Success!")
                    this.$router.push("/")
                }
                console.log(this.data)
                
            })
        },

        addBook(){
            fetch('/api/books/addWithCategory',{
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(this.book)
            })
            .then(data => {
                if(data.status == 500 || data.status == 404){
                    alert("Fail to add Book!");
                }else if(data.status == 409){
                    alert("Fail! Book ID already exist.");
                }else{
                    alert("Book successfully added!");
                    this.$router.push("/")
                }
                console.log(data)
                
            })
        },

    },
    created() {
      if (this.$route.params.bookid) {
        this.getBooks();
      }
    },
  };
  </script>
  
  <style >
    .dropbtn {
      padding: 10px;
      font-size: 12px;
      border-color: #00b4d8;
      cursor: pointer;
      width: 100%;
    }

    .dropdown-content  {
      color: black;
      padding: 12px 16px;
      text-decoration: none;
      display: block;
}

  </style>
  