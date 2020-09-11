import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

export function getElementTop(id) {
    const element = document.getElementById(id);
    return element ? element.offsetTop : null;
}

export function getWindowTop() {
    return window.scrollY;
}

export function heightCorrectByElement(height, id) {
    const elementToHeightCorrectBy = document.getElementById(id);
    return height -= elementToHeightCorrectBy ? elementToHeightCorrectBy.offsetHeight : 0;
}

export function scrollToElement(id, elementIDToHeightCorrectBy) {
    window.scroll({
        top: heightCorrectByElement(getElementTop(id), elementIDToHeightCorrectBy),
        behavior: 'smooth',
    });
}

export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
}

export function windowAtOrPassedElement(id, elementIDToHeightCorrectBy) {
    const windowTop = getWindowTop();
    let elementTop = getElementTop(id);
    elementTop = heightCorrectByElement(elementTop, elementIDToHeightCorrectBy);
    return (elementTop || elementTop == 0) ? windowTop >= elementTop : false;
}