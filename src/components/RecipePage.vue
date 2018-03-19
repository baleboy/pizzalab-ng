<template>
  <div>
    <transition name="fade" mode="out-in">
    <div v-if="!editing">
      <div class="toolbar">
        <button class="toolbutton" v-on:click="openEditor">Edit</button>
        <button class="toolbutton" v-on:click="copyDough">Copy</button>
        <button class="toolbutton button-red" v-on:click="deleteDough">Delete</button>
        <button class="closebutton" v-on:click="close">Close</button>
      </div>
      <div class="content">
        <h1>{{dough.doughName}}</h1>
        <p>{{dough.hydration}}% hydration</p>
        <div class="pizzas">
          <h2>Pizzas</h2>
          <input type="number" v-model.number="dough.pizzas">
        </div>
        <h2>Ingredients</h2>
          <div class="ingredients item-wrapper">
            <div class="ingredient item">
              <h2>Flour</h2>
              <p>{{dough.flour() - dough.prefermentFlour() }}g</p>
            </div>
            <div class="ingredient item">
              <h2>Water</h2>
              <p>{{dough.water() - dough.prefermentWater()}}g</p>
            </div>
            <div class="ingredient item">
              <h2>Salt</h2>
              <p>{{dough.salt()}}g</p>
            </div>
            <div class="ingredient item">
              <h2>Yeast</h2>
              <p>{{dough.yeast() - dough.prefermentYeast()}}g</p>
            </div>
          </div>
          <div v-show="dough.prefermentPrc > 0" class="ingredients item-wrapper">
            <div class="ingredient item">
              <h2>Starter flour</h2>
              <p>{{dough.prefermentFlour()}}g</p>
            </div>
            <div class="ingredient item">
              <h2>Starter water</h2>
              <p>{{dough.prefermentWater()}}g</p>
            </div>
            <div class="ingredient item">
              <h2>Starter yeast</h2>
              <p>{{dough.prefermentYeast()}}g</p>
            </div>
          </div>
        <div class="instructions" v-if="dough.steps">
          <h2>Instructions</h2>
          <p>{{dough.steps}}</p>
        </div>
        <div class="notes">
          <h2>Notes</h2>
          <div class="notesinput">
            <input type="text" placeholder="Type note..." v-model="newNote" v-on:keyup.13="saveNote">
            <button @click="saveNote">Add</button>
          </div>
          <ul v-for="item in notesList">
            <li>
              <p class="timestamp">{{item.formattedTime}}</p>
              <editable :content="item.myText" @edited="updateNote(item.key, $event)"></editable>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <dough-editor v-else v-bind:dough="draftDough" @close="closeEditor" @save="saveDough"></dough-editor>
    </transition>
  </div>
</template>

<script>
import firebase from 'firebase'
import Dough from './dough'
import DoughEditor from './DoughEditor'
import Editable from './Editable'

export default {
  name: 'recipe-page',

  components: {
    DoughEditor,
    Editable
  },

  data () {
    return {
      dough: new Dough(),
      draftDough: new Dough(),
      editing: false,
      copying: false,
      newNote: '',
      notesList: []
    }
  },

  created () {
    this.getDough()
  },
  watch: {
    '$route': 'getDough'
  },

  mounted: function () {
    console.log('mounted')
    let ref = this.getDoughRef().child('notes')
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
  },
  methods: {
    close: function () {
      this.$router.replace('/')
    },
    openEditor: function () {
      this.draftDough.copy(this.dough)
      this.editing = true
    },
    closeEditor: function () {
      if (this.draftDough.isEqual(this.dough)) {
        this.editing = false
      } else {
        this.$dialog.confirm('Discard edits?').then(() => {
          this.editing = false
        })
      }
    },
    saveDough: function () {
      if (!this.copying) {
        this.dough.copy(this.draftDough)
        this.getDoughRef().set(this.dough)
      } else {
        this.draftDough.timeCreated = Date.now()
        let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
        let newDoughRef = doughListRef.push()
        newDoughRef.set(this.draftDough)
        this.copying = false
        this.$router.push('/' + this.userId + '/doughs/' + newDoughRef.key)
      }
      this.editing = false
    },
    deleteDough: function () {
      this.$dialog.confirm('Are you sure you want to delete this dough?')
        .then(() => {
          console.log('Clicked on proceed')
          this.getDoughRef().remove()
          this.close()
        })
        .catch(() => {
          console.log('Clicked on cancel')
        })
    },
    copyDough: function () {
      this.copying = true
      this.draftDough.copy(this.dough)
      this.draftDough.doughName = 'Copy of ' + this.dough.doughName
      this.editing = true
    },
    getDough: function () {
      this.getDoughRef().once('value').then((snapshot) => {
        if (snapshot.val()) {
          this.dough.copy(snapshot.val())
        } else {
          console.log('Error retrieving dough')
        }
      })
    },
    getDoughRef: function () {
      let uid = this.$route.params.userId
      let did = this.$route.params.doughId
      return firebase.database().ref('users/' + uid + '/doughs/' + did)
    },
    saveNote: function () {
      let ref = this.getDoughRef().child('notes')
      ref.push({ myText: this.newNote, myTime: Date.now() })
      this.newNote = ''
    },
    updateNote: function (key, text) {
      console.log(key + ': update comment: ' + text)
      let dref = this.getDoughRef().child('notes/' + key + '/myText')
      dref.set(text)
    }
  },

  props: [ 'userId', 'doughId' ],

  computed: {
    instructions: function () {
      return this.dough.steps.replace(/\r?\n/g, '<br>')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
a {
  color: #42b983;
}

.pizzas {
  text-align: center;
  padding: 1em;
  margin-bottom: 2em; }
  .pizzas input {
    font-size: 3em;
    background: none;
    width: 2em;
    text-align: center; }
  .pizzas h2 {
    font-size: 1em; }

.item-wrapper {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  margin: auto;
  margin-bottom: 2em;
  max-width: 650px; }

.item {
  -webkit-box-flex: 1;
      -ms-flex-positive: 1;
          flex-grow: 1;
  text-align: center;
  min-width: 150px;
  padding: 1em; }

.ingredient p {
  font-size: 2em;
  margin: 0; }

.ingredient h2 {
  font-size: 0.8em;
  margin-top: 0;
  margin-bottom: 0.5em;
  color: #777777; }

.instructions {
  max-width: 550px;
  margin: auto;
}
.instructions p {
  white-space: pre-wrap;
  text-align: justify;
}

.notes {
  max-width: 550px;
  margin: auto;
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
  margin-top: -1em;
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

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s ease-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@media (max-width: 660px) {
  .item-wrapper {
    max-width: 400px;
  }
  .instructions {
    max-width: 300px;
  }
  .notes {
    max-width: 300px;
  }
  .notesinput input {
    max-width: 200px;
  }
}
</style>
