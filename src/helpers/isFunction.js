export const isFunction = value => {
    return value && {}.toString.call(value) === '[object Function]';
}