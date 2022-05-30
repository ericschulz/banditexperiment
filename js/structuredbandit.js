////////////////////////////////////////////////////////////////////////
//                  JS-CODE FOR Structure Bandits                     //
//                       AUTHOR: ERIC SCHULZ                          //
//                    UCL LONDON,  November 2017                      //
////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////
//INTIALIZE 
////////////////////////////////////////////////////////////////////////

//data storage ref
var ntrials = 5,//number of trials
    nblocks=2,//number of blocks
    trial=0,//trial counter
    block=0,//block counter
    out=0,//outcome
    totalscore=0,//total score
    index=0,//index
    age=0,//age of participant
    gender=0,//gender of particpant
    instcounter=0,//instruction counter
    overallscore=0,//overall score
    xcollect=[],//collecting the selected position
    ycollect=[],//collecting the returned output
    timecollect=[],//collection the timestamps
    x=[],//underlying position
    y=[],//underlying outcome
    timeInMs=0,//reaction time
    letter='<input type="image" src="letters/',//the letter
    pspecs='.png"  width="120" height="120"'//size of box
    
//borders for selections
var borders=['border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">'];

//leter boxes and their borders
var b1=letter+'A'+pspecs+borders[0],
    b2=letter+'S'+pspecs+borders[1],
    b3=letter+'D'+pspecs+borders[2],
    b4=letter+'F'+pspecs+borders[3],
    b5=letter+'J'+pspecs+borders[4],
    b6=letter+'K'+pspecs+borders[5],
    b7=letter+'L'+pspecs+borders[6],
    b8=letter+';'+pspecs+borders[7];

//generating lists to collect the outcomes
for(var i=0; i<nblocks; i++) 
{
    //outcomes of arm positions
    xcollect[i] = Array.apply(null, Array(0)).map(Number.prototype.valueOf,-99);
    //outcome of y position
    ycollect[i] = Array.apply(null, Array(0)).map(Number.prototype.valueOf,-99);
    //timestamp collection
    timecollect[i] = Array.apply(null, Array(0)).map(Number.prototype.valueOf,-99);
}


////////////////////////////////////////////////////////////////////////
//CREATE HELPER FUNCTIONS
////////////////////////////////////////////////////////////////////////

//function to hide one html div and show another
function clickStart(hide, show)
{
        document.getElementById(hide).style.display ='none' ;
        document.getElementById(show).style.display ='block';
        window.scrollTo(0,0);        
}

//changes inner HTML of div with ID=x to y
function change (x,y)
{
    document.getElementById(x).innerHTML=y;
}

//Hides div with id=x
function hide(x)
{
  document.getElementById(x).style.display='none';
}

//shows div with id=x
function show(x)
{
  document.getElementById(x).style.display='block';
  window.scrollTo(0,0);
}

//creates a random number between min and max
function randomNum(min, max)
{
  return Math.floor(Math.random() * (max-min+1)+min)
}

//permute a list
function permute(o)
{
 for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

//Display a float to a fixed percision
function toFixed(value, precision) 
{
    var precision = precision || 0,
        power = Math.pow(10, precision),
        absValue = Math.abs(Math.round(value * power)),
        result = (value < 0 ? '-' : '') + String(Math.floor(absValue / power));

    if (precision > 0) {
        var fraction = String(absValue % power),
            padding = new Array(Math.max(precision - fraction.length, 0) + 1).join('0');
        result += '.' + padding + fraction;
    }
    return result;
}

//standard normal using Box-Mueller algorithm
function myNorm() {
   var x1, x2, rad, c;
    do {
       x1 = 2 * Math.random() - 1;
       x2 = 2 * Math.random() - 1;
       rad = x1 * x1 + x2 * x2;
   } while(rad >= 1 || rad == 0);
    c = Math.sqrt(-2 * Math.log(rad) / rad);
    return (x1 * c);
};

////////////////////////////////////////////////////////////////////////
//Instruction Check
////////////////////////////////////////////////////////////////////////
var turkid=0;
function gettingstarted()
{
  turkid=document.getElementById("mturk").value;
  if (turkid=="WorkerID")
  	{
  		alert("Please provide your Mechanical Turk Worker ID. We will need your ID for paying the bonus.");
  	}else
  	{
  		clickStart("page3", "page4");
  	}
}

function instructioncheck()
{
    //check if correct answers are provided
    if (document.getElementById('icheck1').checked) {var ch1=1}
    if (document.getElementById('icheck2').checked) {var  ch2 = 1}
    if (document.getElementById('icheck3').checked) {var  ch3 = 1}
    //are all of the correct
    var checksum=ch1+ch2+ch3;
    if (checksum===3){
      //if correct, continue
      begintrial();
      clickStart('page7', 'page8');
      //alert
      alert('Great, you have answered all of the questions correctly. The study will now start.');
    } else{
    	instcounter++;
        //if one or more answers are wrong, raise alert box
        alert('You have answered some of the questions wrong. Please try again.');
        //go back to instructions
        clickStart('page7', 'page4');
    }
}

////////////////////////////////////////////////////////////////////////
//Experiment
////////////////////////////////////////////////////////////////////////

//this function initializes a trial
function begintrial()
{
  //only allowing for one press
  var returnpressed = 0;
  //initialize time count
  timeInMs = Date.now()
  //get the pressed key
  $(document).keypress(function(e) 
    {
           //if the key equals A
           if(e.which == 97 & returnpressed == 0) 
                  { 
                    //indicate that something has been pressed          
                    returnpressed=1;
                    //get the time that has passed
                    timeInMs=Date.now()-timeInMs;
                    //call the function for that position
                    myfunc(0);
                  }
            //same spiel if key equals S      
           if(e.which == 115 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(1);
                  }
            //same spiel if key equals D      
           if(e.which == 100 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(2);
                  }
           //same spiel if key equals F       
          if(e.which == 102 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(3);
                  }
           //same spiel if key equals J
          if(e.which == 106 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(4);
                  }
            //same spiel if key equals K      
           if(e.which == 107 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(5);
                  }
            //same spiel if key equals L      
           if(e.which == 108 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(6);
                  }
            //same spiel if key equals ;
           if(e.which == 59 & returnpressed == 0) 
                  {
                    returnpressed=1;
                    timeInMs=Date.now()-timeInMs;
                    myfunc(7);
                  }
            }
      );
}

//function to draw the letter boxes into the HTML
function drawletters()
{
  change('arm1', b1);
  change('arm2', b2);
  change('arm3', b3);
  change('arm4', b4);
  change('arm5', b5);
  change('arm6', b6);
  change('arm7', b7);
  change('arm8', b8); 
}

//do this once at start
drawletters();

//funmction that exectutes the bandit
function myfunc(inp)
{
  //loop through all possible locations
  for (i = 0; i < 8; i++)
  {
      //if the chosen location matches possible location
      if (inp==i)
      {
        //return always 20
        out=20;     
        //collect corresponding location, it's only important for R to JS differences        
      }
  }
  xcollect[block][trial]=inp; 
  //collect returned value
  ycollect[block][trial]=out;
  //collect reaction time
  timecollect[block][trial]=timeInMs;
  //mark the selected option
  borders[inp]='border="4">'; 
  //update letter boxes
  b1=letter+'A'+pspecs+borders[0];
  b2=letter+'S'+pspecs+borders[1];
  b3=letter+'D'+pspecs+borders[2];
  b4=letter+'F'+pspecs+borders[3];
  b5=letter+'J'+pspecs+borders[4];
  b6=letter+'K'+pspecs+borders[5];
  b7=letter+'L'+pspecs+borders[6];
  b8=letter+';'+pspecs+borders[7];
  //draw the option with their letters, now the chosen one has a thicker frame
  drawletters();
  //show rounded value
  var outshow=toFixed(out,1);
  //display on screen
  change('outcome', "Outcome: "+outshow);
  //set a time out, after 2 seconds start the next trial
  setTimeout(function(){nexttrial();}, 2000);
}


function nexttrial()
{
  //check if trials are smaller than the maximum trial number
  if (trial+1<ntrials)
  {
    //set the borders back to normal
    borders=['border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">'];
    //change the letters again
    b1=letter+'A'+pspecs+borders[0];
    b2=letter+'S'+pspecs+borders[1];
    b3=letter+'D'+pspecs+borders[2];
    b4=letter+'F'+pspecs+borders[3];
    b5=letter+'J'+pspecs+borders[4];
    b6=letter+'K'+pspecs+borders[5];
    b7=letter+'L'+pspecs+borders[6];
    b8=letter+';'+pspecs+borders[7];
    //draw options and their letters
    drawletters();
    //begin new trial
    begintrial();
    //track total score
    totalscore=totalscore+out;
    //to be inserted total score
    var inserts='Total Score: '+toFixed(totalscore,1);
    //show total score on screen
    change('score', inserts);
    //increment trial number
    trial++;
    //to be inserted number of trials left
    var insertt='Number of trials left: '+(ntrials-trial);
    //show on screen
    change('remain', insertt);
    //change ooutcome back to please choose an option
    change('outcome', "Please choose an option!");  
  }
  //if trial numbers exceed the total number, check if more blocks are available
  else if (trial+1==ntrials & block+1<nblocks)
  {
    //tell them that this block is over
    alert("Block " +(block+1)+" out of 5 is over. Please press return to continue with the next block.")
    //start next block
    nextblock();
  }else
  {
    //Otherwise --if blocks exceed total block number, then the experiment is over
    alert("The experiment is over. You will now be directed to the next page.")
    clickStart('page8', 'page9');
  }
}

//function to initialize next block
function nextblock()
{
  //update overall score
  overallscore=overallscore+totalscore;
  //borders back to normal
  borders=['border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">','border="1">'];
  //new letters and boxes
  b1=letter+'A'+pspecs+borders[0];
  b2=letter+'S'+pspecs+borders[1];
  b3=letter+'D'+pspecs+borders[2];
  b4=letter+'F'+pspecs+borders[3];
  b5=letter+'J'+pspecs+borders[4];
  b6=letter+'K'+pspecs+borders[5];
  b7=letter+'L'+pspecs+borders[6];
  b8=letter+';'+pspecs+borders[7];
  //draw options
  drawletters();
  //begin a new trial
  begintrial();
  //increment block number
  block++;
  //set trial number back to 0
  trial=0;
  //total score back to 0
  totalscore=0;
  //insert total score
  var inserts='Total Score: '+toFixed(totalscore,1);
  //put on screen
  change('score', inserts);
  //number of trials left
  var insertt='Number of trials left: '+(ntrials-trial);
  //on screen
  change('remain', insertt);
  //ask them to choose an outcome
  change('outcome', "Please choose an option!");
}

////////////////////////////////////////////////////////////////////////
//Demographics & Finish
////////////////////////////////////////////////////////////////////////
//sets the selected gender
function setgender(x)
{
  gender=x;
  return(gender)
}

//sets the selected age
function setage(x)
{
  age=x;
  return(age)
}

function setrecontact(x){
  recontact=x;
  return(recontact)
}

//data to save string to downloads
function saveText(text, filename){
  //creat document
  var a = document.createElement('a');
  //set ref
  a.setAttribute('href', 'data:text/plain;charset=utf-u,'+encodeURIComponent(text));
  //to download
  a.setAttribute('download', filename);
  //submit
  a.click()
}

function mysubmit()
{
  //change page
  clickStart('page9','page10');
  //claculate score
  var presenttotal='You have gained a total score of '+toFixed(overallscore,1)+'.';
  //calculate money earned
  var money =2+1.5*(overallscore/(50*nblocks*ntrials));
  moneyp=toFixed(money, 2);
  var presentmoney='This equals a total reward of $'+moneyp+'.';
  //show score and money
  change('result',presenttotal); 
  change('money',presentmoney);
  //all data to save
  saveDataArray = {
    'xcollect': xcollect,
    'ycollect': ycollect,
    'timecollect': timecollect,
    'money': money,
    'age': age,
    'instcounter': instcounter,
     'turkid': turkid,
    
  };
  //save data
  saveText(JSON.stringify(saveDataArray), 'banditData.'+turkid + '.JSON');
}
////////////////////////////////////////////////////////////////////////
//The END
////////////////////////////////////////////////////////////////////////
