<template>
  <div class="notes">
    <h2>Notes</h2>
    <div class="notesinput">
      <input type="text" placeholder="Type note..." v-model="newNote" v-on:keyup.13="saveNote">
      <button @click="saveNote">Add</button>
    </div>
    <ul v-for="item in notesList">
      <li>
        <p class="timestamp">{{item.formattedTime}}</p>
        <editable class="body" :content="item.myText" @edited="updateNote(item.key, $event)"></editable>
        <i class="fas fa-trash-alt inline-button" @click="deleteNote(item.key)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
import Editable from './Editable'

export default {
  name: 'notes-panel',
  components: {
    Editable
  },
  data: function () {
    return {
      notesList: [],
      newNote: ''
    }
  },
  methods: {
    saveNote: function () {
      let ref = this.getNotesRef()
      ref.push({ myText: this.newNote, myTime: Date.now() })
      this.newNote = ''
    },
    updateNote: function (key, text) {
      let ref = this.getNotesRef().child(key + '/myText')
      ref.set(text)
    },
    deleteNote: function (key) {
      console.log('delete note ' + key)
      let ref = this.getNotesRef().child(key)
      ref.remove()
    },
    getNotesRef: function () {
      let uid = this.$route.params.userId
      let did = this.$route.params.doughId
      return firebase.database().ref('users/' + uid +
        '/doughs/' + did + '/notes')
    }
  },
  mounted: function () {
    let ref = this.getNotesRef()
    ref.on('child_added', (data) => {
      let newNote = data.val()
      let d = new Date(newNote.myTime)
      newNote.formattedTime = d.toLocaleString()
      newNote.key = data.key
      this.notesList.push(newNote)
      this.notesList.sort(function (n1, n2) {
        return (n2.myTime - n1.myTime)
      })
    })
    ref.on('child_removed', (data) => {
      console.log('removed note ' + data.key)
      for (var i = 0; i < this.notesList.length; i++) {
        if (this.notesList[i].key === data.key) {
          console.log('remove list element ' + i)
          this.notesList.splice(i, 1)
          break
        }
      }
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.notes {
  max-width: 550px;
  margin: auto;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.notes li {
  width: 100%;
  white-space: pre-wrap;
  text-align: justify;
  margin-top: 1em;
}

.notes p {
  margin: 0;
  padding: 0;
  margin-bottom: -1em;
}

.notesinput input {
  width: 400px;
  margin-right: 20px;
  font-size: 0.8em;
}

.timestamp {
  color: gray;
  font-size: 0.8em;
}

.inline-button {
  float: right;
  color: gray;
}

.inline-button:hover {
  color: lightGray;
}

@media (max-width: 660px) {
  .notes {
    max-width: 300px;
  }
  .notesinput input {
    max-width: 200px;
  }
}
</style>
