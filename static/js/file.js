async function renderFile(file_name) {
  await $.ajax({
    url: `/static/pages/${file_name}`,
    dataType: 'text',
    success: function (data) {
      $('#filecontent').html(data);
      $('#output-area').css("margin-top", "85%");
      $('#layscreen').show();
      document.getElementById("command").scrollIntoView();
      return true;
    },
    error: function (p) {
      return false;
    }
  });
}

function fileShow(file_name_arg) {
  var file_name_arg_x = file_name_arg.split(".");
  const file_name = file_name_arg_x[0] + '.html';
  if (current_pwd === '~') {
    for (i = 0; i < commands_list['dirs'].length; i++) {
      if (commands_list['dirs'][i] === file_name_arg) {
        if (renderFile(file_name)) return true;
      }
    }
    return false;
  }
  else {
    const dir_no = commands_list.dir_no[current_pwd];
    for (i = 0; i < commands_list.dirs[dir_no][current_pwd + '/'].length; i++) {
      if (commands_list.dirs[dir_no][current_pwd + '/'][i] === file_name_arg) {
        if (renderFile(file_name)) return true;
      }
    }
    return false;
  }
}