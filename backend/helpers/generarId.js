const generadId = () => {
    return Date.now().toString(32) + Math.random().toString(32).substring(2)
}

export default generadId