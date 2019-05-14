export const getPokeImg = (id) => {
    return `/static/sprites/${id}.png`;
}

export const getImgFromUrl = (url) => {
    const id = url.split('/')[url.split('/').length - 2];
    return `/static/sprites/${id}.png`;
}
