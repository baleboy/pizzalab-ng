<template>
  <div>
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
      </div>
    </div>
    <dough-editor v-if="editing" v-bind:dough="draftDough" @close="closeEditor" @save="saveDough"></dough-editor>
  </div>
</template>

<script>
import firebase from 'firebase'
import Dough from './dough'
import DoughEditor from './DoughEditor'

export default {
  name: 'recipe-page',

  components: {
    DoughEditor
  },

  data () {
    return {
      dough: new Dough(),
      draftDough: new Dough(),
      editing: false
    }
  },

  created () {
    this.getDough()
  },
  watch: {
    '$route': 'getDough'
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
      this.dough.copy(this.draftDough)
      this.getDoughRef().set(this.dough)
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
      let dup = new Dough()
      dup.copy(this.dough)
      dup.doughName = 'Copy of ' + dup.doughName
      dup.timeCreated = Date.now()
      let doughListRef = firebase.database().ref('users/' + this.userId + '/doughs')
      let newDoughRef = doughListRef.push()
      newDoughRef.set(dup)
      this.$router.push('/' + this.userId + '/doughs/' + newDoughRef.key)
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

@media (max-width: 660px) {
  .item-wrapper {
    max-width: 400px;
  }
  .instructions {
    max-width: 300px;
  }
}
</style>
