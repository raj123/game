import React from 'react';
import ReactDOM from 'react-dom';


var self;
export default class MainPage extends React.Component {
  constructor(props) {
    super(props);

    var test = {
        "1" : {
          "image" : "imgs/lion.jpg",
          "answer" : "lion",
        },
        "2" : {
          "image" : "imgs/gorilla.jpg",
          "answer" : "gorilla",
        },
        "3" : {
          "image" : "imgs/gorilla.jpg",
          "answer" : "simran",
        }        
     }

      this.state={
        ajson:test,
        currentimage:'',
        breakwords:[],
        blankarray:[],
        correctanswer:'',
        timerc:'',
        questionno:0,
        totalquestion: Object.keys(test).length,
        finish: false,
      };    
  }

  componentWillMount() {
    //console.log(this.state.ajson);
      
  }

  startgame() {
          var arr = this.state.ajson;
          var questionno = this.state.questionno + 1;

          if (arr[questionno] == undefined) {
              this.setState({finish: true});
          } else {
            this.setState({questionno: questionno});
            console.log(questionno,'questionno');
            this.setState({currentimage: arr[questionno]['image']});
            var correctanswer = arr[questionno]['answer'];
            var chars = correctanswer.split('');

            var blankarray = [];
            for(var i in chars) {
              blankarray.push('');
            }  

            this.setState({blankarray:blankarray},function(){     
                this.setState({breakwords: this.shuffle(chars)});
                this.setState({correctanswer: correctanswer});
                $('.chooseanswerdiv input').attr('disabled', false);
            });
          }
    
  }

  shuffle(arra1) {
    var ctr = arra1.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arra1[ctr];
      arra1[ctr] = arra1[index];
      arra1[index] = temp;
    }
    return arra1;
  }
 
  render(){   
    return (
      <div>

          {this.state.currentimage == '' && this.state.finish == false ? <input type='Button' defaultValue='start game' name='start_game' class='btn btn-primary' onClick={this.startgame.bind(this)} style={{position:'absolute', left:'45%',top:'40%'}} /> : null}

          {this.state.currentimage != '' && this.state.finish == false ?  
          <Showimage currentimage={this.state.currentimage} breakwords={this.state.breakwords} blankarray={this.state.blankarray} correctanswer={this.state.correctanswer} nextquestionparent={this.startgame.bind(this)} questionno={this.state.questionno} totalquestion={this.state.totalquestion}  /> : null}

          {this.state.finish == true ? "Finish" : ''}
      </div>
    );
  }
}


export class Showimage extends React.Component { 
  constructor(props) {
    super(props);
    this.state={
      msg:'',
      blankarray2:this.props.blankarray,
      clickedindexarray:[]
    }       
    self=this;    
  }
  componentWillReceiveProps() {
    this.state={
      msg:'',
      blankarray2:this.props.blankarray,
      clickedindexarray:[]
    }      

    console.log('componentWillReceiveProps5');    
  }
  
  clickanswer(char, i) {    
    var temparr = self.state.blankarray2;
    
    for(var j in temparr) {
      if (temparr[j] == '') {
        temparr[j] = char;
        break;
      }
    }
    self.setState({blankarray2: temparr});
    $('.chooseanswerdiv input:eq('+i+')').attr('disabled', true);
      self.state.clickedindexarray.push(i);

    if (temparr.includes('') == false) {
      var givenanswer = self.state.blankarray2.join('');
      var correctanswer = self.props.correctanswer;
      var msg = (givenanswer == correctanswer) ? '<span style="color:green">Correct answer</span>' : '<span style="color:red">Wrong answer</span>';
      self.setState({msg:msg});
    }
    
  }

  backspace() {
    this.setState({msg:''});
    var temp = this.state.clickedindexarray.pop();
    $('.chooseanswerdiv input:eq('+temp+')').removeAttr('disabled', true);

    var temparr = this.state.blankarray2;

    if (temparr.includes('') == false) {
      temparr[temparr.length-1]='';
    } else {
       for (var j in temparr) {
        if (temparr[j] == '') {
          temparr[j-1]='';
        }
      }
    }   
    this.setState({blankarray2:temparr});
    console.log(this.state.clickedindexarray,'clickedindexarray');
    
  }
  render() {
    return (
      <div class='jumbotron' style={{margin: '0px auto', width: '60%', textAlign:'center',marginTop:'16px'}}>
          <div>Question {this.props.questionno} of {this.props.totalquestion}<br/></div>
          <img src={this.props.currentimage} width='300' style={{border: '#000 solid 2px'}} /> 
          <br/><br/>

          <div class='answerspacediv'>
            {self.state.blankarray2.map(function(data, i) {
                 return (
                     <input type='text' key={i} style=
                     {{border:'#000 solid 1px', marginRight:'5px', width:'28px', height:'30px', textAlign:'center'}}  name='btn11' value={data} />
                 );
             })}

            {this.state.clickedindexarray.length == 0 ? 
          null : <input type='button' value='backspace' name='backspace' onClick={this.backspace.bind(this)}/> }

          </div>

          
           <br/>

          <div class='chooseanswerdiv'>
             {this.props.breakwords.map(function(data, i) {
                 return (
                     <input type='Button' key={i} defaultValue={data} style=
                     {{border:'#000 solid 1px', marginRight:'5px', cursor:'pointer', padding: '6px 11px'}}  name='btn11'  onClick={self.clickanswer.bind(this, data, i)} />
                 );
             })}
          </div> 
          

          <br/><br/>

          <input type='button' value='Next Question' name='next' class='btn btn-primary' onClick={this.props.nextquestionparent.bind(this)} />

           <br/><br/>

           <div dangerouslySetInnerHTML={{ __html: this.state.msg }}></div>
      </div>
    );
  }
}


