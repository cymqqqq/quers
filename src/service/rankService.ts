
const epoch = new Date(1970, 1, 1)

function epoch_seconds(date:  number) {
    let td: number
    td = date - epoch.getSeconds()
    return td
}


export function hot(s: any, date: any) {
    let order = Math.log10(Math.max(Math.abs(s), 1))
    let sign = s > 0 ? 1 : (s < 0 ? -1 : 0)
    let seconds = epoch_seconds(parseInt(date) / 1e9) - 1699660800
                                                        
    return Math.round(order + sign * seconds)
}