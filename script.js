(function(){
  const btn = document.getElementById('btnDemo');
  const msg = document.getElementById('demoMsg');
  const year = document.getElementById('year');

  if(year) year.textContent = String(new Date().getFullYear());

  if(btn && msg){
    btn.addEventListener('click', () => {
      const text = 'Confirmación lista: la página se carga correctamente sin dependencias externas.';
      msg.textContent = text;
    });
  }
})();
