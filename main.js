noseX = 0;
noseY=0;
difference=0;
rightWristX=0;
leftWristX=0;


function setup()
{
    canvas = createCanvas(550,550);
    canvas.position(560,150);

    video = createCapture(VIDEO);
    video.size(560,500);

    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0 )
    {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("noseX = " +noseX+ "noseY = " +noseY );

        rightWristX = results[0].pose.rightWrist.x;
        leftWristX = results[0].pose.leftWrist.x;
        difference = floor( leftWristX - rightWristX );
        console.log("leftWristX = " + leftWristX + " rightWristX = "+ rightWristX + " difference = " + difference);
    }

}

function modelLoaded()
{
    console.log('poseNet is initialized');
}

function draw()
{
    background('	#00FF00');

    document.getElementById("square_sides").innerHTML = "Width and Height of the square will be = "+ difference +"px";
    fill('	#00FFFF');
    stroke('	#00FFFF');
    square( noseX,noseY,difference);
}
