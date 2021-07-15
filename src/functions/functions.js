export const kelvinToCelsius = temp => {
    if (typeof temp !== 'number')
        return temp

    let newTemp = (temp - 273.15)
    let newTempString
    let prefix = () => {
        return (newTemp > 0) ? '+' : ''
    }
    newTempString = newTemp.toFixed(1)
    return prefix()+newTempString
}

export const timestampToHours = (timestamp) => {
    const t = new Date( timestamp*1000 )
    let hours = t.getHours()
    let mins = t.getMinutes()
    mins = (mins < 10 ? '0' : '') + mins
    return hours + ':' + mins
}