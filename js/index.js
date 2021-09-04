const { time } = require('console');
const { desktopCapturer,ipcRenderer} = require('electron')
var fs = require('fs');
const os = require('os')
const directory = "C:/Users/"+os.userInfo().username+"/Pictures/VeritaSnap"


document.getElementById("ssbtn").addEventListener("click",function(){
    takeScreenShot();
})

ipcRenderer.on('takess', (event, arg) => {
    takeScreenShot();   
});

function takeScreenShot()
{
    ipcRenderer.send('playsoundeffect')
    desktopCapturer.getSources({ 
        types: ['screen'],
        thumbnailSize: {
            height: screen.height,
            width: screen.width
        }
}).then( sources => {
        if (!fs.existsSync(directory)) 
        {
            fs.mkdir(directory, (err) => 
            {
        })
    }
        fs.writeFile(directory+"/"+getTimeStamp()+".png",url = sources[0].thumbnail.toPNG(), (err) => {
            if (err)
            {
                alert("There was a problem in creating the image")
            }
                     
        });   
    })
}
function getTimeStamp()
{
    var dt = new Date()
    return ("VS "+dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" "+dt.getHours()+"."+dt.getMinutes()+"."+dt.getSeconds());
}
ipcRenderer.on("Second Instance" , (event, arg) => {
    alert("VeritaSnap Is Already Running. Use Ctrl+Shift+P to take screenshot.")
});
