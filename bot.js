const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require("./auth.json");

const welcomeID = "402813648164225027";
const rankID = "403136969787572224";
const regionID = "403136986958921741";
const rolesID = "403137045142437890";

const divisions = ["bronze","silver","gold","platinum","diamond"];
const ranks = ["I","II","III","IV","V"];
const regions = ["euw","eune","na","ru","lan","las","br","oce","tr","jp","kr","cn"];
const roles  = ["adc","support","mid","jungle","top"];


client.on("ready", () => {
  client.user.setGame("teemo");
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels.find("name", "welcome").send("Welcome "+member+"!\nHave fun and type '"+auth.prefix+"accept' after you read the rules in "+member.guild.channels.find("name", "info"));
});

client.on("message", (message) => {

  if(message.author.bot) return ;

  const rawArgs = message.content.split(/ +/g); //returns an array
  if(message.channel.id === rankID) setRank_(message, rawArgs);
  if(message.channel.id === regionID) setRegion_(message, rawArgs);
  if(message.channel.id === rolesID) setRoles_(message, rawArgs);


  if(message.content.indexOf(auth.prefix) !== 0) return ;

  const args = message.content.slice(auth.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase(); //returns the first parameter of the input of the user
  const commandArgs = args.join(' '); //returns all the parameters of the input of the user separated by a space

  if(message.channel.id === welcomeID && command === "accept") accept_(message);




});
client.login(auth.token);

function accept_(m){
  let member = m.guild.member(m.author);
  let role = m.guild.roles.find("name", "member");
  member.addRole(role);
  return m.delete();
}
function setRank_(m, a){
  let member = m.guild.member(m.author);
  if(m.content.indexOf(auth.prefix) === 0) removeRank_(member);
  else{
    try{
      let role = [m.guild.roles.find("name", a[0].toLowerCase()), m.guild.roles.find("name", a[1].toUpperCase())];
      member.addRoles(role);
    }catch(err){
      console.log(err);
    }
  }
return m.delete();
}
function removeRank_(member){
  for(var i=0; i<member.roles.array().length; i++){
    for(var j=0; j<divisions.length; j++){
      if(member.roles.array()[i].name === divisions[j]){
        member.removeRole(member.roles.array()[i]);
      }
    }
    for(var j=0; j<ranks.length; j++){
      if(member.roles.array()[i].name === ranks[j]){
        member.removeRole(member.roles.array()[i]);
      }
    }
  }
}
function setRegion_(m, a){
  let member = m.guild.member(m.author);
  if(m.content.indexOf(auth.prefix) === 0) removeRegion_(member);
  else{
    try{
      let role = m.guild.roles.find("name", a[0].toLowerCase());
      member.addRole(role);
    }catch(err){
      console.log(err);
    }
  }
  return m.delete();
}
function removeRegion_(member){
  for(var i=0; i<member.roles.array().length; i++){
    for(var j=0; j<regions.length; j++){
      if(member.roles.array()[i].name === regions[j]){
        member.removeRole(member.roles.array()[i]);
      }
    }
  }
}
function setRoles_(m, a){
  let member = m.guild.member(m.author);
  if(m.content.indexOf(auth.prefix) === 0) RemoveRole_(member);
  else{
    for(var i=0; i<a.length; i++){
      try{
        let role = m.guild.roles.find("name", a[0].toLowerCase());
      }catch(err){
        console.log(err);
      }
      member.addRole(role)
    }
  }
  return m.delete();
}
function RemoveRole_(member){
  for(var i=0; i<member.roles.array().length; i++){
    for(var j=0; j<roles.length; j++){
      if(member.roles.array()[i].name === roles[j]){
        member.removeRole(member.roles.array()[i]);
      }
    }
  }
}
