// Organización aprobada: los 13 métodos aparecen una sola vez.
export const methodCategories = [
  {id:'respiracion',group:'breathing',title:'Respiración',icon:'breath',color:'blue',description:'Una pausa para respirar a tu ritmo.',ids:['breath']},
  {id:'meditacion',group:'meditation',title:'Meditación',icon:'lotus',color:'pink',description:'Un momento para volver a ti.',ids:['calm','anxiety','sleep','selflove']},
  {id:'tecnicas',group:'quick',title:'Técnicas rápidas',icon:'bolt',color:'green',description:'Pequeños recursos para este momento.',ids:['grounding','muscle','reframe']},
  {id:'consejos',group:'advice',title:'Consejos',icon:'bulb',color:'yellow',description:'Ideas sencillas para cuidarte cada día.',ids:['caffeine','move','unplug','talk']},
  {id:'escribir',group:'writing',title:'Escribe lo que sientes',icon:'journal',color:'purple',description:'Tu espacio para expresarte con calma.',ids:['journal']}
];

export const methodGroups = Object.fromEntries(methodCategories.map(({group,ids}) => [group,ids]));
