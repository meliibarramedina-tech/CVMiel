document.addEventListener('DOMContentLoaded', () => {
  const assistantFab = document.createElement('div');
  assistantFab.className = 'assistant-fab';
  assistantFab.innerHTML = `
    <button class="assistant-toggle" type="button" aria-label="Abrir asistente virtual" aria-expanded="false">✦</button>
  `;

  const panel = document.createElement('div');
  panel.className = 'assistant-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-live', 'polite');
  panel.innerHTML = `
    <div class="assistant-header">
      <h3>¿Qué quieres saber de Melissa Medina?</h3>
      <button class="close-chat" type="button" aria-label="Cerrar chat">×</button>
    </div>
    <div class="chat-body" aria-live="polite"></div>
    <div class="quick-options">
      <button type="button" data-key="perfil">Conocer mi perfil</button>
      <button type="button" data-key="proyectos">Ver mis proyectos</button>
      <button type="button" data-key="habilidades">Consultar mis habilidades</button>
      <button type="button" data-key="formacion">Conocer mi formación académica</button>
      <button type="button" data-key="experiencia">Explorar mi experiencia práctica</button>
      <button type="button" data-key="equipo">Consultar mi experiencia en trabajo en equipo</button>
      <button type="button" data-key="contacto">Contactarme</button>
      <button type="button" data-key="general">Preguntar algo más</button>
    </div>
    <form class="assistant-form" aria-label="Formulario para hacer preguntas al asistente">
      <input type="text" placeholder="Escribe tu pregunta..." aria-label="Escribe tu pregunta" />
      <button type="submit">Enviar</button>
    </form>
  `;

  document.body.appendChild(assistantFab);
  document.body.appendChild(panel);

  const toggleButton = assistantFab.querySelector('.assistant-toggle');
  const closeButton = panel.querySelector('.close-chat');
  const chatBody = panel.querySelector('.chat-body');
  const form = panel.querySelector('.assistant-form');
  const input = form.querySelector('input');
  const quickButtons = panel.querySelectorAll('.quick-options button');

  const responses = {
    perfil: 'Melissa Medina es una estudiante de Licenciatura en Entornos Virtuales con formación en Administración de Negocios en Entornos Virtuales, con interés en la tecnología, la creatividad y la resolución de problemas.',
    proyectos: 'Entre mis proyectos destaca Mielé-id, un emprendimiento en desarrollo centrado en invitaciones digitales interactivas para eventos, con enfoque en diseño, personalización y experiencia digital.',
    habilidades: 'Mis habilidades incluyen organización, trabajo en equipo, creatividad, atención al cliente, conocimiento de herramientas digitales, uso de Excel, PowerPoint, Canva, Google Drive y conocimientos básicos de HTML y JavaScript.',
    formacion: 'Actualmente curso el tercer semestre de la Licenciatura en Entornos Virtuales en la Universidad La Salle Bajío, con formación en Administración de Negocios en Entornos Virtuales.',
    experiencia: 'He desarrollado experiencia práctica en actividades al aire libre, campamentos, trabajo colaborativo, atención a clientes, apoyo en entornos comerciales y creación de contenido visual.',
    equipo: 'Me relaciono con facilidad con personas de distintos perfiles, puedo colaborar en equipos y asumir funciones de liderazgo o apoyo según las necesidades del contexto.',
    contacto: 'Puedes contactarme en meliibarramedina@gmail.com para conversar sobre proyectos, formación o oportunidades profesionales.',
    general: 'Puedo responder con base en la información de este currículum. Si necesitas conocer mi perfil, proyectos, formación, habilidades o experiencia práctica, puedo orientarte hacia la sección adecuada.'
  };

  function addMessage(message, sender = 'bot') {
    const item = document.createElement('div');
    item.className = `chat-message ${sender}`;
    item.textContent = message;
    chatBody.appendChild(item);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function openAssistant() {
    panel.classList.add('open');
    toggleButton.setAttribute('aria-expanded', 'true');
    if (!chatBody.innerHTML) {
      addMessage('Hola, soy el asistente de Melissa Medina. ¿Qué quieres saber de su perfil profesional?', 'bot');
    }
  }

  function closeAssistant() {
    panel.classList.remove('open');
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  toggleButton.addEventListener('click', () => {
    if (panel.classList.contains('open')) {
      closeAssistant();
    } else {
      openAssistant();
    }
  });

  closeButton.addEventListener('click', closeAssistant);

  quickButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const key = button.dataset.key;
      const answer = responses[key] || responses.general;
      addMessage(button.textContent, 'user');
      addMessage(answer, 'bot');
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    addMessage(question, 'user');

    const lowerQuestion = question.toLowerCase();
    let answer = 'No tengo información específica sobre esa pregunta dentro de este currículum. Puedo orientarte sobre mi perfil, formación, habilidades, proyectos o experiencia práctica.';

    if (lowerQuestion.includes('perfil') || lowerQuestion.includes('quién') || lowerQuestion.includes('soy')) {
      answer = responses.perfil;
    } else if (lowerQuestion.includes('proyecto') || lowerQuestion.includes('miel') || lowerQuestion.includes('invitaciones')) {
      answer = responses.proyectos;
    } else if (lowerQuestion.includes('habilidad') || lowerQuestion.includes('competencia') || lowerQuestion.includes('fortaleza')) {
      answer = responses.habilidades;
    } else if (lowerQuestion.includes('formación') || lowerQuestion.includes('universidad') || lowerQuestion.includes('acad')) {
      answer = responses.formacion;
    } else if (lowerQuestion.includes('experiencia') || lowerQuestion.includes('práctica') || lowerQuestion.includes('trabajo')) {
      answer = responses.experiencia;
    } else if (lowerQuestion.includes('equipo') || lowerQuestion.includes('liderazgo') || lowerQuestion.includes('colabor')) {
      answer = responses.equipo;
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('correo') || lowerQuestion.includes('email')) {
      answer = responses.contacto;
    }

    addMessage(answer, 'bot');
    input.value = '';
  });
});
