document.addEventListener('DOMContentLoaded', () => {
    loadContent();
    updateNavigation();
});

async function loadContent() {
    const contentDiv = document.getElementById('content');
    const path = window.location.pathname;

    if (path === '/' || path === '/index.html') {
        contentDiv.innerHTML = '<h2>Welcome to FlatFiles.org</h2><p>Select a page from the navigation menu.</p>';
    } else {
        try {
            const response = await fetch(`/content${path}.md`);
            const markdown = await response.text();
            contentDiv.innerHTML = marked.parse(markdown);
        } catch (error) {
            contentDiv.innerHTML = '<h2>404 - Page Not Found</h2>';
        }
    }
}

async function updateNavigation() {
    const nav = document.getElementById('main-nav');
    try {
        const response = await fetch('/content/');
        const files = await response.json();
        const links = files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const name = file.replace('.md', '');
                return `<li><a href="/${name}">${name}</a></li>`;
            });
        nav.innerHTML = `<ul>${links.join('')}</ul>`;
    } catch (error) {
        console.error('Error updating navigation:', error);
    }
}