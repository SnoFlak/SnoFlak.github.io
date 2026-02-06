export function tagLogic(currentScroll) {
    const sections = document.querySelectorAll('.content-section');

    sections.forEach((section) => {
        const target = parseFloat(section.dataset.percent);

        if (Math.abs(currentScroll - target) < 0.05) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
}