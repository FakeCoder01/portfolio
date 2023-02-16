var prev_commands = []
vtx = 0
var current_pwd = '~';
const help_cmd = ` 
  <div class="pt-4 pl-4 pb-1">
        <span class="font-bold text-yellow-700 w-1/6 inline-block">help</span>  <span class="text-[#cd00dbf2]">show the available commands</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">ls</span>  <span class="text-[#cd00dbf2]">lists all files and directories of present directory</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">cd</span>  <span class="text-[#cd00dbf2]">change the directory</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">clear</span>  <span class="text-[#cd00dbf2]">clears the terminal<span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">pwd</span>  <span class="text-[#cd00dbf2]">prints the present working directory</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">cat</span>  <span class="text-[#cd00dbf2]">opens a file</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">exit</span>  <span class="text-[#cd00dbf2]">exits</span><br>
        <span class="font-bold text-yellow-700 w-1/6 inline-block">lang</span>  <span class="text-[#cd00dbf2]">change language (eg. lang -RU, lang -EN)</span>
      </div>
`;

const commands_list = {
  "commands": [
    { "help": "show the available commands" },
    { "ls": "lists all files and directories of present directory" },
    { "cd": "change the directory" },
    { "clear": "clears the terminal" },
    { "pwd": "prints the present working directory" },
    { "cat": "opens a file" },
    { "exit": "exits" },
    { "lang": "change language (eg. lang -RU, lang -EN)" },
  ],
  "dirs": [
    {
      "projects/": [
        "overview.txt",
        "flight-mangement-system.txt",
        "medical-services.txt",
        "e-learning-platform.txt",
        "online-notes.txt",
        "url-shortener.txt",
        "room-rent.txt",
        "group-chat.txt",
        "anon-message.txt",
        "finance.txt",
        "expense-tracker.txt",
        "portfolio.txt",
      ]
    },
    {
      "experiences/": [
        "overview.txt",
        "software-dev-intern.txt",
        "backend-dev-intern.txt",
        "fullstack-dev-intern.txt",
      ]
    },
    {
      "education-and-awards/": [
        "education.txt",
        "awards.txt"
      ]
    },
    {
      "contact/": [{ "message/": "email.txt" }, "contacts.txt"]
    },
    "about.txt",
    "skils.txt",
    "resume.txt",
  ],
  "dir_no": {
    'projects': 0,
    'experiences': 1,
    'education-and-awards': 2,
    'contact': 3
  }
}
function command_manger(command, arg = '') {
  output = ''
  if (arg != '') {
    switch (command) {
      case 'cd':
        if (arg == '/' || arg == '~' || arg == '..') current_pwd = '~';
        else {
          output = '-no directory found named : ' + arg + ' in the directory ' + current_pwd;
          if (current_pwd == '~') {
            Object.keys(commands_list['dirs']).forEach(key => {
              if (commands_list.dirs[key].constructor.name === "Object" && arg + '/' in commands_list.dirs[key]) {
                current_pwd = arg;
                output = '';
              }
            });
          } else {
            const dir_no = commands_list.dir_no[current_pwd];
            Object.keys(commands_list['dirs'][dir_no]).forEach(key => {
              for (i = 0; i < commands_list['dirs'][dir_no][key].length; i++) {
                if (commands_list.dirs[dir_no][key][i].constructor.name === "Object" && arg + '/' in commands_list.dirs[dir_no][key][i]) {
                  current_pwd = arg;
                  output = '';
                }
              }
            })
          }
        }
        break;
      case 'cat':
        if (fileShow(arg) == false) output = '-no file found named : ' + arg + ' in the directory ' + current_pwd;
        break;
      case 'lang':
        if (arg == '-RU') window.location.href = '/ru';
        else if (arg == '-EN') window.location.href = '/?lang=en';
        else output = '-bash no language found : ' + arg + '. use -RU or -EN';
        break;
      default:
        output = '-bash no command found : ' + command;
        break;
    }
  }
  else {
    switch (command) {
      case 'help':
        output = help_cmd;
        break;
      case 'pwd':
        output = 'pwd : ' + current_pwd;
        break;
      case 'clear':
        $('#last_result').html('');
        break;
      case 'ls':
        if (current_pwd === '~') {
          Object.keys(commands_list['dirs']).forEach(key => {
            output += get_folder_or_file(commands_list.dirs[key]); //values 
          })
        }
        else {
          const dir_no = commands_list.dir_no[current_pwd];
          Object.keys(commands_list['dirs'][dir_no]).forEach(key => {
            for (i = 0; i < commands_list['dirs'][dir_no][key].length; i++) {
              output += get_folder_or_file(commands_list.dirs[dir_no][key][i]);//values 
            }

          })
        }
        break;
      case 'exit':
        $('#filecontent').html('');
        $('#layscreen').hide();
        $('#output-area').css("margin-top", "0px");
        break;
      default:
        output = '-bash no command found : ' + command;
        break;
    }
  }
  document.getElementById("command").scrollIntoView();
  return output;
}
$('#command').on("keyup", function (e) {
  if (e.keyCode == 13) {
    if (e.target.value == '' || e.target.value.length>40) return;
    const command = e.target.value.split(' ');
    arg1 = command[0];
    arg2 = command[1];
    const box = `
        <div class="w-full">
          root@fakecoder:<span>${current_pwd}</span><span class="text-blue-400">$</span> ${e.target.value}
        </div>`;
    prev_commands.push(e.target.value);
    vtx = prev_commands.length - 1;
    const output = command_manger(arg1, arg2);

    if (output[0] === '-') {
      $("#last_result").append(`<div> ${box} <div class="pl-3 text-red-500"> ${output} </div></div>`);
    } else {
      $("#last_result").append(`<div> ${box} <div class="pl-3 text-gray-400"> ${output} </div></div>`);
    }
    $('#command').val('');
    $('#current_pwd').text(current_pwd);
    return true;
  }
});
function get_folder_or_file(v) {
  if (v.constructor.name === "Object") return `<span class="text-blue-400"> ${Object.keys(v)[0]} </span>`;
  else return `<span> ${v} </span>`;
}
