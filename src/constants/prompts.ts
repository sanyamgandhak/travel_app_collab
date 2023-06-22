export const itinenaryPrompt = (dateRange: number, location: string, tripType: "Busy" | "Relaxed", tripDetails: "Cultural" | "Balanced" | "Adventure" | "Sightsee") => {
    return `Can you create a ${dateRange} day itinerary for ${location} with the following instructions:
    1. Time to go from one place to the next is the least
    2. List all places to see in the following manner in a numbered list per-day: <Place to visit, City : Detailed description in less than 300 words.  
    3. Also add "Must-see!" if a particular place is a must-see attraction.
    4. Tell the town/city/area to stay at the end of each day in this format: City/Area to stay at: <Name of city/area>
    5. Make sure the city/area to stay at takes into consideration the logistics for things seen on that day and to be seen the next day.
    6. Add a 50-100 word overview section for each day, before starting to list the numbered points.
    7. Type of trip:${tripType} & ${tripDetails}
    8. For each day, show the name of the city like so: Day X: Rome
    `
}

export const nextItinenaryPrompt = (previousResponse: string, location: string) => {
    return `
    ${previousResponse}
    Can you give another itinerary with different places in ${location}  different from the above response with the same information  with same no of days.
    `
}


export const exploreDestinationPrompt = (place: string, days: number, tripDetails: "Beach" | "Mountain" | "Desert" | "Glacier" | "Wildlife" | "Cities", tripType: string, month: string) => {
    return `
    I need to plan a vacation. Help me with 4-10 ideas. It needs to be the perfect season to visit that place (exclude places that are too cold, hot or rainy in the month I will provide). Here are my parameters:

        1. Where I live: ${place}
        2. How many days I have: ${days}
        3. What kind of vacation I want: ${tripDetails}
        4. Am I ok with international travel: ${tripType}
        5. Month of Travel: ${month}

    `
}