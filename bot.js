const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require("./auth.json");
const sql = require("sqlite");

const welcomeID = "402813648164225027";
const rankID = "403136969787572224";
const regionID = "403136986958921741";
const rolesID = "403137045142437890";

const divisions = ["bronze","silver","gold","platinum","diamond"];
const ranks = ["I","II","III","IV","V"];
const regions = ["euw","eune","na","ru","lan","las","br","oce","tr","jp","kr","cn"];
const roles  = ["adc","support","mid","jungle","top"];

sql.open("./scores.sqlite");

client.on("ready", () => {
  client.user.setGame("teemo");
});

client.on("guildMemberAdd", (member) => {
  member.guild.channels.find("name", "welcome").send("Welcome "+member+"!\nHave fun and type '"+auth.prefix+"accept' after you read the rules in "+member.guild.channels.find("name", "info"));
});

client.on("message", (message) => {

  if(message.author.bot) return ;

  sql.get(`SELECT * FROM scores WHERE userId = "${message.author.id}"`).then(row => {
    if(!row){
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);

    } else {
      let curLevel = Math.Floor(0.15 * Math.sqrt(row.points + 1));
      if(curLevel > row.level){
        row.level = curLevel;
        sql.run(`UPDATE scores SET level = ${row.level} where userId = "${message.author.id}"`);
        message.reply("congratulations! You have leveled up to level ${row.level}"!);
        switch (${row.level}) {
          case 5:
            break;
          case 10:
            break;
          case 15:
            break;
          case 20:
            break;
          case 25:
            break;
          default:
        }
      }
      sql.run(`UPDATE scores SET points = ${row.points + 1} where userId = "${message.author.id}"`);
    }
  }).catch(() => {
    console.error;
    sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
      sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
    });
  });

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

function addRole_(m, r){
  let member = m.member;
  let role[];
  for(var i=0; i<r.length){
    role[i] = m.guild.roles.find("name", r[i]);
  }
  member.addRoles(role);
  return m.delete();
}

function accept_(m){
  addRole_(m, ["member"]);
}
function setRank_(m, a){
  if(m.content.indexOf(auth.prefix) === 0) removeRank_(member);
  else{
    if(!a[0] || !a[1]){
      try(
        addRole_(m, a);
      ).catch(err){
        console.log(err);
      }
    }
  }
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
  if(m.content.indexOf(auth.prefix) === 0) removeRegion_(member);
  else{
    try{
      addRole_(m, [a]);
    }catch(err){
      console.log(err);
    }
  }
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
  if(m.content.indexOf(auth.prefix) === 0) RemoveRole_(member);
  else{
    for(var i=0; i<a.length; i++){
      try{
        addRole_(m, a);
      }catch(err){
        console.log(err);
      }
    }
  }
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
