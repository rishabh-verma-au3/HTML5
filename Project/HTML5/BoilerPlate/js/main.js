
function showMood(){
    name=document.getElementById('name').value;
    mood=document.getElementById("mood").value;
    
    if(!name || !mood){

        alert("Please fill all")
        return false;
    }
 
    if(mood == "happy"){
            face=' :) '
    }
    else if(mood == "sad"){
         face=" :( "
    }
    else{
         face=" :| "
    }

    moodString=name+" is "+mood+" today "+face;

    holder=document.getElementById('holder')

    holder.innerHTML=moodString;



}


function clearMood(){
    // document.getElementById('name').value='';
    // document.getElementById("mood").value='';
    
    // // moodString=name+" is "+mood+" today";

    holder=document.getElementById('holder')

    holder.innerHTML='';

    document.getElementById("moodForm").reset()

    // document.getElementById("holder").innerHTML.reset()

}