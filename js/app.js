window.onload = function() {
    $('#onload').fadeIn();
    $('body').addClass('hidden');
    setTimeout(function() {
        alert('Pagina cargada');
        $('#onload').fadeOut();
        $('body').removeClass('hidden');
    }, 3000);

    // Crear el asistente
    const assistant = document.createElement('div');
    assistant.classList.add('assistant');
    assistant.id = 'assistant';
    document.body.appendChild(assistant);

    const assistantPopup = document.createElement('div');
    assistantPopup.classList.add('assistant-popup');
    assistantPopup.id = 'assistantPopup';
    assistantPopup.innerHTML = '<p id="assistantMessage">Hola, ¿en qué puedo ayudarte?</p>';
    document.body.appendChild(assistantPopup);

    // Voiceflow API Configuración
    const VOICEFLOW_API_KEY = "VF.DM.67ccc7b25b71ca8d1a56f59d.fnpB3eFBMHckH1hW"; // Coloca tu API Key de Voiceflow
    const VOICEFLOW_VERSION_ID = "production"; // ID del proyecto

    async function sendMessageToVoiceflow(userInput) {
        const response = await fetch(`https://general-runtime.voiceflow.com/state/user123/interact`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${VOICEFLOW_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                action: { type: "text", payload: userInput },
                config: { tts: true }
            })
        });

        const data = await response.json();
        return data; // Devuelve la respuesta de Voiceflow
    }

    assistant.addEventListener('click', async function() {
        const userInput = "¿Qué partido recomiendas?"; // Puedes cambiarlo dinámicamente
        const response = await sendMessageToVoiceflow(userInput);

        // Si hay respuesta de Voiceflow, la mostramos
        if (response && response.length > 0) {
            document.getElementById('assistantMessage').textContent = response[0].payload.message;
        } else {
            document.getElementById('assistantMessage').textContent = "No tengo información en este momento.";
        }

        assistantPopup.classList.toggle('active');

        setTimeout(() => {
            assistantPopup.classList.remove('active');
        }, 5000);
    });
};