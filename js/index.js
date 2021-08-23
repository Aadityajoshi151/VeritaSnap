const { time } = require('console');
const { desktopCapturer,ipcRenderer} = require('electron')
const fs = require('fs');

document.getElementById("ssbtn").addEventListener("click",function(){
    takeScreenShot();
})

function takeScreenShot()
{
    desktopCapturer.getSources({ 
        types: ['screen'],
        thumbnailSize: {
            height: screen.height,
            width: screen.width
        }
}).then( sources => {
        url = sources[0].thumbnail.toPNG()
        fs.writeFile("E:/"+getTimeStamp(),url , (err) => {
            if (err)
                alert("There was a problem while taking the screenshot")
        });
            
        
    })
}
function getTimeStamp()
{
    var dt = new Date()
    return (dt.getDate()+"-"+dt.getMonth()+1+"-"+dt.getFullYear()+" "+dt.getHours()+"."+dt.getMinutes());
}