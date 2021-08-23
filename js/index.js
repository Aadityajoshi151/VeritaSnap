const { time } = require('console');
const { desktopCapturer,ipcRenderer} = require('electron')
var fs = require('fs');

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
        
        fs.writeFile("E:/"+getTimeStamp()+".png",url = sources[0].thumbnail.toPNG(), (err) => {
            if (err)
            alert(err)
          else {
            alert("Image Created Successfully!")
        }});
            
        
    })
}
function getTimeStamp()
{
    var dt = new Date()
    return (dt.getDate()+"-"+(dt.getMonth()+1)+"-"+dt.getFullYear()+" "+dt.getHours()+"."+dt.getMinutes()+"."+dt.getSeconds());
}