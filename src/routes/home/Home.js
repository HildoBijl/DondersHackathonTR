/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.css';
import $ from 'jquery';

class Home extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   stage: 0
    // }
    this.state = {
      stage: 2,
      input: 'I am smelling apple pie. Hungry!',
      articleIndex: 5
    }
    this.articles = [
      {
        title: 'The anatomy of smelling',
        words: 350,
        newWords: 21
      },
      {
        title: 'Beating hunger',
        words: 328,
        newWords: 12
      },
      {
        title: 'A brief history of apple pies',
        words: 397,
        newWords: 24
      },
      {
        title: 'Apples and their uses',
        words: 412,
        newWords: 37
      },
      {
        title: 'On the domestication of apple trees',
        words: 212,
        newWords: 25,
        sentencesEN: ['This is the starting sentence.', 'Naturally a middle sentence follows.', 'Everything is closed by the final sentence.', 'Although there can also be other sentences.', 'And it just goes on and on.', 'Even when it becomes boring.'],
        sentencesNL: ['Dit is de beginzin.', 'Natuurlijk volgt een middenzin.', 'Alles wordt afgesloten door de eindzin.', 'Hoewel er ook andere zinnen kunnen zijn.', 'En het gaat maar door en door.', 'Zelfs als het saai wordt.'],
        wordsEN: ['naturally', 'follows', 'everything'],
        wordsNL: ['natuurlijk', 'volgt', 'alles'],
        wordsIMG: ['naturally', 'follows', 'everything']
      },
      {
        title: 'How to bake an apple pie',
        words: 86,
        newWords: 7,
        "sentencesEN": [
          "Preheat the oven to 200 degrees Centigrade.",
          "Place the flour, salt, and butter in a large bowl.",
          "Mix the butter with the flour until it forms tiny balls.",
          "Slowly add the water.",
          "Knead the mixture until a large dough ball forms.",
          "Roll the dough out into a circle shape.",
          "Place the dough into the bake form.",
          "Peel and slice the apples into pieces.",
          "Make the filling and pour it on top of the dough.",
          "Bake the pie for 15 minutes.",
          "Allow the pie to cool for one hour."
        ],
        "sentencesNL": [
          "Verwarm de oven voor op 200 graden Celsius.",
          "Doe de bloem, zout en boter in een grote kom.",
          "Meng de boter met de bloem tot balletjes.",
          "Voeg langzaam het water toe.",
          "Kneed het mengsel tot een grote bal deeg.",
          "Rol het deeg uit tot een cirkel vorm.",
          "Leg het deeg in de bakvorm.",
          "Schil en snijd de appels in stukjes.",
          "Maak de vulling en giet het bovenop het deeg.",
          "Bak de taart 15 minuten.",
          "Laat de taart één uur afkoelen."
        ],
        "wordsEN": [
          "oven",
          "bowl",
          "knead",
          "flour",
          "bake form",
          "dough",
          "peel"
          ],
        "wordsNL": [
          "oven",
          "schaal",
          "kneed",
          "bloem",
          "bakvorm",
          "deeg",
          "schil",
          "garde",
          "eieren",
          "mixer",
          "pan",
          "melk",
          "spatel",
          "braadpan"
          ],
        "wordsImages": [
          "01_oven_400px.png",
          "09_Bowl_400px.png",
          "08_Knead_Dough_400px.png",
          "05_flour_400px.png",
          "04_bake_form_400px.png",
          "02_dough_400px.png",
          "03_peel_apple_400px.png",
          "06_whisker_400px.png",
          "07_eggs_400px.png",
          "10_Mixer_400px.png",
          "11_Pan_400px.png",
          "12_Milk_400px.png",
          "13_Spatula_400px.png",
          "14_Other_Pan_400px.png"
          ]
      }
    ]
  }
  render() {
    let element;
    switch (this.state.stage) {
      case 0:
        element = <Intro
          name="Hildo"
          process={this.processInput.bind(this)}
        />
        break;
      case 1:
        element = <SelectArticle
          entry={this.state.input}
          articles={this.articles}
          selectArticle={this.selectArticle.bind(this)}
        />
        break;
      case 2:
        element = <ShowArticle
          article={this.articles[this.state.articleIndex]}
          done={this.goToNextStage.bind(this)}
        />
      case 3:
      case 4:
        element = <Collocation
          article={this.articles[this.state.articleIndex]}
          stage={this.state.stage}
          done={this.goToNextStage.bind(this)}
        />
      case 5: <h1 className={s.title}>We'll still put some statistics here</h1>
        break;
      default:
        element = <h1 className={s.title}>We're still building this page... Do check back later!</h1>
    }
    return (
      <div className={s.root}>
        {element}
      </div>
    );
  }
  processInput() {
    if (this.state.stage != 0)
      return
    let input = $('#entry').val()
    input = 'I am smelling an apple pie. Hungry...' // Hardfix overwrite.
    this.setState({input: input, stage: 1})
  }
  selectArticle(articleIndex) {
    if (this.state.stage != 1)
      return
    articleIndex = 5 // Hardfix overwrite.
    this.setState({articleIndex: articleIndex, stage: 2})
  }
  goToNextStage() {
    this.setState({stage: this.state.stage + 1})
  }
}

class Intro extends React.Component {
  constructor() {
    super()
  }
  componentDidMount() {
    $('#entry').focus()
    let that = this;
    $(document).keypress(function(e) {
      if(e.which == 13) {
        that.props.process()
      }
    });
  }
  render() {
    return (
      <div className={s.container}>
        <h1>Welcome {this.props.name}</h1>
        <p>What is on your mind today?</p>
        <input type="text" className={s.text} id="entry" name="entry"/>
      </div>
    )
  }
}

class SelectArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      articlesShown: 0
    }
  }
  componentDidMount() {
    this.lookUpArticle()
  }
  render() {
    let spinner = <img src={"spinner.gif"} className={s.spinner} alt={"Please wait"}/>
    let articles = this.props.articles.map((item, index) => {
      if (index < this.state.articlesShown) {
        const wordTarget = 15
        let colorIndex = Math.min(item.newWords/wordTarget, 2)
        let color
        if (colorIndex < 1) {
          color = 'rgb(' + 0 + ',' + Math.round(colorIndex*255) + ',' + Math.round((1 - colorIndex)*255) + ')'
        } else {
          color = 'rgb(' + Math.round((colorIndex - 1)*255) + ',' + Math.round((2 - colorIndex)*255) + ',' + 0 + ')'
        }
        let style = {color: color}
        let that = this
        let click = function() {
          if (that.state.articlesShown == that.props.articles.length) {
            that.props.selectArticle(index)
          }
        }
        return (
          <li key={index}>
            <em className={s.articleTitle} style={style} onClick={click}>{item.title}</em>
            <em className={s.wordCount}>{item.newWords}/{item.words} new words</em>
          </li>
        )
      }
    })
    return (
      <div className={s.container}>
        <p className={s.entry}>{this.props.entry}</p>
        <p>Thank you for your story. I will find some articles which will be interesting for you.</p>
        <ul className={s.articles}>
          {articles}
        </ul>
        {this.state.articlesShown == this.props.articles.length ? '' : spinner}
      </div>
    )
  }
  lookUpArticle() {
    if (Math.random() < 0.2) {
      this.setState({articlesShown: this.state.articlesShown + 1})
    }
    if (this.state.articlesShown < this.props.articles.length) {
      setTimeout(this.lookUpArticle.bind(this), 100)
    }
  }
}

class ShowArticle extends React.Component {
  constructor() {
    super()
    this.state = {
      wordStatus: [],
      imgStatus: []
    }
    this.perm = [4,3,13,5,8,7,2,11,9,0,10,1,6,12]
    // this.invPerm = []
    // for (let i = 0; i < this.perm.length; i++) {
    //   this.invPerm[this.perm[i]] = i
    // }
  }
  render() {
    // Setting up sentences.
    let wordCounter = 0, sentenceCounter = 0
    let article = this.props.article
    let sentences = article.sentencesEN.map((item, index) => {
      let indices = []
      let lc = item.toLowerCase()
      for (let i = 0; i < article.wordsEN.length; i++) {
        let ind = lc.indexOf(article.wordsEN[i])
        if (ind != -1) {
          indices.push({word: i, at: ind})
        }
      }
      indices.sort((a,b) => (a.at - b.at))
      let results = []
      for (let i = 0; i < indices.length; i++) {
        let pre = item.substring(i == 0 ? 0 : indices[i-1].at + article.wordsEN[indices[i-1].word].length, indices[i].at)
        let word = item.substr(indices[i].at, article.wordsEN[indices[i].word].length)
        let status = this.state.wordStatus[indices[i].word]
        status = (status == undefined ? 0 : status)
        let wordClass = ['wordNormal', 'wordClicked', 'wordCorrect', 'wordWrong'][status]
        results.push(<span key={wordCounter++}>{pre}</span>)
        results.push(<span key={wordCounter++} className={[s.word, s[wordClass]].join(' ')} onClick={(evt) => this.clickOnWord(indices[i].word, evt)}>{word}</span>)
      }
      let finalPre = item.substring(indices.length == 0 ? 0 : indices[indices.length-1].at + article.wordsEN[indices[indices.length-1].word].length)
      results.push(<span key={wordCounter++}>{finalPre}</span>)
      return <span key={sentenceCounter++} className={s.sentence} onClick={(evt) => this.clickOnSentence(index, evt)}>{results} </span>
    })

    // Setting up images.
    let that = this
    let images = this.perm.map((item, index) => {
      let word = article.wordsNL[item]
      let image = article.wordsImages[item]
      let status = this.state.imgStatus[item]
      status = (status == undefined ? 0 : status)
      return <Image
        key={index}
        file={image}
        word={word}
        status={status}
        onClick={() => {that.clickOnImage(item)}}
      />
    })

    // Displaying stuff.
    return (
      <div className={s.container}>
        <p>The bold words are words you do not know yet. Use the context to connect each of them to the right picture.</p>
        <p className={s.doneMatching}>You have matched all the words. You can now <span onClick={this.props.done}>continue to the next step of learning</span>.</p>
        <h1 style={{'marginTop': '0px'}}>{article.title}</h1>
        <p id="article" className={s.article}>
          <span id="translation" className={s.translation}/>
          {sentences}
        </p>
        <div className={s.imgContainer}>
          {images}
        </div>
        <p className={s.doneMatching}>You have matched all the words. You can now <span onClick={this.props.done}>continue to the next step of learning</span>.</p>
      </div>
    )
  }
  clickOnSentence(index, evt) {
    let elem = evt.target.parentElement
    let top = evt.clientY - $('#article')[0].getBoundingClientRect().top + 20
    $('#translation').css('top', top + 'px')
    $('#translation').css('display', 'block')
    let mouseout = function() {
      $('#translation').css('display', 'none')
      $(elem).off('mouseout', mouseout)
    }
    $(elem).mouseout(mouseout)
    $('#translation').html(this.props.article.sentencesNL[index])
    console.log('The user clicked on sentence ' + index)
  }
  clickOnWord(index, evt) {
    evt.stopPropagation() // Prevent state bubbling to the sentence.
    let wordStatus = this.state.wordStatus
    if (wordStatus[index] == 2 || wordStatus[index] == 3)
      return
    console.log('Click on word ' + index)
    if (wordStatus[index] == 1) {
      wordStatus[index] = 0
    } else {
      for (let i = 0; i < wordStatus.length; i++) {
        if (wordStatus[i] == 1)
          wordStatus[i] = 0
      }
      wordStatus[index] = 1
    }
    this.checkForMatch()
    this.forceUpdate()
  }
  clickOnImage(index) {
    let imgStatus = this.state.imgStatus
    if (imgStatus[index] == 2 || imgStatus[index] == 3)
      return
    console.log('Click on image ' + index)
    if (imgStatus[index] == 1) {
      imgStatus[index] = 0
    } else {
      for (let i = 0; i < imgStatus.length; i++) {
        if (imgStatus[i] == 1)
          imgStatus[i] = 0
      }
      imgStatus[index] = 1
    }
    this.checkForMatch()
    this.forceUpdate()
  }
  checkForMatch() {
    let wordSelected = this.state.wordStatus.indexOf(1)
    let imgSelected = this.state.imgStatus.indexOf(1)
    if (wordSelected == -1 || imgSelected == -1)
      return
    let result = (wordSelected == imgSelected ? 2 : 3)
    this.state.wordStatus[wordSelected] = result
    this.state.imgStatus[imgSelected] = 0
    this.state.imgStatus[wordSelected] = result
    let done = true
    for (let i = 0; i < this.props.article.wordsEN.length; i++) {
      if (this.state.wordStatus[i] == 0 || this.state.wordStatus[i] == undefined) {
        done = false
      }
    }
    if (done) {
      $('.'+s.doneMatching).css('display', 'block')
    }
  }
}

class Word extends React.Component {
  render() {
    return (
      <span className={s.word}>this.props.value</span>
    )
  }
}

class Image extends React.Component {
  render() {
    let status = this.props.status
    let imageClass = ['imgNormal','imgClicked','imgCorrect','imgWrong'][status]
    return <div className={[s.img, s[imageClass]].join(' ')} onClick={this.props.onClick}>
      <img src={'images/'+this.props.file} className={s.wordImg} alt={this.props.word}/>
      <p>{this.props.word.capitalizeFirstLetter()}</p>
      <div className={s.overlay}/>
    </div>
  }
}

class Collocation extends React.Component {
  constructor() {
    super()
  }
  render() {
    // Definining words.
    let stage = this.props.stage - 3
    let index = [0,3][stage]
    let pre = [['preheat','heat','turn on'],['add','sift','whisk']][stage]
    let preTrans = [['voorverwarm','verwarm','zet aan'],['voeg toe','zeef','klop']][stage]
    let post = [['rack','temperature','door'],['mixture','cup','tortilla']][stage]
    let postTrans = [['rek','temperatuur','deur'],['mengsel','kopje','tortilla']][stage]

    // Showing stuff.
    return (
      <div className={s.container}>
        <div className={s.collLeft}/>
        <div className={s.collMid}/>
        <div className={s.collRight}/>
        <p>Of the words that you just learned, fill in the right one. It is the word that often ...</p>
      </div>
    )
  }
}

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

export default withStyles(s)(Home);
