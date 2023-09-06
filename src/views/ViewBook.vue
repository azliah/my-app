<template>
    <main>
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <header>
                    <h1 class="text-center">Bookstore</h1>
                    </header>
                    <div class="search-bar">
                        <input v-model="searchText" placeholder="Search book title or author..." class="box-pl">
                    </div>
                    <div class="container">    
                        <div class="grid">  
                            <div class="cell" v-for="book in getFilteredItems" :key="book.bookid" :id="book.bookid">
                                <div class="text-center pointer-cursor" @dblclick="viewDetails(book.bookid)">
                                    <div class="cell-img">
                                        <img src="https://cutewallpaper.org/24/blank-book-cover-png/blank-book-cover-png-photo-png-arts.png" alt="Book">
                                    </div>
                                    <book-details :booktitle="book.bookname" :author="book.author" :price="book.price" /> 
                                    <button-wrapper :bookid="book.bookid" :book="book" :getBook="getBooks"></button-wrapper>
                                </div>
                            </div>
                            <div class="cell">
                                <a class="pointer-cursor" @click="addNewBook">
                                    <img class="img-sty" src="https://cdn-icons-png.flaticon.com/512/7170/7170178.png" alt="add new book">
                                </a> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import BookDetails from '@/components/BookDetails.vue';
import ButtonWrapper from '@/components/ButtonWrapper.vue';

export default{
    name: "ViewBooks",
    components:{
        BookDetails,
        ButtonWrapper
    },

    data(){
        return{
            books: [],
            searchText: ''
        }
    },

    beforeMount(){
        this.getBooks()
    },

    
    computed: {
        getFilteredItems() {
            return this.books.filter(book =>
                book.bookname.toLowerCase().includes(this.searchText.toLowerCase())||
                book.author.toLowerCase().includes(this.searchText.toLowerCase())
                
            );
    }
},

    methods:{
        getBooks() {
            fetch('/api/books')
            .then(res => res.json())
            .then(data => {
                this.books = data;
                console.log(data);
            })
            .catch(error => {
                console.error('Error fetching books:', error);
            });
        },

        addNewBook(){
            this.$router.push({
                name: 'add',
                params: { formType: 'add' }
            });
        },

        viewDetails(bookid){
            this.$router.push({
                name: 'details',
                params: { bookid, formType: 'view'}
            });
        },

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


    }

    
}

</script>

<style>

.btn-style {
  border: none;
  color: white;
  padding: 4px 10px;
  text-align: center;
  display: inline-block;
  font-size: 14px;
  border-radius: 4px;
  margin: 3px;
} 

.btn-style-clr {
  background-color: #00b4d8;
  justify-content: center;
  align-items: center;
}

.pointer-cursor{
    cursor: pointer;  
}


.btn-style-dlt {
  background-color: #ff3939;
  justify-content: center;
  align-items: center;
}

.btn-style-ccl {
  background-color: #4e4d4d;
}

.button-style:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

header {
  background-color: #00b4d8;
  padding: 50px;
  text-align: center;
  font-size: 45px;
  color: white;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, 210px); 
  grid-template-rows: repeat(5, 250px);
  grid-gap: 5px;
}

.cell {
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: Arial;
  font-size: 1.5rem;
  font-weight: bold;
  background: white;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 10px;
  position: relative;
}

.confirm-text {
  font-size: 18px;
  color: #fcfcfc;
}

.details {
  font-size: 10px;
  color: #060505;
  font-weight: lighter;
  margin-bottom: 2px;
}

.title {
  font-size: 15px;
  font-weight: bold;
  margin-top: 8px;
  margin-bottom: 8px;
}

.confirmation-popup {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.644);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2; 
}

.cell-img {
  justify-content: center;
  align-items: center;
  display: flex;
  font-family: Arial;
  font-size: 0.8rem;
  font-weight: bold;
  margin: 5px;
  position: relative;
}



.search-bar{
    margin:2%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.box-pl {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  width: 40%;
  border-radius: 100px;
  border-style: solid;
  border-color: #00b4d8;
}

.img-sty{
    width: 50%;
    height: 50%;
    margin: 25%;

}

.pull-right {
    float: right;
}

img{
    width: 50px;
    height: 60px;
}

button {
  border: none;
  cursor: pointer;
  appearance: none;
  background-color: inherit;
}

.button-container {
  margin-bottom: 20px;
  margin-top: 20px;
}

h1{
    font-size: 80px;
	color: #fcfcfc;
	line-height: 230px;
	text-transform: uppercase;
	font-weight: 80;	
    margin-top: 80px;	
    margin-bottom: 100px;
}


</style>

