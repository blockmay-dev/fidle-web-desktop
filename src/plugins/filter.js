import numeral from 'numeral'

import moment from 'moment';


const timeStamp = (value) => {
    if (value) {
        return moment(String(value)).format('DD MMM YYYY hh:mm A')
    }
}

const colorSplit = (value) => {
    // if (value) {
    //     return (String(value)).split(" ").join();
    // }
    return !value ? '' : `${String(value).split(" ").join()}`
}

const timeRange = (value) => {
    if (value) {
        // return moment(String(value)).format('hh:mm A')
        return moment(String(value)).fromNow()
    }

}

const dollarFilter = (value) => {
    if (!value) {
        return '$ 0'
    }

    return numeral(value).format('($0a)')
}


const dollarFilter2 = (value) => {
    if (!value) {
        return '$ 0'
    }

    return numeral(value).format('($ 0.00a)')
}

const percentFilter = (value) => {
    return !value ? '0%' : `${Number(value).toFixed(2)}%`
}
const sliceContent = (value) => {
    return !value ? '0' : `${(value).slice(0,100)}...`
}

const sliceHash = (value) => {
    return !value ? '0' : `${(value).slice(0,10)}...`
}
const sliceHash2 = (value) => {
    return !value ? '0' : `${(value).slice(0,40)}...`
}

const percentageFilter = (value) => {
    return !value ? '0%' : `${Number(value).toFixed(2) * 100}%`
}

export { dollarFilter, percentFilter, percentageFilter, timeStamp, timeRange, dollarFilter2, sliceHash, sliceHash2, sliceContent, colorSplit }