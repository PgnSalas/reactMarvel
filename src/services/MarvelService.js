import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=bd46855b066a8c82e5b9adbde263f4c0';

    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=${offset}&apikey=bd46855b066a8c82e5b9adbde263f4c0`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        let newStr = '';
        char.description ? newStr = char.description : newStr = 'There is no description for this page';

        return {
            id: char.id,
            name: char.name,
            description: newStr.length > 70 ? newStr.slice(0, 100) + '...' : newStr,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    const _transformComics = (char) => {
        
        return {
            id: char.id,
            title: char.title,
            url: char.thumbnail.path + '.' + char.thumbnail.extension,
            price: char.prices[0].price
        }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError, getAllComics}
}


export default useMarvelService;