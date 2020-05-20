const TwitchBot = require('twitch-bot');
const axios = require('axios');
commands="'!points' '!redeem shoot' '!redeem lightsRed' '!redeem lightsRainbow' '!gamble <points>' '!slots <points>' '!quote'"
var n;
var us;
var str;
var posible=true;
const Bot = new TwitchBot({
  username: 'cucumbabot',
  oauth: 'oauth:2k2j7jpwj7gr7svk8794tep7b52khj',
  channels: ['agour1s']
})

Bot.on('join', channel => {
  console.log(`Joined channel: ${channel}`)
})

Bot.on('error', err => {
  console.log("Error:"+err)
})

Bot.on('message', chatter => {
    var date= new Date();
    n=chatter.message.startsWith("!")
    str=chatter.message;
    us=chatter.username;
    if(str.startsWith('@σκορδο')||str.startsWith('@σκόρδο')||str.startsWith('@Σκορδο')||str.startsWith('@Σκόρδο')){
      Bot.say('@xartoNz aka Σκορδο: @'+us+' mentioned your alias and the message is : \''+str+'\'');
    }
    if(!n){
       return;
    }
   
    if(us==="streamlabs"){
        return;
    }
    if(chatter.message.startsWith("!slots")||chatter.message.startsWith("!gamble")){
        return;
    }
    if(!posible){
      Bot.say('Irl commands have 5 mins cooldown! WutFace');
      return;
    }
    try{
      switch(chatter.message) {
        case '!test':
            Bot.say('Command executed! PogChamp')
          break;
        case '!redeem lightsRed':
            posible=false;
            axios.get("http://192.168.0.192/win&T=2&R=255&G=0&B=0&FX=0").
            then(res =>{
              console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Lights Red");
            }).catch(error=>{
              console.log(error);
            })
            resetLeds();
            
          break;
          case '!redeem lightsRainbow':
            posible=false;
            axios.get("http://192.168.0.192/win&T=2&FX=9").
            then(res =>{
              Bot.say('Feel the rainbow! KappaPride KappaPride KappaPride')
              console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Rainbow on");
            }).catch(error=>{
              console.log(error)
            });
            resetLeds();
            
            
          break;
          case '!redeem shoot':
            posible=false;
            axios.get("http://192.168.0.192/win&T=2&R=255&G=255&B=255&FX=25").
            then(res =>{
              console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Redeem Shoot");
            }).catch(error=>{
              console.log("here");
              resetL();
            });
            resetLedsBra();
            
          break;
          case '!points':
            break;
          case '!quote':
              break;
          case '!uptime':
            break;
          case '!watchtime':
            break;
        default:
            Bot.say("@"+us+" Commands:"+commands);
      }
    }catch(err){
      resetL();
    }
        
});

function resetLeds(){
  var date= new Date();
      setTimeout(()=>{
        axios.get("http://192.168.0.192/win&T=2&FX=0").
        then(res =>{
          console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Leds off");
        }).catch(error=>{
          console.log(error)
        });
        posible=true;
    },300000);
   
}
function resetLedsBra(){
  var date= new Date();
        setTimeout(()=>{
          axios.get("http://192.168.0.192/win&T=2&FX=0").
          then(res =>{
            console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Shoot off");
          }).catch(error=>{
            console.log("Reset braaa")
          });
          posible=true;
      },10000);
     
}

function resetL(){
  var date= new Date();
  setTimeout(()=>{
      axios.get("http://192.168.0.192/win&T=0&FX=0").
    then(res =>{
      console.log("["+date.getHours()+":"+date.getMinutes()+"] "+res.status+" Leds reset");
    }).catch(error=>{
      console.log("Reset L error")
    });
  },10000);
  
}