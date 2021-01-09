const addMovieBtn = document.getElementById('add-movie-btn');
const searchBtn = document.getElementById('search-btn');
const title = document.getElementById('title');
const extraName = document.getElementById('extra-name');
const extraValue = document.getElementById('extra-value');
const movies = [];



const clearUserInput = () => {
    title.value = '';
    extraName.value = '';
    extraValue.value = '';
};

const renderMovieElement = (filter = '') => {
    const movieList = document.getElementById('movie-list');

    if(movies.length === 0){
        movieList.classList.remove('visible');
        return;
    } else {
        movieList.classList.add('visible');
    }
    movieList.innerHTML = '';

    const filteredTerm = !filter ? movies : movies.filter((movie) => movie.info.title.includes(filter));

    filteredTerm.forEach((movie) => {
        const movieEl = document.createElement('li');
        const {info, ...otherProperties} = movie;
        console.log(otherProperties);
        let {getFormattedTitle} = movie;
        //getFormattedTitle = getFormattedTitle.bind(movie);
        //const {title: movieTitle} = info;
        let text = getFormattedTitle.call(movie) + ' - ';
        for(const key in info){
            if(key !== 'title'){
                text = text + `${key} : ${info[key]}`;
            }
        }
        movieEl.textContent = text;
        movieList.append(movieEl);
    });


};

const addMovieHandler = () => {
    titleValue = title.value;
    extraNameValue = extraName.value;
    extraValueValue = extraValue.value;

    if(
        titleValue.trim() === '' || 
        extraNameValue.trim() === '' || 
        extraValueValue.trim() === ''){
            return
    }
    
    const newMovie = {
        info: {
            title: titleValue,
            [extraNameValue]: extraValueValue
        },
        id: Math.random(),
        getFormattedTitle() {
            console.log(this);
            return this.info.title.toUpperCase();
        }
    }

    movies.push(newMovie);
    renderMovieElement();
    clearUserInput();
};

const filterMovieHandler = () => {
    const filterTitle = document.getElementById('filter-title').value;
    renderMovieElement(filterTitle);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchBtn.addEventListener('click', filterMovieHandler);