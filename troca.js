document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggle-theme');
    const body = document.body;

    // Carregar preferência do usuário (se houver)
    const currentTheme = localStorage.getItem('theme') || 'tema-claro';
    body.className = currentTheme;
    toggleButton.textContent = currentTheme === 'tema-claro' ? 'Modo Escuro' : 'Modo Claro';

    toggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('tema-escuro');
        
        if (isDarkMode) {
            body.classList.replace('tema-escuro', 'tema-claro');
            toggleButton.textContent = 'Modo Escuro';
            localStorage.setItem('theme', 'tema-claro');
        } else {
            body.classList.replace('tema-claro', 'tema-escuro');
            toggleButton.textContent = 'Modo Claro';
            localStorage.setItem('theme', 'tema-escuro');
        }
    });
});
