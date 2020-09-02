export function getElementTop(id) {
    const element = document.getElementById(id);
    return element ? element.offsetTop : null;
}

export function getWindowTop() {
    return window.scrollY;
}

export function scrollToElement(id) {
    window.scrollTo({
        top: getElementTop(id),
        behavior: 'smooth',
    });
}

export function windowAtOrPassedElement(id) {
    const windowTop = getWindowTop();
    const elementTop = getElementTop(id);
    return (elementTop || elementTop == 0) ? windowTop >= elementTop : false;
}