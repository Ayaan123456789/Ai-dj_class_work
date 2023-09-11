song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreLeft_Wrist = 0;

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on('pose', gotResults);
}
function modelLoaded(){
    console.log("Model is initialized");
}

function gotResults(results){
 if(results.length > 0){
    console.log(results);
    scoreLeft_Wrist = results[0].pose.keypoints[9].score;
    scoreRight_Wrist = results[0].pose.keypoints[10].score;
console.log(scoreLeft_Wrist);
console.log(scoreLeft_Wrist);


    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log(rightWristX + "\t" +rightWristY + "\t" +leftWristX + "\t" + leftWristY);
 }
}

function draw(){
    image(video,0,0,600,500);
  fill("#FF0000");
  stroke("#FF0000");
  if(scoreRight_Wrist > 0.2){
    circle(rightWristX,rightWristY,20);

    if((rightWristY <= 100) && (rightWristY > 0)){
        document.getElementById("speed") = "0.5x";
        song.rate(0.5);
    }
    else if((rightWristY <= 200) && (rightWristY > 100)){
        document.getElementById("speed") = "1x";
        song.rate(1);
    }
    else if((rightWristY <= 300) && (rightWristY > 200)){
        document.getElementById("speed") = "1.5x";
        song.rate(1.5);
    }
    else if((rightWristY <= 400) && (rightWristY > 300)){
        document.getElementById("speed") = "2x";
        song.rate(2);
    }
    else if((rightWristY <= 500) && (rightWristY > 400)){
        document.getElementById("speed") = "2.5x";
        song.rate(2.5);
    }
  }

if(scoreLeft_Wrist >0.2){
    circle(leftWristX,leftWristY,20);
InNumberLeftWristY = Number(leftWristY);
no_decimal = floor(InNumberLeftWristY);
volume = no_decimal/500;
document.getElementById("volume") = volume;
song.volume(volume);

}

  
}


    function preload(){
    song = loadSound("music.mp3");
    }

    function playSound(){
        song.play();
        song.volume(1);
        song.rate(1);

    }