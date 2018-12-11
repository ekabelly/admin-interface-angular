interface NameValuePair {
    name: string,
    value: number
}

export interface Tag {
    name:"",
    translation:""
}

interface volunteer {
    name: string
}

interface Location {
    city: string,
    street: string,
    houseNum: number
}

export interface Event {
    type: number,
    volunteers: {
        min: number,
        max: number,
        volunteers: volunteer[]
    },
    title: string,
    desc: string,
    picUrl: string,
    contact: { phone: string, mobile: string },
    vehicles: number[],
    tags: number[],
    locations: Location[],
    time: {
        date: Date,
        duration: number,
        frequency: string
    },
    urgent: boolean,
    volunteersTypes: number[]
}
