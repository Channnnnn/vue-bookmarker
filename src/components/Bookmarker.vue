<template>
    <div>
      <div class="jumbotron">
        <h1>Bookmark Your Favorite Sites</h1>
        <form id="myForm">
          <div class="form-group">
            <label>Site Name</label>
            <input type="text" class="form-control" id="siteName" placeholder="Website Name">
          </div>
          <div class="form-group">
            <label>Site URL</label>
            <input type="text" class="form-control" id="siteUrl" placeholder="Website URL">
          </div>
          <button @click="saveBookmark">Submit</button>
        </form>
      </div>

      <div class="row marketing">
        <div class="col-lg-12">
              <record v-for="(record,index) in records" :key="record.name" :record="record" @remove-self="deleteBookmark(record.name)"></record>
        </div>
      </div>

    </div>
</template>

<script>
import record from '@/components/Record'
import firebase from 'firebase'
import { db } from '@/firebaseConfig'

var md5 = require('md5');

export default {
    name: 'Bookmarker',
    components: { record },
    data(){
        return{
            records: [ 
                {
                    name: '',
                    url: ''
                },
            ],
            uid: null,
        }
    },
    methods: {
        saveBookmark: function(e) {
            var siteName = document.getElementById('siteName').value;
            var siteUrl = document.getElementById('siteUrl').value;

            // validate form inputs
            if(!this.validateForm(siteName, siteUrl)){
                e.preventDefault();
                return false;
            }

            db.ref('users/' + this.uid + '/bookmarks/').update({[siteName] : siteUrl});

            // Clear form
            document.getElementById('myForm').reset();

            // Re-fetch bookmarks
            this.fetchBookmarks();

            // Prevent form from submitting
            e.preventDefault();
        },
        fetchBookmarks: function () {
            console.log(this.uid);
            var records = []
            var bookmarks = db.ref('users/' + this.uid + '/bookmarks/');
            bookmarks.on('value', function(snapshot) {
                snapshot.forEach(function(child) {
                var name = child.key;
                var url = child.val(), expr = /https?:\/\//;
                var modUrl = url.search(expr) === -1 ? 'http://' + url : url;
                records.push({name:name, url:modUrl});
                });
            });
            this.records = records;
        },
        validateForm: function (siteName, siteUrl){
            if(!siteName || !siteUrl){
                alert('Please fill in the form');
                return false;
            }

            // create regular expression to match URL pattern.
            // https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
            var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
            var regex = new RegExp(expression);

            if(!siteUrl.match(regex)){
                alert('Please use a valid URL');
                return false;
            }

            return true;
        },
        deleteBookmark: function (key){
            // Get bookmarks from fireBase
            var bookmarks = db.ref('users/' + this.uid + '/bookmarks/');
            bookmarks.child(key).remove();
            this.fetchBookmarks();
        },
    },
    created(){
        var user = firebase.auth().currentUser;
        if(user){
            this.uid = md5(user.email);
            this.fetchBookmarks();
        }
    },
}
</script>

<style scoped>
/* Everything but the jumbotron gets side spacing for mobile first views */
.jumbotron{
    background-color: #eee;
    width: 75%;
    padding: 2em;
    margin: auto;
    box-sizing: border-box;
    border-radius: 35px;
}
h1{
    font-weight: normal;
}
label{
    display: block;
    line-height: 1.5em;
    font-size: 1.4em;
}
input[type="text"]{
    padding: .75em;
    width: 75%;
    border-radius: 10px;
    border: 2px solid #ccc;
    outline: none;
}
input[type="text"]:focus{
    border: 2px solid skyblue;
}
.form-group{
    margin: .5em 0;
}
a.bttn, button{
  text-decoration: none;
  font-size: 1.25rem;
  border: 0;
  background-color: #42b983;
  color: white;
  padding: 1em;
  min-width: 150px;
  border-radius: 5px;
  cursor: pointer;
  transition: all .15s;
}
button{
    margin: 1em 0;
  background-color: #e85757;
}
a.bttn:hover, bttn:hover{
  opacity: .75;
}
</style>
