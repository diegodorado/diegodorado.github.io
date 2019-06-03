let _main=null
const canvas = document.getElementById("jsdos");
const options = {
  onprogress: (stage, total, loaded) => {},
  log: (msg) => {},
}

Dos(canvas, options).ready((fs, main) => {
  fs.extract("fmtribe.zip").then(() => {
    _main = main
  });
});

const info = document.getElementById('info')
document.querySelectorAll('nav span').forEach(function(el) {
  el.addEventListener('click', (ev) => {
    info.className = ev.target.className;
  });
});

document.getElementById('start').addEventListener('click', (ev) => {
  info.className = 'hide';
  _main(["-c", "FMTRIBE.EXE"])
  document.title = "FMTRIBE by @munshkr"
});
