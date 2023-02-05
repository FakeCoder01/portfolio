words_list = [
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
  "overview.txt",
  "software-dev-intern.txt",
  "backend-dev-intern.txt",
  "fullstack-dev-intern.txt",
  "education.txt",
  "awards.txt",
  "message/",
  "email.txt",
  "contacts.txt",
  "about.txt",
  "skils.txt",
  "resume.txt",
  "projects",
  "experiences",
  "education-and-awards",
  "contact",
  "help",
  "ls",
  "exit",
  "clear",
  "pwd",
  "cat",
  "cd",
  "lang"
]
const input = document.getElementById('command')
const patt = /\S+$/
ctx = 0
command.addEventListener('keydown', e => {
  if (e.key === 'Tab') {
    e.preventDefault()
    const start = input.selectionStart
    const seg = input.value.slice(0, start)
    const match = (seg.match(patt) || [])[0]
    if (!match) {
      return
    }
    const idx = words_list.findIndex(x => x.startsWith(match))
    if (idx < 0) {
      return
    }
    const replace = words_list[words_list[idx] === match ? (idx + 1) % words_list.length : idx]
    const newSeg = seg.replace(patt, replace)
    input.value = newSeg + input.value.slice(start)
    input.setSelectionRange(newSeg.length, newSeg.length);
  }
  else if (e.keyCode == 38) {
    if (vtx >= 0) input.value = prev_commands[vtx--]
    return;
  }
  else if (e.keyCode == 40) {
    if (ctx < prev_commands.length) input.value = prev_commands[ctx++]
    return;
  }
  else {
    return
  }


})