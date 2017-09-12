const log = store => next => action => {

    let result = next(action);

   console.log('action -> ', action);

    return result
}

export default log;
