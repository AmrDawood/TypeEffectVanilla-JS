const typeWriter =function(textElement,wordsArray,waitTime=3000){
    this.textElement=textElement;//the span element
    this.wordsArray=wordsArray;//the sting on data-words custom Attribute
    this.waitTime=parseInt(waitTime,10);//parsInt to make sure its integer
    this.letters="";//
    this.wordIndex=0;//which word is on
    this.type();//main method
    this.isDeleting=false;// 
}
//type method
typeWriter.prototype.type=function(){
    //current word index in the array  wordsArray
    const currentWordIdnex = this.wordIndex % this.wordsArray.length;
    //full text of the word we on
    const fullText = this.wordsArray[currentWordIdnex];
    //check if we deleting
    if(this.isDeleting){//if it is deleting
        //remove letter
        this.letters=fullText.substring(0,this.letters.length-1);
    }else{//if it is not deleting
        //add letter
        this.letters=fullText.substring(0,this.letters.length + 1);
    }
    //output what ever in letters every half second
    this.textElement.innerHTML=`<span class="txt">${this.letters}</span>`;
    //type Speed
    let typeSpeed =300;
    if(this.isDeleting){
        typeSpeed /=2;
    }
    //check if the letters is complete word 
    if(!this.isDeleting && this.letters===fullText){
        typeSpeed=this.waitTime;//will pause at the end
        this.isDeleting=true;
    }else if(this.isDeleting && this.letters===''){
        this.isDeleting=false;
        this.wordIndex++;//moveing to next word in the wordArray
        typeSpeed=500;//pause before start typeing the next word
    }
    setTimeout(()=>this.type(),typeSpeed);
}

//initialize on DOM LOAD 
document.addEventListener("DOMContentLoaded",init);//initial init func when html document loaded without wait for images , stylesheet
function init(){//start our app
    //grab every thing
    const textElement = document.querySelector('.text-type');
    const wordsArray = JSON.parse(textElement.getAttribute('data-words'));/* extraxt string from textElement custom
    attribute and change it to an array-- data-words='["Developer","Creator","desiner"] --- */
    const waitTime = textElement.getAttribute('data-wait');/* extraxt string from textElement custom
    attribute -- data-wait="3000"-- */
    new typeWriter(textElement,wordsArray,waitTime);
} 