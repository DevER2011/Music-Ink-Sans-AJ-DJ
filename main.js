song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload(){
    song = loadSound("tokyovania.mp3");
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}

function setup(){
canvas = createCanvas(600,700);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}
function draw(){
image(video, 0,0,600,700);
fill("#FFD700");
stroke("#AAFF00");
circle(rightWristX, rightWristY, 20);
if(scoreRightWrist > 0.2){
if(rightWristY >0 && rightWristY <= 100){
document.getElementById("speed").innerHTML = "Speed = 0.5x";
song.rate(0.5);
}
else if(rightWristY >100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "Speed = 1.0x";
    song.rate(1.0);
    }
else if(rightWristY >200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
        }
else if(rightWristY >300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "Speed = 2.0x";
            song.rate(2.0);
            }
else if(rightWristY >400 && rightWristY <= 500){
                document.getElementById("speed").innerHTML = "Speed = 2.5x";
                song.rate(2.5);
                }
            }
if(scoreLeftWrist > 0.2){
circle(leftWristX,leftWristY, 20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals/500;
song.setVolume(volume);
document.getElementById("volume").innerHTML = "Volume ="+ volume;

}
}
function modelLoaded(){
console.log("Phase 1 of the perfect plan is complete");
}
function gotPoses(results){
if(results.length > 0){
console.log(results);
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log("scoreLeftWrist = " + scoreLeftWrist);
scoreRightWrist = results[0].pose.keypoints[10].score;
console.log("scoreRightWrist = " + scoreRightWrist);

leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("Left wrist X =" + leftWristX + "Left wrist Y =" + leftWristY);
rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("Right wrist X =" + rightWristX + "Right wrist Y =" + rightWristY);
}
}
