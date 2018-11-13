interface NameValuePair {
    name: string,
    value: number
}

interface volunteer {
    name: string
}

interface Location {
    city: string,
    street: string,
    streetNumber: number
}

export interface Event {
    type: NameValuePair,
    volunteers: {
        min: number,
        max: number,
        volunteers: volunteer[]
    },
    title: string,
    desc: string,
    picUrl: string,
    contact: { phone: string, mobile: string },
    vehicle: NameValuePair,
    tags: NameValuePair[],
    locations: Location[],
    time: {
        dates: Date[],
        duration: NameValuePair,
        frequency: string
    },
    usgent: boolean
}
