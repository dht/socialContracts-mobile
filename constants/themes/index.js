import white from './theme_white';
import green_mon from './theme_green_mon';
import neutral_blue from './theme_neutral_blue';

let theme = 'white';

const themes = {
    white,
    green_mon,
    neutral_blue
}

export const setTheme = (_theme) => {
    theme = _theme;
}

export const getTheme = () => {
    return themes[theme];
}